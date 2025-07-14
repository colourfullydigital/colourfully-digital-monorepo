/**
 * Translation utilities and helpers for i18n support
 */

import type { SupportedLanguage } from './i18n';

// Translation dictionary type
export interface TranslationDictionary {
  [key: string]: string | TranslationDictionary;
}

// Translation data structure
export interface Translations {
  [language: string]: TranslationDictionary;
}

// Default translations
const translations: Translations = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      partnerships: 'Partnerships',
      blog: 'Blog',
      volunteer: 'Volunteer'
    },
    footer: {
      contact: 'Contact Us',
      email: 'hello@colourfullydigital.org',
      phone: '+1 (123) 456-7890',
      privacy: 'Privacy Policy',
      followUs: 'Follow Us'
    },
    common: {
      languageSwitch: 'Switch to French',
      home: 'Home',
      loading: 'Loading...',
      error: 'An error occurred',
      readMore: 'Read More',
      learnMore: 'Learn More',
      getInvolved: 'Get Involved',
      backToHome: 'Back to Home',
      pageNotFound: 'Page Not Found',
      comingSoon: 'Coming Soon'
    },
    blog: {
      title: 'News & Events',
      description: 'Stay updated with our latest news, events, and community initiatives.',
      readMore: 'Read More',
      publishedOn: 'Published on',
      by: 'by',
      noPostsFound: 'No blog posts found.',
      loadingPosts: 'Loading blog posts...',
      backToBlog: 'Back to News & Events',
      pagination: {
        previous: 'Previous',
        next: 'Next',
        page: 'Page'
      }
    },
    meta: {
      defaultDescription: 'Colourfully Digital - Supporting colorful communities through digital solutions, partnerships, and volunteer opportunities.'
    }
  },
  fr: {
    nav: {
      home: 'Accueil',
      about: 'À propos',
      partnerships: 'Partenariats',
      blog: 'Blogue',
      volunteer: 'Bénévole'
    },
    footer: {
      contact: 'Contactez-nous',
      email: 'bonjour@colourfullydigital.org',
      phone: '+1 (123) 456-7890',
      privacy: 'Politique de confidentialité',
      followUs: 'Suivez-nous'
    },
    common: {
      languageSwitch: 'Passer à l\'anglais',
      home: 'Accueil',
      loading: 'Chargement...',
      error: 'Une erreur s\'est produite',
      readMore: 'Lire la suite',
      learnMore: 'En savoir plus',
      getInvolved: 'S\'impliquer',
      backToHome: 'Retour à l\'accueil',
      pageNotFound: 'Page non trouvée',
      comingSoon: 'Bientôt disponible'
    },
    blog: {
      title: 'Nouvelles et événements',
      description: 'Restez informé de nos dernières nouvelles, événements et initiatives communautaires.',
      readMore: 'Lire la suite',
      publishedOn: 'Publié le',
      by: 'par',
      noPostsFound: 'Aucun article trouvé.',
      loadingPosts: 'Chargement des articles...',
      backToBlog: 'Retour aux nouvelles et événements',
      pagination: {
        previous: 'Précédent',
        next: 'Suivant',
        page: 'Page'
      }
    },
    meta: {
      defaultDescription: 'Colourfully Digital - Soutenir les communautés colorées grâce à des solutions numériques, des partenariats et des opportunités de bénévolat.'
    }
  }
};

/**
 * Get a translation for a given key and language
 * @param key - Dot-notation key for the translation (e.g., 'nav.home')
 * @param language - The target language
 * @param fallback - Optional fallback text if translation is not found
 * @returns The translated text or fallback
 */
export function t(key: string, language: SupportedLanguage, fallback?: string): string {
  const keys = key.split('.');
  let current: any = translations[language];

  for (const k of keys) {
    if (current && typeof current === 'object' && k in current) {
      current = current[k];
    } else {
      // If translation not found, try English as fallback
      if (language !== 'en') {
        return t(key, 'en', fallback);
      }
      return fallback || key;
    }
  }

  return typeof current === 'string' ? current : fallback || key;
}

/**
 * Get translations for a specific namespace
 * @param namespace - The namespace to get translations for (e.g., 'nav')
 * @param language - The target language
 * @returns Object containing all translations in the namespace
 */
export function getNamespaceTranslations(namespace: string, language: SupportedLanguage): TranslationDictionary {
  const current = translations[language];
  if (current && typeof current === 'object' && namespace in current) {
    const namespaceData = current[namespace];
    return typeof namespaceData === 'object' ? namespaceData : {};
  }
  
  // Fallback to English if not found
  if (language !== 'en') {
    return getNamespaceTranslations(namespace, 'en');
  }
  
  return {};
}

/**
 * Check if a translation exists for a given key and language
 * @param key - Dot-notation key for the translation
 * @param language - The target language
 * @returns True if translation exists
 */
export function hasTranslation(key: string, language: SupportedLanguage): boolean {
  const keys = key.split('.');
  let current: any = translations[language];

  for (const k of keys) {
    if (current && typeof current === 'object' && k in current) {
      current = current[k];
    } else {
      return false;
    }
  }

  return typeof current === 'string';
}

/**
 * Format a date according to the language locale
 * @param date - The date to format
 * @param language - The target language
 * @param options - Intl.DateTimeFormat options
 * @returns Formatted date string
 */
export function formatDate(
  date: Date, 
  language: SupportedLanguage,
  options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
): string {
  const locale = language === 'fr' ? 'fr-CA' : 'en-CA';
  return new Intl.DateTimeFormat(locale, options).format(date);
}

/**
 * Format a number according to the language locale
 * @param number - The number to format
 * @param language - The target language
 * @param options - Intl.NumberFormat options
 * @returns Formatted number string
 */
export function formatNumber(
  number: number, 
  language: SupportedLanguage,
  options: Intl.NumberFormatOptions = {}
): string {
  const locale = language === 'fr' ? 'fr-CA' : 'en-CA';
  return new Intl.NumberFormat(locale, options).format(number);
}

/**
 * Get the reading direction for the language
 * @param language - The target language
 * @returns 'ltr' for left-to-right, 'rtl' for right-to-left
 */
export function getTextDirection(language: SupportedLanguage): 'ltr' | 'rtl' {
  // Both English and French are left-to-right languages
  return 'ltr';
}

/**
 * Get the appropriate locale string for HTML lang attribute
 * @param language - The target language
 * @returns Locale string (e.g., 'en-CA', 'fr-CA')
 */
export function getLocaleString(language: SupportedLanguage): string {
  return language === 'fr' ? 'fr-CA' : 'en-CA';
}
