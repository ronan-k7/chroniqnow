"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

/* ─────────────────────────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────────────────────────── */

export interface GlanceItem {
  label: string;
  value: string;
}

export interface ArticleSection {
  heading?: string;
  content?: string[];
  list?: string[];
  afterList?: string[];
  afterTable?: string[];
  table?: {
    headers: string[];
    rows: string[][];
  };
}

export interface EvidenceTable {
  headers: string[];
  rows: string[][];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface InternalLink {
  text: string;
  url: string;
}

export interface LongFormArticleData {
  category: string;
  title: string;
  shortdescription: string;
  slug: string;
  date?: string;
  author?: string;
  image: string;
  articleType: "longform";
  seoTitle?: string;
  dek?: string;
  glance?: GlanceItem[];
  sections?: ArticleSection[];
  evidenceTable?: EvidenceTable;
  documentsNeeded?: string[];
  faq?: FAQ[];
  internalLinks?: InternalLink[];
}

export interface SidebarArticle {
  slug: string;
  category: string;
  title: string;
  image: string;
}

interface Props {
  article: LongFormArticleData;
  displayDate: string;
  publishedISO: string;
  latestArticles: SidebarArticle[];
  moreArticles: SidebarArticle[];
}

/* ─────────────────────────────────────────────────────────────────────────────
   INLINE MARKDOWN — converts **bold** markers to <strong>
───────────────────────────────────────────────────────────────────────────── */

function InlineText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i} className="font-semibold text-gray-900">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   STATUS BADGE — for evidence table
───────────────────────────────────────────────────────────────────────────── */

