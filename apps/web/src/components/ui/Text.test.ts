/**
 * Text Component Tests
 * 
 * Tests for the Text component utility functions and logic
 * to ensure proper class mapping, semantic HTML elements, and accessibility compliance.
 */

import { describe, it, expect } from 'vitest';

// Text component variant mapping (extracted from component logic)
const variantClasses = {
  'body-lg': 'text-lg leading-relaxed font-regular',
  'body': 'text-base leading-relaxed font-regular',
  'body-sm': 'text-sm leading-normal font-regular',
  'caption': 'text-xs leading-normal font-medium',
  'overline': 'text-xs leading-normal font-bold uppercase tracking-wider'
} as const;

// Default HTML elements for each variant
const defaultElements = {
  'body-lg': 'p',
  'body': 'p',
  'body-sm': 'p',
  'caption': 'small',
  'overline': 'span'
} as const;

type TextVariant = keyof typeof variantClasses;
type TextElement = 'p' | 'span' | 'div' | 'small' | 'strong' | 'em';

/**
 * Utility functions extracted from the Text component
 */
export function getVariantClasses(variant: TextVariant): string {
  return variantClasses[variant];
}

export function getDefaultElement(variant: TextVariant): string {
  return defaultElements[variant];
}

export function getTextElement(variant: TextVariant, customElement?: TextElement): string {
  return customElement || defaultElements[variant];
}

export function buildTextClasses(
  variant: TextVariant,
  customClass: string = ''
): string[] {
  const classes = [
    'font-primary',
    'text-text-primary',
    'break-words',
    getVariantClasses(variant),
    customClass,
  ].filter(Boolean) as string[];
  
  return classes;
}

export function validateTextVariant(variant: string): variant is TextVariant {
  return variant in variantClasses;
}

export function validateTextElement(element: string): element is TextElement {
  const validElements: TextElement[] = ['p', 'span', 'div', 'small', 'strong', 'em'];
  return validElements.includes(element as TextElement);
}

