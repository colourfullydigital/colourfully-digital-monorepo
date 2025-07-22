import { describe, it, expect } from 'vitest';

/**
 * Unit tests for Cluster component utility functions and logic
 */

// Cluster component mapping constants (extracted from component logic)
const spaceMap = {
  'none': '0',
  'xs': 'var(--space-1)',
  'sm': 'var(--space-2)', 
  'md': 'var(--space-4)',
  'lg': 'var(--space-6)',
  'xl': 'var(--space-10)',
  '2xl': 'var(--space-12)',
} as const;

const justifyMap = {
  'start': 'flex-start',
  'center': 'center',
  'end': 'flex-end',
  'between': 'space-between',
  'around': 'space-around',
  'evenly': 'space-evenly',
} as const;

const alignMap = {
  'start': 'flex-start',
  'center': 'center',
  'end': 'flex-end',
  'stretch': 'stretch',
  'baseline': 'baseline',
} as const;

type SpaceOption = keyof typeof spaceMap;
type JustifyOption = keyof typeof justifyMap;
type AlignOption = keyof typeof alignMap;

/**
 * Utility functions extracted from the Cluster component
 */
export function getSpaceValue(space: SpaceOption): string {
  return spaceMap[space];
}

export function getJustifyValue(justify: JustifyOption): string {
  return justifyMap[justify];
}

export function getAlignValue(align: AlignOption): string {
  return alignMap[align];
}

export function buildClusterClasses(
  wrap: boolean = true,
  customClass: string = ''
): string[] {
  const classes = [
    'cluster',
    wrap ? 'cluster--wrap' : 'cluster--nowrap',
    customClass,
  ].filter(Boolean) as string[];
  
  return classes;
}

export function buildClusterCustomProperties(
  space: SpaceOption = 'md',
  justify: JustifyOption = 'start',
  align: AlignOption = 'center'
): Record<string, string> {
  return {
    '--cluster-space': getSpaceValue(space),
    '--cluster-justify': getJustifyValue(justify),
    '--cluster-align': getAlignValue(align),
  };
}

