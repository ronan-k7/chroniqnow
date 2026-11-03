/**
 * Client-side search for Chroniq Now.
 *
 * The site is a static export (`output: "export"`), so there is no server to
 * query. At build time `/search-index.json` is generated from src/data/*.json
 * (see src/app/search-index.json/route.ts). The browser downloads it the first
 * time someone focuses the search box and every query is answered locally.
 *
 * This file is browser-safe (no `fs`). It contains:
 *   - the index/document types
 *   - text normalisation + ranking
 *   - highlight + snippet helpers
 *   - the `useSearchIndex` hook (lazy-loads and caches the index)
 */

import { useEffect, useState } from "react";

/* ─────────────────────────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────────────────────────── */

/** One article as stored in /search-index.json */
export interface SearchDoc {
  category: string;
  slug: string;
  title: string;
  description: string;
  author: string;
  /** Display date exactly as written in the data files, e.g. "17th September 2026" */
  date: string;
  /** Parsed date in ms (0 when the date can't be parsed) – used to break ties */
  timestamp: number;
  image: string;
  /** SEO title + primary/secondary keywords, joined */
  keywords: string;
  /** First part of the article body (plain text) */
  body: string;
}

interface PreparedDoc {
  doc: SearchDoc;
  title: string;
  keywords: string;
  description: string;
  meta: string; // author + category
  body: string;
}

export type PreparedIndex = PreparedDoc[];

export interface SearchHit {
  doc: SearchDoc;
  score: number;
}

/* ─────────────────────────────────────────────────────────────────────────────
   NORMALISATION
───────────────────────────────────────────────────────────────────────────── */

// Built from strings so older TS targets don't complain about unicode regexes.
const NON_ALNUM = new RegExp("[^\\p{L}\\p{N}]+", "gu");
const COMBINING_MARKS = /[̀-ͯ]/g;

/**
 * Lower-case, strip accents + apostrophes, turn every other symbol into a
 * space:   "Wendy’s Franchisee — U.S. Bankruptcy"  →  "wendys franchisee us bankruptcy"
 */
export function normalize(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(COMBINING_MARKS, "")
    .replace(/['’‘`]/g, "") // wendy's → wendys
    .replace(/\b([a-z])\.(?=[a-z]\b)/g, "$1") // u.s. → us
    .replace(NON_ALNUM, " ")
    .trim();
}

export function tokenize(query: string): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const t of normalize(query).split(" ")) {
    if (t && !seen.has(t)) {
      seen.add(t);
      out.push(t);
    }
  }
  return out;
}

/** "vaccines" should also find "vaccine" */
function variantsOf(token: string): string[] {
  return token.length > 3 && token.endsWith("s")
    ? [token, token.slice(0, -1)]
    : [token];
}

export function prepareIndex(docs: SearchDoc[]): PreparedIndex {
  return docs.map((doc) => ({
    doc,
    title: normalize(doc.title),
    keywords: normalize(doc.keywords),
    description: normalize(doc.description),
    meta: normalize(`${doc.author} ${doc.category}`),
    body: normalize(doc.body),
  }));
}

/* ─────────────────────────────────────────────────────────────────────────────
   RANKING
───────────────────────────────────────────────────────────────────────────── */

/** word-prefix match → strong, plain substring (4+ chars only) → weak */
function fieldScore(
  field: string,
  variants: string[],
  prefixWeight: number,
  substringWeight: number
): number {
  if (!field) return 0;
  const padded = ` ${field}`;
  let best = 0;
  for (const v of variants) {
    if (padded.includes(` ${v}`)) return prefixWeight;
    if (v.length >= 4 && field.includes(v)) best = substringWeight;
  }
  return best;
}

function tokenScore(p: PreparedDoc, token: string): number {
  const variants = variantsOf(token);

  const title = fieldScore(p.title, variants, 10, 5);
  const keywords = fieldScore(p.keywords, variants, 6, 3);
  const meta = fieldScore(p.meta, variants, 5, 2);
  const description = fieldScore(p.description, variants, 3, 1);
  const body = fieldScore(p.body, variants, 1.5, 0.5);

  const all = [title, keywords, meta, description, body];
  const best = Math.max(...all);
  if (best === 0) return 0;

  // small bonus for every extra field that also matches, and for whole-word
  // matches in the title (so "ai" ranks "AI" above "airline")
  const extra = all.filter((s) => s > 0).length - 1;
  const wholeWord = variants.some((v) => ` ${p.title} `.includes(` ${v} `))
    ? 2
    : 0;
  return best + extra * 0.5 + wholeWord;
}

/**
 * Every word the user typed must match somewhere in the article (AND search),
 * so results narrow as more words are typed. Best matches first; newer
 * articles win ties.
 */
