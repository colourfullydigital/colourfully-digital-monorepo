// Shared TypeScript types for Colourfully Digital Foundation
// All types shared between frontend and CMS must be defined here

export interface BlogPost {
  title: string;
  slug: string;
  publishedAt: string;
  author: Author;
  mainImage?: {
    asset: {
      url: string;
    };
    alt?: string;
  };
  body: unknown; // Block content from Sanity
  language: 'en' | 'fr';
  translation?: BlogPost;
}

export interface Author {
  name: string;
  picture?: {
    asset: {
      url: string;
    };
  };
}

export interface VolunteerRole {
  roleTitle: string;
  description: string;
  requirements: string[];
  timeCommitment: string;
  isActive: boolean;
  language: 'en' | 'fr';
  translation?: VolunteerRole;
}

export interface School {
  schoolName: string;
  description: string;
  location?: {
    lat: number;
    lng: number;
  };
  language: 'en' | 'fr';
  translation?: School;
}

export interface StaticPage {
  pageTitle: string;
  slug: string;
  pageContent: unknown; // Block content from Sanity
  language: 'en' | 'fr';
  translation?: StaticPage;
}

// Language utilities
export type Language = 'en' | 'fr';

export interface TranslatableContent {
  language: Language;
  translation?: TranslatableContent;
}
