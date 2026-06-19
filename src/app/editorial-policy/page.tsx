import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Our Ethics – Chroniq Now Editorial Policy",
  description:
    "Chroniq Now’s editorial policy: accuracy first, independence, transparency, clear labeling, and accountable corrections.",
  alternates: { canonical: "https://www.chroniqnow.com/editorial-policy" },
  openGraph: {
    title: "Our Ethics",
    description:
      "Chroniq Now’s editorial policy: accuracy first, independence, transparency, clear labeling, and accountable corrections.",
    url: "https://www.chroniqnow.com/editorial-policy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Ethics",
    description:
      "Chroniq Now’s editorial policy: accuracy first, independence, transparency, clear labeling, and accountable corrections.",
  },
};

export default function EditorialPolicyPage() {
  return (
    <>
      <Script
        id="editorial-policy-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "@id": "https://www.chroniqnow.com/editorial-policy",
              url: "https://www.chroniqnow.com/editorial-policy",
              name: "Our Ethics",
              isPartOf: { "@id": "https://www.chroniqnow.com/#website" },
              inLanguage: "en",
              description:
                "Chroniq Now’s editorial policy covering accuracy, independence, transparency, corrections, and labeling.",
              breadcrumb: {
                "@id": "https://www.chroniqnow.com/editorial-policy#breadcrumb",
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
              ethicsPolicy: "https://www.chroniqnow.com/editorial-policy",
              correctionsPolicy: "https://www.chroniqnow.com/correction-policy",
            },
            {
              "@type": "BreadcrumbList",
              "@id": "https://www.chroniqnow.com/editorial-policy#breadcrumb",
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
                  name: "Our Ethics",
                  item: "https://www.chroniqnow.com/editorial-policy",
                },
              ],
            },
          ],
        })}
      </Script>
      <div className="bg-white min-h-screen overflow-x-hidden">
        <Navbar />
        <header className="px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8 sm:pb-12">
          <div className="mx-auto w-full max-w-6xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs sm:text-[13px] font-medium text-neutral-700">
              Editorial Policy
            </span>
            <h1 className="mt-4 text-balance text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
              Our Ethics
            </h1>
            <p className="mt-4 max-w-3xl text-pretty text-neutral-700 text-base sm:text-lg md:text-[1.15rem] leading-relaxed">
              Trust is the only thing that matters in news. Without it, we're just adding to the noise. This page isn't filled with legal jargon or empty promises. It's our code. It’s the set of rules we hold ourselves to every single day. This is how we earn your trust.
            </p>
          </div>
        </header>

        <main className="px-4 sm:px-6 lg:px-8 pb-24">
          <article className="mx-auto w-full max-w-6xl">
            <div className="my-8 h-px w-full bg-neutral-200" />

            <section
              aria-label="Editorial principles"
              className="grid gap-4 sm:gap-6 md:grid-cols-2"
            >
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-emerald-700">Accuracy is Non‑Negotiable.</h3>
                <p className="mt-2 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-emerald-900/90">
                  Getting the facts right is our most important job. We don’t rush to be first; we work to be correct. That means we hunt down primary sources, we talk to people on all sides of an issue, and we verify information before we hit publish. Facts need context, and we promise to provide it so you get the full story.
                </p>
              </div>

              <div className="rounded-2xl border border-rose-100 bg-rose-50/60 p-5 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-rose-700">Fiercely Independent. No Strings Attached.</h3>
                <p className="mt-2 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-rose-900/90">
                  Our loyalty is to you, our reader. Period. We are a self-funded collective, which means we don't answer to advertisers, corporate interests, or political parties. Our reporting is never for sale. Our writers don't take freebies, and they aren't allowed to cover subjects where they have a personal or financial conflict of interest.
                </p>
              </div>

              <div className="rounded-2xl border border-sky-100 bg-sky-50/60 p-5 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-sky-700">Show, Don't Just Tell.</h3>
                <p className="mt-2 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-sky-900/90">
                  We believe in showing our work. Whenever possible, we’ll link directly to the original studies, data, or documents we're reporting on so you can check the facts for yourself. We use anonymous sources only as a last resort, and only when someone has critical information but could be harmed or lose their job for sharing it. When we do, we'll tell you why they need to remain anonymous.
                </p>
              </div>

              <div className="rounded-2xl border border-amber-100 bg-amber-50/60 p-5 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-amber-700">When We Get It Wrong, We Say So.</h3>
                <p className="mt-2 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-amber-900/90">
                  We're human. We will make mistakes. When we do, we won’t try to sweep it under the rug. We will correct the error clearly, quickly, and transparently. We believe owning our mistakes is a sign of strength, not weakness. You can read the specifics of how we handle this on our{" "}
                  <Link
                    href="/correction-policy"
                    className="font-medium underline decoration-amber-400 underline-offset-4 hover:decoration-amber-700"
                  >
                    Correction Policy
                  </Link>{" "}
                  page.
                </p>
              </div>

              <div className="md:col-span-2 rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-neutral-900">A Clear Line in the Sand.</h3>
                <p className="mt-2 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-neutral-800">
                  Reporting is reporting. Opinion is opinion. We don't mix the two. Our news articles are based on verified facts. If we publish a piece that is someone's expert analysis or a specific viewpoint, we will label it clearly so you always know exactly what you're reading.
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