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

export async function generateStaticParams(): Promise<{ category: string }[]> {
  const dataDir = path.join(process.cwd(), "src", "data");

  let files: string[] = [];

  try {
    files = await fs.readdir(dataDir);
  } catch {
    return [];
  }

  return files
    .filter((file) => file.endsWith(".json"))
    .map((file) => ({
      category: file.replace(".json", ""),
    }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const dataPath = path.join(process.cwd(), "src", "data", `${category}.json`);

  let raw: string;
  try {
    raw = await fs.readFile(dataPath, "utf8");
  } catch {
    return {
      title: "Chroniq Now",
      description: "Chroniq Now - Global News Hub",
      metadataBase: new URL("https://www.chroniqnow.com"),
      robots: { index: true, follow: true },
    };
  }

  let articles: Article[];
  try {
    articles = JSON.parse(raw) as Article[];
  } catch {
    articles = [];
  }

  const sorted = articles.slice().sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const latest = sorted[0];

  const ogImage =
    latest?.image || "https://www.chroniqnow.com/images/chroniqnow-logo.webp";

  const capitalized = category
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  const title = `${capitalized} News - Chroniq Now: Global ${capitalized} Headlines`;

  const description = `Get the latest ${capitalized} news from Chroniq Now. We offer breaking updates, in-depth analysis, and exclusive stories on global politics, business, and culture.`;

  return {
    title,
    description,
    metadataBase: new URL("https://www.chroniqnow.com"),
    alternates: {
      canonical: `https://www.chroniqnow.com/${category}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.chroniqnow.com/${category}`,
      siteName: "Chroniq Now",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${capitalized} news – Chroniq Now`,
        },
      ],
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      site: "@ChroniqNow",
      title,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const dataPath = path.join(process.cwd(), "src", "data", `${category}.json`);

  let raw: string;
  try {
    raw = await fs.readFile(dataPath, "utf8");
  } catch {
    return notFound();
  }

  let articles: Article[];
  try {
    articles = JSON.parse(raw) as Article[];
  } catch {
    return notFound();
  }

  const pageArticles = articles.slice(0, 11);
  const featuredArticle = pageArticles[0];
  const otherPageArticles = pageArticles.slice(1);
  const bottomArticles = pageArticles.slice(7);

  const capitalized = category
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    headline: `${capitalized} News - Chroniq Now`,
    url: `https://www.chroniqnow.com/${category}`,
    keywords: [
      `${capitalized.toLowerCase()} news`,
      `latest ${capitalized.toLowerCase()} updates`,
      "global news",
      "news portal",
    ],
    isPartOf: {
      "@type": ["CreativeWork", "Product"],
      name: "Chroniq Now - Global News Hub",
      productID: "chroniqnow.com:standard",
    },
    publisher: {
      "@type": "Organization",
      name: "Chroniq Now",
      logo: {
        "@type": "ImageObject",
        url: "https://www.chroniqnow.com/images/chroniqnow-logo.webp",
      },
      sameAs: [
        "https://x.com/ChroniqNow",
        "https://www.instagram.com/chroniqnow/",
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Navbar />

      <main className=" p-2 sm:p-20 py-8">
        <nav aria-label="Breadcrumb" className="mb-2 text-sm">
          <ol className="flex items-center">
            <li>
              <Link title="Home" href="/" className="text-red-600 uppercase">
                HOME
              </Link>
            </li>
            <li>
              <span className="mx-2 text-gray-500">»</span>
            </li>
            <li className="uppercase text-gray-900 text-md">{capitalized}</li>
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
            stories as they break, with trusted reporting and analysis that
            cuts through the noise.
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
              <div className="w-full bg-white border shadow-sm border-gray-100 text-red-600 text-center py-2 font-semibold">
                {otherPageArticles[0].date}
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
              <div className="w-full bg-white border shadow-sm border-gray-100 text-red-600 text-center py-2 font-semibold">
                {featuredArticle.date}
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
              <div className="w-full bg-white border shadow-sm border-gray-100 text-red-600 text-center py-2 font-semibold">
                {otherPageArticles[1].date}
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
                <div className="w-full bg-white p-2 border shadow-sm border-gray-100 text-red-600 text-left py-2 font-semibold">
                  {item.date}
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
            <div className="w-full bg-white border-t border-gray-100 text-red-600 text-center py-2 font-semibold">
              {featuredArticle.date}
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
                  <p className="mt-1 text-sm text-red-600 font-semibold">
                    {item.date}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* bottom grid — h4 (unchanged) */}
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
                  <div className="w-full bg-white border-t border-gray-100 text-red-600 text-center py-2 font-semibold">
                    {item.date}
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