import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NytCoverageCard, { hasNytCoverage } from "@/components/NytCoverageCard";
import {
  getLatestArticles,
  getArticlesByCategory,
} from "@/lib/readAlljsonfiles";

export const dynamic = "force-static";

/* ─────────────────────────────────────────────────────────────
   ARTICLE CONTENT — edit text here only.
   URL of this page = /politics/the-rise-and-fall-of-alina-habba/
   (the folder name and `slug` below must stay the same)
───────────────────────────────────────────────────────────── */
const CATEGORY = "politics";

/* straight apostrophes in the text below are shown as ’ on the page */
const fix = (s: string) => s.replace(/'/g, "’");

const page = {
  slug: "the-rise-and-fall-of-alina-habba",
  title:
    "The Rise and Fall of Alina Habba: From Trump’s Trusted Lawyer to a Career Under Pressure",
  summary:
    "Alina Habba’s rise in American politics was anything but ordinary. In just a few years, she went from working as a private attorney to becoming one of Donald Trump’s most recognisable legal allies. But the same political connections that helped bring her success also placed her under growing public and legal scrutiny.",
  author: "Chroniq Now Desk", // change to the real author name
  publishedISO: "2026-11-21", // change to the real publish date
  displayDate: "November 21, 2026",
  // Photo already on the site (also used by another Habba article).
  // To use a different one, save it in /public/images/ and change the path.
  image: "/images/alina-habba-priorities-100-million-legal-contract.webp",
  imagePosition: "45% 20%",
  imageAlt: "Alina Habba",

  sections: [
    {
      heading: "",
      paragraphs: [
        "For a while, Alina Habba appeared to be on a remarkable upward journey. She became a familiar face on television, stood beside Donald Trump during some of his most difficult legal battles and eventually secured a senior position in the federal justice system.",
        "Her rise was closely tied to one person: Donald Trump.",
        "As his attorney, Habba became known for her confidence, strong public statements and willingness to defend him through a series of high-profile controversies. Supporters saw her as a loyal and determined lawyer. Critics, however, questioned whether her public role sometimes became more political than legal.",
        "Whatever people thought of her approach, there was no denying that Habba had become an important figure in Trump's circle.",
        "But her journey would soon become more complicated. A controversial appointment, a court ruling and fresh questions about her professional relationships would put her career under pressure.",
      ],
    },
    {
      heading: "How Alina Habba became a familiar face in American politics",
      paragraphs: [
        "Before becoming a regular presence in national headlines, Habba worked in private legal practice. Her career changed significantly when she became part of Donald Trump's legal team.",
        "Representing a former president is no ordinary assignment. Trump's legal battles attracted enormous media attention, and his lawyers often found themselves answering questions from journalists as well as preparing arguments for court.",
        "Habba quickly became one of the most visible members of that team. She appeared in television interviews, defended Trump's position and spoke openly about the legal challenges facing him.",
        "Her public profile grew with every appearance. She was no longer simply a lawyer working behind the scenes. She had become a recognisable personality in American political news.",
        "For Trump's supporters, her confidence and loyalty made her an effective representative. Her critics took a different view, arguing that her public comments sometimes sounded more like political messaging than conventional legal advocacy.",
        "Still, the attention helped make Habba a prominent figure in Trump's political world. Her growing influence eventually opened the door to an even bigger opportunity.",
      ],
    },
    {
      heading: "From Trump's lawyer to a powerful federal position",
      paragraphs: [
        "When Donald Trump returned to the White House in 2025, Habba's career entered a new phase. He selected her to serve as interim U.S. attorney for the District of New Jersey.",
        "It was a significant move. The position carries considerable responsibility, including overseeing federal prosecutions and representing the United States in legal matters within the district.",
        "For Habba, it was a chance to move beyond representing Trump personally and take on a role within the federal justice system.",
        "However, the appointment quickly became controversial.",
        "Supporters welcomed the decision, viewing her as someone the president trusted. Critics questioned whether she had the experience needed for such an important prosecutorial position. New Jersey's Democratic senators, Cory Booker and Andy Kim, also opposed her nomination.",
        "The disagreement soon moved beyond politics and into the courts.",
        "At the centre of the dispute was a question about whether the administration had followed the correct legal process to keep Habba in the position after the temporary appointment period had ended.",
        "It was a serious challenge because the role of a U.S. attorney is not simply another political appointment. The position carries legal responsibilities, and the process for filling it must follow established rules.",
      ],
    },
    {
      heading: "The court ruling that changed the direction of her career",
      paragraphs: [
        "The legal dispute eventually became a major setback for Habba.",
        "In December 2025, the U.S. Court of Appeals for the Third Circuit upheld a ruling that she had been serving unlawfully as New Jersey's acting U.S. attorney.",
        "The decision put an end to her leadership of the office. On December 8, Habba announced that she was stepping down.",
        "She presented the move as a decision made to protect the stability and integrity of the office, rather than as a personal defeat. The Justice Department later said she would take on a senior advisory role under Attorney General Pam Bondi.",
        "Even so, the departure marked a dramatic change.",
        "Only months earlier, Habba had been placed in charge of an important federal legal office. Now, a court ruling had questioned the legal basis of her appointment.",
        "The episode also raised broader questions about the independence of federal law enforcement and the limits of presidential authority.",
        "For Habba, it was a reminder that political support alone cannot guarantee a position. Even a president's preferred candidate must be appointed according to the law.",
      ],
    },
    {
      heading: "More questions about her professional conduct",
      paragraphs: [
        "Leaving the New Jersey office did not bring an end to the attention surrounding Habba.",
        "In November 2026, New Jersey's Office of Attorney Ethics recommended moving forward with disciplinary proceedings over her involvement in a 2021 settlement involving Alice Bianco, a former waitress at Trump National Golf Club in Bedminster.",
        "The complaint focuses on how Bianco's allegations against a manager at the club were handled and the circumstances surrounding the settlement.",
        "According to the ethics filing, questions arose about Habba's role in the process, whether Bianco had independent legal representation and whether the settlement arrangements raised concerns about professional conduct.",
        "The filing also questioned whether Habba could properly act as an intermediary while having connections to the club.",
        "These are serious claims, but it is important to understand that an ethics complaint is not the same as a final finding of misconduct. The disciplinary process has not reached a final conclusion.",
        "Habba's lawyer has challenged the allegations and indicated that the defence intends to seek a fair resolution.",
        "The case could affect her professional reputation, but its eventual outcome will depend on the evidence and the disciplinary process.",
      ],
    },
    {
      heading: "The reported $50 million business deal",
      paragraphs: [
        "Another controversy emerged around a reported business agreement involving Concord Partners, a Florida-based company founded by the daughter of Venezuelan banker Julio Herrera Velutini.",
        "Reports in November 2026 said Habba had entered into a four-year agreement worth more than $50 million to serve as the company's general counsel.",
        "The arrangement attracted attention because Herrera Velutini had received a presidential pardon. Questions were raised about the timing of the agreement and the political connections surrounding the people involved.",
        "President Trump publicly criticised the reported deal, saying he did not want Habba to receive the money. Later reports said Concord Partners had terminated the agreement.",
        "Habba denied that she had been paid to secure a pardon or that she had worked with the White House or the Justice Department to arrange one.",
        "That distinction matters. A reported business agreement and the timing of a presidential pardon do not, on their own, prove that there was an exchange of favours.",
        "Nevertheless, the story created another difficult moment for Habba. It brought renewed attention to the relationship between politics, private business and personal influence in Washington.",
        "It also showed how quickly a professional arrangement can become politically sensitive when the people involved have connections to powerful figures.",
      ],
    },
    {
      heading: "When political loyalty becomes a professional challenge",
      paragraphs: [
        "One of the most interesting parts of Habba's story is how closely her rise was connected to her relationship with Trump.",
        "That relationship gave her opportunities, national recognition and access to influential circles. It helped turn her from a relatively little-known private attorney into a familiar name in American politics.",
        "But there was also a price.",
        "When a lawyer becomes closely identified with a political figure, their professional reputation can become tied to that person's victories, controversies and public image.",
        "Habba's experience illustrates this challenge. Her work for Trump helped her gain influence, but it also placed her at the centre of political disputes that extended far beyond ordinary legal practice.",
        "The situation became especially complicated when she moved into a federal prosecutorial role. A personal attorney's responsibility is to represent a client. A federal prosecutor, on the other hand, must serve the public and exercise independent legal judgment.",
        "Those responsibilities are not the same.",
        "The controversy surrounding her appointment showed why the distinction matters. The courts were not deciding whether Habba was loyal to Trump or whether she had defended him effectively. They were examining whether the legal requirements for holding public office had been followed.",
        "It was a reminder that political connections cannot replace the rules and responsibilities attached to public service.",
      ],
    },
    {
      heading: "What does the future hold for Alina Habba?",
      paragraphs: [
        "Habba's next chapter remains uncertain.",
        "She has built much of her public identity around her work with Trump, and she has continued to be associated with his political circle. But the questions surrounding her former federal position, the ethics proceedings and the reported Concord Partners agreement have created challenges that may take time to resolve.",
        "It would be too early to say that her career is over. The ethics matter has not produced a final disciplinary decision, and Habba has denied wrongdoing in connection with the pardon-related allegations.",
        "At the same time, the controversies have made it harder to separate her professional career from the political environment in which she rose to prominence.",
        "Her future will depend partly on how these matters develop and whether she can rebuild public confidence in her professional standing.",
      ],
    },
    {
      heading: "A rise built on influence, a fall marked by scrutiny",
      paragraphs: [
        "Alina Habba's journey has been extraordinary. She moved from private legal practice to the national spotlight, became one of Donald Trump's most visible legal allies and eventually stepped into a powerful federal position.",
        "But her rapid rise was followed by a series of difficult setbacks. A court ruling ended her time as New Jersey's acting U.S. attorney, while later ethics proceedings and questions about a reported business contract brought further scrutiny.",
        "Her story is not a simple tale of success followed by failure. It is a reminder of how closely law and politics can become connected, and how difficult it can be to maintain a professional reputation when both worlds overlap.",
        "For Habba, political loyalty opened doors that might otherwise have remained closed. But her experience also shows that influence has limits. Courts, legal procedures and professional standards continue to matter, regardless of how close someone may be to the people in power.",
        "Whether she manages to move beyond these controversies remains to be seen. For now, her career stands as an example of how quickly a person can rise through political influence — and how quickly that position can come under pressure when legal and professional questions emerge.",
      ],
    },
  ],
};
/* ───────────────────────── end of editable block ───────────────────────── */


/* ═════════════════════════════════════════════════════════════════════════════
   PAGE LAYOUT — copy of the site's Feature layout, kept inside this one file.
   Differences from src/components/FeatureStoryPage.tsx: long headlines no longer
   overlap the breadcrumb, the chapter number sits on the same line as its
   heading, and the reading-progress bar is left out (it needs a client component).
═════════════════════════════════════════════════════════════════════════════ */

interface FeatureTimelineItem {
  /** Shown in red above the entry, e.g. "February 26, 2026" */
  date: string;
  text: string;
}

interface FeatureSection {
  /** Optional heading. Headed sections are numbered 01, 02, 03 … */
  heading?: string;
  content?: string[];
  /** Large highlighted statement shown after the section's paragraphs. */
  pullQuote?: string;
  /** Small attribution line under the pull quote. */
  pullQuoteCite?: string;
}

interface FeatureArticleData {
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
  /** Topic tags shown as oval pills after the article body. */
  topics?: string[];
}

interface FeatureSidebarArticle {
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

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────────────────────── */

function ArticleLayout({
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
      {/* ══════════════════════════ HERO ══════════════════════════ */}
      <section className="relative bg-black text-white">
        {/* photo: its own block on small screens, full background from lg */}
        <div className="relative h-[46vh] min-h-[280px] w-full overflow-hidden sm:h-[56vh] lg:absolute lg:inset-0 lg:h-auto">
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
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10 lg:via-black/30" />
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/70 to-transparent" />
        </div>

        {/* breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="absolute inset-x-0 top-0 z-10 px-4 pt-4 text-xs font-bold text-gray-300 sm:px-8 sm:pt-6 sm:text-sm md:px-20"
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

        {/* headline: under the photo on small screens, over it from lg.
            It sits in normal flow, so a long title grows the hero instead of
            overlapping the breadcrumb. */}
        <div className="relative z-10 -mt-24 px-4 pb-8 sm:-mt-28 sm:px-8 sm:pb-10 lg:mt-0 lg:flex lg:min-h-[80vh] lg:items-end lg:px-20 lg:pb-14 lg:pt-24">
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

            <h1 className="mt-4 font-serif text-[2rem] font-bold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl">
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
                    <span className="mr-3 inline-block align-baseline font-sans text-xl font-bold text-red-600">
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

          {/* Topics – oval tag pills */}
          {article.topics && article.topics.length > 0 && (
            <section
              aria-label="Topics"
              className="mt-10 border border-gray-200 bg-gray-50 p-5 sm:p-6"
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

          {/* "Now in The New York Times" card, just before the Editor's note */}
          {hasNytCoverage(article.slug) && <NytCoverageCard />}

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


/* ═══════════════════════════ PAGE ═══════════════════════════ */

const SITE = "https://www.chroniqnow.com";
const PAGE_URL = `${SITE}/${CATEGORY}/${page.slug}/`;

export const metadata: Metadata = {
  title: page.title,
  description: page.summary,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: page.title,
    description: page.summary,
    url: PAGE_URL,
    type: "article",
    publishedTime: page.publishedISO,
    images: [`${SITE}${page.image}`],
  },
  twitter: {
    card: "summary_large_image",
    title: page.title,
    description: page.summary,
  },
};

function toTime(value: string) {
  const t = new Date(value.replace(/(\d+)(st|nd|rd|th)/, "$1")).getTime();
  return isNaN(t) ? 0 : t;
}

export default function RiseAndFallOfAlinaHabbaPage() {
  /* Same data the other article pages pass to the Feature layout */
  const latestArticles = getLatestArticles(10).filter(
    (item) => item.slug !== page.slug
  );
  const moreArticles = getArticlesByCategory(CATEGORY)
    .filter((item) => item.slug !== page.slug)
    .sort((a, b) => toTime(b.date) - toTime(a.date))
    .slice(0, 4);

  const article: FeatureArticleData = {
    category: CATEGORY,
    slug: page.slug,
    title: page.title,
    shortdescription: page.summary,
    dek: page.summary,
    image: page.image,
    imagePosition: page.imagePosition,
    author: page.author,
    date: page.displayDate,
    articleType: "feature",
    sections: page.sections.map((s) => ({
      heading: s.heading ? fix(s.heading) : undefined,
      content: s.paragraphs.map(fix),
    })),
  };

  const newsArticleJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "@id": `${PAGE_URL}#article`,
    headline: page.title,
    description: page.summary,
    url: PAGE_URL,
    inLanguage: "en-US",
    image: {
      "@type": "ImageObject",
      url: `${SITE}${page.image}`,
      width: 1200,
      height: 630,
    },
    datePublished: page.publishedISO,
    dateModified: page.publishedISO,
    author: { "@type": "Person", name: page.author, url: `${SITE}/our-team` },
    publisher: {
      "@type": "Organization",
      "@id": `${SITE}/#organization`,
      name: "Chroniq Now",
      url: SITE,
      logo: {
        "@type": "ImageObject",
        url: `${SITE}/images/chroniq-now-logo.webp`,
        width: 512,
        height: 512,
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${PAGE_URL}#webpage` },
    articleSection: "Politics",
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Politics", item: `${SITE}/${CATEGORY}/` },
      { "@type": "ListItem", position: 3, name: page.title, item: PAGE_URL },
    ],
  };

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

      <Navbar />
      <ArticleLayout
        article={article}
        displayDate={page.displayDate}
        publishedISO={page.publishedISO}
        latestArticles={latestArticles}
        moreArticles={moreArticles}
      />
      <Footer />
    </>
  );
}