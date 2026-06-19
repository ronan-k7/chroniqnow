import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Contact Us – Chroniq Now",
  description:
    "Get in touch with Chroniq Now. Send news tips, request corrections, or reach out with questions and feedback.",
  alternates: { canonical: "https://www.chroniqnow.com/contact" },
  openGraph: {
    title: "Contact Us",
    description:
      "Send news tips, request corrections, or reach out with questions and feedback.",
    url: "https://www.chroniqnow.com/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us",
    description:
      "Send news tips, request corrections, or reach out with questions and feedback.",
  },
};

export default function ContactPage() {
  return (
    <>
      <Script
        id="contact-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "ContactPage",
              "@id": "https://www.chroniqnow.com/contact",
              url: "https://www.chroniqnow.com/contact",
              name: "Contact Us",
              isPartOf: { "@id": "https://www.chroniqnow.com/#website" },
              inLanguage: "en",
              description:
                "Get in touch with Chroniq Now. Send news tips, request corrections, or reach out with questions and feedback.",
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
          ],
        })}
      </Script>
      <div className="bg-white min-h-screen overflow-x-hidden">
        <Navbar />
        <header className="px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8 sm:pb-12">
          <div className="mx-auto w-full max-w-6xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs sm:text-[13px] font-medium text-neutral-700">
              Contact
            </span>
            <h1 className="mt-4 text-balance text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
              Get in Touch
            </h1>
            <p className="mt-4 max-w-3xl text-pretty text-neutral-700 text-base sm:text-lg md:text-[1.15rem] leading-relaxed">
              Chroniq Now is an independent digital newsroom run by real people. We want to hear from you. Whether you have a story idea, a correction, or just want to send some feedback, here’s how to reach us.
            </p>
          </div>
        </header>

        <main className="px-4 sm:px-6 lg:px-8 pb-24">
          <article className="mx-auto w-full max-w-6xl">
            <section
              aria-label="Contact methods"
              className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">How to Reach Us</h2>
              <p className="mt-4 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-neutral-800">
                We’re a digital newsroom, but we’re run by real people. We want to hear from you. Whether you have a story idea, a correction, or just want to send some feedback, here’s how to reach us.
              </p>
              <p className="mt-4 text-sm sm:text-[0.95rem] text-neutral-600">
                We read everything, but due to the volume of messages, we can't always promise a personal reply.
              </p>
            </section>

            <div className="my-8 h-px w-full bg-neutral-200" />

            <section
              aria-label="Contact options"
              className="grid gap-4 sm:gap-6 md:grid-cols-3"
            >
              <div className="rounded-2xl border border-rose-100 bg-rose-50/60 p-5 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-rose-700">News Tips &amp; Story Ideas</h3>
                <p className="mt-2 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-rose-900/90">
                  Have a tip? See something happening that we should be covering? Send it to our editorial desk. We take source protection seriously and will never share your identity without your permission.
                </p>
                <div className="mt-4 flex items-center gap-3 whitespace-nowrap overflow-x-auto">
                  <p className="shrink-0 text-sm font-medium text-rose-800">Email:</p>
                  <Link
                    href="mailto:tips@chroniqnow.com"
                    className="shrink-0 inline-flex items-center justify-center rounded-xl bg-rose-600 px-4 py-2 text-sm sm:text-[0.95rem] font-semibold text-white hover:bg-rose-700"
                  >
                    tips@chroniqnow.com
                  </Link>
                </div>
              </div>

              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-emerald-700">Corrections</h3>
                <p className="mt-2 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-emerald-900/90">
                  If you see a factual error in one of our articles, please let us know. Accuracy is critical to us. Include the link to the article and a brief note about the error.
                </p>
                <div className="mt-4 flex items-center gap-3 whitespace-nowrap overflow-x-auto">
                  <p className="shrink-0 text-sm font-medium text-emerald-800">Email:</p>
                  <Link
                    href="mailto:corrections@chroniqnow.com"
                    className="shrink-0 inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm sm:text-[0.95rem] font-semibold text-white hover:bg-emerald-700"
                  >
                    corrections@chroniqnow.com
                  </Link>
                </div>
              </div>

              <div className="rounded-2xl border border-sky-100 bg-sky-50/60 p-5 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-sky-700">General Questions &amp; Feedback</h3>
                <p className="mt-2 text-base sm:text-[1.05rem] md:text-lg leading-relaxed text-sky-900/90">
                  For anything else—comments on our work, questions about our site, or partnership inquiries—this is the best place to start.
                </p>
                <div className="mt-4 flex items-center gap-3 whitespace-nowrap overflow-x-auto">
                  <p className="shrink-0 text-sm font-medium text-sky-800">Email:</p>
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