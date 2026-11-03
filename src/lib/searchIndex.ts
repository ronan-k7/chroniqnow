import { getAllArticles } from "@/lib/readAlljsonfiles";
import type { SearchDoc } from "@/lib/search";

/**
 * How much of each article body goes into the search index.
 * Titles, descriptions, keywords and author are always fully indexed; this only
 * limits the "match inside the article text" part so the file stays small
 * (it is downloaded by the browser the first time someone uses the search box).
 * Raise it to search deeper into articles, lower it for a smaller download.
 */
const BODY_CHARS = 2000;

/** Loose shape – articles have extra optional fields (sections, keywords…) */
interface RawArticle {
  category?: string;
  slug?: string;
  title?: string;
  shortdescription?: string;
  description?: string;
  author?: string;
  date?: string;
  image?: string;
  seoTitle?: string;
  primaryKeyword?: string;
  secondaryKeywords?: string[] | string;
  dek?: string;
  kicker?: string;
  sections?: { heading?: string; content?: string[] | string }[];
}

function toPlainText(input: string): string {
  return input
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1") // [text](url) → text
    .replace(/[*_#>`]+/g, " ") // markdown symbols
    .replace(/\s+/g, " ")
    .trim();
}

function bodyText(a: RawArticle): string {
  const parts: string[] = [];
  if (a.description) parts.push(a.description);
  for (const s of a.sections ?? []) {
    if (s.heading) parts.push(s.heading);
    if (Array.isArray(s.content)) parts.push(...s.content.filter((c) => typeof c === "string"));
    else if (typeof s.content === "string") parts.push(s.content);
  }
  return toPlainText(parts.join(" ")).slice(0, BODY_CHARS);
}

function keywordText(a: RawArticle): string {
  const secondary = Array.isArray(a.secondaryKeywords)
    ? a.secondaryKeywords.join(" ")
    : a.secondaryKeywords ?? "";
  return [a.seoTitle, a.primaryKeyword, secondary, a.dek, a.kicker]
    .filter(Boolean)
    .join(" ");
}

function parseTimestamp(date: string | undefined): number {
  if (!date) return 0;
  const t = new Date(date.replace(/(\d+)(st|nd|rd|th)/, "$1")).getTime();
  return Number.isNaN(t) ? 0 : t;
}

/** Builds the list written to /search-index.json at build time. */
export function buildSearchIndex(): SearchDoc[] {
  return (getAllArticles() as RawArticle[])
    .filter(
      (a) =>
        typeof a.slug === "string" &&
        a.slug.trim() !== "" &&
        typeof a.category === "string" &&
        a.category.trim() !== "" &&
        typeof a.title === "string"
    )
    .map((a) => ({
      category: a.category as string,
      slug: a.slug as string,
      title: a.title as string,
      description: toPlainText(a.shortdescription ?? ""),
      author: a.author ?? "",
      date: a.date ?? "",
      timestamp: parseTimestamp(a.date),
      image: a.image ?? "",
      keywords: toPlainText(keywordText(a)),
      body: bodyText(a),
    }))
    .sort((x, y) => y.timestamp - x.timestamp);
}
