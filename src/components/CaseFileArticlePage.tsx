import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

/* ─────────────────────────────────────────────────────────────────────────────
   CASE FILE ARTICLE PAGE
   A fifth detail-page design (next to "standard", "longform", "spotlight" and
   "feature"). Used when an article's JSON has  "articleType": "casefile".

   Built for legal / document-driven explainers: the page is organised around
   the primary documents the story rests on.

   The route file ( src/app/[category]/[detail]/page.tsx ) renders <Navbar />
   and <Footer /> around this component, so only the page body lives here.

   Layout
   ├─ Header          : breadcrumb, serif headline, dek, byline + dateline,
   │                    photo with a cut corner (stacked on mobile, 7/5 from lg)
   ├─ Warrant pair    : two "document cards" side by side with a gap marker
   │                    between them (stacked on mobile) + a shared-language note
   ├─ Reading column  : serif body copy, [^n] source markers, headed sections,
   │                    INLINE person boxes (floated into the text, so the
   │                    paragraph wraps around them), "scope" panel, docket path
   │                    (8/12 on lg, full width below)
   ├─ Sidebar         : "In this article" jump list + sticky "Latest news"
   ├─ Sources         : numbered list; every [^n] marker jumps here
   └─ More in category: 3:2 cards (1 / 2 / 4 columns)

   Person boxes
   ├─ Declared once in  article.people  (key → name, role, optional image)
   ├─ Placed in a section with  section.people: [{ person, paragraph, side }]
   │  → the box is rendered right before paragraph number `paragraph` (0-based)
   └─ No  image  yet → a friendly silhouette placeholder is shown. Set
      people.<key>.image to "/images/your-file.webp" to replace it.

   Inline text syntax (paragraphs, timeline text, notes)
   ├─ **bold**   *italic*   [link text](https://… or /internal/path/)
   └─ [^1]       citation marker → jumps to sources[0] (numbering = array order)
───────────────────────────────────────────────────────────────────────────── */

/* ─────────────────────────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────────────────────────── */

export interface CaseFilePerson {
  name: string;
  /** Short descriptor shown under the name, e.g. "Former FBI agent" */
  role: string;
  /** Leave empty ("") to show the placeholder silhouette. */
  image?: string;
  /** CSS object-position for the photo, e.g. "50% 20%". */
  imagePosition?: string;
}

export interface CaseFilePersonPlacement {
  /** Key inside article.people */
  person: string;
  /** 0-based index of the paragraph the box sits in front of. */
  paragraph: number;
  side?: "left" | "right";
}

export interface CaseFileSource {
  publisher: string;
  title: string;
  url: string;
  date?: string;
  note?: string;
}

export interface CaseFileWarrant {
  /** e.g. "First warrant" */
  label: string;
  /** e.g. "January 15, 2026" */
  date: string;
  rows: { label: string; value: string }[];
  /** 1-based number of the entry in article.sources that backs this card. */
  source: number;
  /** Visual tone of the card header. */
  tone?: "navy" | "red";
}

export interface CaseFileScope {
  title: string;
  coversTitle?: string;
  covers: string[];
  doesNotCoverTitle?: string;
  doesNotCover: string[];
  note?: string;
}

export interface CaseFileTimelineItem {
  date: string;
  text: string;
}

export interface CaseFileSection {
  heading?: string;
  content?: string[];
  people?: CaseFilePersonPlacement[];
  scope?: CaseFileScope;
  timelineTitle?: string;
  timeline?: CaseFileTimelineItem[];
}

export interface CaseFileArticleData {
  category: string;
  title: string;
  shortdescription: string;
  slug: string;
  date?: string;
  author?: string;
  image: string;
  imagePosition?: string;
  articleType: "casefile";
  seoTitle?: string;
  dek?: string;
  /** e.g. "Washington, D.C. | January 22, 2026" */
  dateline?: string;
  imageCaption?: string;
  warrantsTitle?: string;
  warrantsIntro?: string;
  warrants?: CaseFileWarrant[];
  /** Text on the connector between the two cards, e.g. "5 days later" */
  warrantsGap?: string;
  /** Strip under the cards describing what both documents share. */
  warrantsNote?: string;
  people?: Record<string, CaseFilePerson>;
  sections?: CaseFileSection[];
  sources?: CaseFileSource[];
  related?: { text: string; url: string }[];
  topics?: string[];
}

