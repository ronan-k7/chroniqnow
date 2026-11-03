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
   CARD COMPONENTS (single responsive markup – no duplicated desktop/mobile DOM)
───────────────────────────────────────────────────────────────────────────── */

const imgPos = (pos?: string) =>
  pos ? { objectPosition: pos } : undefined;

/** Big lead card */
function FeaturedCard({
  article,
  category,
  className = "",
}: {
  article: Article;
  category: string;
  className?: string;
}) {
  return (
    <Link
      href={`/${category}/${article.slug}`}
      title={article.title}
      className={`group flex flex-col h-full bg-white shadow-md hover:shadow-lg transition ${className}`}
    >
      <div className="aspect-video overflow-hidden">
        <Image
          src={article.image}
          alt={article.title}
          width={800}
          height={450}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          style={imgPos(article.imagePosition)}
          priority
        />
      </div>
      <div className="p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold leading-snug mb-3 group-hover:text-red-600 transition">
          {article.title}
        </h2>
        <p className="text-sm text-gray-600 line-clamp-3">
          {article.shortdescription}
        </p>
      </div>
    </Link>
  );
}

/**
 * Compact card.
 *  - below sm : thumbnail on the left, title on the right
 *  - sm and up: image on top, title underneath
 *
 * NOTE: line-clamp lives on the <h3> and the padding on its parent <div>.
 * Putting both on the same element makes the 4th (hidden) line peek out
 * under the ellipsis – that was the clipped-title bug on this page.
 */
function SmallCard({
  article,
  category,
  className = "",
}: {
  article: Article;
  category: string;
  className?: string;
}) {
  return (
    <Link
      href={`/${category}/${article.slug}`}
      title={article.title}
      className={`group flex sm:flex-col h-full bg-white shadow-sm hover:shadow-md transition ${className}`}
    >
      <div className="w-28 aspect-[4/3] sm:w-full sm:aspect-video flex-shrink-0 overflow-hidden">
        <Image
          src={article.image}
          alt={article.title}
          width={400}
          height={225}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          style={imgPos(article.imagePosition)}
        />
      </div>
      <div className="min-w-0 flex-1 p-3 sm:p-4">
        <h3 className="text-sm sm:text-[15px] font-bold leading-snug line-clamp-5 group-hover:text-red-600 transition">
          {article.title}
        </h3>
      </div>
    </Link>
  );
}

/** Thumbnail + title row used in the right-hand list */
function ListCard({
  article,
  category,
}: {
  article: Article;
  category: string;
}) {
  return (
    <Link
      href={`/${category}/${article.slug}`}
      title={article.title}
      className="group flex gap-3 sm:gap-4 items-center bg-white shadow-sm hover:bg-gray-50 transition p-2"
    >
      <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 overflow-hidden">
        <Image
          src={article.image}
          alt={article.title}
          width={96}
          height={96}
          className="object-cover w-full h-full"
          style={imgPos(article.imagePosition)}
        />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-sm sm:text-base font-bold leading-snug line-clamp-4 group-hover:text-red-600 transition">
          {article.title}
        </h3>
      </div>
    </Link>
  );
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
    latest?.image ?? "https://www.chroniqnow.com/images/chroniq-now-logo.webp";
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

  // Slots (same order as before):
  //   [0] featured · [1] small card 1 · [2] small card 2 · [3-6] right-hand list
  const otherPageArticles = pageArticles.slice(1);
  const smallCard1 = otherPageArticles[0];
  const smallCard2 = otherPageArticles[1];
  const listArticles = otherPageArticles.slice(2, 6);
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

      <main className="px-4 sm:px-8 md:px-20 py-6 sm:py-10 min-h-screen">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="mb-4 text-sm font-bold text-gray-500"
        >
          <ol className="flex flex-wrap items-center uppercase">
            <li>
              <Link href="/" className="text-red-600 hover:underline">
                HOME
              </Link>
            </li>
            <li className="mx-2">»</li>
            <li className="text-gray-900">{capitalized}</li>
          </ol>
        </nav>

        <header className="flex items-center mb-6 sm:mb-8 border-l-4 border-red-600 pl-4">
          <h1 className="uppercase text-2xl sm:text-4xl font-bold text-gray-900">
            {capitalized}
          </h1>
        </header>

        {/* Intro Text for SEO */}
        <section className="mb-8 sm:mb-10 text-gray-700 leading-relaxed max-w-4xl">
          <p className="mb-2">
            Follow the most important <strong>{capitalized} news</strong>{" "}
            stories as they break, with trusted reporting and analysis that cuts
            through the noise.
          </p>
        </section>

        {/* ── TOP STORIES (one responsive layout for every screen size) ──
              < sm      : featured, then 2 compact cards, then compact list
              sm – lg   : featured full width, 2 cards side by side, list in 2 cols
              lg – xl   : left block (featured + 2 cards below) | right list
              xl +      : left block = [small1 | featured (2 cols) | small2], right list */}
        <section
          aria-label={`Top ${capitalized} stories`}
          className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-12"
        >
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            <FeaturedCard
              article={featuredArticle}
              category={category}
              className="order-1 sm:col-span-2 xl:col-start-2 xl:col-span-2 xl:row-start-1 xl:row-span-2"
            />

            {smallCard1 && (
              <SmallCard
                article={smallCard1}
                category={category}
                className="order-2 xl:col-start-1 xl:row-start-1"
              />
            )}

            {smallCard2 && (
              <SmallCard
                article={smallCard2}
                category={category}
                className="order-3 xl:col-start-1 xl:row-start-2"
              />
            )}
          </div>

          {listArticles.length > 0 && (
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 content-start">
              {listArticles.map((item) => (
                <ListCard key={item.slug} article={item} category={category} />
              ))}
            </div>
          )}
        </section>

        {/* Bottom Articles Grid */}
        {bottomArticles.length > 0 && (
          <section className="mt-12 sm:mt-16 border-t pt-10 sm:pt-12">
            <h2 className="text-lg sm:text-xl font-bold mb-6 sm:mb-8 uppercase text-gray-500 tracking-widest">
              Archive News
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {bottomArticles.map((item) => (
                <Link
                  key={item.slug}
                  href={`/${category}/${item.slug}`}
                  title={item.title}
                  className="group"
                >
                  <div className="aspect-video overflow-hidden mb-3">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={400}
                      height={225}
                      className="object-cover w-full h-full group-hover:scale-105 transition"
                      style={imgPos(item.imagePosition)}
                    />
                  </div>
                  <h3 className="font-bold text-base leading-snug line-clamp-4 group-hover:text-red-600 transition">
                    {item.title}
                  </h3>
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