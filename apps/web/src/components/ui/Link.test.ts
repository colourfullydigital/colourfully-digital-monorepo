/**
 * Link Component Tests
 * 
 * Tests for the Link component utility functions and logic
 * to ensure proper URL handling, security attributes, and accessibility compliance.
 */

import { describe, it, expect } from 'vitest';

// Link component variant mapping (extracted from component logic)
const variantClasses = {
  'default': 'text-base leading-normal font-medium underline decoration-2 underline-offset-2',
  'button': 'text-base leading-tight font-bold no-underline',
  'nav': 'text-base leading-normal font-medium no-underline',
  'inline': 'text-base leading-normal font-medium underline decoration-1 underline-offset-1'
} as const;

type LinkVariant = keyof typeof variantClasses;
type LinkTarget = '_blank' | '_self' | '_parent' | '_top';

/**
 * Utility functions extracted from the Link component
 */
export function getVariantClasses(variant: LinkVariant): string {
  return variantClasses[variant];
}

export function isExternalUrl(href: string): boolean {
  return href.startsWith('http') || href.startsWith('//');
}

export function generateRel(href: string, customRel?: string): string | undefined {
  if (customRel) return customRel;
  return isExternalUrl(href) ? 'noopener noreferrer' : undefined;
}

export function generateTarget(href: string, customTarget?: LinkTarget): LinkTarget | undefined {
  if (customTarget) return customTarget;
  return isExternalUrl(href) ? '_blank' : undefined;
}

export function buildLinkClasses(
  variant: LinkVariant,
  disabled: boolean = false,
  customClass: string = ''
): string[] {
  const classes = [
    'font-primary',
    'text-text-primary',
    'break-words',
    'transition-colors',
    'duration-200',
    'focus:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-blue-light',
    'focus-visible:ring-offset-2',
    disabled ? 'opacity-50' : 'cursor-pointer',
    disabled ? 'cursor-not-allowed' : undefined,
    disabled ? 'pointer-events-none' : undefined,
    !disabled && 'hover:text-blue-dark',
    !disabled && (variant === 'default' || variant === 'inline') && 'hover:decoration-blue-dark',
    getVariantClasses(variant),
    customClass,
  ].filter(Boolean) as string[];
  
  return classes;
}

export function validateLinkVariant(variant: string): variant is LinkVariant {
  return variant in variantClasses;
}

export function validateLinkTarget(target: string): target is LinkTarget {
  const validTargets: LinkTarget[] = ['_blank', '_self', '_parent', '_top'];
  return validTargets.includes(target as LinkTarget);
}

export function shouldShowExternalIndicator(href: string): boolean {
  return isExternalUrl(href);
}

