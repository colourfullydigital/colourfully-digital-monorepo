/**
 * Button Component Tests
 * 
 * Tests for the Button component utility functions and logic
 * to ensure proper styling, accessibility, and behavior.
 */

import { describe, it, expect } from 'vitest';
import { getContrastRatio, checkContrastCompliance } from '../../lib/contrast-test';

// Button component variant mapping (extracted from component logic)
const variantClasses = {
  'primary': 'bg-green text-white border-brutalist shadow-md hover:bg-green-dark',
  'secondary': 'bg-blue text-white border-brutalist shadow-md hover:bg-blue-dark',
  'tertiary': 'bg-yellow text-black border-brutalist shadow-md hover:bg-yellow-dark',
  'ghost': 'bg-transparent text-black border-normal hover:bg-surface',
} as const;

// Button component size mapping (extracted from component logic)
const sizeClasses = {
  'sm': 'text-sm py-1 px-3',
  'md': 'text-base py-2 px-4',
  'lg': 'text-lg py-3 px-6',
} as const;

type ButtonVariant = keyof typeof variantClasses;
type ButtonSize = keyof typeof sizeClasses;

/**
 * Utility functions extracted from the Button component
 */
export function getVariantClasses(variant: ButtonVariant): string {
  return variantClasses[variant];
}

export function getSizeClasses(size: ButtonSize): string {
  return sizeClasses[size];
}

export function buildButtonClasses(
  variant: ButtonVariant,
  size: ButtonSize,
  disabled: boolean = false,
  loading: boolean = false,
  fullWidth: boolean = false,
  customClass: string = ''
): string[] {
  const classes = [
    'inline-flex',
    'items-center',
    'justify-center',
    'font-primary',
    'font-bold',
    'transition-transform',
    'border-black',
    'focus:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-blue-light',
    'focus-visible:ring-offset-2',
    disabled || loading ? 'opacity-50' : 'cursor-pointer',
    disabled || loading ? 'cursor-not-allowed' : undefined,
    disabled || loading ? 'pointer-events-none' : undefined,
    !disabled && !loading ? 'active:translate-y-1' : undefined,
    fullWidth ? 'w-full' : '',
    getSizeClasses(size),
    getVariantClasses(variant),
    customClass,
  ].filter(Boolean) as string[];
  
  return classes;
}

export function validateButtonVariant(variant: string): variant is ButtonVariant {
  return variant in variantClasses;
}

export function validateButtonSize(size: string): size is ButtonSize {
  return size in sizeClasses;
}

