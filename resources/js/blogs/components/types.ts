export interface BlogText {
  id: number;
  site_id: number;
  blog_category_id: number | null;
  title: string;
  slug: string;
  content: string;
  created_at?: string;
  updated_at?: string;
}

export interface BlogCategory {
  id: number;
  site_id: number;
  name: string;
  slug: string;
}

