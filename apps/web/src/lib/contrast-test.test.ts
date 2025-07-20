import { describe, it, expect } from 'vitest';
import { getContrastRatio, checkContrastCompliance, testDesignSystemContrast } from './contrast-test';

describe('Contrast Testing Utilities', () => {
  describe('getContrastRatio', () => {
    it('should calculate correct contrast ratio for black on white', () => {
      const ratio = getContrastRatio('#000000', '#FFFFFF');
      expect(ratio).toBeCloseTo(21, 1); // Perfect contrast
    });

    it('should calculate correct contrast ratio for white on black', () => {
      const ratio = getContrastRatio('#FFFFFF', '#000000');
      expect(ratio).toBeCloseTo(21, 1); // Same as black on white
    });

    it('should calculate correct contrast ratio for design system colors', () => {
      // Text primary on background (light mode)
      const lightRatio = getContrastRatio('#121212', '#FFFFFF');
      expect(lightRatio).toBeGreaterThan(15); // Should be very high contrast

      // Text primary on background (dark mode)
      const darkRatio = getContrastRatio('#FFFFFF', '#121212');
      expect(darkRatio).toBeGreaterThan(15); // Should be very high contrast
    });

    it('should calculate contrast for primary colors', () => {
      // White text on green background
      const greenRatio = getContrastRatio('#FFFFFF', '#1F7A22');
      expect(greenRatio).toBeGreaterThan(4.5); // Should meet AA standard

      // White text on blue background
      const blueRatio = getContrastRatio('#FFFFFF', '#3A5AD7');
      expect(blueRatio).toBeGreaterThan(4.5); // Should meet AA standard
    });
  });

  describe('checkContrastCompliance', () => {
    it('should correctly identify AA compliance', () => {
      const highContrast = checkContrastCompliance(7.5, 'AA');
      expect(highContrast.passes).toBe(true);

      const lowContrast = checkContrastCompliance(3.0, 'AA');
      expect(lowContrast.passes).toBe(false);
    });

    it('should correctly identify AAA compliance', () => {
      const highContrast = checkContrastCompliance(8.0, 'AAA');
      expect(highContrast.passes).toBe(true);

      const mediumContrast = checkContrastCompliance(5.0, 'AAA');
      expect(mediumContrast.passes).toBe(false);
    });

    it('should handle large text requirements', () => {
      const ratio = 3.5;
      
      const normalText = checkContrastCompliance(ratio, 'AA', false);
      expect(normalText.passes).toBe(false); // 3.5 < 4.5

      const largeText = checkContrastCompliance(ratio, 'AA', true);
      expect(largeText.passes).toBe(true); // 3.5 > 3.0
    });
  });

  describe('testDesignSystemContrast', () => {
    it('should test all design system color combinations', () => {
      const results = testDesignSystemContrast();
      
      expect(results.light).toBeDefined();
      expect(results.dark).toBeDefined();
      
      // Check that all light mode combinations pass AA
      Object.values(results.light).forEach((test: any) => {
        expect(test.ratio).toBeGreaterThan(0);
        expect(test.compliance).toBeDefined();
      });
      
      // Check that all dark mode combinations pass AA
      Object.values(results.dark).forEach((test: any) => {
        expect(test.ratio).toBeGreaterThan(0);
        expect(test.compliance).toBeDefined();
      });
    });

    it('should ensure primary text combinations meet AAA standards', () => {
      const results = testDesignSystemContrast();
      
      // Light mode text on background should be AAA
      const lightTextBg = results.light['Text on Background'];
      expect(lightTextBg.ratio).toBeGreaterThan(7); // AAA standard
      
      // Dark mode text on background should be AAA
      const darkTextBg = results.dark['Text on Background'];
      expect(darkTextBg.ratio).toBeGreaterThan(7); // AAA standard
    });

    it('should ensure colored backgrounds meet AA standards', () => {
      const results = testDesignSystemContrast();
      
      // White text on green should meet AA
      const lightGreen = results.light['White on Green'];
      expect(lightGreen.ratio).toBeGreaterThan(4.5); // AA standard
      expect(lightGreen.compliance.passes).toBe(true);
      
      // White text on blue should meet AA
      const lightBlue = results.light['White on Blue'];
      expect(lightBlue.ratio).toBeGreaterThan(4.5); // AA standard
      expect(lightBlue.compliance.passes).toBe(true);
    });
  });

  describe('Real-world color combinations', () => {
    it('should validate specific design system color pairs', () => {
      const testCases = [
        { fg: '#121212', bg: '#FFFFFF', name: 'Primary text on white', minRatio: 7 },
        { fg: '#FFFFFF', bg: '#121212', name: 'White text on dark', minRatio: 7 },
        { fg: '#121212', bg: '#F5F5F5', name: 'Primary text on surface', minRatio: 7 },
        { fg: '#FFFFFF', bg: '#1F7A22', name: 'White text on green', minRatio: 4.5 },
        { fg: '#FFFFFF', bg: '#3A5AD7', name: 'White text on blue', minRatio: 4.5 },
        { fg: '#555555', bg: '#FFFFFF', name: 'Secondary text on white', minRatio: 4.5 },
        { fg: '#CCCCCC', bg: '#121212', name: 'Secondary text on dark', minRatio: 4.5 },
      ];

      testCases.forEach(({ fg, bg, name, minRatio }) => {
        const ratio = getContrastRatio(fg, bg);
        expect(ratio).toBeGreaterThan(minRatio);
        
        const compliance = checkContrastCompliance(ratio, 'AA');
        expect(compliance.passes).toBe(true);
      });
    });
  });
});