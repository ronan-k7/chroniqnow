"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  articleHref,
  categoryLabel,
  makeSnippet,
  searchIndex,
  tokenize,
  useSearchIndex,
} from "@/lib/search";
import { Highlight } from "./SearchBar";

const PAGE_SIZE = 12;

const CATEGORIES = [
  "business",
  "health",
  "politics",
  "science",
  "sports",
  "technology",
  "puerto-rico",
];

function CategoryLinks() {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {CATEGORIES.map((c) => (
        <Link
          key={c}
          href={`/${c}/`}
          className="rounded-full border border-red-200 px-3 py-1 text-sm font-medium text-red-700 hover:bg-red-50"
        >
          {categoryLabel(c)}
        </Link>
      ))}
    </div>
  );
}

export default function SearchResults() {
  const params = useSearchParams();

  // The static export pre-renders this page without a query string, so the
  // first client render must match that. Read the real query only after mount
  // (otherwise React logs a hydration mismatch for /search/?q=...).
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const q = mounted ? (params.get("q") ?? "").trim() : "";
  const tokens = useMemo(() => tokenize(q), [q]);

  const { index, status } = useSearchIndex(true);
  const hits = useMemo(
    () => (index && tokens.length ? searchIndex(index, q) : []),
    [index, tokens.length, q]
  );

  const [visible, setVisible] = useState(PAGE_SIZE);
  useEffect(() => setVisible(PAGE_SIZE), [q]);

  return (
    <>
      <header className="mb-6 border-l-4 border-red-600 pl-4 sm:mb-8">
        <h1 className="text-2xl font-bold uppercase text-gray-900 sm:text-4xl">
          Search
        </h1>
        {q && status === "ready" && (
          <p className="mt-1 text-sm text-gray-600 sm:text-base" role="status">
            {hits.length === 0
              ? "No results"
              : `${hits.length} result${hits.length === 1 ? "" : "s"}`}{" "}
            for <span className="font-semibold text-gray-900">“{q}”</span>
          </p>
        )}
      </header>

      {!mounted ? (
        <p className="text-gray-600">Loading…</p>
      ) : !q ? (
        <div className="max-w-2xl text-gray-700">
          <p>Type a word or phrase in the search box above to find articles.</p>
          <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
            Or browse a section
          </p>
          <CategoryLinks />
        </div>
      ) : status === "error" ? (
        <p className="text-gray-700">
          Search is unavailable right now. Please refresh the page and try again.
        </p>
      ) : status !== "ready" ? (
        <p className="text-gray-600" role="status">
          Searching…
        </p>
      ) : hits.length === 0 ? (
        <div className="max-w-2xl text-gray-700">
          <p>
            We couldn’t find any articles matching{" "}
            <span className="font-semibold">“{q}”</span>. Check the spelling, try
            fewer or more general words, or browse a section:
          </p>
          <CategoryLinks />
        </div>
      ) : (
        <>
          <ol className="divide-y divide-gray-200">
            {hits.slice(0, visible).map(({ doc }) => (
              <li key={`${doc.category}/${doc.slug}`}>
                <Link
                  href={articleHref(doc)}
                  title={doc.title}
                  className="group flex gap-4 py-5 sm:gap-6"
                >
                  {doc.image && (
                    <div className="aspect-video w-28 shrink-0 self-start overflow-hidden sm:w-56">
                      <Image
                        src={doc.image}
                        alt={doc.title}
                        width={448}
                        height={252}
                        onError={(e) => {
                          // missing image file → drop the empty box instead of a broken icon
                          const box = e.currentTarget.parentElement;
                          if (box) box.style.display = "none";
                        }}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold uppercase tracking-wide text-red-600">
                      {categoryLabel(doc.category)}
                    </p>
                    <h2 className="mt-1 text-base font-bold leading-snug text-gray-900 transition group-hover:text-red-600 sm:text-xl">
                      <Highlight text={doc.title} tokens={tokens} />
                    </h2>
                    <p className="mt-2 line-clamp-3 hidden text-sm leading-relaxed text-gray-700 sm:block">
                      <Highlight text={makeSnippet(doc, tokens)} tokens={tokens} />
                    </p>
                    <p className="mt-2 text-xs text-gray-500">
                      {doc.author}
                      {doc.author && doc.date ? " · " : ""}
                      {doc.date}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ol>

          {visible < hits.length && (
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setVisible((v) => v + PAGE_SIZE)}
                className="rounded bg-red-600 px-6 py-2 text-sm font-semibold text-white hover:bg-red-700"
              >
                Show more results
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}
