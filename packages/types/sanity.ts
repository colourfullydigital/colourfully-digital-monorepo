// Sanity.io specific types
// These types are used for working with Sanity data

export type SupportedLanguage = 'en' | 'fr';

export interface SanityImageAsset {
  _id: string;
  url: string;
}

export interface SanityImage {
  asset: SanityImageAsset;
  alt?: string;
}

export interface SanityDocument {
  _id: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  language?: SupportedLanguage; // Add language support to all documents
}

export interface SanityReference {
  _type: 'reference';
  _ref: string;
}

export interface SanitySlug {
  _type: 'slug';
  current: string;
}

// Basic block content type - will be extended when Sanity is integrated
export type SanityBlockContent = unknown[];

// Test schema types
export interface SanityTest extends SanityDocument {
  _type: 'sanityTest';
  title: string;
  message?: string;
  isActive: boolean;
  language: SupportedLanguage;
}

// Static page content type
export interface StaticPage extends SanityDocument {
  _type: 'staticPage';
  pageTitle: string;
  slug: SanitySlug;
  pageContent: SanityBlockContent;
  language: SupportedLanguage;
  translation?: SanityReference;
}

// Author type - not translatable
export interface Author extends SanityDocument {
  _type: 'author';
  name: string;
  picture?: SanityImage;
}

// Blog post content type
export interface BlogPost extends SanityDocument {
  _type: 'blogPost';
  title: string;
  slug: SanitySlug;
  publishedAt: string;
  author: SanityReference | Author; // Can be populated or just a reference
  mainImage?: SanityImage;
  body: SanityBlockContent;
  language: SupportedLanguage;
  translation?: SanityReference;
}

// API response types
export interface SanityApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface SanityConnectionTest {
  success: boolean;
  data?: SanityTest;
  error?: string;
}
