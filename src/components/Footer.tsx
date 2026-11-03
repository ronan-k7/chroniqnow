import Link from "next/link";
import Image from "next/image";

type FooterLink = { href: string; label: string; title: string };

const mainLinks: FooterLink[] = [
  { href: "/", label: "HOME", title: "Home" },
  { href: "/business", label: "BUSINESS", title: "Business" },
  { href: "/health", label: "HEALTH", title: "Health" },
  { href: "/politics", label: "POLITICS", title: "Politics" },
  { href: "/science", label: "SCIENCE", title: "Science" },
  { href: "/sports", label: "SPORTS", title: "Sports" },
  { href: "/technology", label: "TECHNOLOGY", title: "Technology" },
  { href: "/puerto-rico", label: "PUERTO RICO", title: "Puerto Rico" },
  { href: "/about", label: "ABOUT", title: "About" },
  { href: "/privacy-policy", label: "PRIVACY POLICY", title: "Privacy Policy" },
];

const policyLinksTop: FooterLink[] = [
  { href: "/our-team", label: "OUR TEAM", title: "Our Team" },
  { href: "/contact", label: "CONTACT US", title: "Contact Us" },
  { href: "/editorial-policy", label: "EDITORIAL POLICY", title: "Editorial Policy" },
  { href: "/correction-policy", label: "CORRECTIONS POLICY", title: "Corrections Policy" },
  { href: "/source-methodology", label: "SOURCE METHODOLOGY", title: "Source Methodology" },
  { href: "/ownership-and-funding", label: "OWNERSHIP & FUNDING", title: "Ownership & Funding" },
  { href: "/advertising-and-sponsored-content-policy", label: "ADVERTISING POLICY", title: "Advertising Policy" },
];

const policyLinksBottom: FooterLink[] = [
  { href: "/right-of-reply-policy", label: "RIGHT OF REPLY", title: "Right of Reply" },
  { href: "/legal", label: "LEGAL", title: "Legal" },
  { href: "/terms-and-conditions", label: "TERMS & CONDITIONS", title: "Terms & Conditions" },
];

/**
 * Renders a centered row of links. On large screens a thin red vertical
 * divider is drawn between items (never before the first item of the row);
 * on smaller screens the links simply wrap with even spacing.
 */
function LinkRow({
  links,
  className = "",
  linkClassName = "",
}: {
  links: FooterLink[];
  className?: string;
  linkClassName?: string;
}) {
  return (
    <ul
      className={`flex flex-wrap justify-center gap-x-5 gap-y-3 lg:gap-x-0 ${className}`}
    >
      {links.map((link) => (
        <li
          key={link.href}
          className="lg:border-l lg:border-[#C1121F] lg:first:border-l-0 lg:px-5 leading-none"
        >
          <Link
            href={link.href}
            title={link.title}
            className={`uppercase tracking-tight text-gray-900 transition-colors hover:text-[#B30D1D] ${linkClassName}`}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Footer() {
  return (
    <footer className="text-gray-900">
      {/* ───────── Top section (white) ───────── */}
      <div className="bg-white px-4 pt-10 pb-10 md:pt-12 md:pb-12">
        <div className="mx-auto max-w-7xl">
          {/* Logo */}
          <div className="flex justify-center mb-8 md:mb-10">
            <Link href="/" className="cursor-pointer" title="Chroniq Now">
              <Image
                src="/images/chroniq-now-logo.webp"
                alt="Chroniq Now"
                width={696}
                height={118}
                className="block h-9 w-auto md:h-12"
              />
            </Link>
          </div>

          {/* Main navigation */}
          <nav aria-label="Footer main navigation">
            <LinkRow
              links={mainLinks}
              linkClassName="text-[13px] md:text-[15px] font-medium"
            />
          </nav>

          {/* Red divider */}
          <div className="mt-5 mb-5 h-px w-full bg-[#C1121F]" />

          {/* Policy & team navigation */}
          <nav aria-label="Footer policy navigation" className="space-y-3">
            {/* Mobile / tablet: one flowing group */}
            <LinkRow
              links={[...policyLinksTop, ...policyLinksBottom]}
              className="lg:hidden"
              linkClassName="text-[12px] md:text-[13px] font-medium"
            />

            {/* Desktop: two tidy lines, exactly like the design */}
            <div className="hidden lg:block space-y-4">
              <LinkRow
                links={policyLinksTop}
                linkClassName="text-[13px] font-medium"
              />
              <LinkRow
                links={policyLinksBottom}
                linkClassName="text-[13px] font-medium"
              />
            </div>
          </nav>
        </div>
      </div>

      {/* ───────── Bottom bar (light grey) ───────── */}
      <div className="bg-[#F5F5F5] px-4 pt-7 pb-8">
        <div className="mx-auto flex max-w-7xl items-center gap-6">
          <span className="hidden sm:block h-px flex-1 bg-gray-400" />
          <p className="text-center font-serif text-sm md:text-base text-gray-900">
            © 2026 Chroniq Now Media LLC. All Rights Reserved.
          </p>
          <span className="hidden sm:block h-px flex-1 bg-gray-400" />
        </div>
        <div className="mx-auto mt-4 h-[3px] w-16 rounded-full bg-[#B30D1D]" />
      </div>
    </footer>
  );
}
