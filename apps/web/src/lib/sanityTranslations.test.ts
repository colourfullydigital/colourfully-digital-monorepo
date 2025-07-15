/**
 * Tests for Sanity translation utilities
 */

import { describe, it, expect } from 'vitest';
import {
  getDocumentByLanguage,
  groupDocumentsByTranslation,
  getAvailableLanguages,
  hasTranslationInGroup,
  createTranslationQuery,
  buildLocalizedRoute,
  parseLocalizedRoute
} from './sanityTranslations';

describe('Sanity Translation utilities', () => {
  const mockDocuments = [
    {
      _id: 'doc1-en',
      language: 'en' as const,
      title: 'About Us',
      translation: { _ref: 'doc1-fr' }
    },
    {
      _id: 'doc1-fr',
      language: 'fr' as const,
      title: 'À propos de nous',
      translation: { _ref: 'doc1-en' }
    },
    {
      _id: 'doc2-en',
      language: 'en' as const,
      title: 'Contact',
      // No translation reference
    }
  ];

  describe('getDocumentByLanguage', () => {
    it('should return exact language match when available', () => {
      const result = getDocumentByLanguage(mockDocuments, 'fr');
      expect(result?._id).toBe('doc1-fr');
      expect(result?.language).toBe('fr');
    });

    it('should fallback to English when target language not found', () => {
      const docsWithoutFrench = [mockDocuments[0], mockDocuments[2]];
      const result = getDocumentByLanguage(docsWithoutFrench, 'fr');
      expect(result?.language).toBe('en');
    });

    it('should return first document as last resort', () => {
      const nonEnglishDocs = [
        { _id: 'doc-de', language: 'de' as any, title: 'German Doc' }
      ];
      const result = getDocumentByLanguage(nonEnglishDocs, 'fr');
      expect(result?._id).toBe('doc-de');
    });

    it('should return null for empty array', () => {
      const result = getDocumentByLanguage([], 'en');
      expect(result).toBeNull();
    });
  });

  describe('groupDocumentsByTranslation', () => {
    it('should group related translation documents', () => {
      const groups = groupDocumentsByTranslation(mockDocuments);
      expect(groups).toHaveLength(2);
      
      // First group should contain the linked translations
      const linkedGroup = groups.find(group => group.length === 2);
      expect(linkedGroup).toBeDefined();
      expect(linkedGroup?.map(doc => doc._id).sort()).toEqual(['doc1-en', 'doc1-fr']);
      
      // Second group should contain the standalone document
      const standaloneGroup = groups.find(group => group.length === 1);
      expect(standaloneGroup).toBeDefined();
      expect(standaloneGroup?.[0]._id).toBe('doc2-en');
    });

    it('should handle documents without translations', () => {
      const singleDoc = [mockDocuments[2]];
      const groups = groupDocumentsByTranslation(singleDoc);
      expect(groups).toHaveLength(1);
      expect(groups[0]).toHaveLength(1);
    });
  });

  describe('getAvailableLanguages', () => {
    it('should return unique sorted languages', () => {
      const languages = getAvailableLanguages(mockDocuments);
      expect(languages).toEqual(['en', 'fr']);
    });

    it('should handle duplicate languages', () => {
      const docsWithDuplicates = [
        ...mockDocuments,
        { _id: 'doc3-en', language: 'en' as const, title: 'Another English Doc' }
      ];
      const languages = getAvailableLanguages(docsWithDuplicates);
      expect(languages).toEqual(['en', 'fr']);
    });
  });

  describe('hasTranslationInGroup', () => {
    it('should return true when language exists in group', () => {
      expect(hasTranslationInGroup(mockDocuments, 'en')).toBe(true);
      expect(hasTranslationInGroup(mockDocuments, 'fr')).toBe(true);
    });

    it('should return false when language does not exist in group', () => {
      expect(hasTranslationInGroup(mockDocuments, 'es' as any)).toBe(false);
    });
  });

  describe('createTranslationQuery', () => {
    it('should create basic GROQ query', () => {
      const query = createTranslationQuery('staticPage');
      expect(query).toContain('*[_type == "staticPage"]');
      expect(query).toContain('_id, _type, language, translation');
      expect(query).toContain('translation->{_id, language}');
    });

    it('should include additional fields', () => {
      const query = createTranslationQuery('blogPost', ['title', 'slug']);
      expect(query).toContain('_id, _type, language, translation, title, slug');
    });
  });

  describe('buildLocalizedRoute', () => {
    it('should not prefix default language routes', () => {
      expect(buildLocalizedRoute('about', 'en')).toBe('/about');
      expect(buildLocalizedRoute('contact', 'en')).toBe('/contact');
    });

    it('should prefix non-default language routes', () => {
      expect(buildLocalizedRoute('about', 'fr')).toBe('/fr/about');
      expect(buildLocalizedRoute('contact', 'fr')).toBe('/fr/contact');
    });
  });

  describe('parseLocalizedRoute', () => {
    it('should parse default language routes', () => {
      const result = parseLocalizedRoute('/about');
      expect(result.language).toBe('en');
      expect(result.basePath).toBe('/about');
    });

    it('should parse French language routes', () => {
      const result = parseLocalizedRoute('/fr/about');
      expect(result.language).toBe('fr');
      expect(result.basePath).toBe('/about');
    });

    it('should handle nested paths', () => {
      const result = parseLocalizedRoute('/fr/blog/my-post');
      expect(result.language).toBe('fr');
      expect(result.basePath).toBe('/blog/my-post');
    });

    it('should handle root path', () => {
      const result = parseLocalizedRoute('/');
      expect(result.language).toBe('en');
      expect(result.basePath).toBe('/');
    });

    it('should handle French root path', () => {
      const result = parseLocalizedRoute('/fr');
      expect(result.language).toBe('fr');
      expect(result.basePath).toBe('/');
    });
  });
});
