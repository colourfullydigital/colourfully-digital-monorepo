# Copilot Instructions

## Tech Stack

### Frameworks

#### Astro
- **Version:** 5.10.1 ([docs](https://docs.astro.build/))
- Always reference Astro v5.10+ documentation for component structure and APIs
- Ensure `.astro` components follow v5.10+ syntax and patterns
- Use Astro's built-in features for layouts and routing
- Consider Astro's partial hydration patterns with client directives

### Bundler

#### Vite
- **Version:** 6.0 ([docs](https://vitejs.dev/guide/))
- Reference Vite v6 documentation for configuration changes
- Use Vite-specific optimizations and features
- Follow Vite's module resolution patterns
- Consider Vite's development server features

##### Integrations
- **Tailwind:** `@tailwind/vite` (Using `@tailwind/vite` integration instead of `@astro/tailwind`)

### Styling

#### Tailwind
- **Version:** 4.1.7 ([docs](https://tailwindcss.com/docs))
- Use Tailwind v4.1.7 class names and features
- Reference latest Tailwind documentation for new utility classes
- Follow Tailwind's responsive design patterns
- Utilize Tailwind's custom configuration options
- Always use `@tailwind/vite` for Vite integration, not `@astro/tailwind`

### Monorepo

#### Turborepo
- **Version:** latest ([docs](https://turbo.build/repo))
- Follow Turborepo pipeline conventions
- Maintain workspace dependencies correctly
- Use proper cache configuration
- Follow monorepo best practices for task organization

#### pnpm
- **Version:** 10.11.0 ([docs](https://pnpm.io/))
- Use `workspace:` protocol for internal dependencies
- Maintain `pnpm-workspace.yaml` configuration
- Follow strict package versioning

### Testing

#### Vitest
- **Version:** latest ([docs](https://vitest.dev/))
- Use Vitest for unit and integration testing
- Maintain test coverage thresholds
- Follow testing best practices

#### Testing Library
- **Versions:** React 14.0.0, Jest DOM 6.6.3 ([docs](https://testing-library.com/))
- Follow Testing Library best practices
- Use proper queries and assertions
- Write accessible tests

#### Playwright
- **Version:** latest ([docs](https://playwright.dev/))
- Use Playwright for E2E testing
- Follow page object pattern
- Implement proper test isolation

### CMS

#### Sanity.io
- **Versions:** Sanity v3.x ([docs](https://sanity.io/docs))
- Follow Sanity.io component structure
- Implement proper content modeling
- Use proper caching strategies

### Deployment

#### Netlify
- **Integration:** `@astrojs/netlify@4.3.0` ([docs](https://docs.netlify.com/))
- Configure proper build settings
- Use environment variables appropriately
- Follow deployment best practices

### Language

#### TypeScript
- **Version:** 5.8.3 ([docs](https://www.typescriptlang.org/docs/))
- Maintain strict TypeScript configurations
- Use proper type definitions
- Follow TypeScript best practices

### UI

#### React
- **Version:** 19.0.0 ([docs](https://react.dev/))
- Follow React best practices
- Use hooks appropriately
- Implement proper component architecture

## Build Tools

### tsup
- **Version:** latest ([docs](https://tsup.egoist.dev/))
- Configure proper build settings
- Optimize bundle outputs
- Handle dependencies correctly

### ESLint
- **Version:** 9.27.0 ([docs](https://eslint.org/docs/latest/))
- Follow project ESLint configuration
- Maintain consistent code style
- Address all linting warnings

## General Rules

- Always verify compatibility between tools in the stack
- Check for version-specific breaking changes when making updates
- Maintain consistent coding patterns across the project
- Verify documentation before making any deviations from standard configurations
- Consider performance implications of stack-specific features
- Use type-safe approaches where possible
- Follow each tool's best practices for production builds
- Ensure Tailwind integration is always through `@tailwind/vite` package

## Enforcement

- **Documentation check:** required
- **Version validation:** strict
- **Compatibility verification:** required
- **Update policy:** manual review

### Deviation Process

#### Required Tools

- **Analysis:** `sequentialthinking`
  - Break down the deviation into clear steps
  - Analyze potential impacts on the entire stack
  - Generate and verify solution hypothesis
  - Document all reasoning and conclusions

- **Research:** `brave_search`
  - Search for relevant documentation
  - Look for community experiences with similar changes
  - Verify compatibility with current stack versions
  - Research potential alternatives

#### Process Steps

1. Use `sequentialthinking` to break down the proposed deviation
2. Use `brave_search` to research documentation and community feedback
3. Analyze compatibility with current stack
4. Document findings and reasoning
5. Propose specific implementation steps
6. Wait for approval before implementing
