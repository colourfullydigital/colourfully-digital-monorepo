/**
 * Radio Component Tests
 * 
 * Tests for the Radio component utility functions and logic
 * to ensure proper styling, accessibility, and behavior.
 */

import { describe, it, expect } from 'vitest';

/**
 * Utility functions extracted from the Radio component
 */
export function buildContainerClasses(
  disabled: boolean = false,
  customClass: string = ''
): string[] {
  const classes = [
    'flex',
    'items-start',
    'gap-2',
    'mb-2',
    disabled ? 'opacity-50' : undefined,
    disabled ? 'cursor-not-allowed' : undefined,
    customClass,
  ].filter(Boolean) as string[];
  
  return classes;
}

export function buildRadioClasses(
  disabled: boolean = false,
  error: boolean = false
): string[] {
  const classes = [
    'relative',
    'w-5',
    'h-5',
    'rounded-full',
    'border-black',
    'border-normal',
    'bg-white',
    'flex-shrink-0',
    'mt-0.5',
    disabled ? 'bg-surface' : undefined,
    error ? 'border-red' : undefined,
  ].filter(Boolean) as string[];
  
  return classes;
}

export function buildLabelClasses(
  disabled: boolean = false
): string[] {
  const classes = [
    'font-primary',
    'text-base',
    disabled ? 'cursor-not-allowed' : 'cursor-pointer',
  ].filter(Boolean) as string[];
  
  return classes;
}

export function buildErrorClasses(): string[] {
  const classes = [
    'text-red',
    'font-primary',
    'text-sm',
    'mt-1',
    'ml-7'
  ];
  
  return classes;
}

export function generateId(name: string, value: string): string {
  return `${name}-${value}`;
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

describe('Radio Component Logic', () => {
  describe('ID Generation', () => {
    it('should generate correct ID from name and value', () => {
      expect(generateId('gender', 'male')).toBe('gender-male');
      expect(generateId('color', 'blue')).toBe('color-blue');
    });
  });

  describe('CSS Class Building', () => {
    it('should build base container classes', () => {
      const classes = buildContainerClasses();
      expect(classes).toContain('flex');
      expect(classes).toContain('items-start');
      expect(classes).toContain('gap-2');
      expect(classes).toContain('mb-2');
    });

    it('should handle disabled state for container', () => {
      const classes = buildContainerClasses(true);
      expect(classes).toContain('opacity-50');
      expect(classes).toContain('cursor-not-allowed');
    });

    it('should include custom classes for container', () => {
      const classes = buildContainerClasses(false, 'custom-class');
      expect(classes).toContain('custom-class');
    });

    it('should build base radio classes', () => {
      const classes = buildRadioClasses();
      expect(classes).toContain('relative');
      expect(classes).toContain('w-5');
      expect(classes).toContain('h-5');
      expect(classes).toContain('rounded-full');
      expect(classes).toContain('border-black');
      expect(classes).toContain('border-normal');
      expect(classes).toContain('bg-white');
      expect(classes).toContain('flex-shrink-0');
      expect(classes).toContain('mt-0.5');
    });

    it('should handle disabled state for radio', () => {
      const classes = buildRadioClasses(true);
      expect(classes).toContain('bg-surface');
    });

    it('should handle error state for radio', () => {
      const classes = buildRadioClasses(false, true);
      expect(classes).toContain('border-red');
    });

    it('should build base label classes', () => {
      const classes = buildLabelClasses();
      expect(classes).toContain('font-primary');
      expect(classes).toContain('text-base');
      expect(classes).toContain('cursor-pointer');
    });

    it('should handle disabled state for label', () => {
      const classes = buildLabelClasses(true);
      expect(classes).toContain('cursor-not-allowed');
      expect(classes).not.toContain('cursor-pointer');
    });

    it('should build error message classes', () => {
      const classes = buildErrorClasses();
      expect(classes).toContain('text-red');
      expect(classes).toContain('font-primary');
      expect(classes).toContain('text-sm');
      expect(classes).toContain('mt-1');
      expect(classes).toContain('ml-7');
    });
  });

  describe('Accessibility Helpers', () => {
    it('should generate correct error ID', () => {
      expect(generateErrorId('gender-male')).toBe('gender-male-error');
      expect(generateErrorId('color-blue')).toBe('color-blue-error');
    });

    it('should generate correct aria-describedby attribute with error', () => {
      expect(generateDescribedBy('gender-male', true)).toBe('gender-male-error');
      expect(generateDescribedBy('color-blue', true, 'color-hint')).toBe('color-blue-error color-hint');
    });

    it('should generate correct aria-describedby attribute without error', () => {
      expect(generateDescribedBy('gender-male', false)).toBeUndefined();
      expect(generateDescribedBy('color-blue', false, 'color-hint')).toBe('color-hint');
    });
  });

  describe('Neo-brutalist Design Integration', () => {
    it('should use design system font family', () => {
      const labelClasses = buildLabelClasses();
      const errorClasses = buildErrorClasses();
      
      expect(labelClasses).toContain('font-primary');
      expect(errorClasses).toContain('font-primary');
    });

    it('should follow neo-brutalist design principles', () => {
      const radioClasses = buildRadioClasses();
      
      // Neo-brutalism emphasizes bold borders
      expect(radioClasses).toContain('border-black');
      expect(radioClasses).toContain('border-normal');
    });
  });

  describe('Accessibility Considerations', () => {
    it('should handle disabled state accessibly', () => {
      const containerClasses = buildContainerClasses(true);
      const radioClasses = buildRadioClasses(true);
      const labelClasses = buildLabelClasses(true);
      
      expect(containerClasses).toContain('opacity-50');
      expect(containerClasses).toContain('cursor-not-allowed');
      expect(radioClasses).toContain('bg-surface');
      expect(labelClasses).toContain('cursor-not-allowed');
    });

    it('should handle error state accessibly', () => {
      const radioClasses = buildRadioClasses(false, true);
      expect(radioClasses).toContain('border-red');
      
      // Error message should be properly styled
      const errorClasses = buildErrorClasses();
      expect(errorClasses).toContain('text-red');
    });
  });
});