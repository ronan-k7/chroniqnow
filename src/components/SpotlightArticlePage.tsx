import Image from "next/image";
import Link from "next/link";
import NytCoverageCard, { hasNytCoverage } from "@/components/NytCoverageCard";

/* ─────────────────────────────────────────────────────────────────────────────
   SPOTLIGHT ARTICLE PAGE
   A third detail-page design (next to the "standard" and "longform" ones).
   Used when an article's JSON has  "articleType": "spotlight".

   The route file ( src/app/[category]/[detail]/page.tsx ) renders <Navbar />
   and <Footer /> around this component, so only the page body lives here.

   Layout
   ├─ Dark hero band   : kicker + status badge, serif headline, dek, byline,
   │                      3:2 image with offset red frame
   │                      (stacked on mobile, 7/5 split from lg)
   ├─ "By the numbers" : stat strip overlapping the hero edge
   │                      (1 column on mobile, 3 columns from sm)
   ├─ Reading column   : dateline, drop-cap lead, numbered sections,
   │                      pull-statement, editor's note
   │                      (8/12 on lg, full width below)
   ├─ Sidebar          : optional Timeline (scrolls normally) followed by the
│                      numbered "Latest News" list, which becomes sticky only
│                      once it reaches the top (lg and up)
   └─ More in category : 3:2 cards (1 / 2 / 4 columns)
───────────────────────────────────────────────────────────────────────────── */

/* ─────────────────────────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────────────────────────── */

export interface SpotlightStat {
  value: string;
  label: string;
  note?: string;
}

export interface SpotlightTimelineItem {
  /** Shown in red above the entry, e.g. "February 26, 2026" */
  date: string;
  text: string;
}

/** In-box (callout) shown inside the article body, after a section's paragraphs. */
export interface SpotlightCallout {
  /** Small uppercase label above the box, e.g. "Role & responsibilities" */
  label?: string;
  /** Optional headline figures shown side by side at the top of the box. */
  highlights?: { value: string; label: string }[];
  /** Body text of the box. Supports **bold** and [text](url). */
  text?: string;
}

export interface SpotlightSection {
  /** Optional heading. Headed sections are numbered 01, 02, 03 … */
  heading?: string;
  content?: string[];
  /** Boxed callout rendered after the section's paragraphs (before pullQuote). */
  callout?: SpotlightCallout;
  /** Large highlighted statement rendered after the section's paragraphs. */
  pullQuote?: string;
}

export interface SpotlightArticleData {
  category: string;
  title: string;
  shortdescription: string;
  slug: string;
  date?: string;
  author?: string;
  image: string;
  /** CSS object-position for cropped thumbnails, e.g. "40% 12%". */
  imagePosition?: string;
  articleType: "spotlight";
  seoTitle?: string;
  dek?: string;
  /** e.g. "WASHINGTON — October 30, 2026" */
  dateline?: string;
  /** Short status chip shown in the hero, e.g. "Allegations · Unverified" */
  badge?: string;
  imageCaption?: string;
  stats?: SpotlightStat[];
  sections?: SpotlightSection[];
  editorsNote?: string;
  /** Optional chronology shown at the top of the right-hand sidebar. */
  timelineTitle?: string;
  timeline?: SpotlightTimelineItem[];
  /** Small italic footnote under the timeline. */
  timelineNote?: string;
  /** Topic tags shown as oval pills after the article body. */
  topics?: string[];
}

export interface SpotlightSidebarArticle {
  slug: string;
  category: string;
  title: string;
  image: string;
  imagePosition?: string;
}

interface Props {
  article: SpotlightArticleData;
  displayDate: string;
  publishedISO: string;
  latestArticles: SpotlightSidebarArticle[];
  moreArticles: SpotlightSidebarArticle[];
}

/* ─────────────────────────────────────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────────────────────────────────────── */

const capitalize = (text: string) =>
  text.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

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

const imgPos = (pos?: string) => (pos ? { objectPosition: pos } : undefined);

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────────────────────── */

