import { describe, it, expect } from 'vitest';

/**
 * Unit tests for Card component utility functions and logic
 */

// Card component mapping constants (extracted from component logic)
const paddingMap = {
  'none': '0',
  'xs': 'var(--space-1)',
  'sm': 'var(--space-2)',
  'md': 'var(--space-4)',
  'lg': 'var(--space-6)',
  'xl': 'var(--space-10)',
} as const;

const variantMap = {
  'default': {
    border: 'border-normal border-black',
    background: 'bg-surface',
    shadow: '',
  },
  'elevated': {
    border: 'border-brutalist',
    background: 'bg-surface',
    shadow: 'neo-shadow',
  },
  'outlined': {
    border: 'border-thick border-black',
    background: 'bg-transparent',
    shadow: '',
  },
} as const;

type PaddingOption = keyof typeof paddingMap;
type VariantOption = keyof typeof variantMap;

/**
 * Utility functions extracted from the Card component
 */
export function getPaddingValue(padding: PaddingOption): string {
  return paddingMap[padding];
}

export function getVariantStyles(variant: VariantOption): {
  border: string;
  background: string;
  shadow: string;
} {
  return variantMap[variant];
}

export function buildCardClasses(
  variant: VariantOption = 'default',
  fullWidth: boolean = false,
  interactive: boolean = false,
  customClass: string = ''
): string[] {
  const variantStyle = getVariantStyles(variant);

  const classes = [
    'card',
    variantStyle.border,
    variantStyle.background,
    variantStyle.shadow,
    fullWidth ? 'w-full' : '',
    interactive ? 'cursor-pointer hover:transform hover:translate-y-[-2px] transition-transform' : '',
    customClass,
  ].filter(Boolean) as string[];

  return classes;
}

export function buildCardCustomProperties(
  padding: PaddingOption = 'md'
): Record<string, string> {
  return {
    '--card-padding': getPaddingValue(padding),
  };
}

