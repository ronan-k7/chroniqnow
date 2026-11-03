"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type FormEvent,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FiSearch, FiX } from "react-icons/fi";
import {
  articleHref,
  categoryLabel,
  highlight,
  searchIndex,
  tokenize,
  useSearchIndex,
} from "@/lib/search";

/** Start suggesting once this many letters/digits have been typed */
const MIN_CHARS = 2;
/** Suggestions shown in the dropdown (the full list lives on /search) */
const MAX_SUGGESTIONS = 6;

/* ─────────────────────────────────────────────────────────────────────────────
   Highlighted text (also used by the /search results page)
───────────────────────────────────────────────────────────────────────────── */

export function Highlight({ text, tokens }: { text: string; tokens: string[] }) {
  return (
    <>
      {highlight(text, tokens).map((seg, i) =>
        seg.hit ? (
          <mark key={i} className="rounded-sm bg-yellow-100 text-inherit">
            {seg.text}
          </mark>
        ) : (
          <span key={i}>{seg.text}</span>
        )
      )}
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Header search box
   - desktop: compact box, suggestions open in a dropdown under it
   - mobile : compact box in the header; tapping it expands the box across the
              whole header (with a close button) and the dropdown fills the width
───────────────────────────────────────────────────────────────────────────── */

export default function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const uid = useId();
  const listId = `${uid}-list`;

  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const viaKeyboard = useRef(false);

  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false); // expanded (mobile) + dropdown visible
  const [active, setActive] = useState(-1);
  const [wantIndex, setWantIndex] = useState(false);

  const { index, status } = useSearchIndex(wantIndex);

  const trimmed = query.trim();
  const tokens = useMemo(() => tokenize(trimmed), [trimmed]);
  const enough = tokens.join("").length >= MIN_CHARS;

  const hits = useMemo(
    () => (index && enough ? searchIndex(index, trimmed) : []),
    [index, enough, trimmed]
  );
  const suggestions = hits.slice(0, MAX_SUGGESTIONS);
  // keyboard-selectable rows: the suggestions + the "see all results" row
  const optionCount = suggestions.length > 0 ? suggestions.length + 1 : 0;

  const showPanel = open && enough;
  const searchUrl = `/search/?q=${encodeURIComponent(trimmed)}`;

  const closeAll = useCallback(() => {
    setOpen(false);
    setActive(-1);
    inputRef.current?.blur();
  }, []);

  /* Close on route change; keep the typed text when we're on the results page */
  useEffect(() => {
    setOpen(false);
    setActive(-1);
    if (pathname.startsWith("/search")) {
      setQuery(new URLSearchParams(window.location.search).get("q") ?? "");
    } else {
      setQuery("");
    }
  }, [pathname]);

  /* Close when clicking/tapping or tabbing outside the search box */
  useEffect(() => {
    if (!open) return;
    const outside = (e: Event) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
        setActive(-1);
      }
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("focusin", outside);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("focusin", outside);
    };
  }, [open]);

  /* Keep the keyboard-selected row visible */
  useEffect(() => {
    if (active < 0 || !viaKeyboard.current) return;
    viaKeyboard.current = false;
    document.getElementById(`${uid}-opt-${active}`)?.scrollIntoView({ block: "nearest" });
  }, [active, uid]);

  const goToResults = () => {
    if (!trimmed) return;
    closeAll();
    router.push(searchUrl);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const chosen = active >= 0 && active < suggestions.length ? suggestions[active] : null;
    if (chosen) {
      closeAll();
      router.push(articleHref(chosen.doc));
    } else {
      goToResults();
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      if (open) {
        e.preventDefault();
        closeAll();
      }
      return;
    }
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    if (!enough) return;
    e.preventDefault();
    if (!open) {
      setOpen(true);
      return;
    }
    if (optionCount === 0) return;
    viaKeyboard.current = true;
    setActive((cur) =>
      e.key === "ArrowDown"
        ? (cur + 1) % optionCount
        : cur <= 0
          ? optionCount - 1
          : cur - 1
    );
  };

  return (
    <div ref={rootRef} className="md:relative">
      <form
        role="search"
        onSubmit={onSubmit}
        className={
          open
            ? "absolute inset-0 z-20 flex items-center gap-1 bg-white px-2 md:relative md:inset-auto md:z-auto md:block md:w-64 md:bg-transparent md:p-0"
            : "relative w-32 md:w-64"
        }
      >
        <div className="relative flex-1 md:flex-none">
          {/* text-base on mobile (16px) stops iOS Safari from zooming the page on focus */}
          <input
            ref={inputRef}
            type="text"
            name="q"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(-1);
              setOpen(true);
            }}
            onFocus={() => {
              setWantIndex(true);
              setOpen(true);
            }}
            onClick={() => setOpen(true)}
            onKeyDown={onKeyDown}
            placeholder="Search"
            aria-label="Search articles"
            role="combobox"
            aria-expanded={showPanel && suggestions.length > 0}
            aria-controls={showPanel && suggestions.length > 0 ? listId : undefined}
            aria-autocomplete="list"
            aria-activedescendant={active >= 0 ? `${uid}-opt-${active}` : undefined}
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            enterKeyHint="search"
            className="w-full rounded bg-gray-100 px-3 py-1 pr-10 text-base text-gray-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-red-300 md:py-1.5 md:text-sm"
          />
          <button
            type="submit"
            aria-label="Search"
            className="absolute bottom-0 right-0 top-0 flex items-center justify-center rounded-r bg-red-600 px-3"
          >
            <FiSearch className="text-sm text-white" />
          </button>
        </div>

        {open && (
          <button
            type="button"
            aria-label="Close search"
            onClick={() => {
              setQuery("");
              closeAll();
            }}
            className="flex h-9 w-9 shrink-0 items-center justify-center text-gray-700 md:hidden"
          >
            <FiX className="text-xl" />
          </button>
        )}

        {/* ── dropdown ─────────────────────────────────────────────────── */}
        {showPanel && (
          <div
            // keep focus in the input while clicking inside the dropdown
            onMouseDown={(e) => e.preventDefault()}
            className="absolute left-0 right-0 top-full z-30 max-h-[50vh] overflow-y-auto overscroll-contain border-t border-red-100 bg-white text-left shadow-xl md:left-auto md:right-0 md:mt-1 md:max-h-[70vh] md:w-[28rem] md:rounded md:border"
          >
            {suggestions.length > 0 ? (
              <ul id={listId} role="listbox" aria-label="Search suggestions">
                {suggestions.map((hit, i) => (
                  <li
                    key={`${hit.doc.category}/${hit.doc.slug}`}
                    id={`${uid}-opt-${i}`}
                    role="option"
                    aria-selected={active === i}
                  >
                    <Link
                      href={articleHref(hit.doc)}
                      prefetch={false}
                      onClick={closeAll}
                      onMouseEnter={() => setActive(i)}
                      className={`flex items-center gap-3 px-3 py-2.5 ${
                        active === i ? "bg-red-50" : ""
                      }`}
                    >
                      {hit.doc.image && (
                        <Image
                          src={hit.doc.image}
                          alt=""
                          width={64}
                          height={48}
                          // an article whose image file is missing shouldn't show a broken icon
                          onError={(e) => (e.currentTarget.style.display = "none")}
                          className="hidden h-12 w-16 shrink-0 rounded object-cover sm:block"
                        />
                      )}
                      <span className="min-w-0 flex-1">
                        <span className="block text-[11px] font-semibold uppercase tracking-wide text-red-600">
                          {categoryLabel(hit.doc.category)}
                          <span className="font-normal normal-case text-gray-400">
                            {hit.doc.date ? ` · ${hit.doc.date}` : ""}
                          </span>
                        </span>
                        <span className="line-clamp-2 block text-sm font-medium leading-snug text-gray-900">
                          <Highlight text={hit.doc.title} tokens={tokens} />
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
                <li
                  id={`${uid}-opt-${suggestions.length}`}
                  role="option"
                  aria-selected={active === suggestions.length}
                >
                  <Link
                    href={searchUrl}
                    prefetch={false}
                    onClick={closeAll}
                    onMouseEnter={() => setActive(suggestions.length)}
                    className={`block border-t border-red-100 px-3 py-3 text-center text-sm font-semibold text-red-700 ${
                      active === suggestions.length ? "bg-red-50" : ""
                    }`}
                  >
                    {hits.length > suggestions.length
                      ? `See all ${hits.length} results`
                      : "View all results"}
                  </Link>
                </li>
              </ul>
            ) : (
              <p className="px-4 py-5 text-sm text-gray-600" role="status">
                {status === "error"
                  ? "Search is unavailable right now. Please try again."
                  : status !== "ready"
                    ? "Searching…"
                    : (
                      <>
                        No articles found for{" "}
                        <span className="font-semibold text-gray-900">“{trimmed}”</span>.
                        Try a different word or fewer words.
                      </>
                    )}
              </p>
            )}
          </div>
        )}

        <p className="sr-only" role="status" aria-live="polite">
          {showPanel && status === "ready"
            ? hits.length === 0
              ? "No results"
              : `${hits.length} result${hits.length === 1 ? "" : "s"} available`
            : ""}
        </p>
      </form>
    </div>
  );
}
