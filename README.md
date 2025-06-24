# Colourfully Digital Foundation Monorepo

A modern monorepo for the Colourfully Digital Foundation website built with Astro, React, TypeScript, and Tailwind CSS.

## Architecture

- **Frontend**: Astro 5.10.1 with React 19.0.0 islands
- **Content Management**: Sanity.io headless CMS
- **Forms**: Netlify Forms with Make.com automation
- **Styling**: Tailwind CSS
- **Type Safety**: TypeScript with shared types
- **Deployment**: Netlify

## Project Structure

```
├── apps/
│   └── website/          # Main Astro website
├── packages/
│   ├── types/           # Shared TypeScript types
│   └── config/          # Shared configuration
├── docs/                # Project documentation
└── stories/             # User stories and requirements
```

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your values
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

## Development

### Commands

- `npm run dev` - Start development servers
- `npm run build` - Build all packages and apps
- `npm run lint` - Run linting
- `npm run type-check` - Run TypeScript checks
- `npm run clean` - Clean build artifacts

### Coding Standards

- **Type Sharing**: Always define types in `packages/types` and import from there
- **Environment Variables**: Access only through validated config objects, never `process.env` directly
- **Form Handling**: All forms must use Netlify Forms with proper validation
- **State Updates**: Never mutate state directly - use proper React state management patterns

### Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Components | PascalCase | `VolunteerForm.tsx` |
| Hooks | camelCase with 'use' | `useFormState.ts` |
| Form Names | kebab-case | `volunteer-application` |
| Types | PascalCase | `VolunteerApplicationPayload` |

## Deployment

The website is deployed to Netlify with automatic builds triggered by git commits to the main branch.

## Contributing

1. Create a feature branch from `main`
2. Make your changes following the coding standards
3. Test your changes
4. Submit a pull request
