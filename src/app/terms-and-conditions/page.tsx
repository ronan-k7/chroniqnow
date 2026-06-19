import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Our Terms and Conditions – Chroniq Now",
  description:
    "The ground rules for using Chroniq Now — plain‑English summary and the full legal terms.",
  alternates: { canonical: "https://www.chroniqnow.com/terms-and-conditions" },
  openGraph: {
    title: "Our Terms and Conditions",
    description:
      "The ground rules for using Chroniq Now — plain‑English summary and the full legal terms.",
    url: "https://www.chroniqnow.com/terms-and-conditions",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Terms and Conditions",
    description:
      "The ground rules for using Chroniq Now — plain‑English summary and the full legal terms.",
  },
};

export default function TermsPage() {
  return (
    <>
      <Script
        id="terms-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "@id": "https://www.chroniqnow.com/terms-and-conditions",
              url: "https://www.chroniqnow.com/terms-and-conditions",
              name: "Our Terms and Conditions",
              isPartOf: { "@id": "https://www.chroniqnow.com/#website" },
              inLanguage: "en",
              description:
                "The ground rules for using ChroniqNow — plain‑English summary and the full legal terms.",
              breadcrumb: {
                "@id":
                  "https://www.chroniqnow.com/terms-and-conditions#breadcrumb",
              },
              mainEntity: {
                "@id": "https://www.chroniqnow.com/terms-and-conditions#tos",
              },
              publisher: { "@id": "https://www.chroniqnow.com/#newsorg" },
            },
            {
              "@type": "TermsOfService",
              "@id": "https://www.chroniqnow.com/terms-and-conditions#tos",
              url: "https://www.chroniqnow.com/terms-and-conditions",
              name: "Our Terms and Conditions",
              dateModified: "2025-08-16",
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
              privacyPolicy: "https://www.chroniqnow.com/privacy-policy",
            },
            {
              "@type": "BreadcrumbList",
              "@id":
                "https://www.chroniqnow.com/terms-and-conditions#breadcrumb",
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
                  name: "Our Terms and Conditions",
                  item: "https://www.chroniqnow.com/terms-and-conditions",
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
              Legal
            </span>
            <h1 className="mt-4 text-balance text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
              Our Terms and Conditions
            </h1>
            <p className="mt-3 text-sm sm:text-[0.95rem] text-neutral-600">
              Last Updated: <span className="font-semibold">June 19, 2026</span>
            </p>
            <p className="mt-5 max-w-3xl text-pretty text-neutral-700 text-base sm:text-lg md:text-[1.05rem] leading-relaxed">
              This page outlines the ground rules for using the Chroniq Now website. We’ve done our best to keep it simple and straightforward.
            </p>
          </div>
        </header>

        <main className="px-4 sm:px-6 lg:px-8 pb-24">
          <article className="mx-auto w-full max-w-6xl">
            <section
              aria-labelledby="plain-english"
              className="rounded-2xl border border-amber-100 bg-amber-50/60 p-6 sm:p-8"
            >
              <h2 id="plain-english" className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-amber-800">
                The Plain English Version
              </h2>
              <ul className="mt-4 space-y-3 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-amber-900/90">
                <li>
                  <span className="font-semibold">Our Content is Ours:</span> We work hard on our articles, photos, and graphics. Please don't steal our content. You're welcome to share links to it, and you can quote short excerpts as long as you give clear credit and link back to the original article on our site.
                </li>
                <li>
                  <span className="font-semibold">Be a Good Human:</span> Please use our site for its intended purpose—to read and engage with the news. Don't use it to do anything illegal, to spam people, or to post abusive or hateful comments. We reserve the right to remove any content or block users who violate this simple rule.
                </li>
                <li>
                  <span className="font-semibold">We're Not Giving Legal/Financial/Etc. Advice:</span> We are a news site providing general information. Our content should not be taken as professional advice.
                </li>
                <li>
                  <span className="font-semibold">We Can Change These Rules:</span> The digital world changes, and we may need to update these terms in the future.
                </li>
              </ul>
              <p className="mt-4 text-sm sm:text-[0.95rem] text-amber-900/90">
                That’s the core of it. The more detailed legal version is below.
              </p>
            </section>

            <div className="my-8 h-px w-full bg-neutral-200" />

            <section aria-labelledby="official-terms" className="space-y-6">
              <h2 id="official-terms" className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                The Official Terms
              </h2>

              <div className="rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-neutral-900">1. Agreement to Terms</h3>
                <p className="mt-2 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-neutral-800">
                  By accessing and using our website, <Link href="/" className="font-medium underline underline-offset-4">https://www.chroniqnow.com</Link> (referred to as the "Service"), you agree to be bound by these Terms and Conditions ("Terms"). If you disagree with any part of the terms, then you may not access the Service.
                </p>
              </div>

              <div className="rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-neutral-900">2. Intellectual Property Rights</h3>
                <p className="mt-2 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-neutral-800">
                  The Service and its original content, including articles, logos, graphics, and features, are the exclusive property of Chroniq Now and its licensors. Our content is protected by copyright and other intellectual property laws. You may not copy, reproduce, distribute, or create derivative works from our content without our express prior written permission.
                </p>
              </div>

              <div className="rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-neutral-900">3. Acceptable Use</h3>
                <p className="mt-2 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-neutral-800">
                  You agree not to use the Service for any unlawful purpose or in any way that could harm the Service or its users. This includes, but is not limited to:
                </p>
                <ul className="mt-3 list-disc pl-6 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-neutral-800 space-y-1.5">
                  <li>Posting or transmitting any material which is defamatory, obscene, or abusive.</li>
                  <li>Distributing viruses, malware, or any other malicious code.</li>
                  <li>Attempting to gain unauthorized access to our systems.</li>
                  <li>Infringing upon the intellectual property rights of others.</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-neutral-900">4. A Quick Word on Our Content</h3>
                <p className="mt-2 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-neutral-800">
                  We're journalists, not fortune tellers or financial advisors. We work incredibly hard to make sure our reporting is accurate and fair. However, the world is a complex, fast-changing place. Information can become outdated. For this reason, all content on this site is provided for general informational purposes. It's not a substitute for professional advice, and you should not make big life decisions based solely on what you read here. Using our site means you understand that you are responsible for how you interpret and use our information.
                </p>
              </div>

              <div className="rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-neutral-900">5. Limitation of Liability</h3>
                <p className="mt-2 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-neutral-800">
                  In no event shall Chroniq Now, nor its team members or partners, be liable for any indirect, incidental, special, or consequential damages resulting from your use of, or inability to use, the Service.
                </p>
              </div>

              <div className="rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-neutral-900">6. Links to Other Websites</h3>
                <p className="mt-2 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-neutral-800">
                  Our Service may contain links to third-party websites that are not owned or controlled by Chroniq Now. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites.
                </p>
              </div>

              <div className="rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-neutral-900">7. Changes to These Terms</h3>
                <p className="mt-2 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-neutral-800">
                  We reserve the right to modify or replace these Terms at any time. We will indicate any changes by updating the "Last Updated" date at the top of this page.
                </p>
              </div>

              <div className="rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-neutral-900">8. Governing Law</h3>
                <p className="mt-2 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-neutral-800">
                  These Terms shall be governed in accordance with the laws of United States, without regard to its conflict of law provisions.
                </p>
              </div>

              <div className="rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-neutral-900">9. Contact Us</h3>
                <p className="mt-2 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-neutral-800">
                  If you have any questions about these Terms, please contact us.
                </p>
                <div className="mt-3 flex items-center gap-3 whitespace-nowrap overflow-x-auto">
                  <p className="shrink-0 text-sm font-medium text-neutral-900">Email:</p>
                  <Link
                    href="mailto:contact@chroniqnow.com"
                    className="shrink-0 inline-flex items-center justify-center rounded-xl bg-sky-600 px-4 py-2 text-sm sm:text-[0.95rem] font-semibold text-white hover:bg-sky-700"
                  >
                    contact@chroniqnow.com
                  </Link>
                </div>
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