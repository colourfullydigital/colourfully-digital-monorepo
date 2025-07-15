/**
 * Tests for translation utilities
 */

import { describe, it, expect } from 'vitest';
import { t, getNamespaceTranslations, hasTranslation, formatDate, formatNumber, getTextDirection, getLocaleString } from './translations';

describe('Translation utilities', () => {
  describe('t function', () => {
    it('should return correct English translation', () => {
      expect(t('nav.home', 'en')).toBe('Home');
      expect(t('footer.contact', 'en')).toBe('Contact Us');
      expect(t('common.loading', 'en')).toBe('Loading...');
    });

    it('should return correct French translation', () => {
      expect(t('nav.home', 'fr')).toBe('Accueil');
      expect(t('footer.contact', 'fr')).toBe('Contactez-nous');
      expect(t('common.loading', 'fr')).toBe('Chargement...');
    });

    it('should handle nested keys', () => {
      expect(t('blog.pagination.next', 'en')).toBe('Next');
      expect(t('blog.pagination.next', 'fr')).toBe('Suivant');
    });

    it('should fallback to English when French translation is missing', () => {
      expect(t('nonexistent.key', 'fr')).toBe('nonexistent.key');
    });

    it('should return fallback text when provided', () => {
      expect(t('nonexistent.key', 'en', 'Default Text')).toBe('Default Text');
    });

    it('should return key when no translation found and no fallback', () => {
      expect(t('nonexistent.key', 'en')).toBe('nonexistent.key');
    });
  });

  describe('getNamespaceTranslations function', () => {
    it('should return all translations for a namespace in English', () => {
      const navTranslations = getNamespaceTranslations('nav', 'en');
      expect(navTranslations).toEqual({
        home: 'Home',
        about: 'About',
        partnerships: 'Partnerships',
        blog: 'Blog',
        volunteer: 'Volunteer'
      });
    });

    it('should return all translations for a namespace in French', () => {
      const navTranslations = getNamespaceTranslations('nav', 'fr');
      expect(navTranslations).toEqual({
        home: 'Accueil',
        about: 'À propos',
        partnerships: 'Partenariats',
        blog: 'Blogue',
        volunteer: 'Bénévole'
      });
    });

    it('should return empty object for non-existent namespace', () => {
      const result = getNamespaceTranslations('nonexistent', 'en');
      expect(result).toEqual({});
    });
  });

  describe('hasTranslation function', () => {
    it('should return true for existing translations', () => {
      expect(hasTranslation('nav.home', 'en')).toBe(true);
      expect(hasTranslation('nav.home', 'fr')).toBe(true);
      expect(hasTranslation('footer.contact', 'en')).toBe(true);
    });

    it('should return false for non-existing translations', () => {
      expect(hasTranslation('nonexistent.key', 'en')).toBe(false);
      expect(hasTranslation('nav.nonexistent', 'en')).toBe(false);
    });
  });

  describe('formatDate function', () => {
    it('should format dates correctly for English', () => {
      const date = new Date('2025-07-15');
      const formatted = formatDate(date, 'en');
      expect(formatted).toContain('July');
      expect(formatted).toContain('2025');
    });

    it('should format dates correctly for French', () => {
      const date = new Date('2025-07-15');
      const formatted = formatDate(date, 'fr');
      expect(formatted).toContain('juillet');
      expect(formatted).toContain('2025');
    });
  });

  describe('formatNumber function', () => {
    it('should format numbers correctly for English', () => {
      const formatted = formatNumber(1234.56, 'en');
      expect(formatted).toBe('1,234.56');
    });

    it('should format numbers correctly for French', () => {
      const formatted = formatNumber(1234.56, 'fr');
      // French locale uses non-breaking space as thousands separator
      expect(formatted).toMatch(/1[\s ]234[,]56/);
    });
  });

  describe('getTextDirection function', () => {
    it('should return ltr for both languages', () => {
      expect(getTextDirection('en')).toBe('ltr');
      expect(getTextDirection('fr')).toBe('ltr');
    });
  });

  describe('getLocaleString function', () => {
    it('should return correct locale strings', () => {
      expect(getLocaleString('en')).toBe('en-CA');
      expect(getLocaleString('fr')).toBe('fr-CA');
    });
  });
});
