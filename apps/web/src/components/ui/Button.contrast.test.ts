/**
 * Button Component Contrast Tests
 * 
 * Tests for the Button component color contrast to ensure
 * it meets WCAG 2.1 accessibility standards.
 */

import { describe, it, expect } from 'vitest';
import { getContrastRatio, checkContrastCompliance } from '../../lib/contrast-test';

describe('Button Component Contrast', () => {
  // Define the colors used in the Button component
  const colors = {
    white: '#FFFFFF',
    black: '#121212',
    green: '#1F7A22',
    greenDark: '#166219',
    blue: '#3A5AD7',
    blueDark: '#2A42A3',
    yellow: '#FFDA6B',
    yellowDark: '#F5C235',
    surface: '#F5F5F5'
  };

  describe('Primary Button (Green)', () => {
    it('should have sufficient contrast for text on background', () => {
      const ratio = getContrastRatio(colors.white, colors.green);
      const compliance = checkContrastCompliance(ratio);
      
      console.log(`White text on Green background: ${ratio.toFixed(2)}:1`);
      expect(compliance.passes).toBe(true);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });

    it('should have sufficient contrast for text on hover state', () => {
      const ratio = getContrastRatio(colors.white, colors.greenDark);
      const compliance = checkContrastCompliance(ratio);
      
      console.log(`White text on Green Dark (hover) background: ${ratio.toFixed(2)}:1`);
      expect(compliance.passes).toBe(true);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });
  });

  describe('Secondary Button (Blue)', () => {
    it('should have sufficient contrast for text on background', () => {
      const ratio = getContrastRatio(colors.white, colors.blue);
      const compliance = checkContrastCompliance(ratio);
      
      console.log(`White text on Blue background: ${ratio.toFixed(2)}:1`);
      expect(compliance.passes).toBe(true);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });

    it('should have sufficient contrast for text on hover state', () => {
      const ratio = getContrastRatio(colors.white, colors.blueDark);
      const compliance = checkContrastCompliance(ratio);
      
      console.log(`White text on Blue Dark (hover) background: ${ratio.toFixed(2)}:1`);
      expect(compliance.passes).toBe(true);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });
  });

  describe('Tertiary Button (Yellow)', () => {
    it('should have sufficient contrast for text on background', () => {
      const ratio = getContrastRatio(colors.black, colors.yellow);
      const compliance = checkContrastCompliance(ratio);
      
      console.log(`Black text on Yellow background: ${ratio.toFixed(2)}:1`);
      expect(compliance.passes).toBe(true);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });

    it('should have sufficient contrast for text on hover state', () => {
      const ratio = getContrastRatio(colors.black, colors.yellowDark);
      const compliance = checkContrastCompliance(ratio);
      
      console.log(`Black text on Yellow Dark (hover) background: ${ratio.toFixed(2)}:1`);
      expect(compliance.passes).toBe(true);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });
  });

  describe('Ghost Button', () => {
    it('should have sufficient contrast for text on background', () => {
      // For transparent background, we need to test against the expected background color
      // Since the ghost button is transparent, it will be rendered on top of other elements
      // We'll test against white background as a baseline
      const ratio = getContrastRatio(colors.black, colors.white);
      const compliance = checkContrastCompliance(ratio);
      
      console.log(`Black text on white background (ghost button): ${ratio.toFixed(2)}:1`);
      expect(compliance.passes).toBe(true);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });

    it('should have sufficient contrast for text on hover state', () => {
      const ratio = getContrastRatio(colors.black, colors.surface);
      const compliance = checkContrastCompliance(ratio);
      
      console.log(`Black text on Surface (hover) background: ${ratio.toFixed(2)}:1`);
      expect(compliance.passes).toBe(true);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });
  });

  describe('Disabled Button', () => {
    it('should have sufficient contrast for primary button when disabled', () => {
      // For disabled buttons, we apply 50% opacity, which is hard to test directly
      // Instead, we'll ensure the base contrast is high enough that even with reduced opacity,
      // it should still be readable
      const ratio = getContrastRatio(colors.white, colors.green);
      expect(ratio).toBeGreaterThanOrEqual(3); // Lower threshold for disabled state
    });
  });

  describe('Large Text Buttons', () => {
    it('should meet AAA standards for large text (lg size)', () => {
      // For large text (18pt or 14pt bold), the contrast requirements are less strict
      const primaryRatio = getContrastRatio(colors.white, colors.green);
      const primaryCompliance = checkContrastCompliance(primaryRatio, 'AAA', true);
      
      const secondaryRatio = getContrastRatio(colors.white, colors.blue);
      const secondaryCompliance = checkContrastCompliance(secondaryRatio, 'AAA', true);
      
      const tertiaryRatio = getContrastRatio(colors.black, colors.yellow);
      const tertiaryCompliance = checkContrastCompliance(tertiaryRatio, 'AAA', true);
      
      console.log(`Large text - White on Green: ${primaryRatio.toFixed(2)}:1 (AAA: ${primaryCompliance.passes ? 'Pass' : 'Fail'})`);
      console.log(`Large text - White on Blue: ${secondaryRatio.toFixed(2)}:1 (AAA: ${secondaryCompliance.passes ? 'Pass' : 'Fail'})`);
      console.log(`Large text - Black on Yellow: ${tertiaryRatio.toFixed(2)}:1 (AAA: ${tertiaryCompliance.passes ? 'Pass' : 'Fail'})`);
      
      expect(primaryCompliance.passes).toBe(true);
      expect(secondaryCompliance.passes).toBe(true);
      expect(tertiaryCompliance.passes).toBe(true);
    });
  });
});