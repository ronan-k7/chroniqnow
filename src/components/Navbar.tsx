"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import SearchBar from "./SearchBar";

// Split the date into parts so the header can style each piece separately
// (big day number / weekday / month + year) instead of one plain text line.
const formatToday = () => {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return {
    weekday: now.toLocaleDateString("en-GB", { weekday: "long" }),
    day: pad(now.getDate()),
    month: now.toLocaleDateString("en-GB", { month: "long" }),
    year: String(now.getFullYear()),
    iso: `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`,
  };
};

export default function Navbar() {
  // Start with a real date (not "") so the header has its final width on the
  // very first paint. An empty date used to make the logo sit ~130px to the
  // left and then jump to the right once the effect below ran – that was the
  // "shaking" on every page load / page change.
  const [today, setToday] = useState(formatToday);
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Correct the date to the visitor's own timezone after hydration
  useEffect(() => {
    setToday(formatToday());
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
        {/* Dateline: big serif day number in brand red, hairline divider, then tracked weekday + italic month/year (echoes the logo's bold serif + italic "Now") */}
        <time
          dateTime={today.iso}
          suppressHydrationWarning
          className="hidden select-none items-center gap-2 whitespace-nowrap md:mr-4 md:flex lg:mr-0 lg:gap-3 lg:justify-self-start"
        >
          <span
            suppressHydrationWarning
            className="font-serif text-3xl font-bold lg:text-[2.6rem] leading-none tracking-tight text-[#B30D1D] tabular-nums"
          >
            {today.day}
          </span>
          <span
            aria-hidden="true"
            className="h-8 w-px lg:h-10 bg-gradient-to-b from-transparent via-[#C1121F]/70 to-transparent"
          />
          <span className="flex flex-col gap-1 leading-none">
            <span
              suppressHydrationWarning
              className="text-[10px] font-bold uppercase tracking-[0.2em] lg:text-[11px] lg:tracking-[0.24em] text-[#B30D1D]"
            >
              {today.weekday}
            </span>
            <span
              suppressHydrationWarning
              className="font-serif text-[13px] italic lg:text-[15px] lg:tracking-wide text-gray-800"
            >
              {today.month} {today.year}
            </span>
          </span>
        </time>

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
