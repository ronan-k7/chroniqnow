import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientDetail from "@/components/ClientDetail";
import {
  getArticleBySlug,
  getLatestArticles,
  getArticlesByCategory,
} from "@/lib/readAlljsonfiles";
import { Metadata } from "next";
import ClientDetail2 from "@/components/ClientDetail2";

/* ─────────────────────────────────────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────────────────────────────────────── */

/** Returns a valid ISO string, or today's date as fallback if the value is missing/malformed */
function safeISOString(value: string | undefined | null): string {
  if (!value) return new Date().toISOString();
  const d = new Date(value);
  return isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
}

function capitalize(text: string) {
  return text
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/* ─────────────────────────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────────────────────────── */

interface DetailPageProps {
  params: Promise<{
    category: string;
    detail: string;
  }>;
}

/* ─────────────────────────────────────────────────────────────────────────────
   METADATA — shared builder keeps the special-case and default in sync
───────────────────────────────────────────────────────────────────────────── */

function buildMetadata({
  title,
  description,
  image,
  category,
  slug,
  date,
  author,
}: {
  title: string;
  description: string | undefined;
  image: string;
  category: string;
  slug: string;
  date?: string;
  author?: string;
}): Metadata {
  const url = `https://www.chroniqnow.com/${category}/${slug}/`;
  const safeDescription = description ?? "Chroniq Now – Global News Hub";
  const capitalized = capitalize(category);
  const publishedTime = safeISOString(date);

  return {
    metadataBase: new URL("https://www.chroniqnow.com"),

    title,
    description: safeDescription,

    /* ── keywords ── */
    keywords: [
      `${capitalized.toLowerCase()} news`,
      "breaking news",
      "Chroniq Now",
      ...(author ? [author] : []),
    ],

    /* ── authors ── */
    authors: [
      { name: author ?? "Chroniq Now", url: "https://www.chroniqnow.com/our-team" },
    ],

    /* ── canonical ── */
    alternates: { canonical: url },

    /* ── Open Graph (article-specific fields) ── */
    openGraph: {
      type: "article",
      locale: "en_US",
      siteName: "Chroniq Now",
      url,
      title,
      description: safeDescription,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      /* Article-specific OG properties — boosts CTR and indexing signals */
      publishedTime,
      modifiedTime: publishedTime,
      section: capitalized,
      authors: [`https://www.chroniqnow.com/our-team`],
    },

    /* ── Twitter / X ── */
    twitter: {
      card: "summary_large_image",
      site: "@ChroniqNow",
      creator: "@ChroniqNow",
      title,
      description: safeDescription,
      images: [image],
    },

    /* ── Robots ── */
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; detail: string }>;
}): Promise<Metadata> {
  const { category, detail: slug } = await params;
  const article = getArticleBySlug(slug);

  /* ── Special-case override (title only — everything else from shared builder) ── */
  if (
    category === "politics" &&
    slug === "bribery-case-collapses-into-minor-campaign-finance-violation"
  ) {
    return buildMetadata({
      title: "Wanda Vázquez Bribery Case Ends in Minor Violation",
      description: article?.shortdescription,
      image:
        article?.image ?? "https://www.chroniqnow.com/images/wanda-vazquez-press-conference.webp",
      category,
      slug,
      date: article?.date,
      author: article?.author,
    });
  }

  /* ── 404 fallback ── */
  if (!article) {
    return {
      title: "Chroniq Now – Global News Hub",
      description: "Chroniq Now delivers breaking news and in-depth analysis on global events.",
      metadataBase: new URL("https://www.chroniqnow.com"),
      robots: { index: false, follow: false },
    };
  }

  /* ── Standard article metadata ── */
  return buildMetadata({
    title: article.title,
    description: article.shortdescription,
    image: article.image,
    category,
    slug,
    date: article.date,
    author: article.author,
  });
}

/* ─────────────────────────────────────────────────────────────────────────────
   STATIC PARAMS
───────────────────────────────────────────────────────────────────────────── */

export async function generateStaticParams() {
  const articles = [
    ...getArticlesByCategory("business"),
    ...getArticlesByCategory("health"),
    ...getArticlesByCategory("politics"),
    ...getArticlesByCategory("science"),
    ...getArticlesByCategory("sports"),
    ...getArticlesByCategory("puerto-rico"),
    ...getArticlesByCategory("technology"),
  ];

  return articles.map((article) => ({
    category: article.category,
    detail: article.slug,
  }));
}

/* ─────────────────────────────────────────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────────────────────────────────────────── */

