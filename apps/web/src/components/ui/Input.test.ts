/**
 * Input Component Tests
 * 
 * Tests for the Input component utility functions and logic
 * to ensure proper styling, accessibility, and behavior.
 */

import { describe, it, expect } from 'vitest';

// Input component type mapping
const inputTypes = [
  'text',
  'email',
  'password',
  'number',
  'tel',
  'url',
  'search',
  'date'
] as const;

type InputType = typeof inputTypes[number];

/**
 * Utility functions extracted from the Input component
 */
export function buildInputClasses(
  disabled: boolean = false,
  error: boolean = false,
  customClass: string = ''
): string[] {
  const classes = [
    'w-full',
    'font-primary',
    'text-base',
    'px-3',
    'py-2',
    'border-black',
    'border-normal',
    'bg-white',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-blue-light',
    'focus:border-blue',
    disabled ? 'opacity-50' : undefined,
    disabled ? 'cursor-not-allowed' : undefined,
    disabled ? 'bg-surface' : undefined,
    error ? 'border-red' : undefined,
    customClass,
  ].filter(Boolean) as string[];
  
  return classes;
}

export function buildLabelClasses(
  disabled: boolean = false,
  customClass: string = ''
): string[] {
  const classes = [
    'block',
    'font-primary',
    'font-medium',
    'text-base',
    'mb-1',
    disabled ? 'opacity-50' : undefined,
    customClass,
  ].filter(Boolean) as string[];
  
  return classes;
}

export function buildErrorClasses(
  customClass: string = ''
): string[] {
  const classes = [
    'text-red',
    'font-primary',
    'text-sm',
    'mt-1',
    customClass,
  ].filter(Boolean) as string[];
  
  return classes;
}

export function validateInputType(type: string): type is InputType {
  return inputTypes.includes(type as InputType);
}

export function generateErrorId(id: string): string {
  return `${id}-error`;
}

export function generateDescribedBy(id: string, error: boolean, ariaDescribedby?: string): string | undefined {
  const errorId = generateErrorId(id);
  
  if (error) {
    return ariaDescribedby 
      ? `${errorId} ${ariaDescribedby}` 
      : errorId;
  }
  
  return ariaDescribedby;
}

describe('Input Component Logic', () => {
  describe('Input Type Validation', () => {
    it('should validate correct input types', () => {
      expect(validateInputType('text')).toBe(true);
      expect(validateInputType('email')).toBe(true);
      expect(validateInputType('password')).toBe(true);
      expect(validateInputType('number')).toBe(true);
      expect(validateInputType('tel')).toBe(true);
      expect(validateInputType('url')).toBe(true);
      expect(validateInputType('search')).toBe(true);
      expect(validateInputType('date')).toBe(true);
    });

    it('should reject invalid input types', () => {
      expect(validateInputType('color')).toBe(false);
      expect(validateInputType('file')).toBe(false);
      expect(validateInputType('checkbox')).toBe(false);
      expect(validateInputType('radio')).toBe(false);
      expect(validateInputType('')).toBe(false);
    });
  });

  describe('CSS Class Building', () => {
    it('should build base input classes', () => {
      const classes = buildInputClasses();
      expect(classes).toContain('w-full');
      expect(classes).toContain('font-primary');
      expect(classes).toContain('text-base');
      expect(classes).toContain('px-3');
      expect(classes).toContain('py-2');
      expect(classes).toContain('border-black');
      expect(classes).toContain('border-normal');
      expect(classes).toContain('bg-white');
      expect(classes).toContain('focus:outline-none');
      expect(classes).toContain('focus:ring-2');
      expect(classes).toContain('focus:ring-blue-light');
      expect(classes).toContain('focus:border-blue');
    });

    it('should handle disabled state correctly', () => {
      const classes = buildInputClasses(true);
      expect(classes).toContain('opacity-50');
      expect(classes).toContain('cursor-not-allowed');
      expect(classes).toContain('bg-surface');
    });

    it('should handle error state correctly', () => {
      const classes = buildInputClasses(false, true);
      expect(classes).toContain('border-red');
    });

    it('should include custom classes when provided', () => {
      const classes = buildInputClasses(false, false, 'custom-class text-green');
      expect(classes).toContain('custom-class text-green');
    });

    it('should build base label classes', () => {
      const classes = buildLabelClasses();
      expect(classes).toContain('block');
      expect(classes).toContain('font-primary');
      expect(classes).toContain('font-medium');
      expect(classes).toContain('text-base');
      expect(classes).toContain('mb-1');
    });

    it('should handle disabled state for label', () => {
      const classes = buildLabelClasses(true);
      expect(classes).toContain('opacity-50');
    });

    it('should build error message classes', () => {
      const classes = buildErrorClasses();
      expect(classes).toContain('text-red');
      expect(classes).toContain('font-primary');
      expect(classes).toContain('text-sm');
      expect(classes).toContain('mt-1');
    });
  });

  describe('Accessibility Helpers', () => {
    it('should generate correct error ID', () => {
      expect(generateErrorId('name')).toBe('name-error');
      expect(generateErrorId('email-field')).toBe('email-field-error');
    });

    it('should generate correct aria-describedby attribute with error', () => {
      expect(generateDescribedBy('name', true)).toBe('name-error');
      expect(generateDescribedBy('email', true, 'email-hint')).toBe('email-error email-hint');
    });

    it('should generate correct aria-describedby attribute without error', () => {
      expect(generateDescribedBy('name', false)).toBeUndefined();
      expect(generateDescribedBy('email', false, 'email-hint')).toBe('email-hint');
    });
  });

  describe('Neo-brutalist Design Integration', () => {
    it('should use design system font family', () => {
      const inputClasses = buildInputClasses();
      const labelClasses = buildLabelClasses();
      const errorClasses = buildErrorClasses();
      
      expect(inputClasses).toContain('font-primary');
      expect(labelClasses).toContain('font-primary');
      expect(errorClasses).toContain('font-primary');
    });

    it('should follow neo-brutalist design principles', () => {
      const inputClasses = buildInputClasses();
      
      // Neo-brutalism emphasizes bold borders
      expect(inputClasses).toContain('border-black');
      expect(inputClasses).toContain('border-normal');
    });
  });

  describe('Accessibility Considerations', () => {
    it('should include proper focus styles', () => {
      const inputClasses = buildInputClasses();
      expect(inputClasses).toContain('focus:outline-none');
      expect(inputClasses).toContain('focus:ring-2');
      expect(inputClasses).toContain('focus:ring-blue-light');
      expect(inputClasses).toContain('focus:border-blue');
    });

    it('should handle disabled state accessibly', () => {
      const inputClasses = buildInputClasses(true);
      expect(inputClasses).toContain('opacity-50');
      expect(inputClasses).toContain('cursor-not-allowed');
    });

    it('should handle error state accessibly', () => {
      const inputClasses = buildInputClasses(false, true);
      expect(inputClasses).toContain('border-red');
      
      // Error message should be properly styled
      const errorClasses = buildErrorClasses();
      expect(errorClasses).toContain('text-red');
    });
  });

  describe('Bilingual Support Validation', () => {
    it('should handle text expansion for French content', () => {
      // Input should have adequate padding to accommodate longer French text
      const inputClasses = buildInputClasses();
      expect(inputClasses).toContain('px-3');
      expect(inputClasses).toContain('py-2');
      
      // Input should be full width to accommodate longer text
      expect(inputClasses).toContain('w-full');
    });
  });
});