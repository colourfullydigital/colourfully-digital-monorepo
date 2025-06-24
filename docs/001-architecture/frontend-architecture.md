# Frontend Architecture

### Component Architecture

**Component Organization:**

```text
apps/website/src/
├── components/           # Reusable UI components
│   ├── forms/           # Form-specific components
│   ├── layout/          # Layout components
│   └── ui/              # Basic UI elements
├── pages/               # Astro page components
├── layouts/             # Page layout templates
└── styles/              # Global styles
```

**Component Template:**

```typescript
// React Island Component
import { useState } from 'react';
import type { ComponentProps } from '@/types';

interface Props extends ComponentProps {
  // Component-specific props
}

export default function Component({ ...props }: Props) {
  const [state, setState] = useState();
  
  return (
    <div class="component-class">
      {/* Component JSX */}
    </div>
  );
}
```

### State Management Architecture

**State Structure:**

```typescript
// Simple component-level state using React hooks
interface FormState {
  data: Record<string, any>;
  isSubmitting: boolean;
  errors: Record<string, string>;
  status: 'idle' | 'submitting' | 'success' | 'error';
}
```

**State Management Patterns:**

- Component-level state using useState for forms
- No global state management required for current scope
- Props drilling for simple data passing between components

### Routing Architecture

**Route Organization (Strict Multilingual - No Fallbacks):**

```text
apps/website/src/pages/
├── index.astro          # Homepage (English default)
├── fr/                  # French language routes
│   ├── index.astro      # French homepage
│   ├── programmes/      # French programs section
│   │   ├── index.astro  # Programs listing in French
│   │   └── [slug].astro # Individual program pages in French
│   ├── blog/            # French blog section
│   │   ├── index.astro  # Blog listing in French
│   │   └── [slug].astro # Individual blog posts in French
│   ├── benevolat.astro  # Volunteer application in French
│   ├── succes.astro     # Success page in French
│   ├── erreur.astro     # Error page in French
│   └── contenu-manquant.astro # Missing content page in French
├── en/                  # English language routes (explicit)
│   ├── index.astro      # English homepage
│   ├── programs/        # English programs section
│   │   ├── index.astro  # Programs listing in English
│   │   └── [slug].astro # Individual program pages in English
│   ├── blog/            # English blog section
│   │   ├── index.astro  # Blog listing in English
│   │   └── [slug].astro # Individual blog posts in English
│   ├── volunteer.astro  # Volunteer application in English
│   ├── success.astro    # Success page in English
│   ├── error.astro      # Error page in English
│   └── missing-content.astro # Missing content page in English
└── [...].astro          # 404 catch-all with locale detection and missing content handling
```

**Missing Content Detection and Routing:**

```typescript
// Astro middleware for strict locale handling
export function onRequest(context, next) {
  const { pathname } = context.url;
  
  // Detect if user is trying to access content without locale prefix
  if (!pathname.startsWith('/fr') && !pathname.startsWith('/en') && pathname !== '/') {
    const segments = pathname.split('/').filter(Boolean);
    
    // Check if this looks like content that should be localized
    const contentRoutes = ['programs', 'programmes', 'blog', 'volunteer', 'benevolat'];
    if (contentRoutes.some(route => segments[0] === route)) {
      // Instead of redirecting, show missing content page
      const detectedLocale = detectUserPreferredLocale(context.request);
      const missingContentPath = detectedLocale === 'fr' 
        ? '/fr/contenu-manquant' 
        : '/en/missing-content';
      
      // Add query parameters to help content creators
      const searchParams = new URLSearchParams({
        requested_path: pathname,
        suggested_locale: detectedLocale,
        content_type: segments[0]
      });
      
      return Response.redirect(`${missingContentPath}?${searchParams}`, 302);
    }
  }
  
  // Add locale to context for pages
  const locale = pathname.startsWith('/fr') ? 'fr' : 'en';
  context.locals.locale = locale;
  
  return next();
}

// Helper function to detect user's preferred locale
function detectUserPreferredLocale(request: Request): 'en' | 'fr' {
  const acceptLanguage = request.headers.get('accept-language') || '';
  return acceptLanguage.toLowerCase().includes('fr') ? 'fr' : 'en';
}
```