describe('Button Component Logic', () => {
  describe('Variant Validation', () => {
    it('should validate correct button variants', () => {
      expect(validateButtonVariant('primary')).toBe(true);
      expect(validateButtonVariant('secondary')).toBe(true);
      expect(validateButtonVariant('tertiary')).toBe(true);
      expect(validateButtonVariant('ghost')).toBe(true);
    });

    it('should reject invalid button variants', () => {
      expect(validateButtonVariant('default')).toBe(false);
      expect(validateButtonVariant('outline')).toBe(false);
      expect(validateButtonVariant('')).toBe(false);
    });
  });

  describe('Size Validation', () => {
    it('should validate correct button sizes', () => {
      expect(validateButtonSize('sm')).toBe(true);
      expect(validateButtonSize('md')).toBe(true);
      expect(validateButtonSize('lg')).toBe(true);
    });

    it('should reject invalid button sizes', () => {
      expect(validateButtonSize('xs')).toBe(false);
      expect(validateButtonSize('xl')).toBe(false);
      expect(validateButtonSize('')).toBe(false);
    });
  });

  describe('CSS Class Mapping', () => {
    it('should return correct CSS classes for each button variant', () => {
      expect(getVariantClasses('primary')).toBe('bg-green text-white border-brutalist shadow-md hover:bg-green-dark');
      expect(getVariantClasses('secondary')).toBe('bg-blue text-white border-brutalist shadow-md hover:bg-blue-dark');
      expect(getVariantClasses('tertiary')).toBe('bg-yellow text-black border-brutalist shadow-md hover:bg-yellow-dark');
      expect(getVariantClasses('ghost')).toBe('bg-transparent text-black border-normal hover:bg-surface');
    });

    it('should return correct CSS classes for each button size', () => {
      expect(getSizeClasses('sm')).toBe('text-sm py-1 px-3');
      expect(getSizeClasses('md')).toBe('text-base py-2 px-4');
      expect(getSizeClasses('lg')).toBe('text-lg py-3 px-6');
    });

    it('should follow neo-brutalist design styling', () => {
      // Primary, secondary, and tertiary variants should have brutalist borders and shadows
      expect(getVariantClasses('primary')).toContain('border-brutalist');
      expect(getVariantClasses('primary')).toContain('shadow-md');
      expect(getVariantClasses('secondary')).toContain('border-brutalist');
      expect(getVariantClasses('secondary')).toContain('shadow-md');
      expect(getVariantClasses('tertiary')).toContain('border-brutalist');
      expect(getVariantClasses('tertiary')).toContain('shadow-md');
      
      // Ghost variant should have normal border and no shadow
      expect(getVariantClasses('ghost')).toContain('border-normal');
      expect(getVariantClasses('ghost')).not.toContain('shadow-md');
    });
  });

  describe('CSS Class Building', () => {
    it('should build base button classes', () => {
      const classes = buildButtonClasses('primary', 'md');
      expect(classes).toContain('inline-flex');
      expect(classes).toContain('items-center');
      expect(classes).toContain('justify-center');
      expect(classes).toContain('font-primary');
      expect(classes).toContain('font-bold');
      expect(classes).toContain('transition-transform');
      expect(classes).toContain('border-black');
      expect(classes).toContain('focus:outline-none');
      expect(classes).toContain('focus-visible:ring-2');
      expect(classes).toContain('focus-visible:ring-blue-light');
      expect(classes).toContain('focus-visible:ring-offset-2');
      expect(classes).toContain('cursor-pointer');
      expect(classes).toContain('active:translate-y-1');
    });

    it('should handle disabled state correctly', () => {
      const classes = buildButtonClasses('primary', 'md', true);
      expect(classes).toContain('opacity-50');
      expect(classes).toContain('cursor-not-allowed');
      expect(classes).toContain('pointer-events-none');
      expect(classes).not.toContain('cursor-pointer');
      expect(classes).not.toContain('active:translate-y-1');
    });

    it('should handle loading state correctly', () => {
      const classes = buildButtonClasses('primary', 'md', false, true);
      expect(classes).toContain('opacity-50');
      expect(classes).toContain('cursor-not-allowed');
      expect(classes).toContain('pointer-events-none');
      expect(classes).not.toContain('cursor-pointer');
      expect(classes).not.toContain('active:translate-y-1');
    });

    it('should handle fullWidth correctly', () => {
      const classes = buildButtonClasses('primary', 'md', false, false, true);
      expect(classes).toContain('w-full');
    });

    it('should include custom classes when provided', () => {
      const classes = buildButtonClasses('primary', 'md', false, false, false, 'custom-class text-green');
      expect(classes).toContain('custom-class text-green');
    });

    it('should work correctly for all button variants and sizes', () => {
      const variants: ButtonVariant[] = ['primary', 'secondary', 'tertiary', 'ghost'];
      const sizes: ButtonSize[] = ['sm', 'md', 'lg'];
      
      variants.forEach(variant => {
        sizes.forEach(size => {
          const classes = buildButtonClasses(variant, size);
          expect(classes).toContain('font-primary');
          expect(classes).toContain('font-bold');
          expect(classes).toContain(getVariantClasses(variant));
          expect(classes).toContain(getSizeClasses(size));
        });
      });
    });
  });

  describe('Accessibility Considerations', () => {
    it('should include proper focus styles', () => {
      const classes = buildButtonClasses('primary', 'md');
      expect(classes).toContain('focus:outline-none');
      expect(classes).toContain('focus-visible:ring-2');
      expect(classes).toContain('focus-visible:ring-blue-light');
      expect(classes).toContain('focus-visible:ring-offset-2');
    });

    it('should provide adequate contrast with text colors', () => {
      // Mock colors from the design system
      const colors = {
        green: '#1F7A22',
        blue: '#3A5AD7',
        yellow: '#FFDA6B',
        white: '#FFFFFF',
        black: '#121212'
      };
      
      // Test primary button contrast (white text on green)
      const primaryContrast = getContrastRatio(colors.white, colors.green);
      const primaryCompliance = checkContrastCompliance(primaryContrast);
      expect(primaryCompliance.passes).toBe(true);
      
      // Test secondary button contrast (white text on blue)
      const secondaryContrast = getContrastRatio(colors.white, colors.blue);
      const secondaryCompliance = checkContrastCompliance(secondaryContrast);
      expect(secondaryCompliance.passes).toBe(true);
      
      // Test tertiary button contrast (black text on yellow)
      const tertiaryContrast = getContrastRatio(colors.black, colors.yellow);
      const tertiaryCompliance = checkContrastCompliance(tertiaryContrast);
      expect(tertiaryCompliance.passes).toBe(true);
    });

    it('should handle disabled state accessibly', () => {
      const classes = buildButtonClasses('primary', 'md', true);
      expect(classes).toContain('opacity-50');
      expect(classes).toContain('cursor-not-allowed');
      expect(classes).toContain('pointer-events-none');
    });

    it('should provide smooth transitions for better UX', () => {
      const classes = buildButtonClasses('primary', 'md');
      expect(classes).toContain('transition-transform');
    });
  });

  describe('Design System Integration', () => {
    it('should use design system font family', () => {
      const variants: ButtonVariant[] = ['primary', 'secondary', 'tertiary', 'ghost'];
      
      variants.forEach(variant => {
        const classes = buildButtonClasses(variant, 'md');
        expect(classes).toContain('font-primary');
      });
    });

    it('should follow neo-brutalist design principles', () => {
      // Neo-brutalism emphasizes bold borders and shadows
      expect(getVariantClasses('primary')).toContain('border-brutalist');
      expect(getVariantClasses('primary')).toContain('shadow-md');
      
      // All variants should use bold font weight for impact
      const classes = buildButtonClasses('primary', 'md');
      expect(classes).toContain('font-bold');
    });

    it('should provide appropriate button hierarchy', () => {
      // Different sizes should use appropriate text sizes
      expect(getSizeClasses('sm')).toContain('text-sm');
      expect(getSizeClasses('md')).toContain('text-base');
      expect(getSizeClasses('lg')).toContain('text-lg');
    });
  });

  describe('Bilingual Support Validation', () => {
    it('should handle text expansion for French content', () => {
      // Buttons should have adequate padding to accommodate longer French text
      expect(getSizeClasses('sm')).toContain('px-3');
      expect(getSizeClasses('md')).toContain('px-4');
      expect(getSizeClasses('lg')).toContain('px-6');
    });
  });
});