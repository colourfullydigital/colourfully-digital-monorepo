# Colourfully Digital Foundation Frontend Architecture Document

## 1. Template and Framework Selection

The project uses an established frontend architecture and does not rely on a starter template. The architecture is built on Astro for static site generation and performance, with React for creating interactive UI components following the "Island Architecture" pattern. This approach minimizes the amount of JavaScript shipped to the client, ensuring a fast user experience.

### Change Log

| Date | Version | Description | Author |
| :--- | :------ | :---------- | :----- |
| 2025-06-23 | 2.0 | Detailed architecture based on Design System | Winston, Architect |

## 2. Frontend Tech Stack

This stack is chosen to align with the principles of performance, developer experience, and maintainability.

### Technology Stack Table

| Category | Technology | Version | Purpose | Rationale |
| :--- | :--- | :--- | :--- | :--- |
| **Framework** | Astro | 5.9 | Static Site Generation & Page Orchestration | Excellent performance (zero JS by default), great developer experience, and perfect for content-focused sites. |
| **UI Library** | React | 19.0.0 | Interactive Component Islands | Rich ecosystem and ideal for creating dynamic, stateful components where needed without overhead elsewhere. |
| **State Management** | React Hooks (`useState`, `useContext`) | 19.0.0 | Component-level and simple shared state | Lightweight, built-in solution sufficient for current needs. Can be scaled to Zustand or Jotai if complexity increases. |
| **Styling** | Tailwind CSS | - | Utility-First CSS Framework | Enables rapid development and ensures consistency by mapping directly to the design system tokens. |
| **Testing** | Playwright, Testing Library | - | E2E, Integration, and Unit Testing | Provides a comprehensive testing pyramid, from component-level checks to full user flow validation. |
| **Form Handling** | Netlify Forms | - | Form Data Collection & Processing | Seamless integration with the hosting platform, providing robust spam protection and webhook triggers. |
| **Animation** | Framer Motion | - | UI Animations & Transitions | A powerful and easy-to-use library for creating the fluid animations described in the design brief. |

## 3. Project Structure

The monorepo structure separates the main website application from shared packages like types or future UI component libraries.

```
/apps
└── /website
    ├── /public # Static assets (images, fonts)
    ├── /src
    │   ├── /assets # Assets processed by Astro
    │   ├── /components # Reusable React & Astro components
    │   │   ├── /forms
    │   │   └── /ui # Buttons, Cards, etc.
    │   ├── /content # Content collections (Markdown, etc.)
    │   ├── /hooks # Custom React hooks
    │   ├── /layouts # Main page layouts
    │   ├── /pages # Site routes
    │   ├── /styles # Global CSS, Tailwind base
    │   └── /utils # Utility functions (e.g., API clients)
    └── /tests
        ├── /e2e # Playwright tests
        ├── /integration
        └── /unit # Vitest/Testing Library tests
/packages
└── /types # Shared TypeScript interfaces and types
```

## 4. Component Standards

### Component Template (React with TypeScript)

This template includes props typing, basic structure, and follows React best practices.

```typescript
// src/components/ui/Button.tsx
import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'text';
  accent?: 'green' | 'orange' | 'yellow' | 'blue';
}

const Button: React.FC<ButtonProps> = ({ 
  className = '',
  children,
  variant = 'primary',
  accent = 'green',
  ...props 
}) => {
  const baseClasses = 'font-bold text-base leading-tight transform transition-transform duration-150';
  // Logic to apply variant and accent classes from props

  return (
    <button className={`${baseClasses} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
```

### Naming Conventions

- **Components**: `PascalCase` (e.g., `HeroSection.astro`, `VolunteerForm.tsx`)
- **Files**: `kebab-case` for utilities and hooks (e.g., `use-form-state.ts`)
- **Types**: `PascalCase` with `Props` or `Payload` suffix (e.g., `ButtonProps`)

## 5. Styling Guidelines

### Tailwind CSS Configuration

The `tailwind.config.js` file will be the single source of truth for implementing the design system.

```javascript
// tailwind.config.js
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        green: { DEFAULT: '#76E07F', light: '#A0EBA6', dark: '#4CB653' },
        orange: { DEFAULT: '#FE6A25', light: '#FF8F5A', dark: '#D44C0A' },
        // ... all other colors from the design system
      },
      fontFamily: {
        sans: ['Montserrat', ...fontFamily.sans],
        mono: ['JetBrains Mono', ...fontFamily.mono],
      },
      fontSize: {
        'xs': '0.75rem', // 12px
        // ... all other font sizes
      },
      lineHeight: {
        tight: '1.1',
        // ... all other line heights
      },
      spacing: {
        // ... all spacing units
      },
      borderRadius: {
        // ... all border radius values
      },
      borderWidth: {
        // ... all border widths
      },
      boxShadow: {
        sm: '4px 4px 0 0 rgba(0, 0, 0, 0.9)',
        md: '8px 8px 0 0 rgba(0, 0, 0, 0.9)',
        // ... all other shadows
      },
    },
  },
  plugins: [],
};
```

## 6. Testing Requirements

### Component Test Template (React Testing Library)

```typescript
// src/components/ui/Button.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

it('should render and handle click events', async () => {
  const handleClick = vi.fn();
  render(<Button onClick={handleClick}>Click Me</Button>);

  const button = screen.getByRole('button', { name: /click me/i });
  expect(button).toBeInTheDocument();

  await userEvent.click(button);
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

## 7. Frontend Developer Standards

### Critical Coding Rules

1.  **Use Design Tokens**: Always use Tailwind utility classes that map to the design system. Avoid magic numbers or one-off styles.
2.  **Component Responsibility**: Create small, focused components. A component should do one thing well.
3.  **Accessibility First**: Use semantic HTML. Ensure all interactive elements are keyboard-navigable and have appropriate ARIA attributes.
4.  **Type Safety**: Leverage TypeScript for all components and utility functions. Use shared types from the `/packages/types` directory where applicable.

### Quick Reference

- **Dev Server**: `pnpm --filter website dev`
- **Build**: `pnpm build`
- **Test**: `pnpm test`
- **Import Alias**: `@/` maps to `/src`