**Missing Content Pages:**

```typescript
// /en/missing-content.astro
---
const requestedPath = Astro.url.searchParams.get('requested_path') || '';
const contentType = Astro.url.searchParams.get('content_type') || 'content';
const suggestedLocale = Astro.url.searchParams.get('suggested_locale') || 'en';

// Map old routes to new localized routes
const routeMappings = {
  'programs': '/en/programs',
  'blog': '/en/blog', 
  'volunteer': '/en/volunteer',
  'programmes': '/fr/programmes',
  'benevolat': '/fr/benevolat'
};

const suggestedRoute = routeMappings[contentType] || 
  (suggestedLocale === 'fr' ? `/fr/${contentType}` : `/en/${contentType}`);
---

<Layout title="Content Not Available - Missing Translation">
  <main class="missing-content-page">
    <div class="container">
      <h1>Content Not Available</h1>
      <p class="lead">
        The content you're looking for at <code>{requestedPath}</code> hasn't been created yet.
      </p>
      
      <div class="missing-content-info">
        <h2>What happened?</h2>
        <p>
          We organize our content by language to provide the best experience for both 
          English and French speakers. The page you requested doesn't exist in our 
          current structure.
        </p>
        
        <h3>What you can do:</h3>
        <ul>
          <li>
            <strong>Try the localized version:</strong> 
            <a href={suggestedRoute} class="btn btn-primary">
              Visit {suggestedRoute}
            </a>
          </li>
          <li>
            <strong>Browse our content:</strong>
            <a href="/en/">English Home</a> | <a href="/fr/">Accueil Français</a>
          </li>
        </ul>
        
        <div class="content-creator-info">
          <h3>For Content Creators:</h3>
          <p>This error indicates missing content that should be created:</p>
          <ul>
            <li><strong>Requested path:</strong> <code>{requestedPath}</code></li>
            <li><strong>Content type:</strong> <code>{contentType}</code></li>
            <li><strong>User's preferred locale:</strong> <code>{suggestedLocale}</code></li>
            <li><strong>Suggested route:</strong> <code>{suggestedRoute}</code></li>
          </ul>
          <p>
            <em>Consider creating content at the suggested route or updating 
            your content strategy to address this gap.</em>
          </p>
        </div>
      </div>
    </div>
  </main>
</Layout>

// /fr/contenu-manquant.astro - French version with similar structure
```

**Protected Route Pattern:**

Not applicable - public website with no authentication required.

### Frontend Services Layer

**API Client Setup:**

```typescript
// Form submission utility for Netlify Forms
export class FormSubmitter {
  
  async submitVolunteerApplication(data: VolunteerApplicationPayload) {
    const formData = new FormData();
    formData.append('form-name', 'volunteer-application');
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, String(value));
    });
    
    const response = await fetch('/', {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) throw new Error('Submission failed');
    // Netlify Forms typically redirects on success
    window.location.href = '/volunteer/success';
  }
  
  async subscribeNewsletter(email: string) {
    const formData = new FormData();
    formData.append('form-name', 'newsletter');
    formData.append('email', email);
    
    const response = await fetch('/', {
      method: 'POST', 
      body: formData,
    });
    
    if (!response.ok) throw new Error('Subscription failed');
    window.location.href = '/newsletter/success';
  }
}
```

**Service Example:**

```typescript
// Form submission service
export const volunteerService = {
  async submit(data: VolunteerApplicationPayload) {
    try {
      return await apiClient.submitVolunteerApplication(data);
    } catch (error) {
      console.error('Volunteer application submission failed:', error);
      throw error;
    }
  }
};
```
