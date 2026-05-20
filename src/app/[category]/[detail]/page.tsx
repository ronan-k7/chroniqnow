import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LongFormArticlePage, {
  type LongFormArticleData,
} from "@/components/LongFormArticlePage";
import {
  getArticleBySlug,
  getLatestArticles,
  getArticlesByCategory,
} from "@/lib/readAlljsonfiles";
import { Metadata } from "next";
import { notFound } from "next/navigation";

/* ─────────────────────────────────────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────────────────────────────────────── */

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

function formatDisplayDate(value: string | undefined | null): string {
  if (!value) return "";
  const d = new Date(value);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
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
   METADATA
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
    keywords: [
      `${capitalized.toLowerCase()} news`,
      "breaking news",
      "Chroniq Now",
      ...(author ? [author] : []),
    ],
    authors: [
      { name: author ?? "Chroniq Now", url: "https://www.chroniqnow.com/our-team" },
    ],
    alternates: {
      canonical: url,
      types: {
        "application/rss+xml": "https://www.chroniqnow.com/rss.xml",
      },
    },
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
      publishedTime,
      modifiedTime: publishedTime,
      section: capitalized,
      authors: [`https://www.chroniqnow.com/our-team`],
    },
    twitter: {
      card: "summary_large_image",
      site: "@ChroniqNow",
      creator: "@ChroniqNow",
      title,
      description: safeDescription,
      images: [image],
    },
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
}: DetailPageProps): Promise<Metadata> {
  const { category, detail: slug } = await params;
  const article = getArticleBySlug(slug);

  if (
    category === "politics" &&
    slug === "bribery-case-collapses-into-minor-campaign-finance-violation"
  ) {
    return buildMetadata({
      title: "Wanda Vázquez Bribery Case Ends in Minor Violation",
      description: article?.shortdescription,
      image:
        article?.image ??
        "https://www.chroniqnow.com/images/wanda-vazquez-press-conference.webp",
      category,
      slug,
      date: article?.date,
      author: article?.author,
    });
  }

  if (!article) {
    return {
      title: "Chroniq Now – Global News Hub",
      description:
        "Chroniq Now delivers breaking news and in-depth analysis on global events.",
      metadataBase: new URL("https://www.chroniqnow.com"),
      robots: { index: false, follow: false },
    };
  }

  // For longform articles, use seoTitle if available
  const title =
    (article as unknown as LongFormArticleData).seoTitle ?? article.title;

  return buildMetadata({
    title,
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
  const categories = [
    "business",
    "health",
    "politics",
    "science",
    "sports",
    "puerto-rico",
    "technology",
  ];

  const articles = categories.flatMap((cat) => getArticlesByCategory(cat));

  return articles
    .filter(
      (article) =>
        typeof article.category === "string" &&
        article.category.trim() !== "" &&
        typeof article.slug === "string" &&
        article.slug.trim() !== ""
    )
    .map((article) => ({
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
  if (!article) return notFound();

  const latestArticles = getLatestArticles(10).filter(
  (item) => item.slug !== slug
);
  const categoryArticles = getArticlesByCategory(category);

  const moreArticles = categoryArticles
    .filter((item) => item.slug !== slug)
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      const timeA = isNaN(dateA) ? 0 : dateA;
      const timeB = isNaN(dateB) ? 0 : dateB;
      return timeB - timeA;
    })
    .slice(0, 4);

  const articleUrl = `https://www.chroniqnow.com/${category}/${slug}/`;
  const publishedISO = safeISOString(article.date);
  const displayDate = formatDisplayDate(article.date);

  /* ── JSON-LD (shared by both layouts) ─────────────────────────────────── */
  const newsArticleJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "@id": `${articleUrl}#article`,
    headline: article.title,
    description: article.shortdescription,
    url: articleUrl,
    inLanguage: "en-US",
    image: {
      "@type": "ImageObject",
      url: article.image,
      width: 1200,
      height: 630,
    },
    datePublished: publishedISO,
    dateModified: publishedISO,
    author: {
      "@type": "Person",
      "@id": `https://www.chroniqnow.com/our-team#${
        article.author?.toLowerCase().replace(/\s+/g, "-") ?? "team"
      }`,
      name: article.author ?? "Chroniq Now",
      url: "https://www.chroniqnow.com/our-team",
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
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${articleUrl}#webpage`,
    },
    articleSection: capitalize(category),
  };

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

  /* ── FAQ schema (longform articles only) ─────────────────────────────── */
  const longformData = article as unknown as LongFormArticleData;
  const faqJsonLd =
    longformData.articleType === "longform" && longformData.faq?.length
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: longformData.faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }
      : null;

  return (
    <>
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
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      )}

      <Navbar />

      {/* ── LONGFORM layout ─────────────────────────────────────────────── */}
      {longformData.articleType === "longform" ? (
        <LongFormArticlePage
          article={longformData}
          displayDate={displayDate}
          publishedISO={publishedISO}
          latestArticles={latestArticles}
          moreArticles={moreArticles}
        />
      ) : (
        /* ── STANDARD layout (unchanged) ─────────────────────────────── */
        <main className="w-full p-2 sm:p-20 py-8">
          <div className="flex flex-col mb-8 gap-2 sm:pt-3">
            <nav
              aria-label="Breadcrumb"
              className="text-sm font-bold text-gray-500 mb-4 lg:mb-0 lg:mr-4"
            >
              <ol className="flex items-center flex-wrap gap-1">
                <li>
                  <Link title="Home" href="/" className="text-red-600 hover:underline">
                    HOME
                  </Link>
                </li>
                <li aria-hidden="true" className="mx-1">»</li>
                <li>
                  <Link
                    title={`${category} news`}
                    href={`/${category}/`}
                    className="text-red-600 hover:underline"
                  >
                    {category.replace(/-/g, " ").toUpperCase()}
                  </Link>
                </li>
                <li aria-hidden="true" className="mx-1">»</li>
                <li className="text-gray-900 line-clamp-1">{article.title}</li>
              </ol>
            </nav>

            <div className="flex flex-wrap items-center gap-3">
              <Link title="go to author page" href="/our-team">
                <span className="font-medium text-sm text-gray-600">
                  {article.author}
                </span>
              </Link>
              {displayDate && (
                <time dateTime={publishedISO} className="text-sm text-gray-400">
                  {displayDate}
                </time>
              )}
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
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>

              <p className="text-lg leading-relaxed mb-6 font-bold">
                {article.shortdescription}
              </p>
              {article.description && (
                <p className="text-base leading-relaxed mb-4 whitespace-pre-line">
                  {article.description}
                </p>
              )}
            </article>

            <aside className="w-full lg:w-1/3 sticky top-24 self-start">
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
                      <div className="w-20 h-20 flex-shrink-0 mr-3 overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={80}
                          height={80}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <span className="text-sm font-bold leading-snug">
                        {item.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          </div>

          {moreArticles.length > 0 && (
            <section className="mt-12 w-full pb-3">
              <h2 className="text-2xl font-semibold mb-6">
                More in {capitalize(category)}
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {moreArticles.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/${category}/${item.slug}/`}
                      className="block shadow-sm hover:bg-gray-50 transition h-full"
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
                        <h3 className="text-lg font-bold leading-snug">
                          {item.title}
                        </h3>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </main>
      )}

      <Footer />
    </>
  );
}