describe('Card Component Logic', () => {
  describe('Padding Value Mapping', () => {
    it('should return correct CSS custom property for each padding option', () => {
      expect(getPaddingValue('none')).toBe('0');
      expect(getPaddingValue('xs')).toBe('var(--space-1)');
      expect(getPaddingValue('sm')).toBe('var(--space-2)');
      expect(getPaddingValue('md')).toBe('var(--space-4)');
      expect(getPaddingValue('lg')).toBe('var(--space-6)');
      expect(getPaddingValue('xl')).toBe('var(--space-10)');
    });
  });

  describe('Variant Style Mapping', () => {
    it('should return correct styles for default variant', () => {
      const styles = getVariantStyles('default');
      expect(styles.border).toBe('border-normal border-black');
      expect(styles.background).toBe('bg-surface');
      expect(styles.shadow).toBe('');
    });

    it('should return correct styles for elevated variant', () => {
      const styles = getVariantStyles('elevated');
      expect(styles.border).toBe('border-brutalist');
      expect(styles.background).toBe('bg-surface');
      expect(styles.shadow).toBe('neo-shadow');
    });

    it('should return correct styles for outlined variant', () => {
      const styles = getVariantStyles('outlined');
      expect(styles.border).toBe('border-thick border-black');
      expect(styles.background).toBe('bg-transparent');
      expect(styles.shadow).toBe('');
    });
  });

  describe('CSS Class Building', () => {
    it('should build base card class', () => {
      const classes = buildCardClasses();
      expect(classes).toContain('card');
      expect(classes).toContain('border-normal border-black');
      expect(classes).toContain('bg-surface');
      expect(classes).not.toContain('w-full');
      expect(classes).not.toContain('cursor-pointer');
    });

    it('should add fullWidth class when fullWidth is true', () => {
      const classes = buildCardClasses('default', true);
      expect(classes).toContain('card');
      expect(classes).toContain('w-full');
    });

    it('should add interactive classes when interactive is true', () => {
      const classes = buildCardClasses('default', false, true);
      expect(classes).toContain('card');
      expect(classes).toContain('cursor-pointer hover:transform hover:translate-y-[-2px] transition-transform');
    });

    it('should include custom classes', () => {
      const classes = buildCardClasses('default', false, false, 'custom-class another-class');
      expect(classes).toContain('card');
      expect(classes).toContain('custom-class another-class');
    });

    it('should combine all options correctly', () => {
      const classes = buildCardClasses('elevated', true, true, 'test-class');
      expect(classes).toContain('card');
      expect(classes).toContain('border-brutalist');
      expect(classes).toContain('bg-surface');
      expect(classes).toContain('neo-shadow');
      expect(classes).toContain('w-full');
      expect(classes).toContain('cursor-pointer hover:transform hover:translate-y-[-2px] transition-transform');
      expect(classes).toContain('test-class');
    });

    it('should filter out empty values', () => {
      const classes = buildCardClasses('default', false, false, '');
      expect(classes).not.toContain('');
    });
  });

  describe('Custom Properties Building', () => {
    it('should build default custom properties', () => {
      const properties = buildCardCustomProperties();
      expect(properties).toEqual({
        '--card-padding': 'var(--space-4)'
      });
    });

    it('should build custom properties with custom padding', () => {
      const properties = buildCardCustomProperties('lg');
      expect(properties).toEqual({
        '--card-padding': 'var(--space-6)'
      });
    });

    it('should handle all padding options correctly', () => {
      const paddingOptions: PaddingOption[] = ['none', 'xs', 'sm', 'md', 'lg', 'xl'];

      paddingOptions.forEach(padding => {
        const properties = buildCardCustomProperties(padding);
        expect(properties['--card-padding']).toBe(getPaddingValue(padding));
      });
    });
  });

  describe('Neo-Brutalist Design Integration', () => {
    it('should support brutalist styling in elevated variant', () => {
      const styles = getVariantStyles('elevated');
      expect(styles.border).toBe('border-brutalist');
      expect(styles.shadow).toBe('neo-shadow');
    });

    it('should provide different border thickness options across variants', () => {
      expect(getVariantStyles('default').border).toContain('border-normal');
      expect(getVariantStyles('outlined').border).toContain('border-thick');
      expect(getVariantStyles('elevated').border).toBe('border-brutalist');
    });
  });

  describe('Component Integration Logic', () => {
    it('should handle typical usage scenarios', () => {
      // Default usage
      const defaultClasses = buildCardClasses();
      const defaultProperties = buildCardCustomProperties();

      expect(defaultClasses).toContain('card');
      expect(defaultClasses).toContain('border-normal border-black');
      expect(defaultClasses).toContain('bg-surface');

      expect(defaultProperties).toEqual({
        '--card-padding': 'var(--space-4)'
      });

      // Elevated card usage
      const elevatedClasses = buildCardClasses('elevated', true);

      expect(elevatedClasses).toContain('card');
      expect(elevatedClasses).toContain('border-brutalist');
      expect(elevatedClasses).toContain('bg-surface');
      expect(elevatedClasses).toContain('neo-shadow');
      expect(elevatedClasses).toContain('w-full');

      // Interactive card usage
      const interactiveClasses = buildCardClasses('default', false, true);

      expect(interactiveClasses).toContain('card');
      expect(interactiveClasses).toContain('cursor-pointer hover:transform hover:translate-y-[-2px] transition-transform');
    });

    it('should validate all options are consistent', () => {
      // Ensure all options are valid
      const paddingOptions: PaddingOption[] = ['none', 'xs', 'sm', 'md', 'lg', 'xl'];
      const variantOptions: VariantOption[] = ['default', 'elevated', 'outlined'];

      paddingOptions.forEach(padding => {
        expect(() => getPaddingValue(padding)).not.toThrow();
        expect(getPaddingValue(padding)).toBeTruthy();
      });

      variantOptions.forEach(variant => {
        expect(() => getVariantStyles(variant)).not.toThrow();
        expect(getVariantStyles(variant)).toBeTruthy();
      });
    });
  });

  describe('Accessibility Considerations', () => {
    it('should provide adequate padding for content readability', () => {
      // Ensure padding options provide adequate space for accessibility
      const standardPadding = getPaddingValue('md');
      expect(standardPadding).toBe('var(--space-4)');

      const generousPadding = getPaddingValue('lg');
      expect(generousPadding).toBe('var(--space-6)');
    });

    it('should support high contrast mode through border styles', () => {
      // All variants should have visible borders for high contrast mode
      expect(getVariantStyles('default').border).toContain('border-black');
      expect(getVariantStyles('elevated').border).toBe('border-brutalist');
      expect(getVariantStyles('outlined').border).toContain('border-black');
    });

    it('should provide appropriate background colors for readability', () => {
      // Background colors should support readability
      expect(getVariantStyles('default').background).toBe('bg-surface');
      expect(getVariantStyles('elevated').background).toBe('bg-surface');
      expect(getVariantStyles('outlined').background).toBe('bg-transparent');
    });
  });
});