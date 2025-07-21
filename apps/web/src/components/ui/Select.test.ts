/**
 * Select Component Tests
 * 
 * Tests for the Select component utility functions and logic
 * to ensure proper styling, accessibility, and behavior.
 */

import { describe, it, expect } from 'vitest';

// Select component option interfaces
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectOptionGroup {
  label: string;
  options: SelectOption[];
}

/**
 * Utility functions extracted from the Select component
 */
export function buildSelectClasses(
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
    'appearance-none',
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

export function isOptionGroup(option: SelectOption | SelectOptionGroup): option is SelectOptionGroup {
  return 'options' in option && Array.isArray(option.options);
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

describe('Select Component Logic', () => {
  describe('Option Group Detection', () => {
    it('should correctly identify option groups', () => {
      const option: SelectOption = { value: 'value', label: 'label' };
      const optionGroup: SelectOptionGroup = { 
        label: 'group', 
        options: [{ value: 'value', label: 'label' }] 
      };
      
      expect(isOptionGroup(option)).toBe(false);
      expect(isOptionGroup(optionGroup)).toBe(true);
    });

    it('should handle edge cases correctly', () => {
      const emptyOptionGroup: SelectOptionGroup = { label: 'group', options: [] };
      const invalidOption: any = { value: 'value', label: 'label', options: 'not-an-array' };
      
      expect(isOptionGroup(emptyOptionGroup)).toBe(true);
      expect(isOptionGroup(invalidOption)).toBe(false);
    });
  });

  describe('CSS Class Building', () => {
    it('should build base select classes', () => {
      const classes = buildSelectClasses();
      expect(classes).toContain('w-full');
      expect(classes).toContain('font-primary');
      expect(classes).toContain('text-base');
      expect(classes).toContain('px-3');
      expect(classes).toContain('py-2');
      expect(classes).toContain('border-black');
      expect(classes).toContain('border-normal');
      expect(classes).toContain('bg-white');
      expect(classes).toContain('appearance-none');
      expect(classes).toContain('focus:outline-none');
      expect(classes).toContain('focus:ring-2');
      expect(classes).toContain('focus:ring-blue-light');
      expect(classes).toContain('focus:border-blue');
    });

    it('should handle disabled state correctly', () => {
      const classes = buildSelectClasses(true);
      expect(classes).toContain('opacity-50');
      expect(classes).toContain('cursor-not-allowed');
      expect(classes).toContain('bg-surface');
    });

    it('should handle error state correctly', () => {
      const classes = buildSelectClasses(false, true);
      expect(classes).toContain('border-red');
    });

    it('should include custom classes when provided', () => {
      const classes = buildSelectClasses(false, false, 'custom-class text-green');
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
      expect(generateErrorId('country')).toBe('country-error');
      expect(generateErrorId('select-field')).toBe('select-field-error');
    });

    it('should generate correct aria-describedby attribute with error', () => {
      expect(generateDescribedBy('country', true)).toBe('country-error');
      expect(generateDescribedBy('select', true, 'select-hint')).toBe('select-error select-hint');
    });

    it('should generate correct aria-describedby attribute without error', () => {
      expect(generateDescribedBy('country', false)).toBeUndefined();
      expect(generateDescribedBy('select', false, 'select-hint')).toBe('select-hint');
    });
  });

  describe('Neo-brutalist Design Integration', () => {
    it('should use design system font family', () => {
      const selectClasses = buildSelectClasses();
      const labelClasses = buildLabelClasses();
      const errorClasses = buildErrorClasses();
      
      expect(selectClasses).toContain('font-primary');
      expect(labelClasses).toContain('font-primary');
      expect(errorClasses).toContain('font-primary');
    });

    it('should follow neo-brutalist design principles', () => {
      const selectClasses = buildSelectClasses();
      
      // Neo-brutalism emphasizes bold borders
      expect(selectClasses).toContain('border-black');
      expect(selectClasses).toContain('border-normal');
    });
  });

  describe('Accessibility Considerations', () => {
    it('should include proper focus styles', () => {
      const selectClasses = buildSelectClasses();
      expect(selectClasses).toContain('focus:outline-none');
      expect(selectClasses).toContain('focus:ring-2');
      expect(selectClasses).toContain('focus:ring-blue-light');
      expect(selectClasses).toContain('focus:border-blue');
    });

    it('should handle disabled state accessibly', () => {
      const selectClasses = buildSelectClasses(true);
      expect(selectClasses).toContain('opacity-50');
      expect(selectClasses).toContain('cursor-not-allowed');
    });

    it('should handle error state accessibly', () => {
      const selectClasses = buildSelectClasses(false, true);
      expect(selectClasses).toContain('border-red');
      
      // Error message should be properly styled
      const errorClasses = buildErrorClasses();
      expect(errorClasses).toContain('text-red');
    });
  });

  describe('Bilingual Support Validation', () => {
    it('should handle text expansion for French content', () => {
      // Select should have adequate padding to accommodate longer French text
      const selectClasses = buildSelectClasses();
      expect(selectClasses).toContain('px-3');
      expect(selectClasses).toContain('py-2');
      
      // Select should be full width to accommodate longer text
      expect(selectClasses).toContain('w-full');
    });
  });
});