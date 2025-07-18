/** @type {import('tailwindcss').Config} */

// Fluid typography helper function using utopia.fyi approach
const createFluidTypeScale = (minScreen, maxScreen, minFontSize, maxFontSize) => {
  const slope = (maxFontSize - minFontSize) / (maxScreen - minScreen);
  const yAxisIntersection = -minScreen * slope + minFontSize;
  
  return `clamp(${minFontSize}rem, ${yAxisIntersection.toFixed(4)}rem + ${(slope * 100).toFixed(4)}vw, ${maxFontSize}rem)`;
};

// Fluid spacing helper function using utopia.fyi approach
const createFluidSpaceScale = (minScreen, maxScreen, minSpace, maxSpace) => {
  const slope = (maxSpace - minSpace) / (maxScreen - minScreen);
  const yAxisIntersection = -minScreen * slope + minSpace;
  
  return `clamp(${minSpace}rem, ${yAxisIntersection.toFixed(4)}rem + ${(slope * 100).toFixed(4)}vw, ${maxSpace}rem)`;
};

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        green: {
          DEFAULT: 'var(--color-green)',
          light: 'var(--color-green-light)',
          dark: 'var(--color-green-dark)',
        },
        orange: {
          DEFAULT: 'var(--color-orange)',
          light: 'var(--color-orange-light)',
          dark: 'var(--color-orange-dark)',
        },
        yellow: {
          DEFAULT: 'var(--color-yellow)',
          light: 'var(--color-yellow-light)',
          dark: 'var(--color-yellow-dark)',
        },
        blue: {
          DEFAULT: 'var(--color-blue)',
          light: 'var(--color-blue-light)',
          dark: 'var(--color-blue-dark)',
        },
        black: 'var(--color-black)',
        white: 'var(--color-white)',
        
        // Neutral Colors
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        'surface-variant': 'var(--color-surface-variant)',
        border: 'var(--color-border)',
        
        // Text Colors
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          hint: 'var(--color-text-hint)',
          'on-primary': 'var(--color-text-on-primary)',
          'on-dark': 'var(--color-text-on-dark)',
        },
        
        // Feedback Colors
        success: 'var(--color-success)',
        error: 'var(--color-error)',
        warning: 'var(--color-warning)',
        info: 'var(--color-info)',
      },
      
      // Typography configuration
      fontFamily: {
        primary: ['var(--font-primary)'],
        mono: ['var(--font-mono)'],
      },
      
      // Fluid Typography Scale
      fontSize: {
        'xs': createFluidTypeScale(20, 90, 0.75, 0.75),    // 12px at all sizes
        'sm': createFluidTypeScale(20, 90, 0.875, 0.875),  // 14px at all sizes
        'base': createFluidTypeScale(20, 90, 1, 1),        // 16px at all sizes
        'lg': createFluidTypeScale(20, 90, 1.125, 1.25),   // 18px to 20px
        'xl': createFluidTypeScale(20, 90, 1.25, 1.5),     // 20px to 24px
        '2xl': createFluidTypeScale(20, 90, 1.5, 1.875),   // 24px to 30px
        '3xl': createFluidTypeScale(20, 90, 1.875, 2.25),  // 30px to 36px
        '4xl': createFluidTypeScale(20, 90, 2.25, 3),      // 36px to 48px
        '5xl': createFluidTypeScale(20, 90, 3, 3.75),      // 48px to 60px
        '6xl': createFluidTypeScale(20, 90, 3.75, 4.5),    // 60px to 72px
        '7xl': createFluidTypeScale(20, 90, 4.5, 5.25),    // 72px to 84px
      },
      
      // Font Weights
      fontWeight: {
        regular: 'var(--font-weight-regular)',
        medium: 'var(--font-weight-medium)',
        semibold: 'var(--font-weight-semibold)',
        bold: 'var(--font-weight-bold)',
        black: 'var(--font-weight-black)',
      },
      
      // Line Heights
      lineHeight: {
        tight: 'var(--line-height-tight)',
        snug: 'var(--line-height-snug)',
        normal: 'var(--line-height-normal)',
        relaxed: 'var(--line-height-relaxed)',
        loose: 'var(--line-height-loose)',
      },
      
      // Spacing Scale
      spacing: {
        0: 'var(--space-0)',
        1: 'var(--space-1)',
        2: 'var(--space-2)',
        3: 'var(--space-3)',
        4: 'var(--space-4)',
        5: 'var(--space-5)',
        6: 'var(--space-6)',
        8: 'var(--space-8)',
        10: 'var(--space-10)',
        12: 'var(--space-12)',
        16: 'var(--space-16)',
        20: 'var(--space-20)',
        // Fluid spacing values
        'gutter': 'var(--layout-gutter, var(--layout-gutter-sm))',
        'container': 'var(--container-padding, var(--container-padding-sm))',
        'section': 'var(--section-spacing, var(--section-spacing-sm))',
      },
      
      // Fluid spacing for responsive layouts
      fluidSpacing: {
        'sm-md': createFluidSpaceScale(20, 48, 1, 1.5),    // 16px to 24px
        'md-lg': createFluidSpaceScale(20, 48, 1.5, 2),    // 24px to 32px
        'lg-xl': createFluidSpaceScale(20, 48, 2, 3),      // 32px to 48px
        'xl-2xl': createFluidSpaceScale(20, 48, 3, 4),     // 48px to 64px
        '2xl-3xl': createFluidSpaceScale(20, 48, 4, 6),    // 64px to 96px
      },
      
      // Border Widths
      borderWidth: {
        DEFAULT: 'var(--border-width-normal)',
        thin: 'var(--border-width-thin)',
        normal: 'var(--border-width-normal)',
        thick: 'var(--border-width-thick)',
        brutalist: 'var(--border-width-brutalist)',
      },
      
      // Border Radius
      borderRadius: {
        none: 'var(--radius-none)',
        sm: 'var(--radius-sm)',
        DEFAULT: 'var(--radius-md)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        full: 'var(--radius-full)',
      },
      
      // Box Shadows
      boxShadow: {
        none: 'var(--shadow-none)',
        sm: 'var(--shadow-sm)',
        DEFAULT: 'var(--shadow-md)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        inner: 'var(--shadow-inner)',
        'brutalist-sm': 'var(--shadow-sm)',
        'brutalist-md': 'var(--shadow-md)',
        'brutalist-lg': 'var(--shadow-lg)',
      },
      
      // Text Style Utility Classes
      textStyles: {
        'heading-1': {
          fontSize: 'var(--font-size-6xl)',
          lineHeight: 'var(--line-height-tight)',
          fontWeight: 'var(--font-weight-black)',
        },
        'heading-2': {
          fontSize: 'var(--font-size-5xl)',
          lineHeight: 'var(--line-height-tight)',
          fontWeight: 'var(--font-weight-black)',
        },
        'heading-3': {
          fontSize: 'var(--font-size-4xl)',
          lineHeight: 'var(--line-height-snug)',
          fontWeight: 'var(--font-weight-black)',
        },
        'heading-4': {
          fontSize: 'var(--font-size-3xl)',
          lineHeight: 'var(--line-height-snug)',
          fontWeight: 'var(--font-weight-black)',
        },
        'heading-5': {
          fontSize: 'var(--font-size-2xl)',
          lineHeight: 'var(--line-height-normal)',
          fontWeight: 'var(--font-weight-bold)',
        },
        'heading-6': {
          fontSize: 'var(--font-size-xl)',
          lineHeight: 'var(--line-height-normal)',
          fontWeight: 'var(--font-weight-bold)',
        },
        'body-lg': {
          fontSize: 'var(--font-size-lg)',
          lineHeight: 'var(--line-height-relaxed)',
          fontWeight: 'var(--font-weight-regular)',
        },
        'body': {
          fontSize: 'var(--font-size-base)',
          lineHeight: 'var(--line-height-relaxed)',
          fontWeight: 'var(--font-weight-regular)',
        },
        'body-sm': {
          fontSize: 'var(--font-size-sm)',
          lineHeight: 'var(--line-height-normal)',
          fontWeight: 'var(--font-weight-regular)',
        },
        'caption': {
          fontSize: 'var(--font-size-xs)',
          lineHeight: 'var(--line-height-normal)',
          fontWeight: 'var(--font-weight-medium)',
        },
        'overline': {
          fontSize: 'var(--font-size-xs)',
          lineHeight: 'var(--line-height-normal)',
          fontWeight: 'var(--font-weight-bold)',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
        },
        'button-text': {
          fontSize: 'var(--font-size-base)',
          lineHeight: 'var(--line-height-tight)',
          fontWeight: 'var(--font-weight-bold)',
        },
        'link': {
          fontSize: 'var(--font-size-base)',
          lineHeight: 'var(--line-height-normal)',
          fontWeight: 'var(--font-weight-medium)',
          textDecoration: 'underline',
        },
        'code': {
          fontSize: 'var(--font-size-sm)',
          lineHeight: 'var(--line-height-normal)',
          fontWeight: 'var(--font-weight-regular)',
          fontFamily: 'var(--font-mono)',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    // Custom plugin to add text style utility classes
    function({ addUtilities, theme }) {
      const textStyles = theme('textStyles');
      const utilities = {};
      
      Object.entries(textStyles).forEach(([name, styles]) => {
        utilities[`.text-style-${name}`] = styles;
      });
      
      addUtilities(utilities);
    },
    // Custom plugin to add fluid spacing utilities
    function({ addUtilities, theme }) {
      const fluidSpacing = theme('fluidSpacing');
      const utilities = {};
      
      Object.entries(fluidSpacing).forEach(([name, value]) => {
        utilities[`.fluid-p-${name}`] = { padding: value };
        utilities[`.fluid-px-${name}`] = { 
          paddingLeft: value,
          paddingRight: value,
        };
        utilities[`.fluid-py-${name}`] = {
          paddingTop: value,
          paddingBottom: value,
        };
        utilities[`.fluid-m-${name}`] = { margin: value };
        utilities[`.fluid-mx-${name}`] = {
          marginLeft: value,
          marginRight: value,
        };
        utilities[`.fluid-my-${name}`] = {
          marginTop: value,
          marginBottom: value,
        };
        utilities[`.fluid-gap-${name}`] = { gap: value };
      });
      
      addUtilities(utilities);
    },
    // Custom plugin to add layout utility classes
    function({ addComponents }) {
      const components = {
        '.container-fluid': {
          width: '100%',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: 'var(--container-padding, var(--container-padding-sm))',
          paddingRight: 'var(--container-padding, var(--container-padding-sm))',
        },
        '.section-spacing': {
          marginTop: 'var(--section-spacing, var(--section-spacing-sm))',
          marginBottom: 'var(--section-spacing, var(--section-spacing-sm))',
        },
        '.gutter-padding': {
          paddingLeft: 'var(--layout-gutter, var(--layout-gutter-sm))',
          paddingRight: 'var(--layout-gutter, var(--layout-gutter-sm))',
        },
      };
      
      addComponents(components);
    },
    // Custom plugin to add neo-brutalist utility classes
    function({ addComponents }) {
      const components = {
        '.neo-brutalist-border': {
          border: 'var(--border-width-brutalist) solid var(--color-black)',
          boxShadow: 'var(--shadow-md)',
        },
        '.neo-brutalist-border-sm': {
          border: 'var(--border-width-thick) solid var(--color-black)',
          boxShadow: 'var(--shadow-sm)',
        },
        '.neo-brutalist-border-lg': {
          border: 'var(--border-width-brutalist) solid var(--color-black)',
          boxShadow: 'var(--shadow-lg)',
        },
        '.neo-brutalist-button': {
          border: 'var(--border-width-normal) solid var(--color-black)',
          boxShadow: 'var(--shadow-sm)',
          transition: 'transform 0.1s ease-in-out, box-shadow 0.1s ease-in-out',
          '&:hover': {
            transform: 'translate(-2px, -2px)',
            boxShadow: '6px 6px 0 0 rgba(0, 0, 0, 0.9)',
          },
          '&:active': {
            transform: 'translate(0, 0)',
            boxShadow: 'var(--shadow-sm)',
          },
        },
        '.neo-brutalist-card': {
          border: 'var(--border-width-normal) solid var(--color-black)',
          boxShadow: 'var(--shadow-md)',
          backgroundColor: 'var(--color-surface)',
          padding: 'var(--space-4)',
        },
        '.neo-brutalist-card-hover': {
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translate(-4px, -4px)',
            boxShadow: '12px 12px 0 0 rgba(0, 0, 0, 0.9)',
          },
        },
      };
      
      addComponents(components);
    },
  ],
}
