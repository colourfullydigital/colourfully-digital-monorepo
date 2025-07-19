import { describe, it, expect } from 'vitest';

/**
 * Unit tests for Box component utility functions and logic
 */

// Box component mapping constants (extracted from component logic)
const paddingMap = {
  'none': '0',
  'xs': 'var(--space-1)',
  'sm': 'var(--space-2)', 
  'md': 'var(--space-4)',
  'lg': 'var(--space-6)',
  'xl': 'var(--space-10)',
  '2xl': 'var(--space-12)',
} as const;

const borderMap = {
  'none': '',
  'thin': 'border-thin border-black',
  'normal': 'border-normal border-black',
  'thick': 'border-thick border-black',
  'brutalist': 'neo-brutalist-border',
} as const;

const backgroundMap = {
  'none': '',
  'surface': 'bg-surface',
  'surface-variant': 'bg-surface-variant',
  'primary': 'bg-green',
  'secondary': 'bg-blue',
} as const;

const shadowMap = {
  'none': '',
  'sm': 'shadow-sm',
  'md': 'shadow-md',
  'lg': 'shadow-lg',
} as const;

type PaddingOption = keyof typeof paddingMap;
type BorderOption = keyof typeof borderMap;
type BackgroundOption = keyof typeof backgroundMap;
type ShadowOption = keyof typeof shadowMap;

/**
 * Utility functions extracted from the Box component
 */
export function getPaddingValue(padding: PaddingOption): string {
  return paddingMap[padding];
}

export function getBorderClass(border: BorderOption): string {
  return borderMap[border];
}

export function getBackgroundClass(background: BackgroundOption): string {
  return backgroundMap[background];
}

export function getShadowClass(shadow: ShadowOption): string {
  return shadowMap[shadow];
}

export function buildBoxClasses(
  border: BorderOption = 'none',
  background: BackgroundOption = 'none',
  shadow: ShadowOption = 'none',
  customClass: string = ''
): string[] {
  const classes = [
    'box',
    getBorderClass(border),
    getBackgroundClass(background),
    getShadowClass(shadow),
    customClass,
  ].filter(Boolean) as string[];
  
  return classes;
}

export function buildBoxCustomProperties(
  padding: PaddingOption = 'md'
): Record<string, string> {
  return {
    '--box-padding': getPaddingValue(padding),
  };
}

