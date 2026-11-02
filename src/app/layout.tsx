
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

  // GOOGLE SEARCH CONSOLE VERIFICATION
  verification: {
    google: "t25L4jf3uJb4nlVvVBj4u-a5kkY1J6C-h-paaC4vDMg",
  },

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

  openGraph: {
    siteName: "Chroniq Now",
    locale: "en_US",
    type: "website",
  },

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
