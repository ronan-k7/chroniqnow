import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Our Correction Policy – Chroniq Now",
  description:
    "Chroniq Now’s correction policy: how to report an error, how we investigate, and how we correct the record—clearly and transparently.",
  alternates: { canonical: "https://www.chroniqnow.com/correction-policy" },
  openGraph: {
    title: "Our Correction Policy",
    description:
      "How to report an error, how we investigate, and how we correct the record—clearly and transparently.",
    url: "https://www.chroniqnow.com/correction-policy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Correction Policy",
    description:
      "How to report an error, how we investigate, and how we correct the record—clearly and transparently.",
  },
};

export default function CorrectionPolicyPage() {
  return (
    <>
      <Script
        id="correction-policy-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "@id": "https://www.chroniqnow.com/correction-policy",
              url: "https://www.chroniqnow.com/correction-policy",
              name: "Our Correction Policy",
              isPartOf: { "@id": "https://www.chroniqnow.com/#website" },
              inLanguage: "en",
              description:
                "Chroniq Now’s correction policy: how to report an error, how we investigate, and how we correct the record.",
              breadcrumb: {
                "@id":
                  "https://www.chroniqnow.com/correction-policy#breadcrumb",
              },
              publisher: { "@id": "https://www.chroniqnow.com/#newsorg" },
            },
            {
              "@type": "WebSite",
              "@id": "https://www.chroniqnow.com/#website",
              name: "Chroniq Now",
              url: "https://www.chroniqnow.com/",
              publisher: { "@id": "https://www.chroniqnow.com/#newsorg" },
            },
            {
              "@type": "NewsMediaOrganization",
              "@id": "https://www.chroniqnow.com/#newsorg",
              name: "Chroniq Now",
              url: "https://www.chroniqnow.com/",
              email: "contact@chroniqnow.com",
              correctionsPolicy: "https://www.chroniqnow.com/correction-policy",
              ethicsPolicy: "https://www.chroniqnow.com/editorial-policy",
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  contactType: "corrections",
                  email: "corrections@chroniqnow.com",
                  areaServed: "Worldwide",
                  availableLanguage: ["en"],
                },
              ],
            },
            {
              "@type": "BreadcrumbList",
              "@id": "https://www.chroniqnow.com/correction-policy#breadcrumb",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://www.chroniqnow.com/",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Our Correction Policy",
                  item: "https://www.chroniqnow.com/correction-policy",
                },
              ],
            },
          ],
        })}
      </Script>
      <div className="bg-white min-h-screen overflow-x-hidden">
        <Navbar />
        <header className="px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-6 sm:pb-10">
          <div className="mx-auto w-full max-w-6xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs sm:text-[13px] font-medium text-neutral-700">
              Editorial Standards
            </span>
            <h1 className="mt-4 text-balance text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
              Our Correction Policy
            </h1>
          </div>
        </header>

        <main className="px-4 sm:px-6 lg:px-8 pb-24">
          <article className="mx-auto w-full max-w-6xl">
            <section
              aria-labelledby="owning-mistakes"
              className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8"
            >
              <h2 id="owning-mistakes" className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                Owning Our Mistakes. It's That Simple.
              </h2>
              <p className="mt-4 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-neutral-800">
                We're obsessed with getting things right. But let's be realistic—nobody is perfect. In the fast-moving world of news, mistakes can happen. A fact can be misheard, a number can be transposed, or new information can come to light.
              </p>
              <p className="mt-4 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-neutral-800">
                While we can't promise to be perfect, we can promise this:{" "}
                <span className="font-semibold">When we get something wrong, we will fix it.</span>
              </p>
              <p className="mt-4 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-neutral-800">
                We believe that our response to a mistake is just as important as our effort to prevent one. Trust isn't built on a flawless record; it's built on honesty and accountability, especially when things go sideways. This page outlines our commitment to exactly that.
              </p>
            </section>

            <div className="my-8 h-px w-full bg-neutral-200" />

            <section
              aria-labelledby="report-mistake"
              className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8"
            >
              <h2 id="report-mistake" className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                Saw a Mistake? Here's How to Tell Us.
              </h2>
              <p className="mt-4 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-neutral-800">
                You, our readers, are our most important fact-checkers. If you spot an error in our work, we genuinely want you to let us know. Don't hesitate.
              </p>
              <div className="mt-5 flex items-center gap-3 whitespace-nowrap overflow-x-auto">
                <p className="shrink-0 text-sm font-medium text-neutral-900">Email:</p>
                <Link
                  href="mailto:corrections@chroniqnow.com"
                  className="shrink-0 inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm sm:text-[0.95rem] font-semibold text-white hover:bg-emerald-700"
                >
                  corrections@chroniqnow.com
                </Link>
              </div>
              <p className="mt-5 text-sm sm:text-[0.95rem] text-neutral-700">
                To help our team act fast, it's really helpful if you include:
              </p>
              <ul className="mt-3 list-disc pl-6 text-sm sm:text-[0.95rem] md:text-base leading-relaxed text-neutral-800 space-y-1.5">
                <li>The link to the article in question.</li>
                <li>A quick note on what you think is wrong.</li>
                <li>Where you got the correct information, if you have it.</li>
              </ul>
            </section>

            <div className="my-8 h-px w-full bg-neutral-200" />

            <section aria-labelledby="what-happens-next" className="space-y-6">
              <div className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8">
                <h2 id="what-happens-next" className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                  Here's Exactly What Happens Next
                </h2>
                <p className="mt-4 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-neutral-800">
                  When your email lands in our inbox, it isn't fed into a machine. A real person on our editorial team reads it.
                </p>
                <p className="mt-3 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-neutral-800">
                  First, we pull up the article and go back to our original notes and sources to understand what happened. We take the time to investigate properly. If we messed up, we admit it and get to work on a fix.
                </p>
                <p className="mt-3 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-neutral-800">
                  How we fix it depends on the seriousness of the error.
                </p>
              </div>

              <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-amber-100 bg-amber-50/60 p-5 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-amber-700">Major factual errors</h3>
                  <p className="mt-2 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-amber-900/90">
                    If we got a <span className="font-semibold">major fact wrong</span>—something that changes the entire context of the story—we will correct the article and add a clear notice at the bottom. That note will say, "Here's what we got wrong, and here's how we fixed it." We believe in a transparent, public record of our corrections.
                  </p>
                </div>

                <div className="rounded-2xl border border-sky-100 bg-sky-50/60 p-5 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-sky-700">Smaller slip‑ups</h3>
                  <p className="mt-2 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-sky-900/90">
                    For <span className="font-semibold">smaller slip‑ups</span>, like a spelling mistake or a grammar flub that doesn't change the story's meaning, we'll simply correct the text. Making a big announcement for a typo just clutters up the article.
                  </p>
                </div>
              </div>

              <p className="text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-neutral-800">
                This whole process is about respect—respect for the truth, and respect for you. Thanks for helping us stay sharp.
              </p>
            </section>

            <div className="mt-10" />
          </article>
        </main>
        <Footer />
      </div>
    </>
  );
}