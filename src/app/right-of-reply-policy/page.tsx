import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Right of Reply – Chroniq Now",
  description:
    "Chroniq Now’s right of reply policy: How we offer relevant individuals and organisations a fair opportunity to respond before and after publication.",
  alternates: { canonical: "https://www.chroniqnow.com/right-of-reply-policy" },
  openGraph: {
    title: "Right of Reply",
    description:
      "How we offer relevant individuals and organisations a fair opportunity to respond before and after publication.",
    url: "https://www.chroniqnow.com/right-of-reply-policy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Right of Reply",
    description:
      "How we offer relevant individuals and organisations a fair opportunity to respond before and after publication.",
  },
};

export default function RightOfReplyPage() {
  return (
    <>
      <Script
        id="right-of-reply-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          url: "https://www.chroniqnow.com/right-of-reply-policy",
          name: "Right of Reply – Chroniq Now",
          description:
            "Chroniq Now’s right of reply policy: How we offer relevant individuals and organisations a fair opportunity to respond before and after publication.",
          publisher: { "@id": "https://www.chroniqnow.com/#newsorg" },
        })}
      </Script>
      <div className="bg-white min-h-screen overflow-x-hidden">
        <Navbar />
        <header className="px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8 sm:pb-12">
          <div className="mx-auto w-full max-w-6xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs sm:text-[13px] font-medium text-neutral-700">
              Policy
            </span>
            <h1 className="mt-4 text-balance text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
              Right of Reply Policy
            </h1>
            <p className="mt-4 max-w-3xl text-pretty text-neutral-700 text-base sm:text-lg md:text-[1.15rem] leading-relaxed">
              Chroniq Now offers relevant individuals and organisations a reasonable chance to respond when criticism, allegations, or substantially disputed factual context are central to a reported story.
            </p>
          </div>
        </header>

        <main className="px-4 sm:px-6 lg:px-8 pb-24">
          <article className="mx-auto w-full max-w-6xl">
            <section className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">When We Seek a Response</h2>
                <p className="mt-4 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-neutral-800">
                  If a story includes criticism, allegations, serious factual disagreement, or materially harmful claims about a person or institution, Chroniq Now intends to request a response before publication when reasonably possible and when doing so does not interfere with necessary reporting, safety concerns, or legitimate public‑interest journalism.
                </p>
              </div>

              <div className="my-8 h-px w-full bg-neutral-200" />

              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">How Outreach Is Normally Handled</h2>
                <p className="mt-4 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-neutral-800">
                  The approach and timing of outreach may vary depending on the story. Chroniq Now may reach out to a subject or their representative by email, telephone, publicly available contact channels, legal counsel, or other reasonable methods based on the nature of the allegation and the urgency of publication. A reasonable opportunity to reply does not always mean an unlimited window. Rapidly developing stories may require shorter response periods than feature articles or investigative pieces.
                </p>
              </div>

              <div className="my-8 h-px w-full bg-neutral-200" />

              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">What to Submit If You Seek a Reply or Correction</h2>
                <p className="mt-4 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-neutral-800">
                  If you are contacting Chroniq Now regarding published or upcoming coverage, please provide the article URL or headline, the specific claim you challenge, the factual basis for your objection, any supporting documents you wish to have examined, and your preferred contact information for follow‑up. Broad denials lacking specificity are less helpful than a direct identification of what is claimed to be inaccurate, incomplete, misleading, or outdated.
                </p>
              </div>

              <div className="my-8 h-px w-full bg-neutral-200" />

              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">Post‑Publication Responses</h2>
                <p className="mt-4 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-neutral-800">
                  After publication, any individual or organisation that believes context is missing or that material is factually incorrect may reach out to the newsroom. Valid responses may result in a clarification, correction, update note, subsequent coverage, or no change if the original reporting remains supported. Chroniq Now may publish or summarise a substantive response when it meaningfully assists readers in understanding the disagreement or the evidentiary record.
                </p>
              </div>

              <div className="my-8 h-px w-full bg-neutral-200" />

              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">What This Policy Does Not Guarantee</h2>
                <p className="mt-4 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-neutral-800">
                  A request for a right of reply does not guarantee publication of a full statement, removal of accurate reporting, or advance approval of an article by the subject of that article. It does require the newsroom to review the request in good faith, examine it against the available evidence, and respond in accordance with its editorial standards and corrections process.
                </p>
              </div>

              <div className="my-8 h-px w-full bg-neutral-200" />

              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">Contact</h2>
                <p className="mt-4 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-neutral-800">
                  For right of reply requests or corrections, please contact the editorial team at: <Link href="mailto:reply@chroniqnow.com" className="font-medium underline underline-offset-4">reply@chroniqnow.com</Link>.
                </p>
                <p className="mt-2 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-neutral-800">
                  Related policies: <Link href="/editorial-policy" className="font-medium underline underline-offset-4">Editorial Policy</Link> | <Link href="/correction-policy" className="font-medium underline underline-offset-4">Corrections Policy</Link>
                </p>
              </div>
            </section>

            <div className="mt-10" />
          </article>
        </main>
        <Footer />
      </div>
    </>
  );
}