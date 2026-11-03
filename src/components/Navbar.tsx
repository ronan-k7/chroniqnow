"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import SearchBar from "./SearchBar";

const formatToday = () =>
  new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export default function Navbar() {
  // Start with a real date (not "") so the header has its final width on the
  // very first paint. An empty date used to make the logo sit ~130px to the
  // left and then jump to the right once the effect below ran – that was the
  // "shaking" on every page load / page change.
  const [dateString, setDateString] = useState(formatToday);
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Correct the date to the visitor's own timezone after hydration
  useEffect(() => {
    setDateString(formatToday());
  }, []);

  // Site logo (public/images/chroniq-now-logo.webp, 696×118). The alt text is
  // what search engines read as the <h1> text on the home page.
  const logo = (
    <Image
      src="/images/chroniq-now-logo.webp"
      alt="Chroniq Now"
      width={696}
      height={118}
      priority
      className="block h-7 w-auto md:h-12"
    />
  );

  const navItems = [
    "home",
    "business",
    "health",
    "politics",
    "science",
    "sports",
    "technology",
    "puerto-rico"
  ];

  return (
    <header className="border-b border-red-100 bg-white">
      {/* single responsive top bar (no duplicate brand) */}
      {/* `relative` + min-h: the mobile search box expands over this bar without the header jumping */}
      {/* lg+: 3-column grid (1fr | logo | 1fr) so the logo stays put whatever the date/search widths are */}
      <div className="relative flex min-h-[48px] items-center justify-between px-2 py-2 md:min-h-0 md:px-20 md:py-8 lg:grid lg:grid-cols-[1fr_auto_1fr]">
        <div
          suppressHydrationWarning
          className="hidden whitespace-nowrap md:block md:text-sm text-gray-800 font-medium lg:justify-self-start"
        >
          {dateString}
        </div>

        <Link href="/" title="Chroniq Now" className="mx-auto md:mx-0 lg:justify-self-center">
          {isHome ? (
            <h1 className="m-0 leading-none">{logo}</h1>
          ) : (
            <span className="block leading-none">{logo}</span>
          )}
        </Link>

        <div className="lg:justify-self-end">
          <SearchBar />
        </div>
      </div>

      {/* desktop nav */}
      <div className="hidden md:flex items-center justify-between px-20 py-3 border-t border-red-100">
        <ul className="flex space-x-8 text-sm font-medium text-gray-900">
          {navItems.map((item, i) => (
            <li key={i} className="relative">
              {item === "home" ? (
                <Link href="/" className="flex items-center" title={item.toUpperCase()}>
                  {item.replace("-", " ").toUpperCase()}
                </Link>
              ) : (
                <Link
                  href={`/${item.toLowerCase()}/`}
                  className="flex items-center"
                  title={item.toUpperCase()}
                >
                  {item.replace("-", " ").toUpperCase()}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* mobile scrollable nav */}
      <div className="md:hidden overflow-x-auto border-t border-red-100">
        <ul className="flex text-xs p-1 pl-2 space-x-6 font-medium text-gray-900">
          {navItems.map((item, i) => (
            <li key={i} className="relative pr-1">
              {item === "home" ? (
                <Link href="/" className="flex items-center" title={item.toUpperCase()}>
                  {item.replace("-", " ").toUpperCase()}
                </Link>
              ) : (
                <Link
                  href={`/${item.toLowerCase()}/`}
                  className="flex items-center"
                  title={item.toUpperCase()}
                >
                  {item.replace("-", " ").toUpperCase()}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
