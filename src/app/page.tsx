import HomaPage from "@/components/HomaPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chroniq Now: Breaking Global News & Headlines Daily",
  description:
    "Chroniq Now - your trusted source for breaking global news, in-depth analysis and up-to-the-minute coverage of politics, business, culture and more.",
  authors: [{ name: "Chroniq Now Team", url: "https://www.chroniqnow.com" }],
  publisher: "Chroniq Now",
  metadataBase: new URL("https://www.chroniqnow.com"),
  alternates: {
    canonical: "https://www.chroniqnow.com/",
  },

  openGraph: {
    title: "Chroniq Now: Breaking Global News & Headlines Daily",
    description:
      "Chroniq Now - your trusted source for breaking global news, in-depth analysis and up-to-the-minute coverage of politics, business, culture and more.",
    url: "https://www.chroniqnow.com/",
    siteName: "Chroniq Now",
    images: [
      {
        url: "https://www.chroniqnow.com/images/ChroniqNow-logo.webp",
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
    images: ["https://www.chroniqnow.com/images/ChroniqNow-logo.webp"],
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: metadata.title,
        url: metadata.metadataBase?.toString() ?? "https://www.chroniqnow.com/",
      },
      {
        "@type": "WebPage",
        headline: "Home",
        url: metadata.metadataBase?.toString() ?? "https://www.chroniqnow.com/",
        // --- ADD THIS LINE ---
        isAccessibleForFree: "True", 
        // ---------------------
        keywords: [
          "chroniq now",
          "global news",
          "breaking news",
          "world headlines",
        ],
        isPartOf: {
          "@type": ["CreativeWork", "Product"],
          name: metadata.title,
          productID: "chroniqnow.com:standard",
        },
        publisher: {
          "@type": "NewsMediaOrganization",
          name: metadata.publisher,
          logo: {
            "@type": "ImageObject",
            url: "https://www.chroniqnow.com/images/chroniqnow-logo.webp",
          },
          sameAs: [
            "https://x.com/ChroniqNow",
            "https://www.instagram.com/chroniqnow/",
          ],
        },
      },
      {
        "@type": "NewsMediaOrganization",
        name: metadata.publisher,
        url: metadata.metadataBase?.toString() ?? "https://www.chroniqnow.com/",
        logo: {
          "@type": "ImageObject",
          url: "https://www.chroniqnow.com/images/chroniqnow-logo.webp",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\u003c"),
        }}
      />
      <HomaPage />
    </>
  );
}