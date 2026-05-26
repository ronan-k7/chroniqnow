import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how Chroniq Now collects, uses, and protects your personal information. We are committed to transparency and safeguarding reader privacy.",
  alternates: { canonical: "https://www.chroniqnow.com/privacy-policy" },
  openGraph: {
    title: "Privacy Policy",
    description:
      "Learn how Chroniq Now protects your privacy and handles personal information responsibly.",
    url: "https://www.chroniqnow.com/privacy-policy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy",
    description:
      "How Chroniq Now safeguards privacy while delivering independent news.",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Script
        id="privacy-policy-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "@id": "https://www.chroniqnow.com/privacy-policy",
              url: "https://www.chroniqnow.com/privacy-policy",
              name: "Privacy Policy",
              isPartOf: { "@id": "https://www.chroniqnow.com/#website" },
              inLanguage: "en",
              description:
                "Learn how Chroniq Now collects, uses, and protects your personal information. We are committed to transparency and safeguarding reader privacy.",
              breadcrumb: {
                "@id": "https://www.chroniqnow.com/privacy-policy#breadcrumb",
              },
              mainEntity: {
                "@id": "https://www.chroniqnow.com/privacy-policy#policy",
              },
              publisher: { "@id": "https://www.chroniqnow.com/#newsorg" },
            },
            {
              "@type": "PrivacyPolicy",
              "@id": "https://www.chroniqnow.com/privacy-policy#policy",
              url: "https://www.chroniqnow.com/privacy-policy",
              name: "Privacy Policy",
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
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  contactType: "editorial",
                  email: "contact@chroniqnow.com",
                  areaServed: "Worldwide",
                  availableLanguage: ["en"],
                },
                {
                  "@type": "ContactPoint",
                  contactType: "news tips",
                  email: "tips@chroniqnow.com",
                  areaServed: "Worldwide",
                  availableLanguage: ["en"],
                },
              ],
            },
            {
              "@type": "BreadcrumbList",
              "@id": "https://www.chroniqnow.com/privacy-policy#breadcrumb",
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
                  name: "Privacy Policy",
                  item: "https://www.chroniqnow.com/privacy-policy",
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
            <h1 className="mt-4 text-balance text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
              Privacy Policy
            </h1>
            <p className="mt-4 max-w-3xl text-pretty text-neutral-700 text-base sm:text-lg md:text-[1.15rem] leading-relaxed">
              <span className="font-semibold">Chroniq Now</span> values reader
              trust. We collect only limited information necessary to operate
              our newsroom, communicate with readers, and improve our
              journalism. This policy explains what we collect, why we collect
              it, and how we protect it.
            </p>
          </div>
        </header>

        <main className="px-4 sm:px-6 lg:px-8">
          <article className="mx-auto w-full max-w-6xl space-y-0">

            {/* Section 1 — Information We Collect */}
            <section
              aria-labelledby="what-we-collect"
              className="rounded-2xl border border-sky-100 bg-sky-50/60 p-6 sm:p-8"
            >
              <h2
                id="what-we-collect"
                className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-sky-800"
              >
                Information We Collect
              </h2>
              <p className="mt-4 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-sky-900/90">
                When you visit our website, basic technical data such as pages
                viewed, device type, and browser information may be collected
                automatically. This information helps us understand readership
                patterns and improve site performance.
              </p>
              <p className="mt-3 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-sky-900/90">
                If you contact us directly — for tips, corrections, or
                inquiries — we collect only the information you choose to
                provide, such as your name and email address.
              </p>
              <p className="mt-3 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-sky-900/90">
                We do not collect unnecessary personal data, and we do not sell
                or trade user information.
              </p>
            </section>

            <div className="my-8 h-px w-full bg-neutral-200" />

            {/* Section 2 — How Information Is Used */}
            <section
              aria-labelledby="how-we-use"
              className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-6 sm:p-8"
            >
              <h2
                id="how-we-use"
                className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-emerald-800"
              >
                How Information Is Used
              </h2>
              <ul className="mt-4 space-y-2 list-disc list-inside text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-emerald-900/90">
                <li>To keep the website operating smoothly and securely.</li>
                <li>To understand which stories resonate with readers.</li>
                <li>To respond to messages, tips, or correction requests.</li>
                <li>To provide updates when readers request them.</li>
              </ul>
              <p className="mt-4 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-emerald-900/90">
                We do not use personal data for advertising sales, profiling,
                or promotional targeting.
              </p>
            </section>

            <div className="my-8 h-px w-full bg-neutral-200" />

            {/* Section 3 — Cookies and Analytics */}
            <section
              aria-labelledby="cookies-analytics"
              className="rounded-2xl border border-amber-100 bg-amber-50/60 p-6 sm:p-8"
            >
              <h2
                id="cookies-analytics"
                className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-amber-800"
              >
                Cookies and Analytics
              </h2>
              <p className="mt-4 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-amber-900/90">
                We use cookies and analytics tools to understand how readers
                interact with our content. You may disable cookies in your
                browser without affecting access to our reporting.
              </p>
              <p className="mt-3 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-amber-900/90">
                Third-party analytics services may process anonymized data
                under their own privacy policies.
              </p>
            </section>

            <div className="my-8 h-px w-full bg-neutral-200" />

            {/* Section 4 — Data Protection */}
            <section
              aria-labelledby="data-protection"
              className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8"
            >
              <h2
                id="data-protection"
                className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight"
              >
                Data Protection
              </h2>
              <p className="mt-4 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-neutral-800">
                We take reasonable technical and organizational measures to
                protect information from unauthorized access. Because we limit
                the data we collect, we also limit exposure and risk.
              </p>
              <p className="mt-3 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-neutral-800">
                Chroniq Now collects as little information as possible, uses it
                only to support journalism, and never sells personal data.
              </p>
            </section>

            <div className="my-8 h-px w-full bg-neutral-200" />

            {/* Section 5 — Your Rights and Choices */}
            <section
              aria-labelledby="your-rights"
              className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8"
            >
              <h2
                id="your-rights"
                className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight"
              >
                Your Rights and Choices
              </h2>
              <p className="mt-4 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-neutral-800">
                Depending on your jurisdiction, you may have rights to access,
                correct, or request deletion of personal data. Requests can be
                submitted using the contact below.
              </p>

              <div
                className="mt-5 flex items-center gap-3 whitespace-nowrap overflow-x-auto"
                aria-label="Contact email"
              >
                <p className="shrink-0 text-sm font-medium text-neutral-900">
                  Email:
                </p>
                <Link
                  href="mailto:contact@chroniqnow.com"
                  className="shrink-0 inline-flex items-center justify-center rounded-xl bg-sky-600 px-4 py-2 text-sm sm:text-[0.95rem] font-semibold text-white hover:bg-sky-700"
                >
                  contact@chroniqnow.com
                </Link>
              </div>

              <p className="mt-6 text-sm sm:text-[0.95rem] text-neutral-600">
                This policy was last updated on{" "}
                <span className="font-semibold">May 26, 2026</span>.
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