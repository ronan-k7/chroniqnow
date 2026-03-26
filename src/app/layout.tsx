import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* ─── GLOBAL METADATA ─── */
export const metadata: Metadata = {
  metadataBase: new URL("https://www.chroniqnow.com"),
  title: {
    template: "%s | Chroniq Now",
    default: "Chroniq Now | Breaking Global News and Headlines Daily",
  },
  description:
    "Chroniq Now delivers breaking news, in-depth analysis, and up-to-the-minute coverage of global events.",

  // ADD: Global robots default — prevents accidental mis-crawling
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  // ADD: Global OG fallback — used when a page doesn't set its own OG data
  openGraph: {
    siteName: "Chroniq Now",
    locale: "en_US",
    type: "website",
  },

  // ADD: Favicon
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

/* ─── VIEWPORT CONFIGURATION ─── */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}