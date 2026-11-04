"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

/* ─────────────────────────────────────────────────────────────────────────────
   FEATURE STORY PAGE
   A fourth detail-page design (next to "standard", "longform" and "spotlight").
   Used when an article's JSON has  "articleType": "feature".

   The route file ( src/app/[category]/[detail]/page.tsx ) renders <Navbar />
   and <Footer /> around this component, so only the page body lives here.

   Layout (magazine / profile style, built around one strong photo)
   ├─ Reading-progress bar   : thin red bar fixed to the top of the screen
   ├─ Cinematic hero         : full-bleed photo fading to black.
   │                            lg+  → headline sits ON the photo
   │                            < lg → headline sits directly UNDER the photo
   ├─ Centered reading column: byline, "In Brief" box, serif body copy with
   │                            drop cap, numbered chapters, pull quotes,
   │                            dark timeline, editor's note
   └─ Bottom band            : "More in <category>" cards + "Latest News" list
───────────────────────────────────────────────────────────────────────────── */

/* ─────────────────────────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────────────────────────── */

export interface FeatureTimelineItem {
  /** Shown in red above the entry, e.g. "February 26, 2026" */
  date: string;
  text: string;
}

export interface FeatureSection {
  /** Optional heading. Headed sections are numbered 01, 02, 03 … */
  heading?: string;
  content?: string[];
  /** Large highlighted statement shown after the section's paragraphs. */
  pullQuote?: string;
  /** Small attribution line under the pull quote. */
  pullQuoteCite?: string;
}

export interface FeatureArticleData {
  category: string;
  title: string;
  shortdescription: string;
  slug: string;
  date?: string;
  author?: string;
  image: string;
  /** CSS object-position used for the hero + cropped thumbnails, e.g. "45% 30%". */
  imagePosition?: string;
  articleType: "feature";
  seoTitle?: string;
  /** Sub-headline shown under the title. */
  dek?: string;
  /** Small label above the headline. Defaults to "Feature". */
  kicker?: string;
  /** Short bullet summary shown in the "In Brief" box. */
  keyPoints?: string[];
  sections?: FeatureSection[];
  timelineTitle?: string;
  timeline?: FeatureTimelineItem[];
  editorsNote?: string;
  imageCaption?: string;
}

export interface FeatureSidebarArticle {
  slug: string;
  category: string;
  title: string;
  image: string;
  imagePosition?: string;
}

interface Props {
  article: FeatureArticleData;
  displayDate: string;
  publishedISO: string;
  latestArticles: FeatureSidebarArticle[];
  moreArticles: FeatureSidebarArticle[];
}

/* ─────────────────────────────────────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────────────────────────────────────── */

const capitalize = (text: string) =>
  text.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

const imgPos = (pos?: string) => (pos ? { objectPosition: pos } : undefined);