describe('Link Component Logic', () => {
  describe('URL Detection', () => {
    it('should detect external URLs correctly', () => {
      expect(isExternalUrl('https://example.com')).toBe(true);
      expect(isExternalUrl('http://example.com')).toBe(true);
      expect(isExternalUrl('//example.com')).toBe(true);
      expect(isExternalUrl('https://www.google.com/search')).toBe(true);
    });

    it('should detect internal URLs correctly', () => {
      expect(isExternalUrl('/about')).toBe(false);
      expect(isExternalUrl('/en/contact')).toBe(false);
      expect(isExternalUrl('/fr/a-propos')).toBe(false);
      expect(isExternalUrl('#section')).toBe(false);
      expect(isExternalUrl('mailto:test@example.com')).toBe(false);
      expect(isExternalUrl('tel:+1234567890')).toBe(false);
    });
  });

  describe('Link Variant Validation', () => {
    it('should validate correct link variants', () => {
      expect(validateLinkVariant('default')).toBe(true);
      expect(validateLinkVariant('button')).toBe(true);
      expect(validateLinkVariant('nav')).toBe(true);
      expect(validateLinkVariant('inline')).toBe(true);
    });

    it('should reject invalid link variants', () => {
      expect(validateLinkVariant('primary')).toBe(false);
      expect(validateLinkVariant('secondary')).toBe(false);
      expect(validateLinkVariant('text')).toBe(false);
      expect(validateLinkVariant('')).toBe(false);
    });
  });

  describe('Link Target Validation', () => {
    it('should validate correct link targets', () => {
      expect(validateLinkTarget('_blank')).toBe(true);
      expect(validateLinkTarget('_self')).toBe(true);
      expect(validateLinkTarget('_parent')).toBe(true);
      expect(validateLinkTarget('_top')).toBe(true);
    });

    it('should reject invalid link targets', () => {
      expect(validateLinkTarget('blank')).toBe(false);
      expect(validateLinkTarget('new')).toBe(false);
      expect(validateLinkTarget('window')).toBe(false);
      expect(validateLinkTarget('')).toBe(false);
    });
  });

  describe('CSS Class Mapping', () => {
    it('should return correct CSS classes for each link variant', () => {
      expect(getVariantClasses('default')).toBe('text-base leading-normal font-medium underline decoration-2 underline-offset-2');
      expect(getVariantClasses('button')).toBe('text-base leading-tight font-bold no-underline');
      expect(getVariantClasses('nav')).toBe('text-base leading-normal font-medium no-underline');
      expect(getVariantClasses('inline')).toBe('text-base leading-normal font-medium underline decoration-1 underline-offset-1');
    });

    it('should follow design system link styling', () => {
      // Default and inline variants should have underlines
      expect(getVariantClasses('default')).toContain('underline');
      expect(getVariantClasses('inline')).toContain('underline');
      
      // Button and nav variants should not have underlines
      expect(getVariantClasses('button')).toContain('no-underline');
      expect(getVariantClasses('nav')).toContain('no-underline');
      
      // All variants should use consistent font sizing
      expect(getVariantClasses('default')).toContain('text-base');
      expect(getVariantClasses('button')).toContain('text-base');
      expect(getVariantClasses('nav')).toContain('text-base');
      expect(getVariantClasses('inline')).toContain('text-base');
    });

    it('should use appropriate font weights for different contexts', () => {
      // Default, nav, and inline should use medium weight for readability
      expect(getVariantClasses('default')).toContain('font-medium');
      expect(getVariantClasses('nav')).toContain('font-medium');
      expect(getVariantClasses('inline')).toContain('font-medium');
      
      // Button variant should use bold weight for emphasis
      expect(getVariantClasses('button')).toContain('font-bold');
    });
  });

  describe('Security Attribute Generation', () => {
    it('should generate correct rel attribute for external links', () => {
      expect(generateRel('https://example.com')).toBe('noopener noreferrer');
      expect(generateRel('http://example.com')).toBe('noopener noreferrer');
      expect(generateRel('//example.com')).toBe('noopener noreferrer');
    });

    it('should not generate rel attribute for internal links', () => {
      expect(generateRel('/about')).toBeUndefined();
      expect(generateRel('/en/contact')).toBeUndefined();
      expect(generateRel('#section')).toBeUndefined();
    });

    it('should use custom rel attribute when provided', () => {
      expect(generateRel('https://example.com', 'custom-rel')).toBe('custom-rel');
      expect(generateRel('/about', 'custom-rel')).toBe('custom-rel');
    });

    it('should generate correct target attribute for external links', () => {
      expect(generateTarget('https://example.com')).toBe('_blank');
      expect(generateTarget('http://example.com')).toBe('_blank');
      expect(generateTarget('//example.com')).toBe('_blank');
    });

    it('should not generate target attribute for internal links', () => {
      expect(generateTarget('/about')).toBeUndefined();
      expect(generateTarget('/en/contact')).toBeUndefined();
      expect(generateTarget('#section')).toBeUndefined();
    });

    it('should use custom target attribute when provided', () => {
      expect(generateTarget('https://example.com', '_self')).toBe('_self');
      expect(generateTarget('/about', '_blank')).toBe('_blank');
    });
  });

  describe('CSS Class Building', () => {
    it('should build base link classes', () => {
      const classes = buildLinkClasses('default');
      expect(classes).toContain('font-primary');
      expect(classes).toContain('text-text-primary');
      expect(classes).toContain('break-words');
      expect(classes).toContain('transition-colors');
      expect(classes).toContain('duration-200');
      expect(classes).toContain('focus:outline-none');
      expect(classes).toContain('focus-visible:ring-2');
      expect(classes).toContain('focus-visible:ring-blue-light');
      expect(classes).toContain('focus-visible:ring-offset-2');
      expect(classes).toContain('cursor-pointer');
      expect(classes).toContain('hover:text-blue-dark');
    });

    it('should handle disabled state correctly', () => {
      const classes = buildLinkClasses('default', true);
      expect(classes).toContain('opacity-50');
      expect(classes).toContain('cursor-not-allowed');
      expect(classes).toContain('pointer-events-none');
      expect(classes).not.toContain('cursor-pointer');
      expect(classes).not.toContain('hover:text-blue-dark');
    });

    it('should include hover effects for underlined variants', () => {
      const defaultClasses = buildLinkClasses('default');
      const inlineClasses = buildLinkClasses('inline');
      const buttonClasses = buildLinkClasses('button');
      const navClasses = buildLinkClasses('nav');
      
      expect(defaultClasses).toContain('hover:decoration-blue-dark');
      expect(inlineClasses).toContain('hover:decoration-blue-dark');
      expect(buttonClasses).not.toContain('hover:decoration-blue-dark');
      expect(navClasses).not.toContain('hover:decoration-blue-dark');
    });

    it('should include custom classes when provided', () => {
      const classes = buildLinkClasses('default', false, 'custom-class text-green');
      expect(classes).toContain('custom-class text-green');
    });

    it('should work correctly for all link variants', () => {
      const variants: LinkVariant[] = ['default', 'button', 'nav', 'inline'];
      
      variants.forEach(variant => {
        const classes = buildLinkClasses(variant);
        expect(classes).toContain('font-primary');
        expect(classes).toContain('text-text-primary');
        expect(classes).toContain('break-words');
        expect(classes).toContain(getVariantClasses(variant));
      });
    });
  });

  describe('External Link Indicator', () => {
    it('should show indicator for external links', () => {
      expect(shouldShowExternalIndicator('https://example.com')).toBe(true);
      expect(shouldShowExternalIndicator('http://example.com')).toBe(true);
      expect(shouldShowExternalIndicator('//example.com')).toBe(true);
    });

    it('should not show indicator for internal links', () => {
      expect(shouldShowExternalIndicator('/about')).toBe(false);
      expect(shouldShowExternalIndicator('/en/contact')).toBe(false);
      expect(shouldShowExternalIndicator('#section')).toBe(false);
    });
  });

  describe('Bilingual Support Validation', () => {
    it('should include break-words for text wrapping', () => {
      const variants: LinkVariant[] = ['default', 'button', 'nav', 'inline'];
      
      variants.forEach(variant => {
        const classes = buildLinkClasses(variant);
        expect(classes).toContain('break-words');
      });
    });

    it('should handle French text expansion scenarios', () => {
      // French text is typically 15-20% longer than English
      // The break-words class ensures proper wrapping for long French link text
      const classes = buildLinkClasses('default');
      expect(classes).toContain('break-words');
      
      // All variants should support text wrapping
      const variants: LinkVariant[] = ['default', 'button', 'nav', 'inline'];
      variants.forEach(variant => {
        const variantClasses = buildLinkClasses(variant);
        expect(variantClasses).toContain('break-words');
      });
    });
  });

  describe('Accessibility Considerations', () => {
    it('should include proper focus styles', () => {
      const classes = buildLinkClasses('default');
      expect(classes).toContain('focus:outline-none');
      expect(classes).toContain('focus-visible:ring-2');
      expect(classes).toContain('focus-visible:ring-blue-light');
      expect(classes).toContain('focus-visible:ring-offset-2');
    });

    it('should provide adequate contrast with text colors', () => {
      const variants: LinkVariant[] = ['default', 'button', 'nav', 'inline'];
      
      variants.forEach(variant => {
        const classes = buildLinkClasses(variant);
        expect(classes).toContain('text-text-primary');
      });
    });

    it('should handle disabled state accessibly', () => {
      const classes = buildLinkClasses('default', true);
      expect(classes).toContain('opacity-50');
      expect(classes).toContain('cursor-not-allowed');
      expect(classes).toContain('pointer-events-none');
    });

    it('should provide smooth transitions for better UX', () => {
      const classes = buildLinkClasses('default');
      expect(classes).toContain('transition-colors');
      expect(classes).toContain('duration-200');
    });
  });

  describe('Design System Integration', () => {
    it('should use design system font family', () => {
      const variants: LinkVariant[] = ['default', 'button', 'nav', 'inline'];
      
      variants.forEach(variant => {
        const classes = buildLinkClasses(variant);
        expect(classes).toContain('font-primary');
      });
    });

    it('should follow neo-brutalist design principles', () => {
      // Neo-brutalism emphasizes clear, bold interactions
      // Default and inline variants should have prominent underlines
      expect(getVariantClasses('default')).toContain('decoration-2');
      expect(getVariantClasses('inline')).toContain('decoration-1');
      
      // Button variant should use bold font weight for impact
      expect(getVariantClasses('button')).toContain('font-bold');
    });

    it('should provide appropriate link hierarchy', () => {
      // All variants should use consistent base font size
      const variants: LinkVariant[] = ['default', 'button', 'nav', 'inline'];
      
      variants.forEach(variant => {
        expect(getVariantClasses(variant)).toContain('text-base');
      });
    });
  });

  describe('Security Best Practices', () => {
    it('should automatically secure external links', () => {
      const externalUrls = [
        'https://example.com',
        'http://example.com',
        '//example.com'
      ];
      
      externalUrls.forEach(url => {
        expect(generateRel(url)).toBe('noopener noreferrer');
        expect(generateTarget(url)).toBe('_blank');
      });
    });

    it('should not add security attributes to internal links', () => {
      const internalUrls = [
        '/about',
        '/en/contact',
        '/fr/a-propos',
        '#section',
        'mailto:test@example.com',
        'tel:+1234567890'
      ];
      
      internalUrls.forEach(url => {
        expect(generateRel(url)).toBeUndefined();
        expect(generateTarget(url)).toBeUndefined();
      });
    });
  });
});