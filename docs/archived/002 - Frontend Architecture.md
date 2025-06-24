# 002 - Frontend Architecture

## Colourfully Digital Foundation Frontend Architecture Document

### Table of Contents

1. [Introduction](#introduction)
2. [Overall Frontend Philosophy & Patterns](#overall-frontend-philosophy--patterns)
3. [Detailed Frontend Directory Structure](#detailed-frontend-directory-structure)
4. [Notes on Frontend Structure](#notes-on-frontend-structure)
5. [Component Breakdown & Implementation Details](#component-breakdown--implementation-details)
    - [Component Naming & Organization](#component-naming--organization)
    - [Template for Component Specification](#template-for-component-specification)
    - [Component: Stack](#component-stack)
6. [State Management In-Depth](#state-management-in-depth)
    - [Decision Guide for State Location](#decision-guide-for-state-location)
    - [Global Store (Zustand) Structure](#global-store-zustand-structure)
    - [Server State (TanStack Query) Management](#server-state-tanstack-query-management)
7. [API Interaction Layer](#api-interaction-layer)
    - [Client/Service Structure](#clientservice-structure)
    - [Error Handling & Retries (Frontend)](#error-handling--retries-frontend)
8. [Routing Strategy](#routing-strategy)
    - [Route Definitions](#route-definitions)
    - [Route Guards / Protection](#route-guards--protection)
9. [Build, Bundling, and Deployment](#build-bundling-and-deployment)
    - [Build Process & Scripts](#build-process--scripts)
    - [Key Bundling Optimizations](#key-bundling-optimizations)
    - [Deployment to CDN/Hosting](#deployment-to-cdnhosting)
10. [Frontend Testing Strategy](#frontend-testing-strategy)
11. [Accessibility (AX) Implementation Details](#accessibility-ax-implementation-details)
12. [Performance Considerations](#performance-considerations)
13. [Change Log](#change-log)
14. [Concluding Summary](#concluding-summary)

## Introduction

This document details the technical architecture specifically for the frontend of the Colourfully Digital Foundation Website. It complements the main Architecture Document and the feature requirements outlined in the Launch Features - MVP 2.md document. The goal is to provide a clear blueprint for frontend development, ensuring consistency, maintainability, and alignment with the overall system design and user experience goals.

**Link to Main Architecture Document (REQUIRED):** [001 - architecture.md](./001%20-%20Architecture.md)

**Link to UI/UX Specification (REQUIRED if exists):** Launch Features - MVP.md

**Link to Primary Design Files (Figma, Sketch, etc.):** {To be provided when available}

## Overall Frontend Philosophy & Patterns
This section outlines the core architectural decisions and patterns chosen for the frontend. These choices are based on the approved overall tech stack.

**Framework & Core Libraries:** We will use Astro v5.9 as the primary framework to create a highly performant, content-driven static site. For all interactive UI, we will use React v19.0.0 "islands".

**Component Architecture:** We will adopt Atomic Design principles. This means we will structure our components in a hierarchy:

- **Atoms:** The smallest building blocks (e.g., Button, Input, Label). These will be highly reusable.
- **Molecules:** Simple groups of atoms that function together (e.g., a search form combining an input and a button).
- **Organisms:** More complex components composed of molecules and atoms that form distinct sections of an interface (e.g., the site Header, a Program Card).

**State Management Strategy:** We will use a hybrid approach to manage state effectively:

- **Zustand (or similar lightweight global store):** For minimal, shared global state that is accessed by many unrelated components, such as user accessibility preferences (e.g., high-contrast mode).
- **React Context API:** For localized state that needs to be shared down a specific component tree, but is not needed globally (e.g., managing the state of a multi-step form).
- **Local Component State (useState):** This will be our default choice for state that is internal to a single component (e.g., whether a dropdown is open).

**Data Flow (Server State):** To handle data fetched from the Sanity.io API within our interactive React components, we will use TanStack Query (formerly React Query). This provides a robust solution for caching, background refetching, and managing loading/error states, ensuring a smooth user experience.

**Styling Approach:** Our styling will be guided by an Intrinsic Web Design philosophy, drawing principles from utopia.fyi and every-layout.dev. We will prioritize fluid, responsive design over fixed breakpoints.

- **Implementation:** We will use Tailwind CSS v4.1.7 but will configure its theme in `tailwind.config.cjs` to use fluid typography and spacing scales. This will involve using CSS functions like `clamp()` to create values that adapt smoothly to the viewport.
- **Aesthetic:** The visual direction will be a playful "elevated brutalism" or "neo-brutalism", inspired by sites like lectors.webflow.io and the Google I/O 2024 page. This will be achieved through bold typography, a strong colour palette, defined component blocks, and a focus on raw, functional elements rather than overly decorative styles.

**Key Design Patterns Used:**

- **Provider Pattern:** To provide global state, query clients, and theme information to the component tree.
- **Hooks:** To encapsulate and reuse stateful logic (e.g., `useAccessibilityPreferences`).
- **Container/Presentational Pattern:** To separate data-fetching and business logic (container components) from the UI rendering (presentational components).

## Detailed Frontend Directory Structure
This structure exists within the `apps/website/` directory of our monorepo and must be strictly followed.

```
apps/website/
└── src/
    ├── assets/
    │   ├── fonts/
    │   └── images/
    ├── components/
    │   ├── organisms/
    │   │   ├── Header.astro
    │   │   ├── Footer.astro
    │   │   ├── ProgramGrid.tsx
    │   │   └── PartnerShowcase.tsx
    │   └── templates/
    │       └── BlogPostTemplate.astro
    ├── layouts/
    │   └── BaseLayout.astro
    ├── lib/
    │   └── client-utils.ts
    ├── pages/
    │   ├── [lang]/
    │   │   ├── index.astro
    │   │   ├── about.astro
    │   │   ├── blog/
    │   │   │   ├── index.astro
    │   │   │   └── [slug].astro
    │   │   └── ...
    │   ├── 404.astro
    │   └── 500.astro
    └── styles/
        └── global.css
```

## Notes on Frontend Structure
**Separation of Concerns:** This structure separates concerns clearly. Astro's file-based routing lives in `src/pages/`, global page shells are in `src/layouts/`, and reusable components are in `src/components/`.

**Component Strategy Clarification:** To fully embrace our monorepo and Atomic Design approach, we will make a clear distinction:

- **`packages/ui`:** This shared package in the root of our monorepo will contain our generic, reusable Atoms (e.g., `Button.tsx`, `Input.tsx`) and Molecules (e.g., `SearchForm.tsx`). These are application-agnostic.
- **`apps/website/src/components/organisms`:** This directory inside our website app will contain the larger, application-specific Organisms. These components will import and compose the smaller Atoms and Molecules from `packages/ui` to build complex sections of the UI, like the Header or the interactive ProgramGrid.

**Astro vs. React Components:**

- Files ending in `.astro` are server-rendered Astro components, perfect for layouts and static content sections.
- Files ending in `.tsx` are client-side React components ("islands") used for anything requiring user interaction. They will be placed within the component structure and imported into `.astro` files with a `client:` directive.

**Styling:** The `src/styles/global.css` file is the entry point for our Tailwind CSS styles. This is where we will define our base styles and any custom component classes that support our "elevated brutalism" aesthetic.

## Component Breakdown & Implementation Details

### Component Naming & Organization
**Naming Convention:** All React component files and their named exports must use PascalCase (e.g., `ProgramCard.tsx`).

**Organization:** The location of a component is determined by its reusability and role in our Atomic Design system:

- **`packages/ui/src/primitives/`:** This is for our foundational, unstyled layout primitives like `<Stack>` and `<Box>`.
- **`packages/ui/src/atoms/` & `packages/ui/src/molecules/`:** This is for our shared, styled, and reusable UI components that could be used in any application (e.g., `<Button>`, `<ProgramCard>`).
- **`apps/website/src/components/organisms/`:** This is for complex, application-specific components that compose primitives and molecules into larger sections of the UI (e.g., `<Header>`, `<ProgramGrid>`).

### Template for Component Specification

The following template is the single source of truth for how all new components must be specified within user stories or technical tasks. It must be filled out completely to ensure clarity of implementation.

### Component: Stack

**Purpose:** A layout primitive component that arranges its children in a vertical stack with a consistent, themed gap between them. It ensures uniform vertical rhythm.

**Source File(s):** `packages/ui/src/primitives/Stack.tsx`

**Visual Reference:** The conceptual basis for this component is the "Stack" layout from [every-layout.dev](https://every-layout.dev).

**Props (Properties):**

| Prop Name | Type | Required? | Default Value | Description |
|-----------|------|-----------|---------------|-------------|
| `children` | `React.ReactNode` | Yes | N/A | The child elements to be rendered within the stack. |
| `gap` | `keyof theme.spacing` | No | `'s1'` | The key for the space between elements, mapped from our fluid spacing scale in the Tailwind theme. |
| `as` | `React.ElementType` | No | `'div'` | The HTML element to render the stack as (e.g., div, ol, ul). Useful for semantic HTML. |

**Internal State (if any):**

None. This is a stateless, presentational component.

**Key UI Elements / Structure:**

```typescript
// Pseudo-code representation
<Component className={computedClasses}>
  {children}
</Component>
```

**Events Handled / Emitted:**

None.

**Actions Triggered (Side Effects):**

None.

**Styling Notes:**

- The component uses Flexbox to create the stack (`flex flex-col`).
- The `gap` prop is mapped to Tailwind's `space-y-*` utility classes (e.g., a gap of `'s1'` might map to `space-y-4`). These utilities are configured with CSS `clamp()` functions in our `tailwind.config.cjs` to achieve fluid spacing.

**Accessibility Notes:**

This component is a layout utility and carries no inherent role. When the `as` prop is used to render a list (e.g., `as="ul"`), the consuming code is responsible for ensuring the children are semantically correct list items (`<li>`).

## State Management In-Depth
This section details the specific tools and patterns for managing state. A clear and consistent strategy is essential for building a predictable and maintainable application.

**Chosen Solutions:** We will use a combination of tools, each for a specific purpose:

- **TanStack Query (React Query):** For managing all server state (data fetched from APIs like Sanity.io).
- **Zustand:** For managing a minimal amount of global client state (data created in the browser that needs to be shared across the entire app).
- **React Context:** For sharing state within a specific, localized subtree of components (e.g., a single complex form).
- **React useState Hook:** As the default for all local component state that is not needed elsewhere.

### Decision Guide for State Location

To ensure consistency, developers must use the following guide to determine where state should live:

1. **Is the data coming from an external API (like Sanity.io)?**
   - **Yes:** Use TanStack Query. Do not store this data in a global client state store. TanStack Query will be our server-side cache and source of truth.

2. **Is the data created on the client, and does it need to be accessed by multiple, disconnected components across the site?** (e.g., user accessibility preferences).
   - **Yes:** Use our global Zustand store.

3. **Does the state need to be shared by a component and its children/grandchildren, but not globally?** (e.g., managing the current step in a wizard-like form).
   - **Yes:** Use React Context.

4. **If none of the above apply, is the state specific to a single component's UI?** (e.g., whether a dropdown is open, the value of a text input).
   - **Yes:** Use the useState Hook. This should be the default choice.

### Global Store (Zustand) Structure

Our global store will be minimal. We will define it in `src/store/index.ts` and create logical "slices" for different domains of state.

**Example: accessibilitySlice**

**Purpose:** To manage user-selected accessibility preferences that persist across sessions and apply globally.

**State Shape & Actions (within a single store):**

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AccessibilityState {
  isHighContrast: boolean;
  toggleHighContrast: () => void;
}

export const useAppStore = create<AccessibilityState>()(
  persist(
    (set) => ({
      isHighContrast: false,
      toggleHighContrast: () => set((state) => ({ isHighContrast: !state.isHighContrast })),
    }),
    {
      name: 'app-preferences', // local storage key
    }
  )
);
```

### Server State (TanStack Query) Management

**Setup:** A global `QueryClientProvider` will be configured in our `BaseLayout.astro` to make TanStack Query available to all React components.

**Usage Pattern:** All data-fetching functions (e.g., fetching programs from our `sanity-client` package) will be wrapped in a `useQuery` hook within the component that needs the data.

## API Interaction Layer
This layer is responsible for all HTTP communication. It is distinct from our state management layer; this layer fetches the data, and the state management layer (TanStack Query) manages it.

### Client/Service Structure

**HTTP Client Setup:** We will use a modern, lightweight fetch wrapper like `ky` to standardize our API calls. A single, pre-configured client instance will be created in `apps/website/src/lib/api-client.ts`.

**Service Definitions:** We will group related API functions into "service" objects.

- **`sanity-client`:** This will be our primary service for all content fetching, as defined in the `packages/sanity-client/` directory.
- **`form-service.ts`:** A new service file will be created at `apps/website/src/lib/form-service.ts` to handle all form submissions to our Netlify Functions.

### Error Handling & Retries (Frontend)

**Global Error Handling:** Our central `apiClient` instance will be configured to handle non-successful HTTP responses. It will parse the error response from the API and throw a standardized `APIError` object.

**Component-Level Error Handling:** Our React components will use the `isError` and `error` properties returned by TanStack Query's `useQuery` and `useMutation` hooks to conditionally render contextual error messages.

**Retry Logic:** We will leverage the built-in capabilities of TanStack Query:

- **Queries (`useQuery`):** By default, TanStack Query will automatically retry failed queries.
- **Mutations (`useMutation`):** Retries will be disabled by default for mutations (e.g., submitting a form) to prevent accidental duplicate submissions.

## Routing Strategy
**Routing Library:** We will use Astro's native file-based router. The structure of our files and folders within `src/pages/` will directly correspond to the final URL paths on the website.

### Route Definitions

The following table details all the planned routes for the MVP.

| Path Pattern | Corresponding File (src/pages/...) | Protection | Notes |
|--------------|-------------------------------------|------------|-------|
| `/[lang]/` | `[lang]/index.astro` | Public | The homepage of the website. |
| `/[lang]/programs` | `[lang]/programs/index.astro` | Public | The main listing page for all programs. |
| `/[lang]/programs/[slug]` | `[lang]/programs/[slug].astro` | Public | The detail page for a single program. |
| `/[lang]/volunteer` | `[lang]/volunteer.astro` | Public | The page detailing volunteer opportunities and hosting the application form. |
| `/[lang]/blog` | `[lang]/blog/index.astro` | Public | The main listing page for all blog posts and impact stories. |
| `/[lang]/blog/[slug]` | `[lang]/blog/[slug].astro` | Public | The detail page for a single blog post. |
| `/[lang]/partners` | `[lang]/partners.astro` | Public | The showcase page for all partners and sponsors. |
| `404 Not Found` | `404.astro` | Public | Astro will automatically serve this page for any route that does not match. |

### Route Guards / Protection

For the scope of the MVP, the entire website is publicly accessible. Therefore, route guards for authentication or authorization are not required at this stage.

## Build, Bundling, and Deployment

### Build Process & Scripts

The build process is orchestrated by Astro and its underlying bundler, Vite v6.06. We will define standard scripts (`dev`, `build`, `preview`, `lint`) in our `package.json`.

### Key Bundling Optimizations

- **Code Splitting:** Handled automatically by Astro on a per-page basis.
- **Tree Shaking:** Handled automatically by Vite during the production build.
- **Lazy Loading:** We will use Astro's `client:*` directives for React islands and the Astro `<Image />` component for images.

### Deployment to CDN/Hosting

**Target Platform:** The application will be deployed to Netlify using the `@astrojs/netlify@4.3.0` adapter.

**Asset Caching Strategy:** Immutable assets (JS/CSS with hashes) will be cached long-term. HTML pages will be set to revalidate to ensure freshness.

## Frontend Testing Strategy
**Tools:** Our strategy will use Vitest for unit/integration testing, React Testing Library for component interaction, and Playwright for E2E testing.

- **Component Testing:** To test individual React components in isolation, focusing on props, interactions, and accessibility.
- **Feature/Flow Testing (UI Integration):** To test collections of components working together, mocking the API layer.
- **End-to-End UI Testing:** To validate critical user journeys in a real browser, as defined in the Main Architecture Document.

## Accessibility (AX) Implementation Details

Our commitment is to build a highly accessible website, adhering to WCAG 2.1 AA standards and providing special accommodations for users on the autism spectrum.

- **Semantic HTML:** We will use correct HTML5 elements as the foundation.
- **ARIA Implementation:** We will use ARIA roles and attributes for custom interactive components.
- **Keyboard Navigation:** All interactive elements must be fully operable using only a keyboard.
- **Focus Management:** We will manage focus for modals and on page navigation.
- **Enhanced Accessibility Features:** We will implement toggles for High Contrast Mode, Reduced Motion, and a distraction-reducing Focus Mode, with preferences persisted to localStorage.
- **Testing Tools for AX:** We will use a combination of manual testing and automated checks with Axe DevTools integrated into our CI/CD pipeline.

## Performance Considerations

We will implement strategies to meet the project's goals for Core Web Vitals and Lighthouse performance scores.

- **Image Optimization:** We will use Astro's `<Image />` component for automatic optimization and lazy loading.
- **Code Splitting & Lazy Loading:** We will leverage Astro's `client:*` directives to strategically hydrate interactive islands.
- **Minimizing Re-renders:** We will use `React.memo` for complex components.
- **Performance Monitoring Tools:** We will use Lighthouse for audits and integrate Lighthouse CI into our deployment pipeline to prevent performance regressions. We will also monitor Web Vitals from real users.

## Change Log

| Change        | Date       | Version | Description                                        | Author                 |
|---------------|------------|---------|----------------------------------------------------|------------------------|
| Initial Draft | 2025-06-16 | 1.0.0   | First complete draft of the Frontend Architecture. | Jane, Design Architect |

## Concluding Summary
This Frontend Architecture Document provides a complete and detailed technical blueprint for building the user interface of the Colourfully Digital Foundation website. By defining our component strategy, state management patterns, and approaches to performance and accessibility, we have a clear and robust plan to guide our development efforts. This document, in conjunction with the Main Architecture Document, finalizes the high-level technical design for the MVP.