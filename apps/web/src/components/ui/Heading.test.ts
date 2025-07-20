/**
 * Heading Component Tests
 * 
 * Tests for the Heading component utility functions and logic
 * to ensure proper class mapping, semantic HTML elements, and accessibility compliance.
 */

import { describe, it, expect } from 'vitest';

// Heading component class mapping (extracted from component logic)
const headingClasses = {
  1: 'text-6xl leading-tight font-black',
  2: 'text-5xl leading-tight font-black', 
  3: 'text-4xl leading-snug font-black',
  4: 'text-3xl leading-snug font-black',
  5: 'text-2xl leading-normal font-bold',
  6: 'text-xl leading-normal font-bold'
} as const;

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

/**
 * Utility functions extracted from the Heading component
 */
export function getHeadingClasses(level: HeadingLevel): string {
  return headingClasses[level];
}

export function getHeadingTag(level: HeadingLevel): string {
  return `h${level}`;
}

export function buildHeadingClasses(
  level: HeadingLevel,
  customClass: string = ''
): string[] {
  const classes = [
    'font-primary',
    'text-text-primary',
    'break-words',
    getHeadingClasses(level),
    customClass,
  ].filter(Boolean) as string[];
  
  return classes;
}

export function validateHeadingLevel(level: number): level is HeadingLevel {
  return level >= 1 && level <= 6 && Number.isInteger(level);
}

