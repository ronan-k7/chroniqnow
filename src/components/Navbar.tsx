"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [dateString, setDateString] = useState("");
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    setDateString(today.toLocaleDateString("en-GB", options));
  }, []);

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
    <header className="border-b border-red-100 sticky top-0 z-50 bg-white">
      {/* single responsive top bar (no duplicate brand) */}
      <div className="flex items-center justify-between px-2 py-2 md:px-20 md:py-8">
        <div className="hidden md:block md:text-sm text-gray-800 font-medium">
          {dateString}
        </div>

        <Link href="/" title="Chroniq Now" className="mx-auto md:mx-0">
          {isHome ? (
            <h1 className="text-2xl md:text-5xl font-black text-red-700 uppercase leading-none tracking-tighter">
              Chroniq<span className="text-red-600 font-medium ml-1">Now</span>
            </h1>
          ) : (
            <span className="text-2xl md:text-5xl font-black text-red-700 uppercase leading-none tracking-tighter">
              Chroniq<span className="text-red-600 font-medium ml-1">Now</span>
            </span>
          )}
        </Link>

        <div className="relative w-32 md:w-64">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-3 py-1.5 pr-10 rounded bg-gray-100 text-xs md:text-sm text-gray-800 focus:outline-none"
          />
          <button
            aria-label="Search"
            className="absolute top-0 bottom-0 right-0 px-3 bg-red-600 rounded-r flex items-center justify-center"
          >
            <FiSearch className="text-white text-sm" />
          </button>
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
