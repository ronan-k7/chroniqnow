import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#F0F0F0] text-sm text-gray-800 px-4 py-10">
      <div className="max-w-6xl mx-auto text-center">
        {/* Brand & Copyright */}
        <div className="text-3xl font-semibold text-center mb-2 uppercase">
          <Link href="/" className="cursor-pointer" title="Chroniq Now">
            Chroniq Now
          </Link>
        </div>
        <p className="text-xs text-gray-600 text-center mb-6">
          © 2026 Chroniq Now Media LLC. All Rights Reserved.
        </p>

        {/* Divider */}
        <div className="block md:hidden h-px bg-gray-300 w-4/5 mx-auto mb-4" />

        {/* First row: Main navigation – wraps on mobile, no scroll */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm mb-4">
          <Link href="/" className="shrink-0" title="Home">HOME</Link>
          <Link href="/business" className="shrink-0" title="Business">BUSINESS</Link>
          <Link href="/health" className="shrink-0" title="Health">HEALTH</Link>
          <Link href="/politics" className="shrink-0" title="Politics">POLITICS</Link>
          <Link href="/science" className="shrink-0" title="Science">SCIENCE</Link>
          <Link href="/sports" className="shrink-0" title="Sports">SPORTS</Link>
          <Link href="/technology" className="shrink-0" title="Technology">TECHNOLOGY</Link>
          <Link href="/puerto-rico" className="shrink-0" title="Puerto Rico">PUERTO RICO</Link>
          <Link href="/about" className="shrink-0" title="About">ABOUT</Link>
          <Link href="/privacy-policy" className="shrink-0" title="Privacy Policy">PRIVACY POLICY</Link>
        </div>

        {/* Divider between rows */}
        <div className="h-px bg-gray-300 w-full max-w-xs mx-auto mb-4" />

        {/* Second row: Policy & team pages – scrollable on mobile, wraps on desktop */}
        <div
          className="flex flex-nowrap md:flex-wrap overflow-x-auto md:overflow-visible gap-x-6 gap-y-2 text-sm pb-2 md:pb-0 [-webkit-overflow-scrolling:touch] scrollbar-hide justify-start md:justify-center"
        >
          <Link href="/our-team" className="shrink-0" title="Our Team">OUR TEAM</Link>
          <Link href="/contact" className="shrink-0" title="Contact Us">CONTACT US</Link>
          <Link href="/editorial-policy" className="shrink-0" title="Editorial Policy">EDITORIAL POLICY</Link>
          <Link href="/correction-policy" className="shrink-0" title="Corrections Policy">CORRECTIONS POLICY</Link>
          <Link href="/source-methodology" className="shrink-0" title="Source Methodology">SOURCE METHODOLOGY</Link>
          <Link href="/ownership-and-funding" className="shrink-0" title="Ownership & Funding">OWNERSHIP &amp; FUNDING</Link>
          <Link href="/advertising-and-sponsored-content-policy" className="shrink-0" title="Advertising Policy">ADVERTISING POLICY</Link>
          <Link href="/right-of-reply-policy" className="shrink-0" title="Right of Reply">RIGHT OF REPLY</Link>
          <Link href="/legal" className="shrink-0" title="Legal">LEGAL</Link>
          <Link href="/terms-and-conditions" className="shrink-0" title="Terms & Conditions">TERMS &amp; CONDITIONS</Link>
        </div>
      </div>
    </footer>
  );
}