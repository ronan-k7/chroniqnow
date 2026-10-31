export interface Article {
  category: string;
  slug: string;
  title: string;
  image: string;
  /**
   * Optional CSS object-position for the article image (e.g. "40% 12%").
   * Used by card layouts that crop the image (category + homepage) so the
   * subject's face is never cut off. Falls back to the default (center).
   */
  imagePosition?: string;
  date: string;
  shortdescription: string;
  description: string;
  author:string
}

export interface ArticleWithCategory extends Article {
  category: string;
}
