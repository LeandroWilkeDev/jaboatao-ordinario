export interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}

export type Category =
  | 'Geral'
  | 'Política'
  | 'Polícia'
  | 'Esportes'
  | 'Economia'
  | 'Variedades';

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  content: string[];
  category: Category;
  author: Author;
  publishedAt: string;
  readTime: string;
  imageUrl: string;
  views: number;
  isBreaking: boolean;
  isFeatured: boolean;
  tags?: string[];
}
