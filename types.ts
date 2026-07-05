
export type VisitorCardType = {
  id: string;
  image: string; // Base64 string
  caption: string;
  username: string;
  x: number;
  y: number;
  rotation: number;
  zIndex: number;
};

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  category: "work" | "small" | "old";
  color?: string;
  stack?: string[];
  longDescription?: string[];
  keyContributions?: string[];
  platform?: string;
  gallery?: string[];
}
