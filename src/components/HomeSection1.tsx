import Image from "next/image";
import Link from "next/link";
import { ArticleWithCategory } from "@/types/homepage";
import { CategoryData } from "./HomeSections";

interface HomeSection1Props {
  categoryData: CategoryData;
  latestArticles: ArticleWithCategory[];
}

export default function HomeSection1({
  categoryData,
  latestArticles,
}: HomeSection1Props) {
  const { category, articles } = categoryData;

  // sort by date descending
  const sorted = [...articles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const featured = sorted[0]!;
  const small1 = sorted[1]!;
  const small2 = sorted[2]!;

  return (
    <section className="">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-5 gap-y-5 lg:gap-x-5">
        <div className="order-first lg:order-none col-span-3 grid gap-6 grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 p-0 md:p-1">
          <Link
            title={small1.title}
            href={`/${category}/${small1.slug}/`}
            className="lg:col-span-1 order-2 lg:order-none overflow-hidden shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-row lg:flex-col">
              <div className="w-24 h-20 lg:w-full lg:h-45 flex-shrink-0 overflow-hidden ">
                <Image
                  src={small1.image}
                  alt={small1.title}
                  title={small1.title}
                  width={96}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-3 flex items-center lg:items-start">
                <h2 className="text-sm lg:text-base  tracking-tight font-semibold leading-snug">
                  {small1.title}
                </h2>
              </div>
            </div>
          </Link>

          <Link
            title={featured.title}
            href={`/${category}/${featured.slug}/`}
            className="lg:col-span-2 lg:row-span-2 order-1 lg:order-none flex flex-col overflow-hidden shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="w-full aspect-[3/2] overflow-hidden">
              <Image
                src={featured.image}
                alt={featured.title}
                title={featured.title}
                className="w-full h-full object-cover"
                width={800}
                height={500}
                fetchPriority="high"
                loading="eager"
              />
            </div>

            <div className="p-4 sm:p-6 flex-1 flex flex-col justify-start gap-4">
              <h2 className="text-xl sm:text-3xl font-bold leading-snug tracking-tight">
                {featured.title}
              </h2>
              <p className="block text-sm leading-relaxed text-gray-800">
                {featured.shortdescription}
              </p>
            </div>
          </Link>

          <Link
            title={small2.title}
            href={`/${category}/${small2.slug}/`}
            className="lg:col-span-1 order-3 lg:order-none overflow-hidden shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-row lg:flex-col">
              <div className="w-24 h-20 lg:w-full lg:h-45 flex-shrink-0 overflow-hidden">
                <Image
                  src={small2.image}
                  alt={small2.title}
                  title={small2.title}
                  width={96}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-3 flex items-center lg:items-start">
                <h2 className="text-sm lg:text-base font-semibold leading-snug tracking-tight">
                  {small2.title}
                </h2>
              </div>
            </div>
          </Link>
        </div>

        <aside className="order-last lg:order-none relative col-span-2 border-t bg-white flex flex-col overflow-hidden shadow-md">
          <h2 className="p-6 text-2xl sm:text-3xl">LATEST NEWS</h2>
          <div
            className="relative px-6 overflow-y-auto scrollbar-hide"
            style={{ maxHeight: "450px" }}
          >
            <div className="relative space-y-6 pt-2 pb-4">
              <div className="absolute top-10 bottom-0 left-10 w-0.5 bg-red-500 z-0" />
              {latestArticles.slice(0, 10).map((item, index) => (
                <Link
                  title={item.title}
                  key={`${item.category}-${item.slug}-${index}`}
                  href={`/${item.category}/${item.slug}/`}
                  className="relative z-10 flex bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden"
                >
                  <div className="flex flex-col justify-start gap-2 p-4 w-full">
                    {/*<p className="text-sm font-semibold text-red-500 flex items-center">
                      <span className="w-2 h-2 bg-red-500 rounded-full inline-block mr-2" />
                      {item.date} 
                    </p>*/}
                    <h3 className="text-[15px] font-semibold leading-snug tracking-tight">
                      {item.title}
                    </h3>
                  </div>
                  <div className="w-24 aspect-[4/3] flex-shrink-0 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      title={item.title}
                      width={96}
                      height={72}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="px-6 pb-6 pt-4">
            <Link
              title="More news"
              href="/business/"
              className="block w-full text-center text-red-500 border border-red-500 py-2 font-semibold hover:bg-red-50 transition"
            >
              More news
            </Link>
          </div>
        </aside>
      </div>
    </section>
  );
}
