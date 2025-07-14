/**
 * Language detection and routing utilities
 */

export type SupportedLanguage = 'en' | 'fr';

/**
 * Get the user's preferred language from browser settings
 * @param acceptLanguageHeader - The Accept-Language header from the request
 * @returns The preferred supported language
 */
export function detectLanguageFromHeader(acceptLanguageHeader?: string): SupportedLanguage {
  if (!acceptLanguageHeader) {
    return 'en'; // Default to English
  }

  // Parse Accept-Language header
  const languages = acceptLanguageHeader
    .split(',')
    .map(lang => {
      const [locale, quality] = lang.trim().split(';q=');
      return {
        locale: locale.toLowerCase(),
        quality: quality ? parseFloat(quality) : 1.0
      };
    })
    .sort((a, b) => b.quality - a.quality);

  // Check for exact matches first
  for (const lang of languages) {
    if (lang.locale === 'fr' || lang.locale === 'fr-ca' || lang.locale === 'fr-fr') {
      return 'fr';
    }
    if (lang.locale === 'en' || lang.locale.startsWith('en-')) {
      return 'en';
    }
  }

  // Default to English
  return 'en';
}

/**
 * Extract language from URL path
 * @param pathname - The URL pathname
 * @returns The language if found in the path, or null
 */
export function getLanguageFromPath(pathname: string): SupportedLanguage | null {
  const pathSegments = pathname.split('/').filter(Boolean);
  if (pathSegments.length > 0) {
    const firstSegment = pathSegments[0] as SupportedLanguage;
    if (firstSegment === 'en' || firstSegment === 'fr') {
      return firstSegment;
    }
  }
  return null;
}

/**
 * Get the current language from URL or default
 * @param pathname - The URL pathname
 * @returns The current language
 */
export function getCurrentLanguage(pathname: string): SupportedLanguage {
  return getLanguageFromPath(pathname) || 'en';
}

/**
 * Convert a path to a localized path
 * @param path - The base path
 * @param language - The target language
 * @returns The localized path
 */
export function getLocalizedPath(path: string, language: SupportedLanguage): string {
  // Remove any existing language prefix
  const cleanPath = path.replace(/^\/(en|fr)/, '') || '/';
  
  // Handle French route translations
  if (language === 'fr') {
    const frenchRoutes: Record<string, string> = {
      '/about': '/a-propos',
      '/partnerships': '/partenariats',
      '/blog': '/blogue',
      '/volunteer': '/benevole'
    };
    
    const translatedPath = frenchRoutes[cleanPath] || cleanPath;
    return `/fr${translatedPath}`;
  } else {
    // Handle English route translations (reverse of French)
    const englishRoutes: Record<string, string> = {
      '/a-propos': '/about',
      '/partenariats': '/partnerships',
      '/blogue': '/blog',
      '/benevole': '/volunteer'
    };
    
    const translatedPath = englishRoutes[cleanPath] || cleanPath;
    return `/en${translatedPath}`;
  }
}

/**
 * Check if a path is a valid language path
 * @param pathname - The URL pathname
 * @returns True if the path starts with a supported language code
 */
export function isLanguagePath(pathname: string): boolean {
  return getLanguageFromPath(pathname) !== null;
}