export default function SpotlightArticlePage({
  article,
  displayDate,
  publishedISO,
  latestArticles,
  moreArticles,
}: Props) {
  const categoryLabel = article.category.replace(/-/g, " ").toUpperCase();
  const dateText = displayDate || article.date || "";
  const sections = article.sections ?? [];

  // headed sections get 01, 02, 03 … numbering
  let headingCounter = 0;

  // Topics + Editor's note: shown at the end of the article on desktop, and
  // (lg:hidden copy) just above "Latest News" in the sidebar stack on mobile.
  const topicsBlock = (
    <>
    {article.topics && article.topics.length > 0 && (
      <section
        aria-label="Topics"
        className="mt-8 border border-gray-200 bg-gray-50 p-5 sm:p-6"
      >
        <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-gray-900">
          Topics
        </h2>
        <div className="flex flex-wrap gap-2">
          {article.topics.map((topic) => (
            <span
              key={topic}
              className="inline-flex items-center rounded-full border border-red-200 bg-white px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-red-700 sm:text-sm"
            >
              {topic}
            </span>
          ))}
        </div>
      </section>
    )}
    </>
  );
  const editorsNoteBlock = (
    <>
    {article.editorsNote && (
      <div className="mt-4 border-l-4 border-gray-900 bg-gray-100 p-5 sm:p-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-900">
          Editor&rsquo;s note
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700 sm:text-base">
          <InlineText text={article.editorsNote} />
        </p>
      </div>
    )}
    </>
  );

  return (
    <main className="w-full bg-white">
      {/* ══════════════════════════ HERO ══════════════════════════ */}
      <section className="relative overflow-hidden bg-gray-950 text-white">
        {/* subtle red glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-red-600/20 blur-3xl"
        />

        <div className="relative px-4 sm:px-8 md:px-20 pt-5 sm:pt-8 pb-20 sm:pb-24">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="text-xs sm:text-sm font-bold text-gray-400">
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
                  {categoryLabel}
                </Link>
              </li>
              <li aria-hidden="true" className="mx-1">
                »
              </li>
              <li className="w-full truncate text-gray-300 sm:w-auto sm:max-w-md">
                {article.title}
              </li>
            </ol>
          </nav>

          <div className="mt-6 sm:mt-8 grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
            {/* ── Text ── */}
            <div className="min-w-0 lg:col-span-7">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <Link
                  href={`/${article.category}/`}
                  className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-300 hover:text-white"
                >
                  {categoryLabel}
                </Link>
              </div>

              <h1 className="mt-5 font-serif text-[1.7rem] font-bold leading-[1.18] tracking-tight text-white sm:text-4xl xl:text-[2.6rem]">
                {article.title}
              </h1>

              {article.dek && (
                <p className="mt-5 max-w-2xl border-l-4 border-red-600 pl-4 text-base leading-relaxed text-gray-300 sm:text-lg">
                  {article.dek}
                </p>
              )}

              <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-400">
                {article.author && (
                  <Link
                    title="go to author page"
                    href="/our-team"
                    className="font-semibold text-gray-100 hover:text-white"
                  >
                    By {article.author}
                  </Link>
                )}
                {dateText &&
                  (displayDate ? (
                    <time dateTime={publishedISO}>{dateText}</time>
                  ) : (
                    <span>{dateText}</span>
                  ))}
              </div>
            </div>

            {/* ── Image (3:2, same ratio as the source file → no cropping) ── */}
            <figure className="relative min-w-0 lg:col-span-5">
              <div
                aria-hidden="true"
                className="absolute -bottom-3 -right-3 hidden h-full w-full border-2 border-red-600 sm:block"
              />
              <div className="relative aspect-[3/2] w-full overflow-hidden bg-gray-800 shadow-2xl">
                <Image
                  src={article.image}
                  alt={article.title}
                  width={1200}
                  height={800}
                  priority
                  className="h-full w-full object-cover"
                  style={imgPos(article.imagePosition)}
                />
              </div>
              {article.imageCaption && (
                <figcaption className="mt-3 text-xs leading-snug text-gray-400 sm:mt-5">
                  {article.imageCaption}
                </figcaption>
              )}
            </figure>
          </div>
        </div>
      </section>

      {/* ══════════════════════ BY THE NUMBERS ══════════════════════ */}
      {article.stats && article.stats.length > 0 && (
        <section
          aria-label="By the numbers"
          className="relative z-10 -mt-12 px-4 sm:-mt-14 sm:px-8 md:px-20"
        >
          <dl
            className={`grid grid-cols-1 gap-px border border-gray-200 bg-gray-200 shadow-xl ${
              article.stats.length >= 3
                ? "sm:grid-cols-3"
                : article.stats.length === 2
                ? "sm:grid-cols-2"
                : ""
            }`}
          >
            {article.stats.map((stat, i) => (
              <div key={i} className="bg-white p-5 sm:p-6">
                <dd className="font-serif text-4xl font-bold leading-none text-red-600 sm:text-5xl">
                  {stat.value}
                </dd>
                <dt className="mt-3 text-sm font-bold uppercase leading-snug tracking-wide text-gray-900">
                  {stat.label}
                </dt>
                {stat.note && (
                  <p className="mt-1.5 text-xs leading-snug text-gray-500">{stat.note}</p>
                )}
              </div>
            ))}
          </dl>
        </section>
      )}

      {/* ═════════════════════ ARTICLE + SIDEBAR ═════════════════════ */}
      <div className="px-4 pt-10 pb-6 sm:px-8 sm:pt-14 sm:pb-6 md:px-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
          {/* ── Reading column ── */}
          <article className="min-w-0 lg:col-span-8">
            {/* Dateline */}
            {article.dateline && (
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-red-600">
                {article.dateline}
              </p>
            )}

            {/* Sections */}
            {sections.map((section, si) => {
              const isLead = si === 0 && !section.heading;
              const number = section.heading ? ++headingCounter : 0;

              return (
                <section key={si} className="mb-10 sm:mb-12">
                  {section.heading && (
                    <h2
                      id={slugify(section.heading)}
                      className="mb-5 flex scroll-mt-48 items-start gap-3 border-t-2 border-gray-900 pt-4 sm:gap-4"
                    >
                      <span
                        aria-hidden="true"
                        className="font-serif text-2xl font-bold leading-none text-red-600 sm:text-3xl"
                      >
                        {String(number).padStart(2, "0")}
                      </span>
                      <span className="text-xl font-bold leading-snug text-gray-900 sm:text-2xl">
                        {section.heading}
                      </span>
                    </h2>
                  )}

                  {section.content?.map((para, pi) => (
                    <p
                      key={pi}
                      className={`mb-5 font-serif text-[1.05rem] leading-[1.8] text-gray-800 sm:text-lg sm:leading-[1.85] ${
                        isLead && pi === 0
                          ? "first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-serif first-letter:text-6xl first-letter:font-bold first-letter:leading-[0.8] first-letter:text-red-600 sm:first-letter:text-7xl"
                          : ""
                      }`}
                    >
                      <InlineText text={para} />
                    </p>
                  ))}

                  {section.callout && (
                    <aside
                      aria-label={section.callout.label || "Key details"}
                      className="my-8 border border-gray-200 border-t-4 border-t-red-600 bg-gray-50 p-5 shadow-sm sm:my-10 sm:p-7"
                    >
                      {section.callout.label && (
                        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-red-600">
                          {section.callout.label}
                        </p>
                      )}

                      {section.callout.highlights &&
                        section.callout.highlights.length > 0 && (
                          <dl
                            className={`mt-4 grid grid-cols-1 gap-4 border-b border-gray-200 pb-5 ${
                              section.callout.highlights.length >= 2
                                ? "sm:grid-cols-2"
                                : ""
                            }`}
                          >
                            {section.callout.highlights.map((h, hi) => (
                              <div key={hi}>
                                <dd className="font-serif text-4xl font-bold leading-none text-gray-900 sm:text-5xl">
                                  {h.value}
                                </dd>
                                <dt className="mt-2 text-xs font-bold uppercase leading-snug tracking-wide text-gray-600 sm:text-sm">
                                  {h.label}
                                </dt>
                              </div>
                            ))}
                          </dl>
                        )}

                      {section.callout.text && (
                        <p className="mt-4 font-serif text-base leading-relaxed text-gray-800 sm:text-lg">
                          <InlineText text={section.callout.text} />
                        </p>
                      )}
                    </aside>
                  )}

                  {section.pullQuote && (
                    <blockquote className="my-8 border-l-[6px] border-red-600 bg-gray-50 py-6 pl-5 pr-4 sm:my-10 sm:pl-8 sm:pr-8">
                      <p className="font-serif text-xl font-semibold italic leading-snug text-gray-900 sm:text-2xl lg:text-[1.65rem]">
                        {section.pullQuote}
                      </p>
                    </blockquote>
                  )}
                </section>
              );
            })}

            {/* Topics + Editor's note: desktop position (mobile copy sits above Latest News) */}
            <div className="hidden lg:block">
              {topicsBlock}
              {editorsNoteBlock}
            </div>
          </article>

          {/* ── Sidebar ── */}
          <aside className="min-w-0 lg:col-span-4">
            {/* "Now in The New York Times" card: top of the sidebar */}
            {hasNytCoverage(article.slug) && <NytCoverageCard variant="sidebar" />}

            {/* Timeline: sits at the top of the sidebar and scrolls with the page */}
            {article.timeline && article.timeline.length > 0 && (
              <section
                aria-label={article.timelineTitle || "Timeline"}
                className="mb-10 border border-gray-200 border-t-4 border-t-red-600 bg-gray-50 p-5 shadow-sm"
              >
                <h2 className="mb-5 flex items-center gap-3 border-b-2 border-gray-900 pb-3 text-lg font-bold uppercase tracking-widest text-gray-900">
                  <span aria-hidden="true" className="h-4 w-1.5 flex-shrink-0 bg-red-600" />
                  {article.timelineTitle || "Timeline"}
                </h2>

                <ol className="relative ml-2 border-l-2 border-gray-300">
                  {article.timeline.map((item, i) => {
                    const isLast = i === article.timeline!.length - 1;
                    return (
                      <li
                        key={i}
                        className={`relative pl-6 ${isLast ? "" : "pb-6"}`}
                      >
                        <span
                          aria-hidden="true"
                          className={`absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-white ${
                            isLast ? "bg-red-600 ring-2 ring-red-200" : "bg-gray-900"
                          }`}
                        />
                        <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-red-600">
                          {item.date}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-gray-800">
                          <InlineText text={item.text} />
                        </p>
                      </li>
                    );
                  })}
                </ol>

                {article.timelineNote && (
                  <p className="mt-5 border-t border-gray-200 pt-3 text-xs italic leading-snug text-gray-500">
                    {article.timelineNote}
                  </p>
                )}
              </section>
            )}

            {/* Mobile only: Topics + Editor's note sit right above Latest News */}
            <div className="mb-10 lg:hidden">
              {topicsBlock}
              {editorsNoteBlock}
            </div>

            {/* Latest News: normal flow first, then sticks once it reaches
                the top (top-6 keeps it just under the viewport edge, since the navbar is not sticky). Because the Timeline
                sits above it, it starts sticking only after the Timeline has
                scrolled out of view, and releases at the bottom of the sidebar. */}
            <div className="lg:sticky lg:top-6">
              <h2 className="mb-5 flex items-center gap-3 border-b-2 border-gray-900 pb-3 text-lg font-bold uppercase tracking-widest text-gray-900">
                <span aria-hidden="true" className="h-4 w-1.5 bg-red-600" />
                Latest News
              </h2>
              <ol className="space-y-5">
                {latestArticles.slice(0, 5).map((item, i) => (
                  <li key={item.slug} className="border-b border-gray-200 pb-5 last:border-b-0">
                    <Link
                      href={`/${item.category}/${item.slug}/`}
                      title={item.title}
                      className="group flex items-start gap-4"
                    >
                      <span
                        aria-hidden="true"
                        className="w-6 flex-shrink-0 font-serif text-3xl font-bold leading-none text-red-600"
                      >
                        {i + 1}
                      </span>
                      <span className="min-w-0 flex-1 text-[15px] font-bold leading-snug text-gray-900 group-hover:text-red-600">
                        <span className="line-clamp-4">{item.title}</span>
                      </span>
                      <span className="h-20 w-20 flex-shrink-0 overflow-hidden bg-gray-100">
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={80}
                          height={80}
                          className="h-full w-full object-cover"
                          style={imgPos(item.imagePosition)}
                        />
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>

        {/* ═════════════════ MORE IN CATEGORY ═════════════════ */}
        {moreArticles.length > 0 && (
          <section className="mt-14 border-t-2 border-gray-900 pt-8 sm:mt-16">
            <h2 className="mb-6 flex items-center gap-3 text-xl font-bold text-gray-900 sm:text-2xl">
              <span aria-hidden="true" className="h-5 w-1.5 bg-red-600" />
              More in {capitalize(article.category)}
            </h2>
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {moreArticles.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/${article.category}/${item.slug}/`}
                    title={item.title}
                    className="group flex h-full flex-col overflow-hidden bg-white shadow-sm transition hover:shadow-lg"
                  >
                    <div className="aspect-[3/2] w-full overflow-hidden bg-gray-100">
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
                      <h3 className="line-clamp-4 text-base font-bold leading-snug text-gray-900 group-hover:text-red-600">
                        {item.title}
                      </h3>
                    </div>
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
