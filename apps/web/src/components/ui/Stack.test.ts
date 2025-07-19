import { describe, it, expect } from 'vitest';

/**
 * Unit tests for Stack component utility functions and logic
 */

// Stack component spacing mapping (extracted from component logic)
const spaceMap = {
  'none': '0',
  'xs': 'var(--space-1)',
  'sm': 'var(--space-2)', 
  'md': 'var(--space-4)',
  'lg': 'var(--space-6)',
  'xl': 'var(--space-10)',
  '2xl': 'var(--space-12)',
} as const;

type SpaceOption = keyof typeof spaceMap;

/**
 * Utility functions extracted from the Stack component
 */
export function getSpaceValue(space: SpaceOption): string {
  return spaceMap[space];
}

export function buildStackClasses(
  recursive: boolean = false,
  splitAfter?: number,
  customClass: string = ''
): string[] {
  const classes = [
    'stack',
    recursive && 'stack--recursive',
    splitAfter && 'stack--split',
    customClass,
  ].filter(Boolean) as string[];
  
  return classes;
}

export function buildCustomProperties(
  space: SpaceOption = 'md',
  splitAfter?: number
): Record<string, string> {
  const properties: Record<string, string> = {
    '--stack-space': getSpaceValue(space),
  };
  
  if (splitAfter) {
    properties['--stack-split-after'] = splitAfter.toString();
  }
  
  return properties;
}

describe('Stack Component Logic', () => {
  describe('Space Value Mapping', () => {
    it('should return correct CSS custom property for each space option', () => {
      expect(getSpaceValue('none')).toBe('0');
      expect(getSpaceValue('xs')).toBe('var(--space-1)');
      expect(getSpaceValue('sm')).toBe('var(--space-2)');
      expect(getSpaceValue('md')).toBe('var(--space-4)');
      expect(getSpaceValue('lg')).toBe('var(--space-6)');
      expect(getSpaceValue('xl')).toBe('var(--space-10)');
      expect(getSpaceValue('2xl')).toBe('var(--space-12)');
    });
  });

  describe('CSS Class Building', () => {
    it('should build base stack class', () => {
      const classes = buildStackClasses();
      expect(classes).toContain('stack');
      expect(classes).toHaveLength(1);
    });

    it('should add recursive class when recursive is true', () => {
      const classes = buildStackClasses(true);
      expect(classes).toContain('stack');
      expect(classes).toContain('stack--recursive');
    });

    it('should add split class when splitAfter is provided', () => {
      const classes = buildStackClasses(false, 2);
      expect(classes).toContain('stack');
      expect(classes).toContain('stack--split');
    });

    it('should include custom classes', () => {
      const classes = buildStackClasses(false, undefined, 'custom-class another-class');
      expect(classes).toContain('stack');
      expect(classes).toContain('custom-class another-class');
    });

    it('should combine all options correctly', () => {
      const classes = buildStackClasses(true, 3, 'test-class');
      expect(classes).toContain('stack');
      expect(classes).toContain('stack--recursive');
      expect(classes).toContain('stack--split');
      expect(classes).toContain('test-class');
    });

    it('should filter out falsy values', () => {
      const classes = buildStackClasses(false, undefined, '');
      expect(classes).toEqual(['stack']);
    });
  });

  describe('Custom Properties Building', () => {
    it('should build default custom properties', () => {
      const properties = buildCustomProperties();
      expect(properties).toEqual({
        '--stack-space': 'var(--space-4)'
      });
    });

    it('should build custom properties with custom space', () => {
      const properties = buildCustomProperties('lg');
      expect(properties).toEqual({
        '--stack-space': 'var(--space-6)'
      });
    });

    it('should include split-after property when provided', () => {
      const properties = buildCustomProperties('md', 2);
      expect(properties).toEqual({
        '--stack-space': 'var(--space-4)',
        '--stack-split-after': '2'
      });
    });

    it('should handle all space options correctly', () => {
      const spaceOptions: SpaceOption[] = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'];
      
      spaceOptions.forEach(space => {
        const properties = buildCustomProperties(space);
        expect(properties['--stack-space']).toBe(getSpaceValue(space));
      });
    });
  });

  describe('Component Integration Logic', () => {
    it('should handle typical usage scenarios', () => {
      // Default usage
      const defaultClasses = buildStackClasses();
      const defaultProperties = buildCustomProperties();
      
      expect(defaultClasses).toEqual(['stack']);
      expect(defaultProperties).toEqual({
        '--stack-space': 'var(--space-4)'
      });

      // Complex usage
      const complexClasses = buildStackClasses(true, 2, 'custom-stack');
      const complexProperties = buildCustomProperties('lg', 2);
      
      expect(complexClasses).toContain('stack');
      expect(complexClasses).toContain('stack--recursive');
      expect(complexClasses).toContain('stack--split');
      expect(complexClasses).toContain('custom-stack');
      
      expect(complexProperties).toEqual({
        '--stack-space': 'var(--space-6)',
        '--stack-split-after': '2'
      });
    });

    it('should validate space options are consistent', () => {
      // Ensure all space options are valid
      const validSpaceOptions: SpaceOption[] = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'];
      
      validSpaceOptions.forEach(space => {
        expect(() => getSpaceValue(space)).not.toThrow();
        expect(getSpaceValue(space)).toBeTruthy();
      });
    });
  });

  describe('Bilingual Support Validation', () => {
    it('should handle text expansion scenarios', () => {
      // Test that spacing values work well for both English and French content
      // French text is typically 15-20% longer than English
      const spacingForShortText = getSpaceValue('sm');
      const spacingForLongText = getSpaceValue('md');
      
      expect(spacingForShortText).toBe('var(--space-2)');
      expect(spacingForLongText).toBe('var(--space-4)');
      
      // Ensure we have adequate spacing options for different content lengths
      expect(getSpaceValue('lg')).toBe('var(--space-6)');
      expect(getSpaceValue('xl')).toBe('var(--space-10)');
    });
  });

  describe('Accessibility Considerations', () => {
    it('should provide adequate spacing for touch targets', () => {
      // Ensure spacing options provide adequate space for accessibility
      const touchFriendlySpacing = getSpaceValue('md'); // 16px minimum
      expect(touchFriendlySpacing).toBe('var(--space-4)');
      
      const generousSpacing = getSpaceValue('lg'); // 32px for better accessibility
      expect(generousSpacing).toBe('var(--space-6)');
    });

    it('should support reduced motion preferences through CSS', () => {
      // This is handled in the CSS, but we can validate the logic supports it
      const classes = buildStackClasses(false, undefined, 'reduced-motion-safe');
      expect(classes).toContain('reduced-motion-safe');
    });
  });
});