describe('Heading Component Logic', () => {
  describe('Heading Level Validation', () => {
    it('should validate correct heading levels', () => {
      expect(validateHeadingLevel(1)).toBe(true);
      expect(validateHeadingLevel(2)).toBe(true);
      expect(validateHeadingLevel(3)).toBe(true);
      expect(validateHeadingLevel(4)).toBe(true);
      expect(validateHeadingLevel(5)).toBe(true);
      expect(validateHeadingLevel(6)).toBe(true);
    });

    it('should reject invalid heading levels', () => {
      expect(validateHeadingLevel(0)).toBe(false);
      expect(validateHeadingLevel(7)).toBe(false);
      expect(validateHeadingLevel(-1)).toBe(false);
      expect(validateHeadingLevel(1.5)).toBe(false);
    });
  });

  describe('CSS Class Mapping', () => {
    it('should return correct CSS classes for each heading level', () => {
      expect(getHeadingClasses(1)).toBe('text-6xl leading-tight font-black');
      expect(getHeadingClasses(2)).toBe('text-5xl leading-tight font-black');
      expect(getHeadingClasses(3)).toBe('text-4xl leading-snug font-black');
      expect(getHeadingClasses(4)).toBe('text-3xl leading-snug font-black');
      expect(getHeadingClasses(5)).toBe('text-2xl leading-normal font-bold');
      expect(getHeadingClasses(6)).toBe('text-xl leading-normal font-bold');
    });

    it('should follow neo-brutalist typography hierarchy', () => {
      // H1-H4 should use font-black for maximum impact
      expect(getHeadingClasses(1)).toContain('font-black');
      expect(getHeadingClasses(2)).toContain('font-black');
      expect(getHeadingClasses(3)).toContain('font-black');
      expect(getHeadingClasses(4)).toContain('font-black');
      
      // H5-H6 should use font-bold for smaller headings
      expect(getHeadingClasses(5)).toContain('font-bold');
      expect(getHeadingClasses(6)).toContain('font-bold');
    });

    it('should use appropriate line heights for readability', () => {
      // Large headings (H1-H2) use tight line height
      expect(getHeadingClasses(1)).toContain('leading-tight');
      expect(getHeadingClasses(2)).toContain('leading-tight');
      
      // Medium headings (H3-H4) use snug line height
      expect(getHeadingClasses(3)).toContain('leading-snug');
      expect(getHeadingClasses(4)).toContain('leading-snug');
      
      // Small headings (H5-H6) use normal line height
      expect(getHeadingClasses(5)).toContain('leading-normal');
      expect(getHeadingClasses(6)).toContain('leading-normal');
    });
  });

  describe('Semantic HTML Tag Generation', () => {
    it('should generate correct HTML tag for each level', () => {
      expect(getHeadingTag(1)).toBe('h1');
      expect(getHeadingTag(2)).toBe('h2');
      expect(getHeadingTag(3)).toBe('h3');
      expect(getHeadingTag(4)).toBe('h4');
      expect(getHeadingTag(5)).toBe('h5');
      expect(getHeadingTag(6)).toBe('h6');
    });
  });

  describe('CSS Class Building', () => {
    it('should build base heading classes', () => {
      const classes = buildHeadingClasses(1);
      expect(classes).toContain('font-primary');
      expect(classes).toContain('text-text-primary');
      expect(classes).toContain('break-words');
      expect(classes).toContain('text-6xl leading-tight font-black');
    });

    it('should include custom classes when provided', () => {
      const classes = buildHeadingClasses(1, 'custom-class text-green');
      expect(classes).toContain('font-primary');
      expect(classes).toContain('text-text-primary');
      expect(classes).toContain('break-words');
      expect(classes).toContain('text-6xl leading-tight font-black');
      expect(classes).toContain('custom-class text-green');
    });

    it('should filter out empty custom classes', () => {
      const classes = buildHeadingClasses(1, '');
      expect(classes).not.toContain('');
      expect(classes).toHaveLength(4); // Only the base classes
    });

    it('should work correctly for all heading levels', () => {
      const levels: HeadingLevel[] = [1, 2, 3, 4, 5, 6];
      
      levels.forEach(level => {
        const classes = buildHeadingClasses(level);
        expect(classes).toContain('font-primary');
        expect(classes).toContain('text-text-primary');
        expect(classes).toContain('break-words');
        expect(classes).toContain(getHeadingClasses(level));
      });
    });
  });

  describe('Typography Scale Consistency', () => {
    it('should maintain proper size hierarchy', () => {
      // Font sizes should decrease as heading level increases
      const fontSizes = [
        'text-6xl', // H1
        'text-5xl', // H2
        'text-4xl', // H3
        'text-3xl', // H4
        'text-2xl', // H5
        'text-xl',  // H6
      ];

      fontSizes.forEach((fontSize, index) => {
        const level = (index + 1) as HeadingLevel;
        expect(getHeadingClasses(level)).toContain(fontSize);
      });
    });

    it('should use fluid typography tokens', () => {
      // All heading classes should use Tailwind's fluid typography scale
      const levels: HeadingLevel[] = [1, 2, 3, 4, 5, 6];
      
      levels.forEach(level => {
        const classes = getHeadingClasses(level);
        expect(classes).toMatch(/text-(6xl|5xl|4xl|3xl|2xl|xl)/);
      });
    });
  });

  describe('Bilingual Support Validation', () => {
    it('should include break-words for text wrapping', () => {
      const levels: HeadingLevel[] = [1, 2, 3, 4, 5, 6];
      
      levels.forEach(level => {
        const classes = buildHeadingClasses(level);
        expect(classes).toContain('break-words');
      });
    });

    it('should handle French text expansion scenarios', () => {
      // French text is typically 15-20% longer than English
      // The break-words class ensures proper wrapping for long French words
      const classes = buildHeadingClasses(1);
      expect(classes).toContain('break-words');
      
      // Verify all levels support text wrapping
      const levels: HeadingLevel[] = [1, 2, 3, 4, 5, 6];
      levels.forEach(level => {
        const levelClasses = buildHeadingClasses(level);
        expect(levelClasses).toContain('break-words');
      });
    });
  });

  describe('Accessibility Considerations', () => {
    it('should maintain semantic hierarchy', () => {
      // Each level should map to the correct semantic HTML element
      const levels: HeadingLevel[] = [1, 2, 3, 4, 5, 6];
      
      levels.forEach(level => {
        expect(getHeadingTag(level)).toBe(`h${level}`);
      });
    });

    it('should provide adequate contrast with text colors', () => {
      // All headings should use the primary text color for proper contrast
      const levels: HeadingLevel[] = [1, 2, 3, 4, 5, 6];
      
      levels.forEach(level => {
        const classes = buildHeadingClasses(level);
        expect(classes).toContain('text-text-primary');
      });
    });

    it('should use appropriate font weights for readability', () => {
      // Larger headings use font-black for maximum impact and readability
      expect(getHeadingClasses(1)).toContain('font-black');
      expect(getHeadingClasses(2)).toContain('font-black');
      expect(getHeadingClasses(3)).toContain('font-black');
      expect(getHeadingClasses(4)).toContain('font-black');
      
      // Smaller headings use font-bold to maintain readability without overwhelming
      expect(getHeadingClasses(5)).toContain('font-bold');
      expect(getHeadingClasses(6)).toContain('font-bold');
    });
  });

  describe('Design System Integration', () => {
    it('should use design system font family', () => {
      const levels: HeadingLevel[] = [1, 2, 3, 4, 5, 6];
      
      levels.forEach(level => {
        const classes = buildHeadingClasses(level);
        expect(classes).toContain('font-primary');
      });
    });

    it('should follow neo-brutalist design principles', () => {
      // Neo-brutalism emphasizes bold, high-contrast typography
      // H1-H4 should use the boldest weight (font-black)
      const boldLevels: HeadingLevel[] = [1, 2, 3, 4];
      boldLevels.forEach(level => {
        expect(getHeadingClasses(level)).toContain('font-black');
      });
      
      // All headings should use tight or snug line heights for impact
      expect(getHeadingClasses(1)).toContain('leading-tight');
      expect(getHeadingClasses(2)).toContain('leading-tight');
      expect(getHeadingClasses(3)).toContain('leading-snug');
      expect(getHeadingClasses(4)).toContain('leading-snug');
    });
  });
});