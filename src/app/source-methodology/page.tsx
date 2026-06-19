import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Our Source Methodology – Chroniq Now",
  description:
    "Chroniq Now’s source methodology outlines our rigorous standards for sourcing, verification, and handling of anonymous sources and documents.",
  alternates: { canonical: "https://www.chroniqnow.com/source-methodology" },
  openGraph: {
    title: "Our Source Methodology",
    description:
      "How we source, verify, and handle anonymous sources and documents.",
    url: "https://www.chroniqnow.com/source-methodology",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Source Methodology",
    description:
      "How we source, verify, and handle anonymous sources and documents.",
  },
};

export default function SourceMethodologyPage() {
  return (
    <>
      <Script
        id="source-methodology-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          url: "https://www.chroniqnow.com/source-methodology",
          name: "Our Source Methodology",
          description:
            "Chroniq Now’s source methodology outlines our rigorous standards for sourcing, verification, and handling of anonymous sources and documents.",
          publisher: { "@id": "https://www.chroniqnow.com/#newsorg" },
        })}
      </Script>
      <div className="bg-white min-h-screen overflow-x-hidden">
        <Navbar />
        <header className="px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8 sm:pb-12">
          <div className="mx-auto w-full max-w-6xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs sm:text-[13px] font-medium text-neutral-700">
              Methodology
            </span>
            <h1 className="mt-4 text-balance text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
              Our Source Methodology
            </h1>
            <p className="mt-4 max-w-3xl text-pretty text-neutral-700 text-base sm:text-lg md:text-[1.15rem] leading-relaxed">
              Chroniq Now aims to show readers how each article is constructed: what information is directly sourced, what originates from public records, and where interpretation begins.
            </p>
          </div>
        </header>

        <main className="px-4 sm:px-6 lg:px-8 pb-24">
          <article className="mx-auto w-full max-w-6xl">
            <section className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">How Reporting Begins</h2>
                <p className="mt-4 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-neutral-800">
                  Our editorial process starts with verifiable material rather than recycled summaries. Starting points include official records, court filings, regulatory disclosures, corporate statements, direct interviews, and public datasets. When direct verification is incomplete, our reporters narrow their language accordingly.
                </p>
              </div>

              <div className="my-8 h-px w-full bg-neutral-200" />

              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">Source Hierarchy and Verification</h2>
                <p className="mt-4 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-neutral-800">
                  Whenever possible, we prioritise primary documents and firsthand sourcing over tertiary summaries. Official records and direct statements carry more weight than unattributed repetition. Claims from any source are still subject to rigorous checking.
                </p>
                <ul className="mt-4 list-disc pl-6 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-neutral-800 space-y-2">
                  <li>Primary records and firsthand sourcing are preferred.</li>
                  <li>Secondary reporting may be used but never presented as certainty when unconfirmed.</li>
                  <li>Financial figures or legal details must be verified against the underlying document when feasible.</li>
                </ul>
              </div>

              <div className="my-8 h-px w-full bg-neutral-200" />

              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">Anonymous Sources and Background Information</h2>
                <p className="mt-4 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-neutral-800">
                  Anonymity is used only when the information serves the public interest and cannot be responsibly obtained on the record. The newsroom must understand the source's identity and evaluate their motive, access, and reliability before granting anonymity.
                </p>
              </div>

              <div className="my-8 h-px w-full bg-neutral-200" />

              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">Documents, Media, and Data</h2>
                <p className="mt-4 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-neutral-800">
                  Documents, screenshots, audio, and data extracts are reviewed carefully. We verify provenance, timing, and authenticity. A document's existence does not automatically prove the broadest possible claim.
                </p>
              </div>

              <div className="my-8 h-px w-full bg-neutral-200" />

              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">Source Notes, Attribution, and Links</h2>
                <p className="mt-4 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-neutral-800">
                  For trust‑sensitive reporting, Chroniq Now may include source notes or primary links so readers can inspect the public record themselves. Attribution is specific enough to understand where key information originated.
                </p>
              </div>

              <div className="my-8 h-px w-full bg-neutral-200" />

              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">How We Treat Uncertainty and Change</h2>
                <ul className="mt-4 list-disc pl-6 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-neutral-800 space-y-2">
                  <li>We do not convert uncertainty into certainty for headline effect.</li>
                  <li>We clearly distinguish analysis from assertion.</li>
                  <li>We update wording when better sourcing becomes available.</li>
                </ul>
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