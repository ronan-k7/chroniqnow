import HomaPage from "@/components/HomaPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chroniq Now: Breaking Global News & Headlines Daily",
  description:
    "Chroniq Now - your trusted source for breaking global news, in-depth analysis and up-to-the-minute coverage of politics, business, culture and more.",
  authors: [{ name: "Chroniq Now Team", url: "https://www.chroniqnow.com" }],
  metadataBase: new URL("https://www.chroniqnow.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Chroniq Now: Breaking Global News & Headlines Daily",
    description:
      "Chroniq Now - your trusted source for breaking global news, in-depth analysis and up-to-the-minute coverage of politics, business, culture and more.",
    url: "https://www.chroniqnow.com/",
    siteName: "Chroniq Now",
    images: [
      {
        url: "/images/ChroniqNow-logo.webp",
        width: 1200,
        height: 630,
        alt: "Chroniq Now Logo",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chroniq Now: Breaking Global News & Headlines Daily",
    description:
      "Chroniq Now - your trusted source for breaking global news, in-depth analysis and up-to-the-minute coverage of politics, business, culture and more.",
    site: "@ChroniqNow",
    images: ["/images/ChroniqNow-logo.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: "/images/ChroniqNow-logo.webp",
    shortcut: "/images/ChroniqNow-logo.webp",
    apple: "/images/ChroniqNow-logo.webp",
  },
};

export default function Home() {
  const siteTitle = "Chroniq Now: Breaking Global News & Headlines Daily";
  const siteUrl = "https://www.chroniqnow.com";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: "Chroniq Now",
        url: siteUrl,
        publisher: { "@id": `${siteUrl}/#organization` },
      },
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/#webpage`,
        url: siteUrl,
        name: siteTitle,
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": `${siteUrl}/#organization` },
        description: metadata.description,
        breadcrumb: { "@id": `${siteUrl}/#breadcrumb` },
        inLanguage: "en-US",
        isAccessibleForFree: "True",
      },
      {
        "@type": "NewsMediaOrganization",
        "@id": `${siteUrl}/#organization`,
        name: "Chroniq Now",
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/images/chroniqnow-logo.webp`,
          width: 512,
          height: 512,
        },
        sameAs: [
          "https://x.com/ChroniqNow",
          "https://www.instagram.com/chroniqnow/",
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <HomaPage />
    </>
  );
}