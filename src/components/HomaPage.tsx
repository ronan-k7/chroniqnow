import Navbar from "./Navbar";
import HomeSection1 from "./HomeSection1";
import HomeSections, { CategoryData } from "./HomeSections";
import FiveCardsSection from "@/components/FiveCardsSection";
import ThreeColSection from "@/components/ThreeColSection";
import Footer from "@/components/Footer";

import { getLatestArticles } from "@/lib/readAlljsonfiles";
import type { ArticleWithCategory, Article } from "@/types/homepage";

import businessJson from "@/data/business.json";
import politicsJson from "@/data/politics.json";
import healthJson from "@/data/health.json";
import sportsJson from "@/data/sports.json";
import scienceJson from "@/data/science.json";
import technologyJson from "@/data/technology.json";
import puertoricoJson from "@/data/puerto-rico.json";

export default function HomePage() {
  const latestArticles = getLatestArticles() as ArticleWithCategory[];

  const businessSection: CategoryData = {
    category: "business",
    articles: businessJson as Article[],
  };
  const politicsSection: CategoryData = {
    category: "politics",
    articles: politicsJson as Article[],
  };
  const healthSection: CategoryData = {
    category: "health",
    articles: healthJson as Article[],
  };
  const sportsSection: CategoryData = {
    category: "sports",
    articles: sportsJson as Article[],
  };
const puertoricoSection: CategoryData = {
  category: "puerto-rico",
  label: "Puerto Rico",
  articles: puertoricoJson as Article[],
};
  const scienceSection: CategoryData = {
    category: "science",
    articles: scienceJson as Article[],
  };
  const technologySection: CategoryData = {
    category: "technology",
    articles: technologyJson as Article[],
  };

  return (
    <>
      <Navbar />

      <div className="px-5 pb-5 pt-5 sm:px-20 sm:pb-20 sm:pt-6 space-y-10">
        <HomeSection1
          categoryData={businessSection}
          latestArticles={latestArticles}
        />
        <HomeSections data={politicsSection} />
        <HomeSections data={healthSection} />
        <FiveCardsSection data={sportsSection} />
        <FiveCardsSection data={puertoricoSection} />
        <ThreeColSection
          data={[scienceSection, technologySection, businessSection]}
        />
      </div>

      <Footer />
    </>
  );
}
