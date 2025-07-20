/**
 * Contrast Testing Utilities
 * 
 * Functions to calculate and test color contrast ratios according to WCAG 2.1 guidelines
 */

/**
 * Convert hex color to RGB values
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

/**
 * Calculate relative luminance of a color
 */
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate contrast ratio between two colors
 */
export function getContrastRatio(color1: string, color2: string): number {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  
  if (!rgb1 || !rgb2) return 0;
  
  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
  
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  
  return (brightest + 0.05) / (darkest + 0.05);
}

/**
 * Check if contrast ratio meets WCAG standards
 */
export function checkContrastCompliance(ratio: number, level: 'AA' | 'AAA' = 'AA', isLargeText: boolean = false): {
  passes: boolean;
  level: string;
  required: number;
} {
  const requirements = {
    AA: isLargeText ? 3 : 4.5,
    AAA: isLargeText ? 4.5 : 7
  };
  
  const required = requirements[level];
  const passes = ratio >= required;
  
  return { passes, level, required };
}

/**
 * Test all design system color combinations
 */
export function testDesignSystemContrast() {
  const colors = {
    // Light mode
    light: {
      background: '#FFFFFF',
      surface: '#F5F5F5',
      surfaceVariant: '#EEEEEE',
      textPrimary: '#121212',
      textSecondary: '#555555',
      textHint: '#888888',
      green: '#1F7A22',
      blue: '#3A5AD7',
      orange: '#D44C0A',
      yellow: '#FFDA6B',
    },
    // Dark mode
    dark: {
      background: '#121212',
      surface: '#1E1E1E',
      surfaceVariant: '#2A2A2A',
      textPrimary: '#FFFFFF',
      textSecondary: '#CCCCCC',
      textHint: '#999999',
      green: '#1F7A22',
      blue: '#3A5AD7',
      orange: '#D44C0A',
      yellow: '#FFDA6B',
    }
  };

  const results = {
    light: {} as Record<string, any>,
    dark: {} as Record<string, any>
  };

  // Test light mode combinations
  results.light = {
    'Text on Background': {
      ratio: getContrastRatio(colors.light.textPrimary, colors.light.background),
      compliance: checkContrastCompliance(getContrastRatio(colors.light.textPrimary, colors.light.background))
    },
    'Text on Surface': {
      ratio: getContrastRatio(colors.light.textPrimary, colors.light.surface),
      compliance: checkContrastCompliance(getContrastRatio(colors.light.textPrimary, colors.light.surface))
    },
    'Text on Surface Variant': {
      ratio: getContrastRatio(colors.light.textPrimary, colors.light.surfaceVariant),
      compliance: checkContrastCompliance(getContrastRatio(colors.light.textPrimary, colors.light.surfaceVariant))
    },
    'White on Green': {
      ratio: getContrastRatio('#FFFFFF', colors.light.green),
      compliance: checkContrastCompliance(getContrastRatio('#FFFFFF', colors.light.green))
    },
    'White on Blue': {
      ratio: getContrastRatio('#FFFFFF', colors.light.blue),
      compliance: checkContrastCompliance(getContrastRatio('#FFFFFF', colors.light.blue))
    }
  };

  // Test dark mode combinations
  results.dark = {
    'Text on Background': {
      ratio: getContrastRatio(colors.dark.textPrimary, colors.dark.background),
      compliance: checkContrastCompliance(getContrastRatio(colors.dark.textPrimary, colors.dark.background))
    },
    'Text on Surface': {
      ratio: getContrastRatio(colors.dark.textPrimary, colors.dark.surface),
      compliance: checkContrastCompliance(getContrastRatio(colors.dark.textPrimary, colors.dark.surface))
    },
    'Text on Surface Variant': {
      ratio: getContrastRatio(colors.dark.textPrimary, colors.dark.surfaceVariant),
      compliance: checkContrastCompliance(getContrastRatio(colors.dark.textPrimary, colors.dark.surfaceVariant))
    },
    'White on Green': {
      ratio: getContrastRatio(colors.dark.textPrimary, colors.dark.green),
      compliance: checkContrastCompliance(getContrastRatio(colors.dark.textPrimary, colors.dark.green))
    },
    'White on Blue': {
      ratio: getContrastRatio(colors.dark.textPrimary, colors.dark.blue),
      compliance: checkContrastCompliance(getContrastRatio(colors.dark.textPrimary, colors.dark.blue))
    }
  };

  return results;
}