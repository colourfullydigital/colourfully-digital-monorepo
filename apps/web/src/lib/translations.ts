/**
 * Translation utilities and helpers for i18n support
 */

import type { SupportedLanguage } from './i18n';

// Default fallback language when translations are missing
const FALLBACK_LANGUAGE: SupportedLanguage = 'en';

// Translation dictionary type - now with language codes at the leaf level
export interface TranslationLeaf {
  [language: string]: string;
}

export interface TranslationDictionary {
  [key: string]: TranslationLeaf | TranslationDictionary;
}

// Translation data structure
export interface Translations extends TranslationDictionary {}

// Default translations - restructured with language codes at the bottom level
const translations: Translations = {
  nav: {
    home: {
      en: 'Home',
      fr: 'Accueil'
    },
    about: {
      en: 'About',
      fr: 'À propos'
    },
    partnerships: {
      en: 'Partnerships',
      fr: 'Partenariats'
    },
    blog: {
      en: 'Blog',
      fr: 'Blogue'
    },
    volunteer: {
      en: 'Volunteer',
      fr: 'Bénévole'
    }
  },
  footer: {
    brandDescription: {
      en: 'Supporting colorful communities through digital solutions, partnerships, and volunteer opportunities.',
      fr: 'Soutenir les communautés colorées grâce à des solutions numériques, des partenariats et des opportunités de bénévolat.'
    },
    contact: {
      en: 'Contact Us',
      fr: 'Contactez-nous'
    },
    emailLabel: {
      en: 'Email:',
      fr: 'Courriel :'
    },
    email: {
      en: 'hello@colourfully.digital',
      fr: 'bonjour@colourfully.digital'
    },
    addressLabel: {
      en: 'Address:',
      fr: 'Adresse :'
    },
    address: {
      en: '123 Digital Avenue, Tech City, TC 12345',
      fr: '123 Avenue Numérique, Ville Tech, TC 12345'
    },
    connectWithUs: {
      en: 'Connect With Us',
      fr: 'Connectez-vous avec nous'
    },
    privacy: {
      en: 'Privacy Policy',
      fr: 'Politique de confidentialité'
    },
    copyright: {
      en: '© 2025 Colourfully Digital Foundation. All rights reserved.',
      fr: '© 2025 Fondation Colourfully Digital. Tous droits réservés.'
    }
  },
  common: {
    languageSwitch: {
      en: 'Switch to French',
      fr: 'Passer à l\'anglais'
    },
    home: {
      en: 'Home',
      fr: 'Accueil'
    },
    loading: {
      en: 'Loading...',
      fr: 'Chargement...'
    },
    error: {
      en: 'An error occurred',
      fr: 'Une erreur s\'est produite'
    },
    readMore: {
      en: 'Read More',
      fr: 'Lire la suite'
    },
    learnMore: {
      en: 'Learn More',
      fr: 'En savoir plus'
    },
    getInvolved: {
      en: 'Get Involved',
      fr: 'S\'impliquer'
    },
    backToHome: {
      en: 'Back to Home',
      fr: 'Retour à l\'accueil'
    },
    pageNotFound: {
      en: 'Page Not Found',
      fr: 'Page non trouvée'
    },
    comingSoon: {
      en: 'Coming Soon',
      fr: 'Bientôt disponible'
    }
  },
  blog: {
    title: {
      en: 'News & Events',
      fr: 'Nouvelles et événements'
    },
    description: {
      en: 'Stay updated with our latest news, events, and community initiatives.',
      fr: 'Restez informé de nos dernières nouvelles, événements et initiatives communautaires.'
    },
    readMore: {
      en: 'Read More',
      fr: 'Lire la suite'
    },
    publishedOn: {
      en: 'Published on',
      fr: 'Publié le'
    },
    by: {
      en: 'by',
      fr: 'par'
    },
    noPostsFound: {
      en: 'No blog posts found.',
      fr: 'Aucun article trouvé.'
    },
    loadingPosts: {
      en: 'Loading blog posts...',
      fr: 'Chargement des articles...'
    },
    backToBlog: {
      en: 'Back to News & Events',
      fr: 'Retour aux nouvelles et événements'
    },
    pagination: {
      previous: {
        en: 'Previous',
        fr: 'Précédent'
      },
      next: {
        en: 'Next',
        fr: 'Suivant'
      },
      page: {
        en: 'Page',
        fr: 'Page'
      }
    }
  },
  volunteer: {
    title: {
      en: 'Volunteer Opportunities',
      fr: 'Opportunités de bénévolat'
    },
    description: {
      en: 'Make a difference in colorful communities by joining our volunteer programs.',
      fr: 'Faites une différence dans les communautés colorées en rejoignant nos programmes de bénévolat.'
    },
    applyNow: {
      en: 'Apply Now',
      fr: 'Postuler maintenant'
    },
    requirements: {
      en: 'Requirements',
      fr: 'Exigences'
    },
    timeCommitment: {
      en: 'Time Commitment',
      fr: 'Engagement de temps'
    },
    noRolesFound: {
      en: 'No volunteer opportunities are currently available.',
      fr: 'Aucune opportunité de bénévolat n\'est actuellement disponible.'
    },
    loadingRoles: {
      en: 'Loading volunteer opportunities...',
      fr: 'Chargement des opportunités de bénévolat...'
    },
    backToVolunteer: {
      en: 'Back to Volunteer Opportunities',
      fr: 'Retour aux opportunités de bénévolat'
    }
  },
  meta: {
    defaultDescription: {
      en: 'Colourfully Digital - Supporting colorful communities through digital solutions, partnerships, and volunteer opportunities.',
      fr: 'Colourfully Digital - Soutenir les communautés colorées grâce à des solutions numériques, des partenariats et des opportunités de bénévolat.'
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
  let current: any = translations;

  // Navigate to the translation leaf
  for (const k of keys) {
    if (current && typeof current === 'object' && k in current) {
      current = current[k];
    } else {
      // If translation not found, try fallback language
      if (language !== FALLBACK_LANGUAGE) {
        return t(key, FALLBACK_LANGUAGE, fallback);
      }
      return fallback || key;
    }
  }

  // At this point, current should be a TranslationLeaf with language keys
  if (current && typeof current === 'object' && language in current) {
    return current[language];
  }

  // If translation not found, try fallback language
  if (language !== FALLBACK_LANGUAGE && current && typeof current === 'object' && FALLBACK_LANGUAGE in current) {
    return current[FALLBACK_LANGUAGE];
  }

  return fallback || key;
}

/**
 * Get translations for a specific namespace
 * @param namespace - The namespace to get translations for (e.g., 'nav')
 * @param language - The target language
 * @returns Object containing all translations in the namespace
 */
export function getNamespaceTranslations(namespace: string, language: SupportedLanguage): Record<string, string> {
  const current = translations[namespace];
  if (!current || typeof current !== 'object') {
    return {};
  }

  const result: Record<string, string> = {};
  
  // Iterate through each key in the namespace
  for (const [key, value] of Object.entries(current)) {
    if (value && typeof value === 'object') {
      // Check if it's a TranslationLeaf (has language keys)
      if (language in value) {
        result[key] = value[language];
      } else if (language !== FALLBACK_LANGUAGE && FALLBACK_LANGUAGE in value) {
        // Fallback to the configured fallback language
        result[key] = value[FALLBACK_LANGUAGE];
      }
    }
  }
  
  return result;
}

/**
 * Check if a translation exists for a given key and language
 * @param key - Dot-notation key for the translation
 * @param language - The target language
 * @returns True if translation exists
 */
export function hasTranslation(key: string, language: SupportedLanguage): boolean {
  const keys = key.split('.');
  let current: any = translations;

  // Navigate to the translation leaf
  for (const k of keys) {
    if (current && typeof current === 'object' && k in current) {
      current = current[k];
    } else {
      return false;
    }
  }

  // Check if the language exists in the translation leaf
  return current && typeof current === 'object' && language in current && typeof current[language] === 'string';
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
  const locale = language === 'fr' ? 'fr-CA' : `${FALLBACK_LANGUAGE}-CA`;
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
  const locale = language === 'fr' ? 'fr-CA' : `${FALLBACK_LANGUAGE}-CA`;
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
 * Get the current fallback language
 * @returns The current fallback language
 */
export function getFallbackLanguage(): SupportedLanguage {
  return FALLBACK_LANGUAGE;
}

/**
 * Get the appropriate locale string for HTML lang attribute
 * @param language - The target language
 * @returns Locale string (e.g., 'en-CA', 'fr-CA')
 */
export function getLocaleString(language: SupportedLanguage): string {
  return language === 'fr' ? 'fr-CA' : `${FALLBACK_LANGUAGE}-CA`;
}
