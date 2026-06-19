import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Our Advertising Policy – Chroniq Now",
  description:
    "Chroniq Now’s advertising and sponsored content policy: how we separate commercial material from journalism, label paid content, and maintain editorial independence.",
  alternates: { canonical: "https://www.chroniqnow.com/advertising-and-sponsored-content-policy" },
  openGraph: {
    title: "Our Advertising Policy",
    description:
      "How we separate commercial material from journalism, label paid content, and maintain editorial independence.",
    url: "https://www.chroniqnow.com/advertising-and-sponsored-content-policy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Advertising Policy",
    description:
      "How we separate commercial material from journalism, label paid content, and maintain editorial independence.",
  },
};

export default function AdvertisingPolicyPage() {
  return (
    <>
      <Script
        id="advertising-policy-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          url: "https://www.chroniqnow.com/advertising-and-sponsored-content-policy",
          name: "Our Advertising Policy",
          description:
            "Chroniq Now’s advertising and sponsored content policy: how we separate commercial material from journalism, label paid content, and maintain editorial independence.",
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
              Our Advertising Policy
            </h1>
            <p className="mt-4 max-w-3xl text-pretty text-neutral-700 text-base sm:text-lg md:text-[1.15rem] leading-relaxed">
              Chroniq Now separates commercial material from editorial reporting and labels advertising, sponsorships, and other paid relationships clearly and prominently.
            </p>
          </div>
        </header>

        <main className="px-4 sm:px-6 lg:px-8 pb-24">
          <article className="mx-auto w-full max-w-6xl">
            <section className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">Editorial Separation</h2>
                <p className="mt-4 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-neutral-800">
                  Commercial relationships do not grant editorial control. Reporting decisions, headlines, and publication timing are not sold as part of any advertising, affiliate, sponsorship, or partnership arrangement. A reader should never have to infer whether content is paid for, promotional, or independently reported.
                </p>
              </div>

              <div className="my-8 h-px w-full bg-neutral-200" />

              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">How Paid Material Is Labelled</h2>
                <p className="mt-4 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-neutral-800">
                  When content is paid for, sponsored, or published because of a commercial arrangement, the disclosure appears in a clear location and uses language ordinary readers can understand before they mistake the material for independent reporting.
                </p>
                <ul className="mt-4 list-disc pl-6 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-neutral-800 space-y-2">
                  <li>Clear labels may include: Advertisement, Ad, Sponsored, Paid Content, or Sponsored Advertising Content.</li>
                  <li>The disclosure should appear close enough to the content that a reader sees it before or as they engage with the material.</li>
                  <li>Visual design, bylines, and page layout should not be used to make paid material look indistinguishable from independently reported journalism.</li>
                </ul>
              </div>

              <div className="my-8 h-px w-full bg-neutral-200" />

              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">Native, Branded, and Partner Content</h2>
                <p className="mt-4 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-neutral-800">
                  If Chroniq Now publishes sponsored features, branded content, partner‑funded explainer material, or similarly designed promotional pages, those pages carry a disclosure that is prominent, plain‑language, and durable across desktop and mobile views. A sponsor may buy placement or a clearly labelled promotional package, but a sponsor does not buy the right to masquerade as the newsroom.
                </p>
              </div>

              <div className="my-8 h-px w-full bg-neutral-200" />

              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">Affiliate Links, Commerce, and Material Connections</h2>
                <p className="mt-4 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-neutral-800">
                  If Chroniq Now uses affiliate links, referral arrangements, or any other material connection that could result in compensation when a reader clicks or makes a purchase, that relationship is disclosed clearly in or near the affected content. Commerce‑related disclosures are written for readers, not buried in legal shorthand.
                </p>
              </div>

              <div className="my-8 h-px w-full bg-neutral-200" />

              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">Newsletters, Video, Audio, and Social Distribution</h2>
                <p className="mt-4 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-neutral-800">
                  Disclosure standards apply across formats, not only article pages. Sponsored newsletter placements, paid podcast segments, video sponsorships, and social media promotions are also labelled in a way that travels with the content or appears clearly at the point of exposure.
                </p>
              </div>

              <div className="my-8 h-px w-full bg-neutral-200" />

              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">Political and Issue Advertising</h2>
                <p className="mt-4 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-neutral-800">
                  If Chroniq Now accepts political, advocacy, or issue‑based advertising, the material is clearly labelled as advertising and is not presented as reported journalism or independent analysis. Acceptance of an advertisement does not imply endorsement of a campaign, candidate, issue position, organisation, or claim contained in the advertisement.
                </p>
              </div>

              <div className="my-8 h-px w-full bg-neutral-200" />

              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">Practices Chroniq Now Should Not Use</h2>
                <ul className="mt-4 list-disc pl-6 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-neutral-800 space-y-2">
                  <li>Selling editorial conclusions or offering favourable coverage in exchange for payment or access.</li>
                  <li>Using a newsroom byline, headline style, or article layout to disguise paid material where the commercial nature is not obvious.</li>
                  <li>Allowing an advertiser, sponsor, or affiliate partner to control unrelated reporting.</li>
                  <li>Hiding a material connection in a place a normal reader would not reasonably notice.</li>
                </ul>
              </div>

              <div className="my-8 h-px w-full bg-neutral-200" />

              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">Contact</h2>
                <p className="mt-4 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-neutral-800">
                  For inquiries regarding advertising, sponsored content, or partnership opportunities, please contact: <Link href="mailto:advertising@chroniqnow.com" className="font-medium underline underline-offset-4">advertising@chroniqnow.com</Link>.
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