export default async function DetailPage({ params }: DetailPageProps) {
  const { category, detail: slug } = await params;

  const article = getArticleBySlug(slug);
  const latestArticles = getLatestArticles(10);
  const categoryArticles = getArticlesByCategory(category);

  /* ── Safe sort guard: treats malformed dates as 0 ── */
  const moreArticles = categoryArticles
    .filter((item) => item.slug !== slug)
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      const timeA = isNaN(dateA.getTime()) ? 0 : dateA.getTime();
      const timeB = isNaN(dateB.getTime()) ? 0 : dateB.getTime();
      return timeB - timeA;
    })
    .slice(0, 4);

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        Article not found.
      </div>
    );
  }

  const articleUrl = `https://www.chroniqnow.com/${category}/${slug}/`;
  const publishedISO = safeISOString(article.date);

  /* ═══════════════════════════════════════════════════════════════════════════
     JSON-LD  (2 separate scripts)

     1. NewsArticle  — powers article rich results & GSC indexing
     2. BreadcrumbList — powers breadcrumb rich results in SERP
  ═══════════════════════════════════════════════════════════════════════════ */

  /** 1. NewsArticle */
  const newsArticleJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "@id": `${articleUrl}#article`,
    headline: article.title,
    description: article.shortdescription,
    url: articleUrl,
    inLanguage: "en-US",

    /* ── image as ImageObject — required for Google rich results ── */
    image: {
      "@type": "ImageObject",
      url: article.image,
      width: 1200,
      height: 630,
    },

    /* ── datePublished + dateModified — BOTH required by Google for NewsArticle ── */
    datePublished: publishedISO,
    dateModified: publishedISO,

    /* ── author ── */
    author: {
      "@type": "Person",
      "@id": `https://www.chroniqnow.com/our-team#${
        article.author?.toLowerCase().replace(/\s+/g, "-") ?? "team"
      }`,
      name: article.author ?? "Chroniq Now",
      url: "https://www.chroniqnow.com/our-team",
    },

    /* ── publisher ── */
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

    /* ── mainEntityOfPage — cross-references this WebPage ── */
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${articleUrl}#webpage`,
      name: article.title,
      url: articleUrl,
      isPartOf: {
        "@type": "WebSite",
        "@id": "https://www.chroniqnow.com/#website",
        name: "Chroniq Now",
        url: "https://www.chroniqnow.com",
      },
    },

    /* ── article section (category) ── */
    articleSection: capitalize(category),

    /* ── breadcrumb cross-reference ── */
    breadcrumb: { "@id": `${articleUrl}#breadcrumb` },
  };

  /** 2. BreadcrumbList */
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${articleUrl}#breadcrumb`,
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
        name: capitalize(category),
        item: `https://www.chroniqnow.com/${category}/`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: articleUrl,
      },
    ],
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
          __html: JSON.stringify(newsArticleJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <Navbar />

      <main className="w-full p-2 sm:p-20 py-8">
        <div className="flex flex-col mb-8 gap-2 sm:pt-3">
          {/* ── Breadcrumb nav with microdata ── */}
          <nav
            aria-label="Breadcrumb"
            className="text-sm font-bold text-gray-500 mb-4 lg:mb-0 lg:mr-4"
            itemScope
            itemType="https://schema.org/BreadcrumbList"
          >
            <span itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
              <Link
                title="Home"
                href="/"
                className="text-red-600"
                itemProp="item"
              >
                <span itemProp="name">HOME</span>
              </Link>
              <meta itemProp="position" content="1" />
            </span>

            <span className="mx-1">»</span>

            <span itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
              <Link
                title={`${category} news`}
                href={`/${category}/`}
                className="text-red-600"
                itemProp="item"
              >
                <span itemProp="name">{category.replace(/-/g, " ").toUpperCase()}</span>
              </Link>
              <meta itemProp="position" content="2" />
            </span>

            <span className="mx-1">»</span>

            <span itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
              <span itemProp="name">{article.title}</span>
              <meta itemProp="item" content={articleUrl} />
              <meta itemProp="position" content="3" />
            </span>
          </nav>

          <div className="flex space-x-4 items-center">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Link title="go to author page" href="/our-team">
                <span className="font-medium">{article.author}</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row w-full">
          <article className="w-full lg:w-2/3 lg:pr-8 mb-12 lg:mb-0">
            <h1 className="text-3xl sm:text-4xl font-bold mb-6">
              {article.title}
            </h1>

            <div className="w-full mb-6 overflow-hidden shadow-md">
              <Image
                src={article.image}
                alt={article.title}
                width={1200}
                height={600}
                className="w-full h-full object-cover"
                fetchPriority="high"
                loading="eager"
              />
            </div>

            <p className="text-lg leading-relaxed mb-6 font-bold">
              {article.shortdescription}
            </p>

            {article.description && (
              <p className="text-base leading-relaxed mb-4">
                {article.description}
              </p>
            )}
          </article>

          <aside className="w-full lg:w-1/3 sticky top-45 self-start">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">
              Latest News
            </h2>

            <ul className="space-y-4">
              {latestArticles.slice(0, 5).map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/${item.category}/${item.slug}/`}
                    className="flex items-center shadow-sm hover:bg-gray-50 transition"
                  >
                    <div className="w-30 h-20 flex-shrink-0 mr-3 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={80}
                        height={80}
                        className="object-cover w-full h-full"
                      />
                    </div>

                    <div className="flex flex-col">
                      <span className="text-sm font-bold leading-snug tracking-tight">
                        {item.title}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>

        <section className="mt-12 w-full pb-3">
          <h2 className="text-2xl font-semibold mb-6">
            More in {capitalize(category)}
          </h2>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {moreArticles.map((item, index) => (
              <li key={`${item.slug}-${index}`}>
                <Link
                  href={`/${category}/${item.slug}/`}
                  className="block shadow-sm hover:bg-gray-50 overflow-hidden h-full transition"
                >
                  <div className="w-full h-48 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={400}
                      height={250}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-bold leading-snug tracking-tight mb-2">
                      {item.title}
                    </h3>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <Footer />
    </>
  );
}