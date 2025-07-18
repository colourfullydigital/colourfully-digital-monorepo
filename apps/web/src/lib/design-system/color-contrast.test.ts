import { describe, it, expect } from 'vitest';

// Helper function to calculate contrast ratio
function getContrastRatio(color1: string, color2: string): number {
  // Convert hex to RGB
  const hexToRgb = (hex: string): number[] => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b];
  };

  // Calculate relative luminance
  const getLuminance = (rgb: number[]): number => {
    const [r, g, b] = rgb.map(c => {
      const channel = c / 255;
      return channel <= 0.03928
        ? channel / 12.92
        : Math.pow((channel + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  
  const luminance1 = getLuminance(rgb1);
  const luminance2 = getLuminance(rgb2);
  
  const brightest = Math.max(luminance1, luminance2);
  const darkest = Math.min(luminance1, luminance2);
  
  return (brightest + 0.05) / (darkest + 0.05);
}

describe('Color Contrast Accessibility', () => {
  // Define our color palette
  const colors = {
    green: '#2A8A31', // Updated for better contrast
    orange: '#D44C0A', // Updated for better contrast
    yellow: '#FFDA6B',
    blue: '#5B7CFA',
    black: '#121212',
    white: '#FFFFFF',
    textPrimary: '#121212',
    textSecondary: '#555555',
    textHint: '#888888',
    textOnPrimary: '#FFFFFF',
    textOnDark: '#FFFFFF',
    background: '#FFFFFF',
    surface: '#F5F5F5',
  };

  // Test text on background colors
  it('should have sufficient contrast for text on background colors', () => {
    // WCAG AA requires 4.5:1 for normal text, 3:1 for large text
    const minContrastNormalText = 4.5;
    const minContrastLargeText = 3;
    
    // Test primary text on background
    expect(getContrastRatio(colors.textPrimary, colors.background)).toBeGreaterThanOrEqual(minContrastNormalText);
    expect(getContrastRatio(colors.textPrimary, colors.surface)).toBeGreaterThanOrEqual(minContrastNormalText);
    
    // Test secondary text on background
    expect(getContrastRatio(colors.textSecondary, colors.background)).toBeGreaterThanOrEqual(minContrastNormalText);
    expect(getContrastRatio(colors.textSecondary, colors.surface)).toBeGreaterThanOrEqual(minContrastNormalText);
    
    // Test text on primary colors (for large text like headings)
    expect(getContrastRatio(colors.textOnPrimary, colors.green)).toBeGreaterThanOrEqual(minContrastLargeText);
    expect(getContrastRatio(colors.textOnPrimary, colors.blue)).toBeGreaterThanOrEqual(minContrastLargeText);
    expect(getContrastRatio(colors.textOnPrimary, colors.orange)).toBeGreaterThanOrEqual(minContrastLargeText);
    
    // Yellow often has contrast issues with white text
    expect(getContrastRatio(colors.black, colors.yellow)).toBeGreaterThanOrEqual(minContrastLargeText);
  });
});