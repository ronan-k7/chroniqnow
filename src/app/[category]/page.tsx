import { promises as fs } from "fs";
import path from "path";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoadMoreArticles from "@/components/LoadMoreArticles";
import type { Article } from "@/types/homepage";
import type { Metadata } from "next";

/* ─────────────────────────────────────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────────────────────────────────────── */

/** Returns a valid ISO string, or today's date as fallback if the value is missing/malformed */
function safeISOString(value: string | undefined | null): string {
  if (!value) return new Date().toISOString();
  const d = new Date(value);
  return isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
}

function capitalize(slug: string) {
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

async function loadArticles(category: string): Promise<Article[] | null> {
  const dataPath = path.join(process.cwd(), "src", "data", `${category}.json`);
  try {
    const raw = await fs.readFile(dataPath, "utf8");
    return JSON.parse(raw) as Article[];
  } catch {
    return null;
  }
}

/* ─────────────────────────────────────────────────────────────────────────────
   STATIC PARAMS
───────────────────────────────────────────────────────────────────────────── */

export async function generateStaticParams(): Promise<{ category: string }[]> {
  const dataDir = path.join(process.cwd(), "src", "data");
  try {
    const files = await fs.readdir(dataDir);
    return files
      .filter((f) => f.endsWith(".json"))
      .map((f) => ({ category: f.replace(".json", "") }));
  } catch {
    return [];
  }
}

/* ─────────────────────────────────────────────────────────────────────────────
   METADATA  (corrected)
───────────────────────────────────────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const articles = await loadArticles(category);

  const capitalized = capitalize(category);

  /* ── Fallback when the data file is missing ── */
  if (!articles || articles.length === 0) {
    return {
      title: "Chroniq Now – Global News Hub",
      description:
        "Chroniq Now delivers breaking news, in-depth analysis, and exclusive stories on global politics, business, science, and culture.",
      metadataBase: new URL("https://www.chroniqnow.com"),
      robots: { index: false, follow: false },
    };
  }

  const sorted = articles
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const latest = sorted[0];

  const ogImage =
    latest?.image ?? "https://www.chroniqnow.com/images/chroniqnow-logo.webp";

  const title = `${capitalized} News – Chroniq Now: Global ${capitalized} Headlines`;
  const description = `Get the latest ${capitalized} news from Chroniq Now — breaking updates, in-depth analysis, and exclusive stories on global ${capitalized.toLowerCase()} developments.`;
  const canonical = `https://www.chroniqnow.com/${category}`;

  return {
    metadataBase: new URL("https://www.chroniqnow.com"),

    title,
    description,

    /* ── keywords (minor signal; keeps Bing happy) ── */
    keywords: [
      `${capitalized.toLowerCase()} news`,
      `latest ${capitalized.toLowerCase()} updates`,
      `${capitalized.toLowerCase()} headlines`,
      "global news",
      "breaking news",
      "Chroniq Now",
    ],

    /* ── authors ── */
    authors: [{ name: "Chroniq Now", url: "https://www.chroniqnow.com" }],

    /* ── canonical ── */
    alternates: { canonical },

    /* ── Open Graph ── */
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: "Chroniq Now",
      url: canonical,
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${capitalized} news – Chroniq Now`,
        },
      ],
    },

    /* ── Twitter / X ── */
    twitter: {
      card: "summary_large_image",
      site: "@ChroniqNow",
      creator: "@ChroniqNow",
      title,
      description,
      images: [ogImage],
    },

    /* ── Robots — no need to repeat inside googleBot if values are identical ── */
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
  };
}

/* ─────────────────────────────────────────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────────────────────────────────────────── */

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const articles = await loadArticles(category);

  if (!articles) return notFound();

  const pageArticles = articles.slice(0, 11);
  const featuredArticle = pageArticles[0];
  const otherPageArticles = pageArticles.slice(1);
  const bottomArticles = pageArticles.slice(7);

  const capitalized = capitalize(category);
  const canonical = `https://www.chroniqnow.com/${category}`;

  /* ── latest date for dateModified — guarded against malformed date strings ── */
  const latestDate =
    articles.length > 0
      ? articles
          .slice()
          .sort(
            (a, b) =>
              (isNaN(new Date(b.date).getTime()) ? 0 : new Date(b.date).getTime()) -
              (isNaN(new Date(a.date).getTime()) ? 0 : new Date(a.date).getTime())
          )[0].date
      : undefined;

  /* ═══════════════════════════════════════════════════════════════════════════
     JSON-LD  (3 separate scripts — Google recommends splitting schema types)

     1. CollectionPage   — describes this category listing page
     2. BreadcrumbList   — powers breadcrumb rich results in SERP
     3. ItemList         — tells Google which articles are listed (key for GSC)
  ═══════════════════════════════════════════════════════════════════════════ */

  /** 1. CollectionPage */
  const collectionPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${canonical}#webpage`,
    name: `${capitalized} News – Chroniq Now`,
    headline: `${capitalized} News – Chroniq Now: Global ${capitalized} Headlines`,
    description: `Get the latest ${capitalized.toLowerCase()} news from Chroniq Now — breaking updates, in-depth analysis, and exclusive stories.`,
    url: canonical,
    inLanguage: "en-US",
    isPartOf: {
      "@type": "WebSite",
      "@id": "https://www.chroniqnow.com/#website",
      name: "Chroniq Now",
      url: "https://www.chroniqnow.com",
    },
    dateModified: safeISOString(latestDate),
    image: {
      "@type": "ImageObject",
      url:
        featuredArticle?.image ??
        "https://www.chroniqnow.com/images/chroniqnow-logo.webp",
      width: 1200,
      height: 630,
    },
    publisher: {
      "@type": "Organization",
      "@id": "https://www.chroniqnow.com/#organization",
      name: "Chroniq Now",
      url: "https://www.chroniqnow.com",
      logo: {
        "@type": "ImageObject",
        url: "https://www.chroniqnow.com/images/chroniqnow-logo.webp",
        width: 512,
        height: 512,
      },
      sameAs: [
        "https://x.com/ChroniqNow",
        "https://www.instagram.com/chroniqnow/",
      ],
    },
    /* keywords as an array — valid on CollectionPage */
    keywords: [
      `${capitalized.toLowerCase()} news`,
      `latest ${capitalized.toLowerCase()} updates`,
      "global news",
      "breaking news",
      "Chroniq Now",
    ],
    breadcrumb: { "@id": `${canonical}#breadcrumb` },
    mainEntity: { "@id": `${canonical}#itemlist` },
  };

  /** 2. BreadcrumbList — required for breadcrumb rich results */
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${canonical}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.chroniqnow.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: capitalized,
        item: canonical,
      },
    ],
  };

  /** 3. ItemList — article listing (helps Google index individual articles faster) */
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${canonical}#itemlist`,
    name: `${capitalized} News Articles`,
    url: canonical,
    numberOfItems: pageArticles.length,
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    itemListElement: pageArticles.map((article, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${canonical}/${article.slug}`,
      name: article.title,
      image: article.image,
    })),
  };

  /* ─────────────────────────────────────────────────────────────────────────
     JSX
  ───────────────────────────────────────────────────────────────────────── */

  return (
    <>
      {/* ── Structured Data ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionPageJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <Navbar />

      <main className="p-2 sm:p-20 py-8">
        <nav aria-label="Breadcrumb" className="mb-2 text-sm">
          <ol className="flex items-center" itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link
                title="Home"
                href="/"
                className="text-red-600 uppercase"
                itemProp="item"
              >
                <span itemProp="name">HOME</span>
              </Link>
              <meta itemProp="position" content="1" />
            </li>
            <li>
              <span className="mx-2 text-gray-500">»</span>
            </li>
            <li
              className="uppercase text-gray-900 text-md"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <span itemProp="name">{capitalized}</span>
              <meta itemProp="item" content={canonical} />
              <meta itemProp="position" content="2" />
            </li>
          </ol>
        </nav>

        <div className="flex items-center mb-8">
          <div className="w-0.5 h-8 bg-red-600 mr-3" />
          <h1 className="uppercase text-2xl sm:text-3xl text-gray-900">
            {capitalized}
          </h1>
        </div>

        <div className="mb-10 space-y-4 text-gray-700 leading-relaxed">
          <p>
            Follow the most important <strong>{capitalized} news</strong>{" "}
            stories as they break, with trusted reporting and analysis that cuts
            through the noise.
          </p>
          <p>
            Our dedicated <strong>{capitalized}</strong> coverage keeps you
            updated on key developments, exclusive insights, and the trends
            shaping what happens next.
          </p>
        </div>

        {/*
          ── DOM ORDER: desktop FIRST, mobile SECOND ──────────────────────────
          Both layouts are always present in the HTML. Crawlers and screen
          readers traverse the DOM top-to-bottom, so the layout that contains
          the H2 must come first.

          Reading order for bots:  H1 → H2 (desktop featured) → H3s → H4s
          Visual order is unchanged — Tailwind hidden/block classes handle that.
          ─────────────────────────────────────────────────────────────────────
        */}

        {/* ── DESKTOP LAYOUT (first in DOM) ── H2 for featured, H3 for all others */}
        <div className="hidden lg:grid grid-cols-1 lg:grid-cols-5 gap-y-5 lg:gap-x-5">
          {/* left grid */}
          <div className="col-span-1 lg:col-span-3 grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-6">
            {/* small card — h3 */}
            <Link
              title={otherPageArticles[0].title}
              href={`/${category}/${otherPageArticles[0].slug}`}
              className="flex flex-col overflow-hidden shadow-xs hover:shadow-lg transition-shadow"
            >
              <div className="w-24 h-20 lg:w-full lg:h-full overflow-hidden">
                <Image
                  src={otherPageArticles[0].image}
                  alt={otherPageArticles[0].title}
                  title={otherPageArticles[0].title}
                  width={96}
                  height={80}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-3">
                <h3 className="text-sm lg:text-base font-bold leading-snug tracking-tight">
                  {otherPageArticles[0].title}
                </h3>
              </div>
            </Link>

            {/* featured card — ✅ the ONE h2 on the page, first in DOM */}
            <Link
              title={featuredArticle.title}
              href={`/${category}/${featuredArticle.slug}`}
              className="flex flex-col row-span-2 col-span-2 overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="w-full overflow-hidden">
                <Image
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  title={featuredArticle.title}
                  width={1200}
                  height={960}
                  className="w-full h-full object-cover"
                  fetchPriority="high"
                  loading="eager"
                />
              </div>
              <div className="p-4 sm:p-6 flex-1 flex flex-col justify-start gap-4">
                <h2 className="text-xl sm:text-3xl font-bold leading-snug tracking-tight">
                  {featuredArticle.title}
                </h2>
                <p className="hidden lg:block text-sm leading-relaxed text-gray-800">
                  {featuredArticle.shortdescription}
                </p>
              </div>
            </Link>

            {/* second small card — h3 */}
            <Link
              title={otherPageArticles[1].title}
              href={`/${category}/${otherPageArticles[1].slug}`}
              className="flex flex-col overflow-hidden shadow-xs hover:shadow-lg transition-shadow"
            >
              <div className="w-24 h-20 lg:w-full lg:h-full overflow-hidden">
                <Image
                  src={otherPageArticles[1].image}
                  alt={otherPageArticles[1].title}
                  title={otherPageArticles[1].title}
                  width={96}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <h3 className="text-sm lg:text-base font-bold leading-snug tracking-tight">
                  {otherPageArticles[1].title}
                </h3>
              </div>
            </Link>
          </div>

          {/* right grid — h3 */}
          <div className="col-span-1 lg:col-span-2 space-y-6">
            {otherPageArticles.slice(2, 6).map((item, i) => (
              <Link
                key={item.slug + i}
                title={item.title}
                href={`/${category}/${item.slug}`}
                className="flex flex-col overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between h-40">
                  <h3 className="text-base font-bold text-gray-900 line-clamp-4 p-2 mt-0 leading-snug tracking-tight">
                    {item.title}
                  </h3>
                  <div className="w-60 h-full flex-shrink-0 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      title={item.title}
                      width={140}
                      height={160}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ── MOBILE LAYOUT (second in DOM) ── all H3, sits after the H2 above */}
        <div className="block lg:hidden space-y-6">
          <Link
            title={featuredArticle.title}
            href={`/${category}/${featuredArticle.slug}`}
            className="flex flex-col overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
          >
            <div className="w-full h-64 overflow-hidden">
              <Image
                src={featuredArticle.image}
                title={featuredArticle.title}
                alt={featuredArticle.title}
                width={1200}
                height={400}
                className="w-full h-full object-cover"
                fetchPriority="high"
                loading="eager"
              />
            </div>
            <div className="p-2">
              {/* H3 — H2 already appeared in the desktop block above */}
              <h3 className="text-xl font-bold">{featuredArticle.title}</h3>
              <p className="mt-2 text-sm text-gray-800">
                {featuredArticle.shortdescription}
              </p>
            </div>
          </Link>

          <div className="space-y-4">
            {otherPageArticles.map((item, i) => (
              <Link
                key={item.slug + i}
                title={item.title}
                href={`/${category}/${item.slug}`}
                className="flex items-center overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="w-24 h-24 flex-shrink-0 overflow-hidden">
                  <Image
                    src={item.image}
                    title={item.title}
                    alt={item.title}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 ml-4">
                  <h3 className="text-base font-bold text-gray-900 line-clamp-2">
                    {item.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* bottom grid — h4 */}
        {bottomArticles.length > 0 && (
          <section className="hidden lg:block mt-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {bottomArticles.map((item, i) => (
                <Link
                  key={item.slug + i}
                  title={item.title}
                  href={`/${category}/${item.slug}`}
                  className="flex flex-col h-full overflow-hidden border border-gray-100 shadow-sm"
                >
                  <div className="w-full h-48 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      title={item.title}
                      width={400}
                      height={250}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex-1 p-4 flex flex-col justify-between">
                    <h4 className="text-base font-bold text-gray-900 leading-snug tracking-tight">
                      {item.title}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* load more */}
        {articles.length > 11 && (
          <LoadMoreArticles
            articles={articles.slice(11).map((a) => ({ ...a, id: a.slug }))}
            category={category}
          />
        )}
      </main>

      <Footer />
    </>
  );
}