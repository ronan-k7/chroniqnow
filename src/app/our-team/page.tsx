import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "The People Behind the News – Chroniq Now Team",
  description:
    "Meet the Chroniq Now team: the journalists, editors, and on-the-ground reporters behind the stories.",
  alternates: { canonical: "https://www.chroniqnow.com/our-team" },
  openGraph: {
    title: "The People Behind the News",
    description:
      "Meet the journalists and editors building Chroniq Now every day.",
    url: "https://www.chroniqnow.com/our-team",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The People Behind the News",
    description:
      "Meet the journalists and editors building Chroniq Now every day.",
  },
};

export default function OurTeamPage() {
  return (
    <>
      <div className="bg-white min-h-screen overflow-x-hidden">
        <Navbar />

        <header className="px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8 sm:pb-12">
          <div className="mx-auto w-full max-w-6xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs sm:text-[13px] font-medium text-neutral-700">
              Our Team
            </span>
            <h1 className="mt-4 text-balance text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
              The People Behind the News
            </h1>
            <p className="mt-4 max-w-3xl text-pretty text-neutral-700 text-base sm:text-lg md:text-[1.15rem] leading-relaxed">
              This is us. We’re the team that builds Chroniq Now every day. We
              got into this line of work to report the truth, and we started
              this site to create a place where that&apos;s all that matters.
            </p>
          </div>
        </header>

        <main className="px-4 sm:px-6 lg:px-8">
          <article className="mx-auto w-full max-w-6xl">
            <section
              aria-label="Team members"
              className="grid gap-5 sm:gap-6 md:grid-cols-2"
            >
              {/* Chelsea M. Wheatley */}
              <div className="rounded-2xl border border-rose-100 bg-rose-50/60 p-5 sm:p-6">
                <div className="grid grid-cols-[96px_1fr] sm:grid-cols-[128px_1fr] gap-4 items-start">
                  <div className="overflow-hidden rounded-xl border border-rose-200 bg-white">
                    <Image
                      src="/images/chelsea-m-wheatley.webp"
                      alt="Portrait of Chelsea M. Wheatley"
                      width={512}
                      height={512}
                      className="h-24 w-24 sm:h-32 sm:w-32 object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-xl sm:text-2xl font-semibold text-rose-700">
                      Chelsea M. Wheatley
                    </h2>
                    <p className="mt-2 text-base sm:text-[1.05rem] leading-relaxed text-rose-900/90">
                      Chelsea is our deep-dive investigative journalist. She dedicates months to untangling a single narrative, speaking with scores of sources to assemble the complete picture. Her conviction is that the authentic story, the one of genuine consequence, is rarely the first version you hear.
                    </p>
                    <div className="mt-3">
                      <Link
                        href="/our-team/chelsea-wheatley"
                        className="inline-flex items-center gap-1 rounded-xl bg-rose-600 px-4 py-2 text-sm sm:text-[0.95rem] font-semibold text-white hover:bg-rose-700"
                      >
                        See Chelsea&apos;s work →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Kenneth M. Butts */}
              <div className="rounded-2xl border border-sky-100 bg-sky-50/60 p-5 sm:p-6">
                <div className="grid grid-cols-[96px_1fr] sm:grid-cols-[128px_1fr] gap-4 items-start">
                  <div className="overflow-hidden rounded-xl border border-sky-200 bg-white">
                    <Image
                      src="/images/kenneth-m-butts.webp"
                      alt="Portrait of Kenneth M. Butts"
                      width={512}
                      height={512}
                      className="h-24 w-24 sm:h-32 sm:w-32 object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-xl sm:text-2xl font-semibold text-sky-700">
                      Kenneth M. Butts
                    </h2>
                    <p className="mt-2 text-base sm:text-[1.05rem] leading-relaxed text-sky-900/90">
                      Kenneth thrives on unravelling complexity. He transforms reams of data, intricate policy, or opaque scientific studies into clear, engaging narratives. He believes you shouldn't need a specialised degree to grasp the forces shaping your world.
                    </p>
                    <div className="mt-3">
                      <Link
                        href="/our-team/kenneth-butts"
                        className="inline-flex items-center gap-1 rounded-xl bg-sky-600 px-4 py-2 text-sm sm:text-[0.95rem] font-semibold text-white hover:bg-sky-700"
                      >
                        See Kenneth&apos;s work →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Antonio M. Davis */}
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5 sm:p-6">
                <div className="grid grid-cols-[96px_1fr] sm:grid-cols-[128px_1fr] gap-4 items-start">
                  <div className="overflow-hidden rounded-xl border border-emerald-200 bg-white">
                    <Image
                      src="/images/antonio-m-davis.webp"
                      alt="Portrait of Antonio M. Davis"
                      width={512}
                      height={512}
                      className="h-24 w-24 sm:h-32 sm:w-32 object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-xl sm:text-2xl font-semibold text-emerald-700">
                      Antonio M. Davis
                    </h2>
                    <p className="mt-2 text-base sm:text-[1.05rem] leading-relaxed text-emerald-900/90">
                      Antonio serves as our in‑house fact‑checker and ethical guardian. He poses the difficult questions prior to publication: "Have we consulted all parties? Is this balanced? Can we corroborate this with another source?" He entered journalism when standards were non‑negotiable, and he ensures they remain so at Chroniq Now.
                    </p>
                    <div className="mt-3">
                      <Link
                        href="/our-team/antonio-davis"
                        className="inline-flex items-center gap-1 rounded-xl bg-emerald-600 px-4 py-2 text-sm sm:text-[0.95rem] font-semibold text-white hover:bg-emerald-700"
                      >
                        See Antonio&apos;s work →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Arthur A. Johnson */}
              <div className="rounded-2xl border border-amber-100 bg-amber-50/60 p-5 sm:p-6">
                <div className="grid grid-cols-[96px_1fr] sm:grid-cols-[128px_1fr] gap-4 items-start">
                  <div className="overflow-hidden rounded-xl border border-amber-200 bg-white">
                    <Image
                      src="/images/arthur-a-johnson.webp"
                      alt="Portrait of Arthur A. Johnson"
                      width={512}
                      height={512}
                      className="h-24 w-24 sm:h-32 sm:w-32 object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-xl sm:text-2xl font-semibold text-amber-700">
                      Arthur A. Johnson
                    </h2>
                    <p className="mt-2 text-base sm:text-[1.05rem] leading-relaxed text-amber-900/90">
                      Arthur insists that the most vital journalism happens away from a desk. He is committed to being on the ground, embedded in communities, listening to voices frequently overlooked. His work reveals the human repercussions of headlines, exposing the real‑world impact behind the news.
                    </p>
                    <div className="mt-3">
                      <Link
                        href="/our-team/arthur-johnson"
                        className="inline-flex items-center gap-1 rounded-xl bg-amber-600 px-4 py-2 text-sm sm:text-[0.95rem] font-semibold text-white hover:bg-amber-700"
                      >
                        See Arthur&apos;s work →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hope M. Pender */}
              <div className="rounded-2xl border border-indigo-100 bg-indigo-50/60 p-5 sm:p-6">
                <div className="grid grid-cols-[96px_1fr] sm:grid-cols-[128px_1fr] gap-4 items-start">
                  <div className="overflow-hidden rounded-xl border border-indigo-200 bg-white">
                    <Image
                      src="/images/hope-m-pender.webp"
                      alt="Portrait of Hope M. Pender"
                      width={512}
                      height={512}
                      className="h-24 w-24 sm:h-32 sm:w-32 object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-xl sm:text-2xl font-semibold text-indigo-700">
                      Hope M. Pender
                    </h2>
                    <p className="mt-2 text-base sm:text-[1.05rem] leading-relaxed text-indigo-900/90">
                      Hope is our expert on intricate subjects. Whether it's a cutting‑edge technology or a dense environmental assessment, she distills it so it's not merely comprehensible but genuinely compelling. She perpetually asks the reader's core question: "Why does this matter to me?"
                    </p>
                    <div className="mt-3">
                      <Link
                        href="/our-team/hope-pender"
                        className="inline-flex items-center gap-1 rounded-xl bg-indigo-600 px-4 py-2 text-sm sm:text-[0.95rem] font-semibold text-white hover:bg-indigo-700"
                      >
                        See Hope&apos;s work →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Jennifer Albright */}
              <div className="rounded-2xl border border-violet-100 bg-violet-50/60 p-5 sm:p-6">
                <div className="grid grid-cols-[96px_1fr] sm:grid-cols-[128px_1fr] gap-4 items-start">
                  <div className="overflow-hidden rounded-xl border border-violet-200 bg-white">
                    <Image
                      src="/images/jennifer-albright.webp"
                      alt="Portrait of Jennifer Albright"
                      width={512}
                      height={512}
                      className="h-24 w-24 sm:h-32 sm:w-32 object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-xl sm:text-2xl font-semibold text-violet-700">
                      Jennifer Albright
                    </h2>
                    <p className="mt-2 text-base sm:text-[1.05rem] leading-relaxed text-violet-900/90">
                      Jennifer is the heartbeat of our newsroom, our specialist for the fast‑breaking story. She excels at sifting through the clamour of the 24‑hour news cycle to deliver what you need to know, right now. Her principle is that in a breaking situation, clarity is as vital as speed, ensuring readers receive facts without the alarm.
                    </p>
                    <div className="mt-3">
                      <Link
                        href="/our-team/jennifer-albright"
                        className="inline-flex items-center gap-1 rounded-xl bg-violet-600 px-4 py-2 text-sm sm:text-[0.95rem] font-semibold text-white hover:bg-violet-700"
                      >
                        See Jennifer&apos;s work →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mt-10 rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                A Note on the 'Chroniq Now Staff' Byline
              </h2>

              <p className="mt-4 text-base sm:text-[1.05rem] leading-relaxed text-neutral-800">
                You&apos;ll sometimes see an article from "Chroniq Now Staff." Here’s what that means:
              </p>

              <ul className="mt-4 list-disc pl-6 text-base sm:text-[1.05rem] leading-relaxed text-neutral-800 space-y-2">
                <li>
                  <span className="font-semibold">A Story is a Team Effort:</span> The article was a group project by several of our journalists, where one name on the byline wouldn&apos;t do the work justice.
                </li>
                <li>
                  <span className="font-semibold">It&apos;s a Brief or Press Release:</span> The article is a short, factual news update or a verified summary of an official announcement.
                </li>
                <li>
                  <span className="font-semibold">To keep a writer safe:</span> In rare situations, a story can be too sensitive or dangerous to attach a single name to. If a journalist could be put at risk, we will use the staff byline to protect them.
                </li>
              </ul>

              <p className="mt-4 text-base sm:text-[1.05rem] leading-relaxed text-neutral-800">
                No matter whose name is on the article—an individual&apos;s or the team&apos;s—it goes through the same rigorous editing and fact-checking process laid out in our{" "}
                <Link
                  href="/editorial-policy"
                  className="font-medium underline underline-offset-4"
                >
                  Editorial Policy
                </Link>
                . Our standards don&apos;t change.
              </p>
            </section>

            <div className="mt-10" />
          </article>
        </main>

        <Footer />
      </div>

      <Script
        id="our-team-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "CollectionPage",
              "@id": "https://www.chroniqnow.com/our-team",
              url: "https://www.chroniqnow.com/our-team",
              name: "The People Behind the News",
              isPartOf: { "@id": "https://www.chroniqnow.com/#website" },
              inLanguage: "en",
              description:
                "Meet the Chroniq Now team: long-form reporters, explainers, fact-checkers, and on-the-ground journalists.",
              breadcrumb: {
                "@id": "https://www.chroniqnow.com/our-team#breadcrumb",
              },
              publisher: { "@id": "https://www.chroniqnow.com/#newsorg" },
            },
            // Person entries for each team member omitted for brevity (they are in the original)
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
              sameAs: [],
            },
            {
              "@type": "BreadcrumbList",
              "@id": "https://www.chroniqnow.com/our-team#breadcrumb",
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
                  name: "The People Behind the News",
                  item: "https://www.chroniqnow.com/our-team",
                },
              ],
            },
          ],
        })}
      </Script>
    </>
  );
}