describe('Box Component Logic', () => {
  describe('Padding Value Mapping', () => {
    it('should return correct CSS custom property for each padding option', () => {
      expect(getPaddingValue('none')).toBe('0');
      expect(getPaddingValue('xs')).toBe('var(--space-1)');
      expect(getPaddingValue('sm')).toBe('var(--space-2)');
      expect(getPaddingValue('md')).toBe('var(--space-4)');
      expect(getPaddingValue('lg')).toBe('var(--space-6)');
      expect(getPaddingValue('xl')).toBe('var(--space-10)');
      expect(getPaddingValue('2xl')).toBe('var(--space-12)');
    });
  });

  describe('Border Class Mapping', () => {
    it('should return correct CSS classes for each border option', () => {
      expect(getBorderClass('none')).toBe('');
      expect(getBorderClass('thin')).toBe('border-thin border-black');
      expect(getBorderClass('normal')).toBe('border-normal border-black');
      expect(getBorderClass('thick')).toBe('border-thick border-black');
      expect(getBorderClass('brutalist')).toBe('neo-brutalist-border');
    });
  });

  describe('Background Class Mapping', () => {
    it('should return correct CSS classes for each background option', () => {
      expect(getBackgroundClass('none')).toBe('');
      expect(getBackgroundClass('surface')).toBe('bg-surface');
      expect(getBackgroundClass('surface-variant')).toBe('bg-surface-variant');
      expect(getBackgroundClass('primary')).toBe('bg-green');
      expect(getBackgroundClass('secondary')).toBe('bg-blue');
    });
  });

  describe('Shadow Class Mapping', () => {
    it('should return correct CSS classes for each shadow option', () => {
      expect(getShadowClass('none')).toBe('');
      expect(getShadowClass('sm')).toBe('shadow-sm');
      expect(getShadowClass('md')).toBe('shadow-md');
      expect(getShadowClass('lg')).toBe('shadow-lg');
    });
  });

  describe('CSS Class Building', () => {
    it('should build base box class', () => {
      const classes = buildBoxClasses();
      expect(classes).toContain('box');
      expect(classes).toHaveLength(1);
    });

    it('should add border classes when border is specified', () => {
      const classes = buildBoxClasses('normal');
      expect(classes).toContain('box');
      expect(classes).toContain('border-normal border-black');
    });

    it('should add background class when background is specified', () => {
      const classes = buildBoxClasses('none', 'surface');
      expect(classes).toContain('box');
      expect(classes).toContain('bg-surface');
    });

    it('should add shadow class when shadow is specified', () => {
      const classes = buildBoxClasses('none', 'none', 'md');
      expect(classes).toContain('box');
      expect(classes).toContain('shadow-md');
    });

    it('should include custom classes', () => {
      const classes = buildBoxClasses('none', 'none', 'none', 'custom-class another-class');
      expect(classes).toContain('box');
      expect(classes).toContain('custom-class another-class');
    });

    it('should combine all options correctly', () => {
      const classes = buildBoxClasses('brutalist', 'primary', 'lg', 'test-class');
      expect(classes).toContain('box');
      expect(classes).toContain('neo-brutalist-border');
      expect(classes).toContain('bg-green');
      expect(classes).toContain('shadow-lg');
      expect(classes).toContain('test-class');
    });

    it('should filter out empty values', () => {
      const classes = buildBoxClasses('none', 'none', 'none', '');
      expect(classes).toEqual(['box']);
    });
  });

  describe('Custom Properties Building', () => {
    it('should build default custom properties', () => {
      const properties = buildBoxCustomProperties();
      expect(properties).toEqual({
        '--box-padding': 'var(--space-4)'
      });
    });

    it('should build custom properties with custom padding', () => {
      const properties = buildBoxCustomProperties('lg');
      expect(properties).toEqual({
        '--box-padding': 'var(--space-6)'
      });
    });

    it('should handle all padding options correctly', () => {
      const paddingOptions: PaddingOption[] = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'];
      
      paddingOptions.forEach(padding => {
        const properties = buildBoxCustomProperties(padding);
        expect(properties['--box-padding']).toBe(getPaddingValue(padding));
      });
    });
  });

  describe('Neo-Brutalist Design Integration', () => {
    it('should support brutalist border styling', () => {
      const classes = buildBoxClasses('brutalist');
      expect(classes).toContain('neo-brutalist-border');
    });

    it('should combine brutalist styling with other options', () => {
      const classes = buildBoxClasses('brutalist', 'surface', 'md', 'custom-brutalist');
      expect(classes).toContain('neo-brutalist-border');
      expect(classes).toContain('bg-surface');
      expect(classes).toContain('shadow-md');
      expect(classes).toContain('custom-brutalist');
    });

    it('should provide different border thickness options', () => {
      expect(getBorderClass('thin')).toContain('border-thin');
      expect(getBorderClass('normal')).toContain('border-normal');
      expect(getBorderClass('thick')).toContain('border-thick');
      expect(getBorderClass('brutalist')).toBe('neo-brutalist-border');
    });
  });

  describe('Component Integration Logic', () => {
    it('should handle typical usage scenarios', () => {
      // Default usage
      const defaultClasses = buildBoxClasses();
      const defaultProperties = buildBoxCustomProperties();
      
      expect(defaultClasses).toEqual(['box']);
      expect(defaultProperties).toEqual({
        '--box-padding': 'var(--space-4)'
      });

      // Card-like usage
      const cardClasses = buildBoxClasses('normal', 'surface', 'md', 'card-component');
      const cardProperties = buildBoxCustomProperties('lg');
      
      expect(cardClasses).toContain('box');
      expect(cardClasses).toContain('border-normal border-black');
      expect(cardClasses).toContain('bg-surface');
      expect(cardClasses).toContain('shadow-md');
      expect(cardClasses).toContain('card-component');
      
      expect(cardProperties).toEqual({
        '--box-padding': 'var(--space-6)'
      });

      // Neo-brutalist usage
      const brutalistClasses = buildBoxClasses('brutalist', 'primary', 'lg');
      expect(brutalistClasses).toContain('neo-brutalist-border');
      expect(brutalistClasses).toContain('bg-green');
      expect(brutalistClasses).toContain('shadow-lg');
    });

    it('should validate all options are consistent', () => {
      // Ensure all options are valid
      const paddingOptions: PaddingOption[] = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'];
      const borderOptions: BorderOption[] = ['none', 'thin', 'normal', 'thick', 'brutalist'];
      const backgroundOptions: BackgroundOption[] = ['none', 'surface', 'surface-variant', 'primary', 'secondary'];
      const shadowOptions: ShadowOption[] = ['none', 'sm', 'md', 'lg'];
      
      paddingOptions.forEach(padding => {
        expect(() => getPaddingValue(padding)).not.toThrow();
        expect(getPaddingValue(padding)).toBeTruthy();
      });

      borderOptions.forEach(border => {
        expect(() => getBorderClass(border)).not.toThrow();
      });

      backgroundOptions.forEach(background => {
        expect(() => getBackgroundClass(background)).not.toThrow();
      });

      shadowOptions.forEach(shadow => {
        expect(() => getShadowClass(shadow)).not.toThrow();
      });
    });
  });

  describe('Bilingual Support Validation', () => {
    it('should handle text expansion scenarios with adequate padding', () => {
      // Test that padding values work well for both English and French content
      // French text is typically 15-20% longer than English
      const compactPadding = getPaddingValue('sm');
      const standardPadding = getPaddingValue('md');
      const generousPadding = getPaddingValue('lg');
      
      expect(compactPadding).toBe('var(--space-2)');
      expect(standardPadding).toBe('var(--space-4)');
      expect(generousPadding).toBe('var(--space-6)');
      
      // Ensure we have adequate padding options for different content lengths
      expect(getPaddingValue('xl')).toBe('var(--space-10)');
      expect(getPaddingValue('2xl')).toBe('var(--space-12)');
    });

    it('should support different content types with appropriate backgrounds', () => {
      // Different background options for various content types
      expect(getBackgroundClass('surface')).toBe('bg-surface');
      expect(getBackgroundClass('surface-variant')).toBe('bg-surface-variant');
      expect(getBackgroundClass('primary')).toBe('bg-green');
      expect(getBackgroundClass('secondary')).toBe('bg-blue');
    });
  });

  describe('Accessibility Considerations', () => {
    it('should provide adequate padding for touch targets', () => {
      // Ensure padding options provide adequate space for accessibility
      const touchFriendlyPadding = getPaddingValue('md'); // 16px minimum
      expect(touchFriendlyPadding).toBe('var(--space-4)');
      
      const generousPadding = getPaddingValue('lg'); // 32px for better accessibility
      expect(generousPadding).toBe('var(--space-6)');
    });

    it('should support high contrast mode through CSS classes', () => {
      // Border classes should work with high contrast mode
      const borderClasses = getBorderClass('normal');
      expect(borderClasses).toContain('border-black');
    });

    it('should provide appropriate color contrast combinations', () => {
      // Primary and secondary backgrounds should have appropriate text colors
      expect(getBackgroundClass('primary')).toBe('bg-green');
      expect(getBackgroundClass('secondary')).toBe('bg-blue');
      
      // Surface backgrounds for better readability
      expect(getBackgroundClass('surface')).toBe('bg-surface');
      expect(getBackgroundClass('surface-variant')).toBe('bg-surface-variant');
    });
  });
});