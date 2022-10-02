export interface Paper {
  title: string;
  keywords: string[];
  tldr: string | null;
  href: string;
  abstract: string;
  category: number;
  supplementary_material: string | null;
  x: number;
  y: number;
}