function StatusBadge({ status }: { status: string }) {
  let color = "bg-gray-100 text-gray-700";
  if (status.includes("✓")) color = "bg-green-50 text-green-700 border border-green-200";
  else if (status.includes("✗")) color = "bg-red-50 text-red-700 border border-red-200";
  else if (status.includes("⚠")) color = "bg-amber-50 text-amber-700 border border-amber-200";
  else if (status.includes("?")) color = "bg-blue-50 text-blue-700 border border-blue-200";
  else color = "bg-slate-50 text-slate-600 border border-slate-200";

  return (
    <span className={`inline-block text-xs font-medium px-2 py-1 rounded ${color} whitespace-nowrap`}>
      {status}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   SECTION RENDERER
───────────────────────────────────────────────────────────────────────────── */

function ArticleSectionBlock({ section }: { section: ArticleSection }) {
  return (
    <div className="mb-10">
      {section.heading && (
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 border-l-4 border-red-600 pl-4 leading-snug">
          {section.heading}
        </h2>
      )}

      {section.content?.map((para, i) => (
        <p key={i} className="text-base leading-relaxed mb-4 text-gray-700">
          <InlineText text={para} />
        </p>
      ))}

      {section.table && (
        <div className="my-6 overflow-x-auto rounded border border-gray-200 shadow-sm">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-900 text-white">
                {section.table.headers.map((h, i) => (
                  <th
                    key={i}
                    className="px-4 py-3 text-left font-semibold tracking-wide text-xs uppercase"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.table.rows.map((row, ri) => (
                <tr key={ri} className={ri % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className={`px-4 py-3 text-gray-700 border-t border-gray-100 leading-snug ${
                        cell.startsWith("**") ? "font-semibold text-gray-900" : ""
                      }`}
                    >
                      <InlineText text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {section.afterTable?.map((para, i) => (
        <p key={i} className="text-base leading-relaxed mb-4 text-gray-700">
          <InlineText text={para} />
        </p>
      ))}

      {section.list && section.list.length > 0 && (
        <ul className="my-4 space-y-2 pl-2">
          {section.list.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-gray-700">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
              <span className="text-base leading-relaxed">
                <InlineText text={item} />
              </span>
            </li>
          ))}
        </ul>
      )}

      {section.afterList?.map((para, i) => (
        <p key={i} className="text-base leading-relaxed mb-4 text-gray-700 mt-4">
          <InlineText text={para} />
        </p>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   FAQ ACCORDION
───────────────────────────────────────────────────────────────────────────── */

function FAQSection({ faq }: { faq: FAQ[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="mt-12 mb-10">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 border-l-4 border-red-600 pl-4">
        Frequently Asked Questions
      </h2>
      <div className="divide-y divide-gray-200 border border-gray-200 rounded overflow-hidden">
        {faq.map((item, i) => (
          <div key={i}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left bg-white hover:bg-gray-50 transition-colors"
            >
              <span className="font-semibold text-gray-900 text-sm sm:text-base pr-4">
                {item.question}
              </span>
              <span
                className={`flex-shrink-0 w-5 h-5 rounded-full border-2 border-red-500 flex items-center justify-center transition-transform ${
                  open === i ? "rotate-45" : ""
                }`}
              >
                <svg
                  className="w-2.5 h-2.5 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </span>
            </button>
            {open === i && (
              <div className="px-5 pb-5 bg-gray-50 border-t border-gray-100">
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base pt-3">
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   EVIDENCE TABLE
───────────────────────────────────────────────────────────────────────────── */

function EvidenceTableBlock({ table }: { table: EvidenceTable }) {
  return (
    <div className="mb-10">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 border-l-4 border-red-600 pl-4">
        Evidence Status
      </h2>
      <div className="overflow-x-auto rounded border border-gray-200 shadow-sm">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-900 text-white">
              {table.headers.map((h, i) => (
                <th
                  key={i}
                  className="px-4 py-3 text-left font-semibold tracking-wide text-xs uppercase"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, ri) => (
              <tr key={ri} className={ri % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="px-4 py-3 text-gray-800 border-t border-gray-100 leading-snug font-medium">
                  {row[0]}
                </td>
                <td className="px-4 py-3 border-t border-gray-100">
                  <StatusBadge status={row[1]} />
                </td>
                <td className="px-4 py-3 text-gray-600 border-t border-gray-100 leading-snug text-xs">
                  {row[2]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   DOCUMENTS NEEDED
───────────────────────────────────────────────────────────────────────────── */

function DocumentsNeeded({ docs }: { docs: string[] }) {
  return (
    <div className="mb-10 bg-slate-50 border border-slate-200 rounded p-6">
      <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
        <svg
          className="w-4 h-4 text-red-600 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        Documents That Matter
      </h3>
      <ul className="space-y-2">
        {docs.map((doc, i) => (
          <li key={i} className="flex items-start gap-2.5 text-gray-600 text-sm">
            <span className="mt-1 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
            {doc}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   INTERNAL LINKS
───────────────────────────────────────────────────────────────────────────── */

function RelatedTopics({ links }: { links: InternalLink[] }) {
  return (
    <div className="mb-10">
      <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-widest">
        Related Coverage
      </h3>
      <ul className="space-y-2">
        {links.map((link, i) => (
          <li key={i}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 hover:underline text-sm font-medium"
            >
              {'→'} {link.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}


/* ─────────────────────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────────────────────── */

export default function LongFormArticlePage({
  article,
  displayDate,
  publishedISO,
  latestArticles,
  moreArticles,
}: Props) {
  const capitalize = (text: string) =>
    text.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <main className="w-full p-2 sm:p-20 py-8">
      {/* ── Breadcrumb + Byline ─────────────────────────────────────────── */}
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
                title={`${article.category} news`}
                href={`/${article.category}/`}
                className="text-red-600 hover:underline"
              >
                {article.category.replace(/-/g, " ").toUpperCase()}
              </Link>
            </li>
            <li aria-hidden="true" className="mx-1">»</li>
            <li className="text-gray-900 line-clamp-1">{article.title}</li>
          </ol>
        </nav>

        <div className="flex flex-wrap items-center gap-3">
          <Link title="go to author page" href="/our-team">
            <span className="font-medium text-sm text-gray-600">{article.author}</span>
          </Link>
          {displayDate && (
            <time dateTime={publishedISO} className="text-sm text-gray-400">
              {displayDate}
            </time>
          )}
          {/* Longform tag */}
          <span className="text-xs font-bold uppercase tracking-widest bg-red-600 text-white px-2 py-0.5 rounded">
            Investigation
          </span>
        </div>
      </div>

      {/* ── Two-column layout ───────────────────────────────────────────── */}
      <div className="flex flex-col lg:flex-row w-full">
        {/* ── Article body ─────────────────────────────────────────────── */}
        <article className="w-full lg:w-2/3 lg:pr-10 mb-12 lg:mb-0">
          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-bold mb-5 leading-tight text-gray-900">
            {article.title}
          </h1>

          {/* Hero image */}
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

          {/* Dek / lead */}
          {article.dek && (
            <p className="text-lg leading-relaxed mb-8 font-bold text-gray-800 border-l-4 border-red-600 pl-4 py-1">
              {article.dek}
            </p>
          )}

          {/* ── At a Glance box ──────────────────────────────────────────── */}
          {article.glance && article.glance.length > 0 && (
            <div className="mb-10 border border-gray-200 rounded overflow-hidden shadow-sm">
              <div className="bg-gray-900 px-5 py-3">
                <span className="text-white font-bold text-sm uppercase tracking-widest">
                  At a Glance
                </span>
              </div>
              <dl className="divide-y divide-gray-100">
                {article.glance.map((item, i) => (
                  <div key={i} className="flex flex-col sm:flex-row px-5 py-3 gap-1 sm:gap-4">
                    <dt className="text-xs font-bold uppercase tracking-widest text-red-600 sm:w-40 flex-shrink-0 pt-0.5">
                      {item.label}
                    </dt>
                    <dd className="text-sm text-gray-700 leading-relaxed">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {/* ── Article sections ─────────────────────────────────────────── */}
          {article.sections?.map((section, i) => (
            <ArticleSectionBlock key={i} section={section} />
          ))}

          {/* ── Evidence table ───────────────────────────────────────────── */}
          {article.evidenceTable && (
            <EvidenceTableBlock table={article.evidenceTable} />
          )}

          {/* ── Documents needed ─────────────────────────────────────────── */}
          {article.documentsNeeded && article.documentsNeeded.length > 0 && (
            <DocumentsNeeded docs={article.documentsNeeded} />
          )}

          {/* ── Related topics ───────────────────────────────────────────── */}
          {article.internalLinks && article.internalLinks.length > 0 && (
            <RelatedTopics links={article.internalLinks} />
          )}

          {/* ── FAQ ──────────────────────────────────────────────────────── */}
          {article.faq && article.faq.length > 0 && (
            <FAQSection faq={article.faq} />
          )}
        </article>

        {/* ── Sidebar ──────────────────────────────────────────────────── */}
        <aside className="w-full lg:w-1/3 sticky top-24 self-start">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">Latest News</h2>
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
                  <span className="text-sm font-bold leading-snug">{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      {/* ── More articles ────────────────────────────────────────────────── */}
      {moreArticles.length > 0 && (
        <section className="mt-12 w-full pb-3">
          <h2 className="text-2xl font-semibold mb-6">
            More in {capitalize(article.category)}
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {moreArticles.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/${article.category}/${item.slug}/`}
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
                    <h3 className="text-lg font-bold leading-snug">{item.title}</h3>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}