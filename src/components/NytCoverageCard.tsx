import Image from "next/image";

/* ─────────────────────────────────────────────────────────────────────────────
   "NOW IN THE NEW YORK TIMES" CARD
   Used on the Alina Habba story pages. The whole card is one link that opens
   the NYT article in a new tab.

   variant="sidebar" → card for the right-hand sidebar (SpotlightArticlePage)
   variant="compact" → compact strip placed in the reading column just before
                       the Editor's note (FeatureStoryPage)

   Screenshot: /public/images/nytimes-alina-habba-mildon-loses-50-million-contract.webp
───────────────────────────────────────────────────────────────────────────── */

const NYT = {
  url: "https://www.nytimes.com/2026/11/10/us/politics/alina-habba-fired-pardon.html",
  image: "/images/nytimes-alina-habba-mildon-loses-50-million-contract.webp",
  imageAlt:
    "Screenshot of The New York Times article “Alina Habba Mildon Loses $50 Million Contract That Enraged Trump”, published Nov. 10, 2026",
  headline: "Alina Habba Mildon Loses $50 Million Contract That Enraged Trump",
  quote:
    "The former Trump lawyer had signed the contract with a family company weeks before the president gave the family’s patriarch a pardon.",
  byline: "By Tyler Pager",
  date: "Nov. 10, 2026",
};

/** Slugs of the stories that carry the card (the two Alina Habba pages). */
export const NYT_COVERAGE_SLUGS = [
  "alina-habba-priorities-100-million-legal-empire-new-husband-accountability-questions",
  "vanity-of-alina-habba-mildon-herrera-velutini-banking-dynasty",
];

export function hasNytCoverage(slug?: string) {
  return !!slug && NYT_COVERAGE_SLUGS.includes(slug);
}

const ArrowIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="14"
    height="14"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
  >
    <path d="M7 17L17 7M9 7h8v8" />
  </svg>
);

export default function NytCoverageCard({
  variant = "compact",
}: {
  variant?: "sidebar" | "compact";
}) {
  if (variant === "sidebar") {
    return (
      <section aria-label="Also reported by The New York Times" className="mb-10">
        <a
          href={NYT.url}
          target="_blank"
          rel="noopener noreferrer"
          title="Read the full article on nytimes.com"
          className="group block overflow-hidden border border-gray-200 border-t-4 border-t-red-600 bg-gray-950 text-white shadow-sm transition hover:shadow-xl"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-white">
            <Image
              src={NYT.image}
              alt={NYT.imageAlt}
              width={1000}
              height={1329}
              className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </div>

          <div className="px-5 pb-5 pt-5">
            <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-red-500">
              <span aria-hidden="true" className="h-3 w-1.5 bg-red-600" />
              Now in The New York Times
            </p>
            <h2 className="mt-3 font-serif text-xl font-bold leading-snug text-white group-hover:text-red-300">
              {NYT.headline}
            </h2>

            <figure className="mt-4 border-l-4 border-red-600 pl-4">
              <blockquote className="font-serif text-[15px] italic leading-relaxed text-gray-200">
                “{NYT.quote}”
              </blockquote>
              <figcaption className="mt-2 text-[10px] font-bold uppercase tracking-[0.16em] text-gray-400">
                The New York Times · {NYT.byline} · {NYT.date}
              </figcaption>
            </figure>

            <span className="mt-5 inline-flex items-center gap-1.5 border-t border-white/15 pt-4 text-xs font-bold uppercase tracking-wide text-red-400 group-hover:text-red-300">
              Read the full article on nytimes.com
              <ArrowIcon />
              <span className="sr-only">(opens in a new tab)</span>
            </span>
          </div>
        </a>
      </section>
    );
  }

  /* ── compact (centered column, before the Editor's note) ── */
  return (
    <section aria-label="Also reported by The New York Times" className="my-8">
      <a
        href={NYT.url}
        target="_blank"
        rel="noopener noreferrer"
        title="Read the full article on nytimes.com"
        className="group flex flex-col overflow-hidden border-t-4 border-red-600 bg-gray-950 text-white shadow-sm transition hover:shadow-lg sm:flex-row"
      >
        {/* phones: full-width screenshot on top so its text stays readable;
            from sm: narrow thumbnail on the left */}
        <div className="relative aspect-[4/3] w-full flex-shrink-0 overflow-hidden bg-white sm:aspect-auto sm:w-36">
          <Image
            src={NYT.image}
            alt={NYT.imageAlt}
            width={1000}
            height={1329}
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04] sm:absolute sm:inset-0"
          />
        </div>

        <div className="min-w-0 flex-1 px-4 py-4 sm:px-5">
          <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-red-500">
            <span aria-hidden="true" className="h-3 w-1.5 flex-shrink-0 bg-red-600" />
            Now in The New York Times
          </p>
          <h2 className="mt-2 font-serif text-base font-bold leading-snug text-white group-hover:text-red-300 sm:text-lg">
            {NYT.headline}
          </h2>
          <blockquote className="mt-2 border-l-2 border-red-600 pl-3 font-serif text-[13px] italic leading-relaxed text-gray-300 sm:text-sm">
            “{NYT.quote}”
          </blockquote>
          <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400">
            {NYT.byline} · {NYT.date}
          </p>
          <span className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-red-400 group-hover:text-red-300">
            Read on nytimes.com
            <ArrowIcon />
            <span className="sr-only">(opens in a new tab)</span>
          </span>
        </div>
      </a>
    </section>
  );
}