/** Supports **bold** and [text](url) inside paragraphs. */
function InlineText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-bold text-gray-900">
              {part.slice(2, -2)}
            </strong>
          );
        }
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (link) {
          return (
            <a
              key={i}
              href={link[2]}
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 underline underline-offset-2 hover:text-red-700"
            >
              {link[1]}
            </a>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

/** Thin red bar showing how far down the page the reader is. */
function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? Math.min(100, (doc.scrollTop / max) * 100) : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[60] h-[3px] w-full bg-transparent"
    >
      <div
        className="h-full bg-red-600 transition-[width] duration-100 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────────────────────── */

export default function FeatureStoryPage({
  article,
  displayDate,
  publishedISO,
  latestArticles,
  moreArticles,
}: Props) {
  const sections = article.sections ?? [];
  const dateText = displayDate || article.date || "";
  const heroPosition = article.imagePosition ?? "45% 30%";

  // reading time (≈ 220 wpm)
  const words = sections
    .flatMap((s) => [s.heading ?? "", ...(s.content ?? [])])
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  const readMinutes = Math.max(1, Math.round(words / 220));

  let chapter = 0;

  return (
    <main className="w-full bg-white text-gray-900">
      <ReadingProgress />

      {/* ══════════════════════════ HERO ══════════════════════════ */}
      <section className="relative bg-black text-white">
        {/* photo */}
        <div className="relative h-[46vh] min-h-[280px] w-full overflow-hidden sm:h-[56vh] lg:h-[80vh] lg:max-h-[800px]">
          <Image
            src={article.image}
            alt={article.title}
            title={article.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={imgPos(heroPosition)}
          />
          {/* fades: top (for breadcrumb) + bottom (into the headline) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10 lg:via-black/30" />
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/70 to-transparent" />

          {/* breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="absolute inset-x-0 top-0 px-4 pt-4 text-xs font-bold text-gray-300 sm:px-8 sm:pt-6 sm:text-sm md:px-20"
          >
            <ol className="flex flex-wrap items-center gap-x-1 gap-y-1">
              <li>
                <Link title="Home" href="/" className="text-red-500 hover:underline">
                  HOME
                </Link>
              </li>
              <li aria-hidden="true" className="mx-1">
                »
              </li>
              <li>
                <Link
                  title={`${article.category} news`}
                  href={`/${article.category}/`}
                  className="text-red-500 hover:underline"
                >
                  {article.category.replace(/-/g, " ").toUpperCase()}
                </Link>
              </li>
            </ol>
          </nav>
        </div>

        {/* headline: under the photo on small screens, over it from lg */}
        <div className="relative -mt-24 px-4 pb-8 sm:-mt-28 sm:px-8 sm:pb-10 lg:absolute lg:inset-x-0 lg:bottom-0 lg:mt-0 lg:px-20 lg:pb-14">
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <Link
                href={`/${article.category}/`}
                title={`${article.category} news`}
                className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-300 hover:text-white"
              >
                {capitalize(article.category)}
              </Link>
            </div>

            <h1 className="mt-4 font-serif text-[2rem] font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
              {article.title}
            </h1>

            {article.dek && (
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-gray-200 sm:text-lg lg:text-xl">
                {article.dek}
              </p>
            )}
          </div>
        </div>

        {article.imageCaption && (
          <p className="px-4 pb-4 text-xs text-gray-400 sm:px-8 md:px-20">
            {article.imageCaption}
          </p>
        )}
      </section>

      {/* ═══════════════════════ READING COLUMN ═══════════════════════ */}
      <div className="px-4 sm:px-8 md:px-20">
        <article className="mx-auto max-w-3xl pb-4 pt-8 sm:pt-12">
          {/* byline */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-b border-gray-200 pb-5 text-sm text-gray-500">
            {article.author && (
              <span>
                By{" "}
                <Link
                  title="go to author page"
                  href="/our-team"
                  className="font-bold text-gray-900 hover:text-red-600"
                >
                  {article.author}
                </Link>
              </span>
            )}
            {dateText && (
              <time dateTime={publishedISO} className="text-gray-500">
                {dateText}
              </time>
            )}
          </div>

          {/* in brief */}
          {article.keyPoints && article.keyPoints.length > 0 && (
            <aside
              aria-label="In brief"
              className="my-8 border-y-2 border-gray-900 bg-gray-50 px-5 py-6 sm:px-7"
            >
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-red-600">
                In Brief
              </p>
              <ul className="mt-4 space-y-3">
                {article.keyPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-[15px] leading-relaxed text-gray-800 sm:text-base">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 bg-red-600" />
                    <span>
                      <InlineText text={point} />
                    </span>
                  </li>
                ))}
              </ul>
            </aside>
          )}

          {/* sections */}
          {sections.map((section, si) => {
            const isLead = si === 0 && !section.heading;
            const number = section.heading ? ++chapter : 0;

            return (
              <section key={si} className={section.heading ? "mt-12 sm:mt-14" : "mt-8"}>
                {section.heading && (
                  <h2 className="mb-6 border-t border-gray-200 pt-6 font-serif text-2xl font-bold leading-snug text-gray-900 sm:text-3xl">
                    <span className="mb-2 block font-sans text-xs font-bold tracking-[0.22em] text-red-600">
                      {String(number).padStart(2, "0")}
                    </span>
                    {section.heading}
                  </h2>
                )}

                {section.content?.map((para, pi) => {
                  const dropCap = isLead && pi === 0;
                  const short = para.length <= 80;
                  return (
                    <p
                      key={pi}
                      className={[
                        "mb-5 font-serif text-[1.06rem] leading-[1.85] sm:text-[1.2rem]",
                        short ? "font-semibold text-gray-900" : "text-gray-800",
                        dropCap
                          ? "first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-serif first-letter:text-6xl first-letter:font-bold first-letter:leading-[0.8] first-letter:text-red-600 sm:first-letter:text-7xl"
                          : "",
                      ].join(" ")}
                    >
                      <InlineText text={para} />
                    </p>
                  );
                })}

                {section.pullQuote && (
                  <blockquote className="my-10 border-l-4 border-red-600 pl-5 sm:pl-8 lg:-mx-10">
                    <p className="font-serif text-2xl font-bold leading-snug text-gray-900 sm:text-3xl lg:text-[2.1rem]">
                      “{section.pullQuote}”
                    </p>
                    {section.pullQuoteCite && (
                      <footer className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                        {section.pullQuoteCite}
                      </footer>
                    )}
                  </blockquote>
                )}
              </section>
            );
          })}

          {/* timeline */}
          {article.timeline && article.timeline.length > 0 && (
            <section
              aria-label={article.timelineTitle ?? "Timeline"}
              className="mt-14 bg-gray-950 px-5 py-8 text-white sm:px-8"
            >
              <h2 className="text-xs font-bold uppercase tracking-[0.22em] text-red-500">
                {article.timelineTitle ?? "Timeline"}
              </h2>
              <ol className="relative mt-6 space-y-7 border-l border-gray-700 pl-6">
                {article.timeline.map((item, i) => (
                  <li key={i} className="relative">
                    <span className="absolute -left-[30px] top-1.5 h-2.5 w-2.5 rounded-full bg-red-600 ring-4 ring-gray-950" />
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-red-400">
                      {item.date}
                    </p>
                    <p className="mt-1 text-[15px] leading-relaxed text-gray-200 sm:text-base">
                      <InlineText text={item.text} />
                    </p>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {/* editor's note */}
          {article.editorsNote && (
            <aside className="mt-10 border border-gray-200 bg-gray-50 p-5 text-sm leading-relaxed text-gray-600">
              <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-gray-900">
                Editor’s Note
              </p>
              <p>
                <InlineText text={article.editorsNote} />
              </p>
            </aside>
          )}
        </article>
      </div>

      {/* ═══════════════════════ BOTTOM BAND ═══════════════════════ */}
      <div className="mt-12 border-t border-gray-200 bg-gray-50 px-4 pt-12 pb-8 sm:px-8 md:px-20">
        {moreArticles.length > 0 && (
          <section aria-label={`More in ${capitalize(article.category)}`}>
            <h2 className="mb-6 border-l-4 border-red-600 pl-4 text-xl font-bold uppercase tracking-wide text-gray-900 sm:text-2xl">
              More in {capitalize(article.category)}
            </h2>
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {moreArticles.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/${item.category}/${item.slug}/`}
                    title={item.title}
                    className="group flex h-full flex-col bg-white shadow-sm transition hover:shadow-md"
                  >
                    <div className="aspect-[3/2] w-full overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={400}
                        height={267}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                        style={imgPos(item.imagePosition)}
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="line-clamp-4 font-serif text-base font-bold leading-snug group-hover:text-red-600">
                        {item.title}
                      </h3>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {latestArticles.length > 0 && (
          <section aria-label="Latest News" className="mt-12">
            <h2 className="mb-6 border-l-4 border-red-600 pl-4 text-xl font-bold uppercase tracking-wide text-gray-900 sm:text-2xl">
              Latest News
            </h2>
            <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {latestArticles.slice(0, 6).map((item, i) => (
                <li key={item.slug}>
                  <Link
                    href={`/${item.category}/${item.slug}/`}
                    title={item.title}
                    className="group flex items-center gap-4 bg-white p-3 shadow-sm transition hover:bg-gray-50"
                  >
                    <span className="w-6 flex-shrink-0 text-center font-serif text-2xl font-bold text-red-600">
                      {i + 1}
                    </span>
                    <div className="h-16 w-20 flex-shrink-0 overflow-hidden sm:h-20 sm:w-24">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={96}
                        height={80}
                        className="h-full w-full object-cover"
                        style={imgPos(item.imagePosition)}
                      />
                    </div>
                    <span className="line-clamp-3 min-w-0 flex-1 text-sm font-bold leading-snug group-hover:text-red-600">
                      {item.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
}