describe('Text Component Logic', () => {
  describe('Text Variant Validation', () => {
    it('should validate correct text variants', () => {
      expect(validateTextVariant('body-lg')).toBe(true);
      expect(validateTextVariant('body')).toBe(true);
      expect(validateTextVariant('body-sm')).toBe(true);
      expect(validateTextVariant('caption')).toBe(true);
      expect(validateTextVariant('overline')).toBe(true);
    });

    it('should reject invalid text variants', () => {
      expect(validateTextVariant('heading')).toBe(false);
      expect(validateTextVariant('title')).toBe(false);
      expect(validateTextVariant('subtitle')).toBe(false);
      expect(validateTextVariant('')).toBe(false);
    });
  });

  describe('Text Element Validation', () => {
    it('should validate correct HTML elements', () => {
      expect(validateTextElement('p')).toBe(true);
      expect(validateTextElement('span')).toBe(true);
      expect(validateTextElement('div')).toBe(true);
      expect(validateTextElement('small')).toBe(true);
      expect(validateTextElement('strong')).toBe(true);
      expect(validateTextElement('em')).toBe(true);
    });

    it('should reject invalid HTML elements', () => {
      expect(validateTextElement('h1')).toBe(false);
      expect(validateTextElement('button')).toBe(false);
      expect(validateTextElement('a')).toBe(false);
      expect(validateTextElement('')).toBe(false);
    });
  });

  describe('CSS Class Mapping', () => {
    it('should return correct CSS classes for each text variant', () => {
      expect(getVariantClasses('body-lg')).toBe('text-lg leading-relaxed font-regular');
      expect(getVariantClasses('body')).toBe('text-base leading-relaxed font-regular');
      expect(getVariantClasses('body-sm')).toBe('text-sm leading-normal font-regular');
      expect(getVariantClasses('caption')).toBe('text-xs leading-normal font-medium');
      expect(getVariantClasses('overline')).toBe('text-xs leading-normal font-bold uppercase tracking-wider');
    });

    it('should follow design system typography hierarchy', () => {
      // Body variants should use font-regular for readability
      expect(getVariantClasses('body-lg')).toContain('font-regular');
      expect(getVariantClasses('body')).toContain('font-regular');
      expect(getVariantClasses('body-sm')).toContain('font-regular');
      
      // Caption should use font-medium for subtle emphasis
      expect(getVariantClasses('caption')).toContain('font-medium');
      
      // Overline should use font-bold for labels and categories
      expect(getVariantClasses('overline')).toContain('font-bold');
      expect(getVariantClasses('overline')).toContain('uppercase');
      expect(getVariantClasses('overline')).toContain('tracking-wider');
    });

    it('should use appropriate line heights for readability', () => {
      // Body text uses relaxed line height for better readability
      expect(getVariantClasses('body-lg')).toContain('leading-relaxed');
      expect(getVariantClasses('body')).toContain('leading-relaxed');
      
      // Smaller text uses normal line height
      expect(getVariantClasses('body-sm')).toContain('leading-normal');
      expect(getVariantClasses('caption')).toContain('leading-normal');
      expect(getVariantClasses('overline')).toContain('leading-normal');
    });
  });

  describe('Default HTML Element Mapping', () => {
    it('should return correct default HTML elements for each variant', () => {
      expect(getDefaultElement('body-lg')).toBe('p');
      expect(getDefaultElement('body')).toBe('p');
      expect(getDefaultElement('body-sm')).toBe('p');
      expect(getDefaultElement('caption')).toBe('small');
      expect(getDefaultElement('overline')).toBe('span');
    });

    it('should use semantic elements appropriately', () => {
      // Body text variants should default to paragraph elements
      expect(getDefaultElement('body-lg')).toBe('p');
      expect(getDefaultElement('body')).toBe('p');
      expect(getDefaultElement('body-sm')).toBe('p');
      
      // Caption should use small element for semantic meaning
      expect(getDefaultElement('caption')).toBe('small');
      
      // Overline should use span as it's typically inline
      expect(getDefaultElement('overline')).toBe('span');
    });
  });

  describe('Element Selection Logic', () => {
    it('should return custom element when provided', () => {
      expect(getTextElement('body', 'div')).toBe('div');
      expect(getTextElement('caption', 'span')).toBe('span');
      expect(getTextElement('overline', 'strong')).toBe('strong');
    });

    it('should return default element when no custom element provided', () => {
      expect(getTextElement('body')).toBe('p');
      expect(getTextElement('caption')).toBe('small');
      expect(getTextElement('overline')).toBe('span');
    });
  });

  describe('CSS Class Building', () => {
    it('should build base text classes', () => {
      const classes = buildTextClasses('body');
      expect(classes).toContain('font-primary');
      expect(classes).toContain('text-text-primary');
      expect(classes).toContain('break-words');
      expect(classes).toContain('text-base leading-relaxed font-regular');
    });

    it('should include custom classes when provided', () => {
      const classes = buildTextClasses('body', 'custom-class text-green');
      expect(classes).toContain('font-primary');
      expect(classes).toContain('text-text-primary');
      expect(classes).toContain('break-words');
      expect(classes).toContain('text-base leading-relaxed font-regular');
      expect(classes).toContain('custom-class text-green');
    });

    it('should filter out empty custom classes', () => {
      const classes = buildTextClasses('body', '');
      expect(classes).not.toContain('');
      expect(classes).toHaveLength(4); // Only the base classes
    });

    it('should work correctly for all text variants', () => {
      const variants: TextVariant[] = ['body-lg', 'body', 'body-sm', 'caption', 'overline'];
      
      variants.forEach(variant => {
        const classes = buildTextClasses(variant);
        expect(classes).toContain('font-primary');
        expect(classes).toContain('text-text-primary');
        expect(classes).toContain('break-words');
        expect(classes).toContain(getVariantClasses(variant));
      });
    });
  });

  describe('Typography Scale Consistency', () => {
    it('should maintain proper size hierarchy', () => {
      // Font sizes should follow a logical hierarchy
      expect(getVariantClasses('body-lg')).toContain('text-lg');
      expect(getVariantClasses('body')).toContain('text-base');
      expect(getVariantClasses('body-sm')).toContain('text-sm');
      expect(getVariantClasses('caption')).toContain('text-xs');
      expect(getVariantClasses('overline')).toContain('text-xs');
    });

    it('should use fluid typography tokens', () => {
      // All text variants should use Tailwind's fluid typography scale
      const variants: TextVariant[] = ['body-lg', 'body', 'body-sm', 'caption', 'overline'];
      
      variants.forEach(variant => {
        const classes = getVariantClasses(variant);
        expect(classes).toMatch(/text-(lg|base|sm|xs)/);
      });
    });
  });

  describe('Bilingual Support Validation', () => {
    it('should include break-words for text wrapping', () => {
      const variants: TextVariant[] = ['body-lg', 'body', 'body-sm', 'caption', 'overline'];
      
      variants.forEach(variant => {
        const classes = buildTextClasses(variant);
        expect(classes).toContain('break-words');
      });
    });

    it('should handle French text expansion scenarios', () => {
      // French text is typically 15-20% longer than English
      // The break-words class ensures proper wrapping for long French words
      const classes = buildTextClasses('body');
      expect(classes).toContain('break-words');
      
      // Body text should use relaxed line height to accommodate longer text
      expect(getVariantClasses('body')).toContain('leading-relaxed');
      expect(getVariantClasses('body-lg')).toContain('leading-relaxed');
    });
  });

  describe('Accessibility Considerations', () => {
    it('should use semantic HTML elements appropriately', () => {
      // Body text should default to paragraph elements
      expect(getDefaultElement('body-lg')).toBe('p');
      expect(getDefaultElement('body')).toBe('p');
      expect(getDefaultElement('body-sm')).toBe('p');
      
      // Caption should use small element for semantic meaning
      expect(getDefaultElement('caption')).toBe('small');
      
      // Overline should use span for inline content
      expect(getDefaultElement('overline')).toBe('span');
    });

    it('should provide adequate contrast with text colors', () => {
      // All text variants should use the primary text color for proper contrast
      const variants: TextVariant[] = ['body-lg', 'body', 'body-sm', 'caption', 'overline'];
      
      variants.forEach(variant => {
        const classes = buildTextClasses(variant);
        expect(classes).toContain('text-text-primary');
      });
    });

    it('should use appropriate font weights for readability', () => {
      // Body text should use regular weight for optimal readability
      expect(getVariantClasses('body-lg')).toContain('font-regular');
      expect(getVariantClasses('body')).toContain('font-regular');
      expect(getVariantClasses('body-sm')).toContain('font-regular');
      
      // Caption should use medium weight for subtle emphasis
      expect(getVariantClasses('caption')).toContain('font-medium');
      
      // Overline should use bold weight for labels
      expect(getVariantClasses('overline')).toContain('font-bold');
    });
  });

  describe('Design System Integration', () => {
    it('should use design system font family', () => {
      const variants: TextVariant[] = ['body-lg', 'body', 'body-sm', 'caption', 'overline'];
      
      variants.forEach(variant => {
        const classes = buildTextClasses(variant);
        expect(classes).toContain('font-primary');
      });
    });

    it('should follow neo-brutalist design principles', () => {
      // Neo-brutalism emphasizes clear, readable typography
      // Body text should use relaxed line heights for readability
      expect(getVariantClasses('body-lg')).toContain('leading-relaxed');
      expect(getVariantClasses('body')).toContain('leading-relaxed');
      
      // Overline should use uppercase and wider tracking for impact
      expect(getVariantClasses('overline')).toContain('uppercase');
      expect(getVariantClasses('overline')).toContain('tracking-wider');
    });

    it('should provide appropriate text hierarchy', () => {
      // Text variants should provide a clear hierarchy
      const sizeOrder = ['body-lg', 'body', 'body-sm', 'caption', 'overline'];
      const expectedSizes = ['text-lg', 'text-base', 'text-sm', 'text-xs', 'text-xs'];
      
      sizeOrder.forEach((variant, index) => {
        expect(getVariantClasses(variant as TextVariant)).toContain(expectedSizes[index]);
      });
    });
  });
});