export interface CaseFileSidebarArticle {
  slug: string;
  category: string;
  title: string;
  image: string;
  imagePosition?: string;
}

interface Props {
  article: CaseFileArticleData;
  displayDate: string;
  publishedISO: string;
  latestArticles: CaseFileSidebarArticle[];
  moreArticles: CaseFileSidebarArticle[];
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

const imgPos = (pos?: string) => (pos ? { objectPosition: pos } : undefined);

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600";

const linkCls = `font-medium text-slate-900 underline decoration-red-600/60 decoration-2 underline-offset-[3px] hover:decoration-red-600 ${focusRing}`;

function ExternalIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M11 3h6v6" />
      <path d="M17 3 9 11" />
      <path d="M15 12v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4" />
    </svg>
  );
}

/**
 * Inline text: **bold**, *italic*, [text](url) and [^n] source markers.
 */
function InlineText({
  text,
  sources,
}: {
  text: string;
  sources: CaseFileSource[];
}) {
  const parts = text.split(
    /(\*\*[^*]+\*\*|\[\^\d+\]|\[[^\]]+\]\([^)]+\)|\*[^*]+\*)/g
  );

  return (
    <>
      {parts.map((part, i) => {
        if (!part) return null;

        if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
          return (
            <strong key={i} className="font-bold text-slate-900">
              {part.slice(2, -2)}
            </strong>
          );
        }

        const cite = part.match(/^\[\^(\d+)\]$/);
        if (cite) {
          const n = Number(cite[1]);
          const src = sources[n - 1];
          if (!src) return null;
          return (
            <sup key={i} className="ml-[1px] font-sans text-[0.68em] font-bold">
              <a
                href={`#source-${n}`}
                title={`Source ${n}: ${src.publisher}`}
                aria-label={`Source ${n}: ${src.publisher}`}
                className={`px-[1px] text-red-700 no-underline hover:underline ${focusRing}`}
              >
                [{n}]
              </a>
            </sup>
          );
        }

        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (link) {
          const href = link[2];
          if (href.startsWith("/")) {
            return (
              <Link key={i} href={href} className={linkCls}>
                {link[1]}
              </Link>
            );
          }
          return (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={linkCls}
            >
              {link[1]}
            </a>
          );
        }

        if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
          return <em key={i}>{part.slice(1, -1)}</em>;
        }

        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   PERSON BOX  (floats INSIDE the text; the paragraph wraps around it)
───────────────────────────────────────────────────────────────────────────── */

function PersonPlaceholder({ name }: { name: string }) {
  return (
    <svg
      viewBox="0 0 80 100"
      role="img"
      aria-label={`Photo placeholder for ${name}`}
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
    >
      <rect width="80" height="100" fill="#E2E8F0" />
      <path
        d="M6 100c0-25 15-38 34-38s34 13 34 38z"
        fill="#CBD5E1"
      />
      <circle cx="40" cy="36" r="15" fill="#94A3B8" />
    </svg>
  );
}

function PersonBox({
  person,
  side,
}: {
  person: CaseFilePerson;
  side: "left" | "right";
}) {
  const floatCls =
    side === "left"
      ? "float-left mr-4 sm:mr-5"
      : "float-right ml-4 sm:ml-5";

  return (
    <figure
      className={`${floatCls} mb-2 mt-1 w-[6.75rem] font-sans sm:w-36 md:w-40`}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-slate-100 ring-1 ring-slate-300">
        {person.image ? (
          <Image
            src={person.image}
            alt={person.name}
            fill
            sizes="(min-width: 768px) 160px, (min-width: 640px) 144px, 108px"
            className="object-cover"
            style={imgPos(person.imagePosition)}
          />
        ) : (
          <PersonPlaceholder name={person.name} />
        )}
      </div>
      <figcaption className="mt-1.5 text-[13px] leading-snug text-slate-900">
        <span className="block font-semibold">{person.name}</span>
        <span className="block text-xs text-slate-500">{person.role}</span>
      </figcaption>
    </figure>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   WARRANT PAIR
───────────────────────────────────────────────────────────────────────────── */

function WarrantCard({
  warrant,
  source,
}: {
  warrant: CaseFileWarrant;
  source?: CaseFileSource;
}) {
  const band =
    warrant.tone === "red" ? "bg-red-700 text-white" : "bg-slate-900 text-white";

  return (
    <article className="flex min-w-0 flex-col border border-slate-300 bg-white shadow-sm">
      <div className={`px-4 py-4 sm:px-5 ${band}`}>
        <p className="text-sm font-medium text-white/80">{warrant.label}</p>
        <p className="mt-0.5 font-serif text-2xl font-bold leading-tight sm:text-3xl">
          {warrant.date}
        </p>
      </div>

      <dl className="divide-y divide-slate-200 text-sm">
        {warrant.rows.map((row) => (
          <div
            key={row.label}
            className="grid grid-cols-[5.5rem_1fr] gap-3 px-4 py-3 sm:grid-cols-[6.5rem_1fr] sm:px-5"
          >
            <dt className="text-slate-500">{row.label}</dt>
            <dd className="min-w-0 break-words font-medium text-slate-900">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>

      {source && (
        <div className="mt-auto border-t border-slate-200 px-4 py-3 sm:px-5">
          <a
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 text-sm font-semibold text-red-700 hover:underline ${focusRing}`}
          >
            Open the warrant on justice.gov
            <ExternalIcon />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      )}
    </article>
  );
}

function GapMarker({ label }: { label: string }) {
  return (
    <>
      {/* mobile: short rail between the stacked cards */}
      <div
        className="flex items-center gap-3 py-2 pl-6 md:hidden"
        aria-hidden="true"
      >
        <span className="h-7 w-px bg-slate-400" />
        <span className="rounded-full border border-slate-400 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
          {label}
        </span>
      </div>
      {/* md+: vertical rail between the side-by-side cards */}
      <div
        className="hidden flex-col items-center px-3 md:flex"
        aria-hidden="true"
      >
        <span className="w-px flex-1 bg-slate-400" />
        <span className="my-2 whitespace-nowrap rounded-full border border-slate-400 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
          {label}
        </span>
        <span className="w-px flex-1 bg-slate-400" />
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   SCOPE PANEL  ("what it covers / what it does not reach")
───────────────────────────────────────────────────────────────────────────── */

function ScopePanel({
  scope,
  sources,
}: {
  scope: CaseFileScope;
  sources: CaseFileSource[];
}) {
  return (
    <section
      aria-label={scope.title}
      className="clear-both my-8 border border-slate-300 bg-slate-50 font-sans"
    >
      <h3 className="border-b border-slate-300 bg-white px-4 py-3 font-serif text-lg font-bold text-slate-900 sm:px-6">
        {scope.title}
      </h3>
      <div className="grid sm:grid-cols-2 sm:divide-x sm:divide-slate-300">
        <div className="p-4 sm:p-6">
          <p className="text-sm font-bold text-slate-900">
            {scope.coversTitle ?? "What it covers"}
          </p>
          <ul className="mt-3 space-y-2.5 text-[15px] leading-snug text-slate-800">
            {scope.covers.map((item) => (
              <li key={item} className="flex gap-2.5">
                <svg
                  viewBox="0 0 20 20"
                  className="mt-0.5 h-4 w-4 shrink-0 text-slate-900"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m4 10.5 4 4 8-9" />
                </svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="border-t border-slate-300 p-4 sm:border-t-0 sm:p-6">
          <p className="text-sm font-bold text-slate-900">
            {scope.doesNotCoverTitle ?? "What it does not reach"}
          </p>
          <ul className="mt-3 space-y-2.5 text-[15px] leading-snug text-slate-800">
            {scope.doesNotCover.map((item) => (
              <li key={item} className="flex gap-2.5">
                <svg
                  viewBox="0 0 20 20"
                  className="mt-0.5 h-4 w-4 shrink-0 text-red-700"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="m5 5 10 10M15 5 5 15" />
                </svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {scope.note && (
        <p className="border-t border-slate-300 bg-white px-4 py-3 text-sm leading-relaxed text-slate-700 sm:px-6">
          <InlineText text={scope.note} sources={sources} />
        </p>
      )}
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   DOCKET PATH  (a real sequence → vertical timeline)
───────────────────────────────────────────────────────────────────────────── */

function DocketPath({
  title,
  items,
  sources,
}: {
  title: string;
  items: CaseFileTimelineItem[];
  sources: CaseFileSource[];
}) {
  return (
    <section aria-label={title} className="clear-both mt-10 font-sans">
      <h3 className="font-serif text-xl font-bold text-slate-900 sm:text-2xl">
        {title}
      </h3>
      <ol className="mt-5 ml-2 border-l-2 border-slate-300">
        {items.map((item, i) => (
          <li key={`${item.date}-${i}`} className="relative pb-7 pl-6 last:pb-0">
            <span
              aria-hidden="true"
              className="absolute -left-[9px] top-1 h-4 w-4 rounded-full border-[3px] border-white bg-red-700 ring-1 ring-red-700"
            />
            <p className="text-sm font-bold text-red-700">{item.date}</p>
            <p className="mt-1 text-[15px] leading-relaxed text-slate-800 sm:text-base">
              <InlineText text={item.text} sources={sources} />
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────────────────────── */

export default function CaseFileArticlePage({
  article,
  displayDate,
  publishedISO,
  latestArticles,
  moreArticles,
}: Props) {
  const categoryLabel = article.category.replace(/-/g, " ").toUpperCase();
  const sources = article.sources ?? [];
  const sections = article.sections ?? [];
  const people = article.people ?? {};
  const warrants = article.warrants ?? [];

  const jumpLinks = sections
    .filter((s) => s.heading)
    .map((s) => ({ id: slugify(s.heading as string), label: s.heading as string }));
  if (sources.length > 0) {
    jumpLinks.push({ id: "sources", label: "Sources and documents" });
  }

  const publishedLabel = displayDate || "";

  return (
    <main className="w-full bg-white text-slate-900">
      {/* ══════════════════════════ HEADER ══════════════════════════ */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 pb-8 pt-5 sm:px-8 sm:pb-12 sm:pt-8 md:px-20">
          <nav
            aria-label="Breadcrumb"
            className="text-xs font-bold text-slate-500 sm:text-sm"
          >
            <ol className="flex flex-wrap items-center gap-x-1 gap-y-1">
              <li>
                <Link
                  title="Home"
                  href="/"
                  className="text-red-600 hover:underline"
                >
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
                  className="text-red-600 hover:underline"
                >
                  {categoryLabel}
                </Link>
              </li>
              <li aria-hidden="true" className="mx-1">
                »
              </li>
              <li className="w-full truncate text-slate-700 sm:w-auto sm:max-w-md">
                {article.title}
              </li>
            </ol>
          </nav>

          <div className="mt-6 grid items-start gap-8 sm:mt-8 lg:grid-cols-12 lg:gap-12">
            {/* ── Text ── */}
            <div className="min-w-0 lg:col-span-7">
              <h1 className="font-serif text-[1.9rem] font-bold leading-[1.15] tracking-tight text-slate-900 sm:text-4xl xl:text-[2.75rem]">
                {article.title}
              </h1>

              {article.dek && (
                <p className="mt-5 max-w-2xl font-serif text-lg leading-relaxed text-slate-700 sm:text-xl">
                  {article.dek}
                </p>
              )}

              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-600">
                {article.author && (
                  <Link
                    title="go to author page"
                    href="/our-team"
                    className="font-semibold text-slate-900 hover:underline"
                  >
                    By {article.author}
                  </Link>
                )}
                {article.dateline && (
                  <span className="border-slate-300 sm:border-l sm:pl-5">
                    {article.dateline}
                  </span>
                )}
                {sources.length > 0 && (
                  <a
                    href="#sources"
                    className={`border-slate-300 font-medium text-red-700 hover:underline sm:border-l sm:pl-5 ${focusRing}`}
                  >
                    {sources.length} sources cited
                  </a>
                )}
              </div>
              {publishedLabel && (
                <time dateTime={publishedISO} className="sr-only">
                  {publishedLabel}
                </time>
              )}
            </div>

            {/* ── Image (cut corner reads like a filed document) ── */}
            <figure className="min-w-0 lg:col-span-5">
              <div
                className="relative aspect-[4/3] w-full overflow-hidden bg-slate-200"
                style={{
                  clipPath:
                    "polygon(0 0, calc(100% - 32px) 0, 100% 32px, 100% 100%, 0 100%)",
                }}
              >
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                  style={imgPos(article.imagePosition)}
                />
              </div>
              {article.imageCaption && (
                <figcaption className="mt-3 text-xs leading-snug text-slate-500">
                  {article.imageCaption}
                </figcaption>
              )}
            </figure>
          </div>
        </div>
      </header>

      {/* ══════════════════════ WARRANT PAIR ══════════════════════ */}
      {warrants.length === 2 && (
        <section
          aria-labelledby="warrants-heading"
          className="border-b border-slate-200 bg-slate-100"
        >
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8 sm:py-12 md:px-20">
            <h2
              id="warrants-heading"
              className="font-serif text-xl font-bold text-slate-900 sm:text-2xl"
            >
              {article.warrantsTitle ?? "The two documents"}
            </h2>
            {article.warrantsIntro && (
              <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
                {article.warrantsIntro}
              </p>
            )}

            <div className="mt-6 grid md:grid-cols-[1fr_auto_1fr]">
              <WarrantCard
                warrant={warrants[0]}
                source={sources[warrants[0].source - 1]}
              />
              <GapMarker label={article.warrantsGap ?? ""} />
              <WarrantCard
                warrant={warrants[1]}
                source={sources[warrants[1].source - 1]}
              />
            </div>

            {article.warrantsNote && (
              <p className="mt-5 flex items-start gap-3 border border-slate-300 bg-white px-4 py-3 text-sm leading-relaxed text-slate-700">
                <svg
                  viewBox="0 0 20 20"
                  className="mt-0.5 h-4 w-4 shrink-0 text-slate-900"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m4 10.5 4 4 8-9" />
                </svg>
                <span>{article.warrantsNote}</span>
              </p>
            )}
          </div>
        </section>
      )}

      {/* ══════════════════════ BODY + SIDEBAR ══════════════════════ */}
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-8 sm:py-14 md:px-20 lg:grid-cols-12 lg:gap-14">
        {/* ── Reading column ── */}
        <article className="min-w-0 flow-root lg:col-span-8">
          {sections.map((section, si) => {
            const paragraphs = section.content ?? [];
            const placements = section.people ?? [];
            const headingId = section.heading ? slugify(section.heading) : undefined;

            const blocks: ReactNode[] = [];
            paragraphs.forEach((text, pi) => {
              placements
                .filter((p) => p.paragraph === pi && people[p.person])
                .forEach((p) => {
                  blocks.push(
                    <PersonBox
                      key={`person-${si}-${pi}-${p.person}`}
                      person={people[p.person]}
                      side={p.side ?? "right"}
                    />
                  );
                });
              blocks.push(
                <p
                  key={`p-${si}-${pi}`}
                  className="mb-5 font-serif text-[1.0625rem] leading-[1.8] text-slate-800 sm:text-[1.1875rem]"
                >
                  <InlineText text={text} sources={sources} />
                </p>
              );
            });

            return (
              <section key={`s-${si}`} aria-labelledby={headingId}>
                {section.heading && (
                  <h2
                    id={headingId}
                    className={`clear-both scroll-mt-6 font-serif text-2xl font-bold leading-snug text-slate-900 sm:text-[1.75rem] ${
                      si === 0 ? "" : "mt-12"
                    } mb-4`}
                  >
                    {section.heading}
                  </h2>
                )}
                {blocks}
                {section.scope && (
                  <ScopePanel scope={section.scope} sources={sources} />
                )}
                {section.timeline && section.timeline.length > 0 && (
                  <DocketPath
                    title={section.timelineTitle ?? "Timeline"}
                    items={section.timeline}
                    sources={sources}
                  />
                )}
              </section>
            );
          })}

          {/* Topics */}
          {article.topics && article.topics.length > 0 && (
            <section aria-label="Topics" className="clear-both mt-12 font-sans">
              <div className="flex flex-wrap gap-2">
                {article.topics.map((topic) => (
                  <span
                    key={topic}
                    className="inline-flex items-center rounded-full border border-slate-300 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 sm:text-sm"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Sources */}
          {sources.length > 0 && (
            <section
              id="sources"
              aria-labelledby="sources-heading"
              className="clear-both mt-12 scroll-mt-6 border-t-2 border-slate-900 pt-6 font-sans"
            >
              <h2
                id="sources-heading"
                className="font-serif text-2xl font-bold text-slate-900 sm:text-[1.75rem]"
              >
                Sources and documents
              </h2>
              <ol className="mt-5 space-y-4">
                {sources.map((src, i) => (
                  <li
                    key={src.url}
                    id={`source-${i + 1}`}
                    className="flex scroll-mt-6 gap-3 sm:gap-4"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white"
                    >
                      {i + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-900">
                        {src.publisher}
                        {src.date ? (
                          <span className="font-normal text-slate-500">
                            {" "}
                            ({src.date})
                          </span>
                        ) : null}
                      </p>
                      <a
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`mt-0.5 inline-flex items-start gap-1.5 text-[15px] leading-snug text-red-700 hover:underline sm:text-base ${focusRing}`}
                      >
                        <span className="min-w-0 break-words">{src.title}</span>
                        <ExternalIcon className="mt-1 h-3.5 w-3.5 shrink-0" />
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                      {src.note && (
                        <p className="mt-1 text-sm leading-snug text-slate-600">
                          {src.note}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ol>

              {article.related && article.related.length > 0 && (
                <div className="mt-8 border-t border-slate-200 pt-5">
                  <h3 className="text-sm font-bold text-slate-900">
                    Related coverage
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {article.related.map((r) => (
                      <li key={r.url}>
                        <Link
                          href={r.url}
                          className={`text-[15px] leading-snug text-slate-900 underline decoration-slate-300 underline-offset-[3px] hover:decoration-red-600 ${focusRing}`}
                        >
                          {r.text}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          )}
        </article>

        {/* ── Sidebar ── */}
        <aside className="min-w-0 lg:col-span-4">
          {jumpLinks.length > 1 && (
            <nav
              aria-label="In this article"
              className="mb-8 hidden border-l-2 border-slate-900 pl-4 lg:block"
            >
              <p className="text-sm font-bold text-slate-900">In this article</p>
              <ul className="mt-3 space-y-2">
                {jumpLinks.map((j) => (
                  <li key={j.id}>
                    <a
                      href={`#${j.id}`}
                      className={`text-sm leading-snug text-slate-600 hover:text-red-700 hover:underline ${focusRing}`}
                    >
                      {j.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          <div className="lg:sticky lg:top-6">
            <h2 className="border-b-2 border-slate-900 pb-2 text-xl font-bold text-slate-900">
              Latest News
            </h2>
            <ul className="mt-4 space-y-4">
              {latestArticles.slice(0, 5).map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/${item.category}/${item.slug}/`}
                    className="group flex items-center gap-3"
                  >
                    <div className="h-16 w-16 shrink-0 overflow-hidden bg-slate-200 sm:h-20 sm:w-20">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={80}
                        height={80}
                        className="h-full w-full object-cover"
                        style={imgPos(item.imagePosition)}
                      />
                    </div>
                    <span className="text-sm font-bold leading-snug text-slate-900 group-hover:text-red-700">
                      {item.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      {/* ══════════════════════ MORE IN CATEGORY ══════════════════════ */}
      {moreArticles.length > 0 && (
        <section className="border-t border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-8 sm:py-14 md:px-20">
            <h2 className="mb-6 font-serif text-2xl font-bold text-slate-900">
              More in {capitalize(article.category)}
            </h2>
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {moreArticles.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/${item.category}/${item.slug}/`}
                    className="group block h-full bg-white shadow-sm"
                  >
                    <div className="aspect-[3/2] w-full overflow-hidden bg-slate-200">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={400}
                        height={267}
                        className="h-full w-full object-cover"
                        style={imgPos(item.imagePosition)}
                      />
                    </div>
                    <h3 className="p-4 text-base font-bold leading-snug text-slate-900 group-hover:text-red-700">
                      {item.title}
                    </h3>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </main>
  );
}