export function searchIndex(index: PreparedIndex, query: string): SearchHit[] {
  const tokens = tokenize(query);
  if (tokens.length === 0) return [];
  const phrase = tokens.join(" ");

  const hits: SearchHit[] = [];
  for (const p of index) {
    let score = 0;
    let ok = true;
    for (const token of tokens) {
      const s = tokenScore(p, token);
      if (s === 0) {
        ok = false;
        break;
      }
      score += s;
    }
    if (!ok) continue;

    if (tokens.length > 1) {
      if (p.title.includes(phrase)) score += 20;
      else if (p.description.includes(phrase)) score += 8;
    }
    hits.push({ doc: p.doc, score });
  }

  return hits.sort(
    (a, b) => b.score - a.score || b.doc.timestamp - a.doc.timestamp
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   HIGHLIGHT + SNIPPET
───────────────────────────────────────────────────────────────────────────── */

export interface Segment {
  text: string;
  hit: boolean;
}

const WORD = new RegExp("[\\p{L}\\p{N}'’]+", "gu");

/**
 * Split `text` into plain / highlighted segments for the matched words.
 * Matching mirrors the ranking rules (word prefix, or substring for 4+ chars).
 */
export function highlight(text: string, tokens: string[]): Segment[] {
  if (!text || tokens.length === 0) return [{ text, hit: false }];

  const variants = Array.from(new Set(tokens.flatMap(variantsOf))).sort(
    (a, b) => b.length - a.length
  );

  const segments: Segment[] = [];
  let cursor = 0;
  WORD.lastIndex = 0;
  let m: RegExpExecArray | null;

  while ((m = WORD.exec(text)) !== null) {
    const word = m[0];
    const norm = normalize(word);
    if (!norm) continue;

    let start = -1;
    let len = 0;
    for (const v of variants) {
      if (norm.startsWith(v)) {
        start = 0;
        len = v.length;
        break;
      }
      if (v.length >= 4) {
        const i = norm.indexOf(v);
        if (i > 0) {
          start = i;
          len = v.length;
          break;
        }
      }
    }
    if (start < 0) continue;

    // map positions in the normalised word back to the original word
    // (apostrophes / accents change the length slightly)
    const kept: number[] = [];
    for (let i = 0; i < word.length; i++) {
      const n = normalize(word[i]);
      for (let j = 0; j < n.length; j++) kept.push(i);
    }
    const from = m.index + (kept[start] ?? 0);
    const to = m.index + (kept[start + len - 1] ?? word.length - 1) + 1;
    if (from < cursor) continue;

    if (from > cursor) segments.push({ text: text.slice(cursor, from), hit: false });
    segments.push({ text: text.slice(from, to), hit: true });
    cursor = to;
  }

  if (cursor < text.length) segments.push({ text: text.slice(cursor), hit: false });
  return segments.length ? segments : [{ text, hit: false }];
}

/**
 * Text to show under a result: the short description when it matches the
 * query, otherwise a ~170 character excerpt of the body around the first
 * match.
 */
export function makeSnippet(doc: SearchDoc, tokens: string[]): string {
  const variants = tokens.flatMap(variantsOf);
  const descNorm = normalize(doc.description);
  const descMatches = variants.some((v) => ` ${descNorm}`.includes(` ${v}`));
  if (descMatches || !doc.body) return doc.description;

  const body = doc.body;
  const lower = body.toLowerCase();
  let at = -1;
  for (const v of variants) {
    const i = lower.indexOf(v);
    if (i !== -1 && (at === -1 || i < at)) at = i;
  }
  if (at === -1) return doc.description;

  const start = Math.max(0, at - 60);
  const end = Math.min(body.length, at + 110);
  const cut = body.slice(start, end).trim();
  return `${start > 0 ? "…" : ""}${cut}${end < body.length ? "…" : ""}`;
}

/* ─────────────────────────────────────────────────────────────────────────────
   LOADING (shared by the header search box and the /search page)
───────────────────────────────────────────────────────────────────────────── */

const INDEX_URL = "/search-index.json";
let indexPromise: Promise<PreparedIndex> | null = null;

export function loadSearchIndex(): Promise<PreparedIndex> {
  if (!indexPromise) {
    indexPromise = fetch(INDEX_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`Search index request failed: ${res.status}`);
        return res.json() as Promise<SearchDoc[]>;
      })
      .then(prepareIndex)
      .catch((err) => {
        indexPromise = null; // let the next focus retry
        throw err;
      });
  }
  return indexPromise;
}

export type IndexStatus = "idle" | "loading" | "ready" | "error";

/** Starts downloading the index the first time `enabled` becomes true. */
export function useSearchIndex(enabled: boolean): {
  index: PreparedIndex | null;
  status: IndexStatus;
} {
  const [index, setIndex] = useState<PreparedIndex | null>(null);
  const [status, setStatus] = useState<IndexStatus>("idle");

  useEffect(() => {
    if (!enabled || index) return;
    let cancelled = false;
    setStatus("loading");
    loadSearchIndex()
      .then((prepared) => {
        if (cancelled) return;
        setIndex(prepared);
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, [enabled, index]);

  return { index, status };
}

/** "puerto-rico" → "Puerto Rico" */
export function categoryLabel(category: string): string {
  return category.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Same URL shape the rest of the site uses (trailingSlash: true) */
export function articleHref(doc: Pick<SearchDoc, "category" | "slug">): string {
  return `/${doc.category}/${doc.slug}/`;
}
