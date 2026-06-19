import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "About Chroniq Now – Independent News Without Noise",
  description:
    "Chroniq Now is a sovereign digital news publication dedicated to evidence-based, transparent, and accountable journalism. We operate independently, free from corporate or political influence.",
  alternates: { canonical: "https://www.chroniqnow.com/about" },
  openGraph: {
    title: "About Chroniq Now",
    description:
      "Facts first. No angles. No strings. Get the story, clearly told.",
    url: "https://www.chroniqnow.com/about",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Chroniq Now",
    description:
      "Facts first. No angles. No strings. Get the story, clearly told.",
  },
};

export default function AboutPage() {
  return (
    <>
      <Script
        id="about-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "@id": "https://www.chroniqnow.com/about",
              url: "https://www.chroniqnow.com/about",
              name: "About Chroniq Now",
              isPartOf: { "@id": "https://www.chroniqnow.com/#website" },
              about: { "@type": "Organization", name: "Chroniq Now" },
              description:
                "Chroniq Now is a sovereign digital news publication dedicated to evidence-based, transparent, and accountable journalism.",
            },
            {
              "@type": "NewsMediaOrganization",
              "@id": "https://www.chroniqnow.com/#newsorg",
              name: "Chroniq Now",
              url: "https://www.chroniqnow.com/",
              email: "contact@chroniqnow.com",
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  contactType: "news tips",
                  email: "tips@chroniqnow.com",
                  areaServed: "Worldwide",
                  availableLanguage: ["en"],
                },
                {
                  "@type": "ContactPoint",
                  contactType: "corrections",
                  email: "corrections@chroniqnow.com",
                  areaServed: "Worldwide",
                  availableLanguage: ["en"],
                },
                {
                  "@type": "ContactPoint",
                  contactType: "customer support",
                  email: "contact@chroniqnow.com",
                  areaServed: "Worldwide",
                  availableLanguage: ["en"],
                },
              ],
            },
            {
              "@type": "WebSite",
              "@id": "https://www.chroniqnow.com/#website",
              name: "Chroniq Now",
              url: "https://www.chroniqnow.com/",
            },
          ],
        })}
      </Script>
      <div className="bg-white min-h-screen overflow-x-hidden">
        <Navbar />
        <header className="px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8 sm:pb-12">
          <div className="mx-auto w-full max-w-6xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs sm:text-[13px] font-medium text-neutral-700">
              About Chroniq Now
            </span>
            <h1 className="mt-4 text-balance text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
              Here’s the Deal
            </h1>
            <p className="mt-4 max-w-3xl text-pretty text-neutral-700 text-base sm:text-lg md:text-[1.15rem] leading-relaxed">
              We are a sovereign digital news publication devoted to evidence‑based, open, and answerable journalism. Our editorial choices are determined solely by our reporters and editors, free from external influence.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full bg-rose-500/10 text-rose-700 ring-1 ring-rose-500/20 px-3 py-1 text-xs sm:text-[13px] font-medium">Independent</span>
              <span className="rounded-full bg-sky-500/10 text-sky-700 ring-1 ring-sky-500/20 px-3 py-1 text-xs sm:text-[13px] font-medium">Reader‑supported</span>
              <span className="rounded-full bg-emerald-500/10 text-emerald-700 ring-1 ring-emerald-500/20 px-3 py-1 text-xs sm:text-[13px] font-medium">No clickbait</span>
              <span className="rounded-full bg-amber-500/10 text-amber-700 ring-1 ring-amber-500/20 px-3 py-1 text-xs sm:text-[13px] font-medium">Corrections visible</span>
            </div>
          </div>
        </header>

        <main className="px-4 sm:px-6 lg:px-8 pb-24">
          <article className="mx-auto w-full max-w-6xl">
            <div className="rounded-3xl p-[1px] bg-gradient-to-b from-rose-500/60 via-fuchsia-500/50 to-sky-500/60 shadow-[0_20px_40px_-24px_rgba(0,0,0,0.25)]">
              <div className="rounded-3xl bg-white p-6 sm:p-10">
                <section aria-labelledby="about-us" className="space-y-6">
                  <h2 id="about-us" className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">About Us</h2>
                  <p className="text-[1.05rem] sm:text-lg md:text-xl leading-relaxed text-neutral-900">
                    Let’s get straight to the point. We are here to report the news, not to shape your opinion. We don’t have a side. Our only side is the story itself.
                  </p>
                  <p className="text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-neutral-800">
                    This whole project started with a simple question tossed around between a few journalists:{" "}
                    <span className="italic">"What if we built a news source that we’d actually want to read ourselves?"</span>
                  </p>
                  <p className="text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-neutral-800">
                    One without the constant outrage. Without the clickbait headlines. Without the feeling that someone is trying to sell you something—an idea, a candidate, a product. Just a place that gives you the facts and trusts you to be smart enough to figure out the rest.
                  </p>
                  <p className="text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-neutral-800">
                    So, we built it. This is{" "}
                    <span className="font-semibold">Chroniq Now</span>.
                  </p>
                </section>

                <div className="my-10 h-px w-full bg-neutral-200" />

                <section aria-labelledby="who-we-are" className="space-y-4">
                  <h2 id="who-we-are" className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">Who We Are (and Who We Aren't)</h2>
                  <p className="text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-neutral-800">
                    You won’t find our logo on a skyscraper. We're a scrappy, remote team of reporters and writers. We don’t have a fancy newsroom; our "office" is a mix of time zones, kitchen tables, and Slack channels.
                  </p>
                  <p className="text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-neutral-800">
                    We've been in the media game for a while. We've seen how the sausage gets made, and frankly, we believe there’s a better way to do it. A way that puts the reader first, not the algorithm.
                  </p>

                  <p className="mt-4 text-xs sm:text-sm uppercase tracking-wide text-neutral-600">Here’s how we operate:</p>

                  <div className="mt-3 grid gap-4 sm:gap-6 sm:grid-cols-2">
                    <div className="rounded-2xl border border-rose-100 bg-rose-50/60 p-5 sm:p-6">
                      <div className="flex items-center gap-2 text-rose-700">
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-white ring-1 ring-rose-200">▲</span>
                        <h3 className="text-lg sm:text-xl font-semibold">So, what's our angle?</h3>
                      </div>
                      <p className="mt-3 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-rose-900/90">
                        There isn't one. Our job isn't to tell you who the good guys and bad guys are. It's to show you what happened, gather facts from all credible sides, and lay them out clearly. We dig for context and we search for truth. The rest is up to you.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-sky-100 bg-sky-50/60 p-5 sm:p-6">
                      <div className="flex items-center gap-2 text-sky-700">
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-white ring-1 ring-sky-200">✦</span>
                        <h3 className="text-lg sm:text-xl font-semibold">Who's pulling the strings?</h3>
                      </div>
                      <p className="mt-3 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-sky-900/90">
                        Nobody. We're self-funded and reader-supported. That means no advertisers telling us what to write. No investors demanding we chase cheap clicks. No political donors shaping our coverage. This independence is everything to us. It’s non-negotiable.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5 sm:p-6 sm:col-span-2">
                      <div className="flex items-center gap-2 text-emerald-700">
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-white ring-1 ring-emerald-200">✓</span>
                        <h3 className="text-lg sm:text-xl font-semibold">What happens when you get something wrong?</h3>
                      </div>
                      <p className="mt-3 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-emerald-900/90">
                        We own it. We’re human, and mistakes will happen. Hiding them isn't an option. When we mess up a fact, we’ll issue a correction, explain what went wrong, and make it easy to find on our{" "}
                        <Link href="/correction-policy" className="font-medium underline decoration-emerald-400 underline-offset-4 hover:decoration-emerald-700">
                          <span className="font-semibold">Correction Policy</span>
                        </Link>{" "}
                        page. You can hold us to that.
                      </p>
                    </div>
                  </div>
                </section>

                <div className="my-10 h-px w-full bg-neutral-200" />

                <section aria-labelledby="beginning" className="space-y-6">
                  <h2 id="beginning" className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">This is Just the Beginning</h2>
                  <p className="text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-neutral-800">
                    We're building this for people who are tired of the noise and hungry for real information. If that sounds like you, you're in the right place.
                  </p>
                  <p className="text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-neutral-800">
                    Stick around. Read our work. Hold us accountable. Let's demand more from our news.
                  </p>
                  <p className="mt-2 text-base sm:text-lg md:text-xl font-semibold text-neutral-900">— The Team at Chroniq Now</p>
                </section>

                <div className="mt-10 overflow-hidden rounded-2xl bg-gradient-to-r from-rose-500 via-fuchsia-500 to-sky-500 p-[2px]">
                  <div className="rounded-[calc(theme(radius.2xl)-2px)] bg-neutral-900 px-5 py-6 sm:px-8 sm:py-7">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-sm sm:text-[0.95rem] text-white/90">Want to reach us or flag a correction? We welcome it.</p>
                      <div className="flex flex-wrap gap-2">
                        <Link href="mailto:contact@chroniqnow.com" className="inline-flex items-center justify-center rounded-xl bg-white/95 px-4 py-2 text-sm sm:text-[0.95rem] font-semibold text-neutral-900 hover:bg-white">Email Us</Link>
                        <Link href="/correction-policy" className="inline-flex items-center justify-center rounded-xl border border-white/30 px-4 py-2 text-sm sm:text-[0.95rem] font-semibold text-white hover:bg-white/10">Read Corrections Policy</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </main>
        <Footer />
      </div>
    </>
  );
}