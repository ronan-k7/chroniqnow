import { Suspense } from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchResults from "@/components/SearchResults";

export const dynamic = "force-static";

// Search result pages shouldn't be indexed by Google (thin / duplicate content)
export const metadata: Metadata = {
  title: "Search",
  description: "Search Chroniq Now for breaking news, analysis and headlines.",
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen px-4 py-6 sm:px-8 sm:py-10 md:px-20">
        {/* useSearchParams() needs a Suspense boundary in a static export */}
        <Suspense fallback={<p className="text-gray-600">Loading…</p>}>
          <SearchResults />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
