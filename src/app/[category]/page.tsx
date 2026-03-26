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
    const data = JSON.parse(raw) as Article[];
    // Pre-sort articles by date so metadata and page content always match
    return data.sort((a, b) => {
      const timeA = new Date(a.date).getTime();
      const timeB = new Date(b.date).getTime();
      return (isNaN(timeB) ? 0 : timeB) - (isNaN(timeA) ? 0 : timeA);
    });
  } catch {
    return null;
  }
}

/* ─────────────────────────────────────────────────────────────────────────────
   STATIC PARAMS
───────────────────────────────────────────────────────────────────────────── */

export async function generateStaticParams() {
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
   METADATA
───────────────────────────────────────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const articles = await loadArticles(category);
  const capitalized = capitalize(category);

  // FIX #1: Guard against null OR empty array
  if (!articles || articles.length === 0) {
    return {
      title: "Category Not Found",
      robots: { index: false, follow: false },
    };
  }

  const latest = articles[0];
  const ogImage =
    latest?.image ?? "https://www.chroniqnow.com/images/chroniqnow-logo.webp";
  const title = `${capitalized} News – Chroniq Now: Global ${capitalized} Headlines`;
  const description = `Get the latest ${capitalized} news from Chroniq Now — breaking updates and in-depth analysis on global ${capitalized.toLowerCase()} developments.`;
  const canonical = `/${category}`;

  return {
    // FIX #2: metadataBase must always be set here (also add to root layout.tsx)
    metadataBase: new URL("https://www.chroniqnow.com"),
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: capitalized }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
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

  // FIX #1: Guard against null OR empty array to prevent 500 errors
  if (!articles || articles.length === 0) return notFound();

  const pageArticles = articles.slice(0, 11);
  const featuredArticle = pageArticles[0];

  // FIX #3: Safe slices — otherPageArticles may have fewer than 6 items
  const otherPageArticles = pageArticles.slice(1);
  const bottomArticles = pageArticles.slice(7);

  const capitalized = capitalize(category);
  const canonical = `https://www.chroniqnow.com/${category}`;

  /* ── Structured Data ── */
  const collectionPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${canonical}#webpage`,
    name: `${capitalized} News`,
    url: canonical,
    // FIX #4: Add dateModified using the most recent article's date
    dateModified: safeISOString(articles[0]?.date),
    publisher: { "@id": "https://www.chroniqnow.com/#organization" },
    breadcrumb: { "@id": `${canonical}#breadcrumb` },
    mainEntity: { "@id": `${canonical}#itemlist` },
  };

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
      { "@type": "ListItem", position: 2, name: capitalized, item: canonical },
    ],
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${canonical}#itemlist`,
    numberOfItems: pageArticles.length,
    itemListElement: pageArticles.map((article, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://www.chroniqnow.com/${category}/${article.slug}`,
      name: article.title,
      // FIX #4: Add datePublished to each item for richer structured data
      datePublished: safeISOString(article.date),
    })),
  };

  return (
    <>
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

      <main className="p-2 sm:p-20 py-8 min-h-screen">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="mb-4 text-sm font-bold text-gray-500"
        >
          <ol className="flex items-center uppercase">
            <li>
              <Link href="/" className="text-red-600 hover:underline">
                HOME
              </Link>
            </li>
            <li className="mx-2">»</li>
            <li className="text-gray-900">{capitalized}</li>
          </ol>
        </nav>

        <header className="flex items-center mb-8 border-l-4 border-red-600 pl-4">
          <h1 className="uppercase text-3xl sm:text-4xl font-bold text-gray-900">
            {capitalized}
          </h1>
        </header>

        {/* Intro Text for SEO */}
        <section className="mb-10 text-gray-700 leading-relaxed max-w-4xl">
          <p className="mb-2">
            Follow the most important <strong>{capitalized} news</strong>{" "}
            stories as they break, with trusted reporting and analysis that cuts
            through the noise.
          </p>
        </section>

        {/* ── DESKTOP GRID LAYOUT ── */}
        {/* FIX #3: Only render desktop grid if we have enough articles (at least 3) */}
        {otherPageArticles.length >= 2 && (
          <div className="hidden lg:grid grid-cols-5 gap-6 mb-12">
            {/* Left Cards */}
            <div className="col-span-3 grid grid-cols-3 gap-6">
              {/* Small Card 1 */}
              <Link
                href={`/${category}/${otherPageArticles[0].slug}`}
                className="group shadow-sm hover:shadow-md transition"
              >
                <div className="aspect-video overflow-hidden">
                  <Image
                    src={otherPageArticles[0].image}
                    // FIX #5: Use descriptive alt text instead of empty string
                    alt={otherPageArticles[0].title}
                    width={400}
                    height={250}
                    className="object-cover w-full h-full group-hover:scale-105 transition duration-300"
                  />
                </div>
                <h3 className="p-3 text-sm font-bold line-clamp-3">
                  {otherPageArticles[0].title}
                </h3>
              </Link>

              {/* Main Featured Card (H2) */}
              <Link
                href={`/${category}/${featuredArticle.slug}`}
                className="col-span-2 flex flex-col group shadow-md hover:shadow-lg transition"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <Image
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    width={800}
                    height={600}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    priority
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-3 group-hover:text-red-600 transition">
                    {featuredArticle.title}
                  </h2>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {featuredArticle.shortdescription}
                  </p>
                </div>
              </Link>

              {/* Small Card 2 */}
              <Link
                href={`/${category}/${otherPageArticles[1].slug}`}
                className="group shadow-sm hover:shadow-md transition"
              >
                <div className="aspect-video overflow-hidden">
                  <Image
                    src={otherPageArticles[1].image}
                    // FIX #5: Descriptive alt text
                    alt={otherPageArticles[1].title}
                    width={400}
                    height={250}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h3 className="p-3 text-sm font-bold line-clamp-3">
                  {otherPageArticles[1].title}
                </h3>
              </Link>
            </div>

            {/* Right Sidebar Articles */}
            <div className="col-span-2 space-y-4">
              {otherPageArticles.slice(2, 6).map((item) => (
                <Link
                  key={item.slug}
                  href={`/${category}/${item.slug}`}
                  className="flex gap-4 items-center shadow-sm hover:bg-gray-50 transition p-2"
                >
                  <div className="w-24 h-24 flex-shrink-0 overflow-hidden">
                    <Image
                      src={item.image}
                      // FIX #5: Descriptive alt text
                      alt={item.title}
                      width={100}
                      height={100}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h3 className="text-base font-bold leading-snug">
                    {item.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ── MOBILE LIST LAYOUT ── */}
        <div className="lg:hidden space-y-8">
          <Link href={`/${category}/${featuredArticle.slug}`} className="block">
            <Image
              src={featuredArticle.image}
              alt={featuredArticle.title}
              width={600}
              height={400}
              className="w-full aspect-video object-cover mb-4 shadow-sm"
              priority
            />
            <h2 className="text-2xl font-bold mb-2">{featuredArticle.title}</h2>
            <p className="text-gray-600 text-sm">
              {featuredArticle.shortdescription}
            </p>
          </Link>

          <div className="space-y-6">
            {otherPageArticles.slice(0, 6).map((item) => (
              <Link
                key={item.slug}
                href={`/${category}/${item.slug}`}
                className="flex gap-4"
              >
                <div className="w-20 h-20 flex-shrink-0">
                  <Image
                    src={item.image}
                    // FIX #5: Descriptive alt text
                    alt={item.title}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full shadow-xs"
                  />
                </div>
                <h3 className="text-base font-bold line-clamp-2">
                  {item.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Articles Grid */}
        {bottomArticles.length > 0 && (
          <section className="mt-16 border-t pt-12">
            <h2 className="text-xl font-bold mb-8 uppercase text-gray-500 tracking-widest">
              Archive News
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {bottomArticles.map((item) => (
                <Link
                  key={item.slug}
                  href={`/${category}/${item.slug}`}
                  className="group"
                >
                  <div className="aspect-video overflow-hidden mb-3">
                    <Image
                      src={item.image}
                      // FIX #5: Descriptive alt text
                      alt={item.title}
                      width={400}
                      height={250}
                      className="object-cover w-full h-full group-hover:scale-105 transition"
                    />
                  </div>
                  <h4 className="font-bold text-base leading-snug">
                    {item.title}
                  </h4>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Load More Button */}
        {articles.length > 11 && (
          <div className="mt-12 text-center">
            <LoadMoreArticles
              articles={articles.slice(11).map((a) => ({ ...a, id: a.slug }))}
              category={category}
            />
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}