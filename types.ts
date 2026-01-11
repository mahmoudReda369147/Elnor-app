
export interface User {
  id?: string;
  fullName: string;
  phoneNumber: string;
  country: string;
  stageNumber: number;
}

export interface Subject {
  title: string;
  book: string;
  contentIds?: string[]; // IDs of related content items
}

export interface ContentItem {
  id: string;
  type: 'video' | 'audio' | 'pdf';
  title: string;
  description: string;
  url: string;
  filter?: string; // Subject title to filter by
}

export interface Stage {
  id: number;
  title: string;
  description: string;
  isUnlocked: boolean;
  curriculum?: Subject[];
  content: ContentItem[];
}

export type AppView = 'login' | 'register' | 'home' | 'stage';
