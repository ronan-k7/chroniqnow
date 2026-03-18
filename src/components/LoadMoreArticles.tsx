"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export type Article = {
  id: string;
  slug: string;
  title: string;
  image: string;
  date: string;
  shortdescription?: string;
};

type Props = { articles: Article[]; category: string };

export default function LoadMoreArticles({ articles, category }: Props) {
  const CHUNK = 11;
  const [visible, setVisible] = useState(0);
  const toShow = articles.slice(0, visible);

  return (
    <section className="mt-12">
      {/* mobile: one-per-row */}
      <div className="block lg:hidden space-y-4">
        {toShow.map((item) => (
          <Link
            key={item.id}
            title={item.title}
            href={`/${category}/${item.slug}/`}
            className="flex items-center overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
          >
            <div className="relative w-24 h-24 flex-shrink-0">
              <Image
                src={item.image}
                alt={item.title}
                title={item.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 ml-4">
              <h3 className="text-base font-bold text-gray-900 line-clamp-2 leading-snug tracking-tight">
                {item.title}
              </h3>
              {/*<p className="mt-1 text-sm text-red-600 font-semibold">
                {item.date}
              </p>*/}
            </div>
          </Link>
        ))}
      </div>

      {/* desktop: grid view */}
      <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {toShow.map((item) => (
          <Link
            key={item.id}
            title={item.title}
            href={`/${category}/${item.slug}/`}
            className="flex flex-col h-full overflow-hidden border border-gray-100 shadow-sm"
          >
            <div className="w-full h-48 overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                title={item.title}
                width={400}
                height={250}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex-1 p-4 flex flex-col justify-between">
              <h3 className="text-base leading-snug tracking-tight text-gray-900 font-bold">
                {item.title}
              </h3>
            </div>
            {/*<div className="w-full bg-white border-t border-gray-100 text-red-600 text-center py-2 font-semibold">
              {item.date}
            </div>*/}
          </Link>
        ))}
      </div>

      {/* load more button */}
      {visible < articles.length && (
        <div className="flex justify-center my-8">
          <button
            onClick={() => setVisible((v) => v + CHUNK)}
            className="px-6 py-2 bg-red-600 text-white cursor-pointer font-semibold rounded-md hover:bg-red-700 transition"
          >
            Load More
          </button>
        </div>
      )}
    </section>
  );
}
