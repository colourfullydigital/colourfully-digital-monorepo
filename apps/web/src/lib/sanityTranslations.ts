/**
 * Sanity CMS translation utilities
 * Provides consistent translation handling for dynamic content from Sanity
 */

import type { SupportedLanguage } from './i18n';
import { getFallbackLanguage } from './translations';

/**
 * Interface for Sanity documents that support translations
 */
export interface TranslatableDocument {
  _id: string;
  language: SupportedLanguage;
  translation?: {
    _ref: string;
  };
}

/**
 * Get the best matching document for a given language from a collection
 * @param documents - Array of documents that support translations
 * @param targetLanguage - The desired language
 * @returns The best matching document or null if none found
 */
export function getDocumentByLanguage<T extends TranslatableDocument>(
  documents: T[],
  targetLanguage: SupportedLanguage
): T | null {
  if (!documents || documents.length === 0) {
    return null;
  }

  // First try to find exact language match
  const exactMatch = documents.find(doc => doc.language === targetLanguage);
  if (exactMatch) {
    return exactMatch;
  }

  // Fallback to default language
  const fallbackLanguage = getFallbackLanguage();
  const fallbackMatch = documents.find(doc => doc.language === fallbackLanguage);
  if (fallbackMatch) {
    return fallbackMatch;
  }

  // Last resort: return the first document
  return documents[0];
}

/**
 * Group related documents by their translation relationships
 * @param documents - Array of documents that support translations
 * @returns Array of translation groups, each containing related language versions
 */
export function groupDocumentsByTranslation<T extends TranslatableDocument>(
  documents: T[]
): T[][] {
  const processed = new Set<string>();
  const groups: T[][] = [];

  for (const doc of documents) {
    if (processed.has(doc._id)) {
      continue;
    }

    const group: T[] = [doc];
    processed.add(doc._id);

    // Find related translations
    for (const otherDoc of documents) {
      if (processed.has(otherDoc._id)) {
        continue;
      }

      // Check if documents are linked via translation reference
      if (
        (doc.translation?._ref === otherDoc._id) ||
        (otherDoc.translation?._ref === doc._id) ||
        (doc.translation?._ref === otherDoc.translation?._ref && doc.translation?._ref)
      ) {
        group.push(otherDoc);
        processed.add(otherDoc._id);
      }
    }

    groups.push(group);
  }

  return groups;
}

/**
 * Get all available languages for a set of translation-linked documents
 * @param documents - Array of related translation documents
 * @returns Array of available language codes
 */
export function getAvailableLanguages<T extends TranslatableDocument>(
  documents: T[]
): SupportedLanguage[] {
  return [...new Set(documents.map(doc => doc.language))].sort();
}

/**
 * Check if a translation exists for a specific language in a document group
 * @param documents - Array of related translation documents
 * @param language - The language to check for
 * @returns True if translation exists
 */
export function hasTranslationInGroup<T extends TranslatableDocument>(
  documents: T[],
  language: SupportedLanguage
): boolean {
  return documents.some(doc => doc.language === language);
}

/**
 * Create a GROQ query to fetch documents with their translations
 * @param documentType - The Sanity document type (e.g., 'staticPage', 'blogPost')
 * @param fields - Additional fields to include in the query
 * @returns GROQ query string
 */
export function createTranslationQuery(
  documentType: string,
  fields: string[] = []
): string {
  const baseFields = ['_id', '_type', 'language', 'translation'];
  const allFields = [...baseFields, ...fields].join(', ');
  
  return `*[_type == "${documentType}"] {
    ${allFields},
    translation->{_id, language}
  }`;
}

/**
 * Helper to build language-specific routes for Astro
 * @param slug - The base slug
 * @param language - The target language
 * @returns Language-prefixed route or base route for default language
 */
export function buildLocalizedRoute(slug: string, language: SupportedLanguage): string {
  const fallbackLanguage = getFallbackLanguage();
  
  // Don't prefix default language routes
  if (language === fallbackLanguage) {
    return `/${slug}`;
  }
  
  return `/${language}/${slug}`;
}

/**
 * Extract language from a localized route
 * @param pathname - The request pathname (e.g., '/fr/about' or '/about')
 * @returns Object with language and base path
 */
export function parseLocalizedRoute(pathname: string): {
  language: SupportedLanguage;
  basePath: string;
} {
  const segments = pathname.split('/').filter(Boolean);
  const fallbackLanguage = getFallbackLanguage();
  
  // Check if first segment is a language code
  if (segments.length > 0 && ['en', 'fr'].includes(segments[0])) {
    return {
      language: segments[0] as SupportedLanguage,
      basePath: '/' + segments.slice(1).join('/')
    };
  }
  
  return {
    language: fallbackLanguage,
    basePath: pathname
  };
}