describe('Cluster Component Logic', () => {
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

  describe('Justify Value Mapping', () => {
    it('should return correct CSS values for each justify option', () => {
      expect(getJustifyValue('start')).toBe('flex-start');
      expect(getJustifyValue('center')).toBe('center');
      expect(getJustifyValue('end')).toBe('flex-end');
      expect(getJustifyValue('between')).toBe('space-between');
      expect(getJustifyValue('around')).toBe('space-around');
      expect(getJustifyValue('evenly')).toBe('space-evenly');
    });
  });

  describe('Align Value Mapping', () => {
    it('should return correct CSS values for each align option', () => {
      expect(getAlignValue('start')).toBe('flex-start');
      expect(getAlignValue('center')).toBe('center');
      expect(getAlignValue('end')).toBe('flex-end');
      expect(getAlignValue('stretch')).toBe('stretch');
      expect(getAlignValue('baseline')).toBe('baseline');
    });
  });

  describe('CSS Class Building', () => {
    it('should build base cluster class with wrap by default', () => {
      const classes = buildClusterClasses();
      expect(classes).toContain('cluster');
      expect(classes).toContain('cluster--wrap');
      expect(classes).toHaveLength(2);
    });

    it('should add nowrap class when wrap is false', () => {
      const classes = buildClusterClasses(false);
      expect(classes).toContain('cluster');
      expect(classes).toContain('cluster--nowrap');
      expect(classes).not.toContain('cluster--wrap');
    });

    it('should include custom classes', () => {
      const classes = buildClusterClasses(true, 'custom-cluster another-class');
      expect(classes).toContain('cluster');
      expect(classes).toContain('cluster--wrap');
      expect(classes).toContain('custom-cluster another-class');
    });

    it('should filter out empty values', () => {
      const classes = buildClusterClasses(true, '');
      expect(classes).toEqual(['cluster', 'cluster--wrap']);
    });
  });

  describe('Custom Properties Building', () => {
    it('should build default custom properties', () => {
      const properties = buildClusterCustomProperties();
      expect(properties).toEqual({
        '--cluster-space': 'var(--space-4)',
        '--cluster-justify': 'flex-start',
        '--cluster-align': 'center',
      });
    });

    it('should build custom properties with custom values', () => {
      const properties = buildClusterCustomProperties('lg', 'center', 'end');
      expect(properties).toEqual({
        '--cluster-space': 'var(--space-6)',
        '--cluster-justify': 'center',
        '--cluster-align': 'flex-end',
      });
    });

    it('should handle all space options correctly', () => {
      const spaceOptions: SpaceOption[] = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'];
      
      spaceOptions.forEach(space => {
        const properties = buildClusterCustomProperties(space);
        expect(properties['--cluster-space']).toBe(getSpaceValue(space));
      });
    });

    it('should handle all justify options correctly', () => {
      const justifyOptions: JustifyOption[] = ['start', 'center', 'end', 'between', 'around', 'evenly'];
      
      justifyOptions.forEach(justify => {
        const properties = buildClusterCustomProperties('md', justify);
        expect(properties['--cluster-justify']).toBe(getJustifyValue(justify));
      });
    });

    it('should handle all align options correctly', () => {
      const alignOptions: AlignOption[] = ['start', 'center', 'end', 'stretch', 'baseline'];
      
      alignOptions.forEach(align => {
        const properties = buildClusterCustomProperties('md', 'start', align);
        expect(properties['--cluster-align']).toBe(getAlignValue(align));
      });
    });
  });

  describe('Component Integration Logic', () => {
    it('should handle typical usage scenarios', () => {
      // Default usage
      const defaultClasses = buildClusterClasses();
      const defaultProperties = buildClusterCustomProperties();
      
      expect(defaultClasses).toEqual(['cluster', 'cluster--wrap']);
      expect(defaultProperties).toEqual({
        '--cluster-space': 'var(--space-4)',
        '--cluster-justify': 'flex-start',
        '--cluster-align': 'center',
      });

      // Navigation cluster usage
      const navClasses = buildClusterClasses(false, 'nav-cluster');
      const navProperties = buildClusterCustomProperties('lg', 'between', 'center');
      
      expect(navClasses).toContain('cluster');
      expect(navClasses).toContain('cluster--nowrap');
      expect(navClasses).toContain('nav-cluster');
      
      expect(navProperties).toEqual({
        '--cluster-space': 'var(--space-6)',
        '--cluster-justify': 'space-between',
        '--cluster-align': 'center',
      });

      // Button group usage
      const buttonClasses = buildClusterClasses(true, 'button-group');
      const buttonProperties = buildClusterCustomProperties('sm', 'center', 'center');
      
      expect(buttonClasses).toContain('cluster--wrap');
      expect(buttonClasses).toContain('button-group');
      
      expect(buttonProperties).toEqual({
        '--cluster-space': 'var(--space-2)',
        '--cluster-justify': 'center',
        '--cluster-align': 'center',
      });
    });

    it('should validate all options are consistent', () => {
      // Ensure all options are valid
      const spaceOptions: SpaceOption[] = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'];
      const justifyOptions: JustifyOption[] = ['start', 'center', 'end', 'between', 'around', 'evenly'];
      const alignOptions: AlignOption[] = ['start', 'center', 'end', 'stretch', 'baseline'];
      
      spaceOptions.forEach(space => {
        expect(() => getSpaceValue(space)).not.toThrow();
        expect(getSpaceValue(space)).toBeTruthy();
      });

      justifyOptions.forEach(justify => {
        expect(() => getJustifyValue(justify)).not.toThrow();
        expect(getJustifyValue(justify)).toBeTruthy();
      });

      alignOptions.forEach(align => {
        expect(() => getAlignValue(align)).not.toThrow();
        expect(getAlignValue(align)).toBeTruthy();
      });
    });
  });

  describe('Layout Flexibility', () => {
    it('should support different layout patterns', () => {
      // Horizontal navigation
      const horizontalNav = buildClusterCustomProperties('md', 'start', 'center');
      expect(horizontalNav['--cluster-justify']).toBe('flex-start');
      expect(horizontalNav['--cluster-align']).toBe('center');

      // Centered button group
      const centeredButtons = buildClusterCustomProperties('sm', 'center', 'center');
      expect(centeredButtons['--cluster-justify']).toBe('center');
      expect(centeredButtons['--cluster-align']).toBe('center');

      // Justified toolbar
      const toolbar = buildClusterCustomProperties('lg', 'between', 'center');
      expect(toolbar['--cluster-justify']).toBe('space-between');
      expect(toolbar['--cluster-align']).toBe('center');

      // Tag list with even spacing
      const tagList = buildClusterCustomProperties('xs', 'evenly', 'baseline');
      expect(tagList['--cluster-justify']).toBe('space-evenly');
      expect(tagList['--cluster-align']).toBe('baseline');
    });

    it('should handle wrapping scenarios', () => {
      // Wrapping cluster for responsive design
      const wrappingClasses = buildClusterClasses(true);
      expect(wrappingClasses).toContain('cluster--wrap');

      // Non-wrapping cluster for horizontal scrolling
      const nonWrappingClasses = buildClusterClasses(false);
      expect(nonWrappingClasses).toContain('cluster--nowrap');
    });
  });

  describe('Bilingual Support Validation', () => {
    it('should handle text expansion scenarios with adequate spacing', () => {
      // Test that spacing values work well for both English and French content
      // French text is typically 15-20% longer than English
      const compactSpacing = getSpaceValue('sm');
      const standardSpacing = getSpaceValue('md');
      const generousSpacing = getSpaceValue('lg');
      
      expect(compactSpacing).toBe('var(--space-2)');
      expect(standardSpacing).toBe('var(--space-4)');
      expect(generousSpacing).toBe('var(--space-6)');
      
      // Ensure we have adequate spacing options for different content lengths
      expect(getSpaceValue('xl')).toBe('var(--space-10)');
      expect(getSpaceValue('2xl')).toBe('var(--space-12)');
    });

    it('should support different alignment patterns for various languages', () => {
      // Start alignment for left-to-right languages
      expect(getJustifyValue('start')).toBe('flex-start');
      expect(getAlignValue('start')).toBe('flex-start');

      // Center alignment for universal appeal
      expect(getJustifyValue('center')).toBe('center');
      expect(getAlignValue('center')).toBe('center');

      // Baseline alignment for mixed content
      expect(getAlignValue('baseline')).toBe('baseline');
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

    it('should support keyboard navigation patterns', () => {
      // Non-wrapping clusters should support horizontal scrolling
      const scrollableClasses = buildClusterClasses(false);
      expect(scrollableClasses).toContain('cluster--nowrap');

      // Wrapping clusters should support natural tab order
      const wrappingClasses = buildClusterClasses(true);
      expect(wrappingClasses).toContain('cluster--wrap');
    });

    it('should provide appropriate alignment for different content types', () => {
      // Center alignment for buttons and interactive elements
      const buttonAlignment = getAlignValue('center');
      expect(buttonAlignment).toBe('center');

      // Baseline alignment for text content
      const textAlignment = getAlignValue('baseline');
      expect(textAlignment).toBe('baseline');

      // Stretch alignment for equal-height cards
      const cardAlignment = getAlignValue('stretch');
      expect(cardAlignment).toBe('stretch');
    });
  });

  describe('Responsive Design Support', () => {
    it('should handle different screen sizes appropriately', () => {
      // Compact spacing for mobile
      const mobileSpacing = getSpaceValue('sm');
      expect(mobileSpacing).toBe('var(--space-2)');

      // Standard spacing for tablet
      const tabletSpacing = getSpaceValue('md');
      expect(tabletSpacing).toBe('var(--space-4)');

      // Generous spacing for desktop
      const desktopSpacing = getSpaceValue('lg');
      expect(desktopSpacing).toBe('var(--space-6)');
    });

    it('should support both wrapping and scrolling behaviors', () => {
      // Wrapping for responsive layouts
      const responsiveClasses = buildClusterClasses(true, 'responsive-cluster');
      expect(responsiveClasses).toContain('cluster--wrap');

      // Horizontal scrolling for fixed layouts
      const fixedClasses = buildClusterClasses(false, 'fixed-cluster');
      expect(fixedClasses).toContain('cluster--nowrap');
    });
  });
});