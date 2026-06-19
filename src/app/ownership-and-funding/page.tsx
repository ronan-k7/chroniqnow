import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Our Ownership & Funding – Chroniq Now",
  description:
    "Chroniq Now’s ownership and funding policy: how editorial decisions are protected, how the newsroom is funded, and our commitment to transparency.",
  alternates: { canonical: "https://www.chroniqnow.com/ownership-and-funding" },
  openGraph: {
    title: "Our Ownership & Funding",
    description:
      "How editorial decisions are protected, how the newsroom is funded, and our commitment to transparency.",
    url: "https://www.chroniqnow.com/ownership-and-funding",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Ownership & Funding",
    description:
      "How editorial decisions are protected, how the newsroom is funded, and our commitment to transparency.",
  },
};

export default function OwnershipFundingPage() {
  return (
    <>
      <Script
        id="ownership-funding-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          url: "https://www.chroniqnow.com/ownership-and-funding",
          name: "Our Ownership & Funding",
          description:
            "Chroniq Now’s ownership and funding policy: how editorial decisions are protected, how the newsroom is funded, and our commitment to transparency.",
          publisher: { "@id": "https://www.chroniqnow.com/#newsorg" },
        })}
      </Script>
      <div className="bg-white min-h-screen overflow-x-hidden">
        <Navbar />
        <header className="px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8 sm:pb-12">
          <div className="mx-auto w-full max-w-6xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs sm:text-[13px] font-medium text-neutral-700">
              Transparency
            </span>
            <h1 className="mt-4 text-balance text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
              Our Ownership & Funding
            </h1>
            <p className="mt-4 max-w-3xl text-pretty text-neutral-700 text-base sm:text-lg md:text-[1.15rem] leading-relaxed">
              This page clarifies who controls editorial decisions at Chroniq Now, how commercial support is maintained separate from reporting, and how the newsroom handles conflicts and material relationships.
            </p>
          </div>
        </header>

        <main className="px-4 sm:px-6 lg:px-8 pb-24">
          <article className="mx-auto w-full max-w-6xl">
            <section className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">What This Page Covers</h2>
                <p className="mt-4 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-neutral-800">
                  Chroniq Now publishes as an independent digital newsroom operated by a distributed editorial team. This page explains editorial control, commercial support, and conflict disclosures.
                </p>
              </div>

              <div className="my-8 h-px w-full bg-neutral-200" />

              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">Editorial Control and Decision‑Making</h2>
                <p className="mt-4 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-neutral-800">
                  Editorial judgments are made by editors and reporters. Coverage decisions, headlines, and publication timing are not sold to advertisers, sponsors, or political actors. A business relationship does not create a right to favorable coverage.
                </p>
              </div>

              <div className="my-8 h-px w-full bg-neutral-200" />

              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">How Chroniq Now May Be Funded</h2>
                <p className="mt-4 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-neutral-800">
                  Chroniq Now may generate revenue through advertising, sponsorships, licensing, and other publishing‑related commercial arrangements. Any revenue stream remains structurally separate from editorial decision‑making.
                </p>
              </div>

              <div className="my-8 h-px w-full bg-neutral-200" />

              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">Conflicts of Interest and Recusals</h2>
                <p className="mt-4 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-neutral-800">
                  Journalists and editors are expected to disclose personal, financial, or family relationships that could call impartiality into question. When necessary, the assignment is moved or declined.
                </p>
              </div>

              <div className="my-8 h-px w-full bg-neutral-200" />

              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">Commercial Support Does Not Buy Coverage</h2>
                <p className="mt-4 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-neutral-800">
                  Advertising or sponsorship does not guarantee coverage, shape a reporter's conclusions, or entitle a commercial party to veto criticism. Paid content is labelled clearly.
                </p>
              </div>

              <div className="my-8 h-px w-full bg-neutral-200" />

              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">Political, Governmental, and Advocacy Influence</h2>
                <p className="mt-4 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-neutral-800">
                  Chroniq Now does not present political or advocacy messaging as independent reporting. When a story concerns a subject with which we have a material relationship, that relationship is disclosed.
                </p>
              </div>

              <div className="my-8 h-px w-full bg-neutral-200" />

              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">Changes to Ownership or Material Support</h2>
                <p className="mt-4 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-neutral-800">
                  If Chroniq Now undergoes a material ownership change or funding arrangement that affects editorial independence, this page will be updated accordingly.
                </p>
              </div>

              <div className="my-8 h-px w-full bg-neutral-200" />

              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">Contact</h2>
                <p className="mt-4 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-neutral-800">
                  Readers with questions about ownership or funding may reach the newsroom at <Link href="mailto:contact@chroniqnow.com" className="font-medium underline underline-offset-4">contact@chroniqnow.com</Link>.
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