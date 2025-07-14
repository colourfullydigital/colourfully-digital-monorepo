# Colourfully Digital Foundation Monorepo

A modern pnpm-based monorepo for the Colourfully Digital Foundation website built with AstroJS, TypeScript, and Tailwind CSS.

## Project Overview

This repository contains the complete codebase for the Colourfully Digital Foundation website, designed as a monorepo to facilitate code sharing and streamlined development across multiple applications and shared packages.

## Architecture

- **Frontend**: AstroJS v5.11.0 with static site generation
- **Package Manager**: pnpm v10.12.4+ for efficient dependency management
- **Content Management**: Sanity.io v3.99.0 headless CMS
- **Styling**: Tailwind CSS v4.1 utility-first framework
- **Forms**: Netlify Forms with Make.com automation
- **Type Safety**: TypeScript with strict mode enabled
- **Testing**: Vitest (unit) and Playwright (E2E)
- **CI/CD**: GitHub Actions
- **Deployment**: Netlify

## Project Structure

```
├── apps/
│   ├── web/                # Main AstroJS frontend application
│   │   ├── public/         # Static assets (images, fonts, favicons)
│   │   ├── src/
│   │   │   ├── components/ # Reusable Astro components
│   │   │   ├── layouts/    # Main site layouts
│   │   │   ├── pages/      # Astro's file-based routing
│   │   │   └── styles/     # Global CSS, Tailwind base styles
│   │   └── astro.config.mjs
│   └── sanity-studio/      # Sanity.io CMS configuration and schemas
│       ├── schemas/
│       └── sanity.config.ts
├── packages/
│   ├── config/             # Shared configurations
│   │   ├── eslint-preset.js
│   │   └── tsconfig.base.json
│   └── types/              # Shared TypeScript types
├── docs/                   # Project documentation
├── .github/
│   └── workflows/          # GitHub Actions CI/CD
├── .vscode/                # VS Code editor settings
├── pnpm-workspace.yaml     # Monorepo workspace configuration
└── package.json            # Root package.json
```

## Getting Started

### Prerequisites

- Node.js v24.4.0+
- pnpm v10.12.4+

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd colourfully-digital-monorepo
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your values
   ```

### Development

**Start development servers:**

```bash
pnpm dev
```

**Build all packages and apps:**

```bash
pnpm build
```

**Run tests:**

```bash
pnpm test
```

**Run linting:**

```bash
pnpm lint
```

## Coding Standards

This project follows strict coding standards to ensure consistency and quality:

- **TypeScript**: Strict mode enabled, no `any` types
- **Shared Types**: All shared types must be defined in `packages/types`
- **File Naming**: kebab-case for folders, PascalCase for components
- **Styling**: Tailwind CSS utility-first approach
- **Testing**: TDD approach with Vitest and Playwright
- **Git**: Conventional Commits and Gitflow branching model

For detailed coding standards, see [Coding Standards](docs/architecture/coding-standards.md).

## Project Documentation

- [Architecture Overview](docs/architecture.md)
- [Tech Stack](docs/architecture/tech-stack.md)
- [Data Models](docs/architecture/data-models.md)
- [Testing Strategy](docs/architecture/testing-strategy.md)
- [CI/CD Pipeline](docs/architecture/ci-cd-pipeline.md)

## Contributing

1. Create a feature branch from `develop`
2. Make your changes following the coding standards
3. Write tests for your changes
4. Ensure all tests pass
5. Submit a pull request

For detailed contribution guidelines, see [Coding Standards](docs/architecture/coding-standards.md).

## Deployment

The website is automatically deployed to Netlify via GitHub Actions on every push to the main branch.

## License

This project is proprietary to the Colourfully Digital Foundation.
