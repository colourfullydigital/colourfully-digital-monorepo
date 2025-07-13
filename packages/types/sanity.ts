// Sanity.io specific types
// These types are used for working with Sanity data

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
