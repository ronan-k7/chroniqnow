import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Legal Information – Chroniq Now",
  description:
    "Legal information for Chroniq Now. Read our policies on copyright, fair use, complaints, third‑party links, and how to submit formal requests.",
  alternates: { canonical: "https://www.chroniqnow.com/legal" },
  openGraph: {
    title: "Legal Information",
    description:
      "Read our policies on copyright, fair use, complaints, third‑party links, and how to submit formal requests.",
    url: "https://www.chroniqnow.com/legal",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Legal Information",
    description:
      "Read our policies on copyright, fair use, complaints, third‑party links, and how to submit formal requests.",
  },
};

export default function LegalPage() {
  return (
    <>
      <Script
        id="legal-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          url: "https://www.chroniqnow.com/legal",
          name: "Legal Information – Chroniq Now",
          description:
            "Legal information for Chroniq Now. Read our policies on copyright, fair use, complaints, third‑party links, and how to submit formal requests.",
          publisher: { "@id": "https://www.chroniqnow.com/#newsorg" },
        })}
      </Script>
      <div className="bg-white min-h-screen overflow-x-hidden">
        <Navbar />
        <header className="px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8 sm:pb-12">
          <div className="mx-auto w-full max-w-6xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs sm:text-[13px] font-medium text-neutral-700">
              Legal
            </span>
            <h1 className="mt-4 text-balance text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
              Legal Information
            </h1>
            <p className="mt-4 max-w-3xl text-pretty text-neutral-700 text-base sm:text-lg md:text-[1.15rem] leading-relaxed">
              This page summarises legal and compliance matters relevant to Chroniq Now's publishing activities, including reader usage of content, submissions, and formal requests.
            </p>
          </div>
        </header>

        <main className="px-4 sm:px-6 lg:px-8 pb-24">
          <article className="mx-auto w-full max-w-6xl">
            <section className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">Informational Use of Content</h2>
                <p className="mt-4 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-neutral-800">
                  Chroniq Now produces journalism, market analysis, and explanatory material strictly for informational purposes. Our articles are edited according to rigorous newsroom standards but should never be interpreted as legal, financial, investment, tax, medical, or other professional advice tailored to any individual's specific situation.
                </p>
              </div>

              <div className="my-8 h-px w-full bg-neutral-200" />

              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">Copyright, Quotation, and Reuse</h2>
                <p className="mt-4 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-neutral-800">
                  Readers may link to Chroniq Now articles and may quote brief excerpts with proper attribution, as permitted by applicable copyright law. Republishing entire articles, bulk reproduction, commercial reuse, systematic copying, or scraping content for republication requires explicit permission unless a separate licensing agreement or legal exception applies. For syndication requests, contact <Link href="mailto:legal@chroniqnow.com" className="font-medium underline underline-offset-4">legal@chroniqnow.com</Link>.
                </p>
              </div>

              <div className="my-8 h-px w-full bg-neutral-200" />

              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">Complaints Regarding Accuracy, Rights, or Fairness</h2>
                <p className="mt-4 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-neutral-800">
                  If you believe a Chroniq Now article contains a material factual error, omits critical context, infringes upon legal rights, or raises a serious legal concern, please contact our newsroom promptly. Include the specific article URL, the exact material at issue, the basis for your concern, and supporting documentation where available.
                </p>
              </div>

              <div className="my-8 h-px w-full bg-neutral-200" />

              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">What to Include in a Formal Request</h2>
                <ul className="mt-4 list-disc pl-6 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-neutral-800 space-y-2">
                  <li>The URL or headline of the content in question.</li>
                  <li>A clear description of the statement, image, video, or other material you are challenging.</li>
                  <li>The legal or factual basis for your request, including supporting documents where relevant.</li>
                  <li>Your name, organisation if applicable, and a reliable contact method for follow‑up.</li>
                </ul>
              </div>

              <div className="my-8 h-px w-full bg-neutral-200" />

              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">Removal, Restriction, and Update Requests</h2>
                <p className="mt-4 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-neutral-800">
                  Chroniq Now reviews serious requests for corrections, clarifications, updates, removals, or restricted display. Submission of a request does not guarantee removal of accurate reporting or immediate depublication. The appropriate response may be a correction, clarification, update note, or follow‑up article rather than removal.
                </p>
              </div>

              <div className="my-8 h-px w-full bg-neutral-200" />

              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">Links to Third‑Party Material</h2>
                <p className="mt-4 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-neutral-800">
                  Chroniq Now may link to third‑party websites, official records, social media platforms, public databases, and external documents for sourcing and reader context. These third‑party properties are governed by their own terms of service, privacy policies, and accuracy practices. A link does not constitute an endorsement of every statement, product, or policy appearing on that external site.
                </p>
              </div>

              <div className="my-8 h-px w-full bg-neutral-200" />

              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">Contact</h2>
                <p className="mt-4 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-neutral-800">
                  <strong>General Legal Contact:</strong> <Link href="mailto:legal@chroniqnow.com" className="font-medium underline underline-offset-4">legal@chroniqnow.com</Link><br />
                  <strong>Corrections and Factual Concerns:</strong> <Link href="mailto:corrections@chroniqnow.com" className="font-medium underline underline-offset-4">corrections@chroniqnow.com</Link><br />
                  <strong>Editorial Team:</strong> <Link href="mailto:contact@chroniqnow.com" className="font-medium underline underline-offset-4">contact@chroniqnow.com</Link>
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