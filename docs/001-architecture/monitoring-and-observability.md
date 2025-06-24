# Monitoring and Observability

### Monitoring Stack

- **Frontend Monitoring:** Netlify Analytics for pageviews and performance
- **Form Monitoring:** Netlify Forms submission analytics and spam detection
- **Workflow Monitoring:** Make.com execution logs and error tracking
- **Error Tracking:** Console-based logging with structured JSON format including locale context
- **Performance Monitoring:** Lighthouse CI for Core Web Vitals tracking
- **Multilingual Analytics:** Separate tracking for French and English user paths and error patterns

### Key Metrics

**Frontend Metrics:**

- Core Web Vitals (LCP, FID, CLS) by language/locale
- Page load times per language variant
- Form submission success rates by locale
- User interaction tracking with language context
- Error rates segmented by French vs English users

**Form and Workflow Metrics:**

- Form submission success rates by locale (French vs English)
- Validation error frequency by language and field type
- Make.com workflow execution times for locale-specific processes
- External API response times for multilingual content
- Build success/failure rates
- Locale-specific error patterns and user flow analysis
- **Content gap tracking:** Missing content requests by path, locale, and frequency
- **Content prioritization:** High-priority missing translations based on user demand
- **Content team notifications:** Actionable alerts for missing content creation

**Multilingual Error Monitoring:**

```typescript
// Enhanced error logging with locale context and content gap tracking
export function logError(error: Error | string, context: {
  locale?: 'en' | 'fr';
  page?: string;
  userAgent?: string;
  errorCode?: string;
  formField?: string;
  missingContentPath?: string;
  contentType?: string;
}) {
  const errorLog = {
    timestamp: new Date().toISOString(),
    error: typeof error === 'string' ? error : error.message,
    stack: typeof error === 'object' ? error.stack : undefined,
    locale: context.locale || detectUserLocale(),
    page: context.page || window.location.pathname,
    userAgent: context.userAgent || navigator.userAgent,
    errorCode: context.errorCode,
    formField: context.formField,
    referrer: document.referrer,
    sessionId: getSessionId(),
    // Content gap tracking
    missingContentPath: context.missingContentPath,
    contentType: context.contentType
  };
  
  // Log to console for development
  console.error('Application Error:', errorLog);
  
  // Send to analytics if in production
  if (typeof gtag !== 'undefined') {
    gtag('event', 'exception', {
      description: errorLog.error,
      fatal: false,
      custom_map: {
        locale: errorLog.locale,
        error_code: errorLog.errorCode,
        page_path: errorLog.page,
        missing_content_path: errorLog.missingContentPath,
        content_type: errorLog.contentType
      }
    });
  }
  
  // Special handling for missing content - notify content team
  if (context.errorCode === 'CONTENT_NOT_AVAILABLE' && context.missingContentPath) {
    notifyContentTeam({
      missingPath: context.missingContentPath,
      requestedLocale: context.locale,
      contentType: context.contentType,
      userAgent: context.userAgent,
      timestamp: errorLog.timestamp
    });
  }
}

// Function to notify content team of missing content requests
async function notifyContentTeam(contentGap: {
  missingPath: string;
  requestedLocale?: string;
  contentType?: string;
  userAgent?: string;
  timestamp: string;
}) {
  // This could integrate with your content management workflow
  // e.g., create Sanity.io drafts, Slack notifications, GitHub issues, etc.
  
  try {
    // Example: Create a content request in your CMS or tracking system
    await fetch('/api/content-gap-report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'missing_content',
        path: contentGap.missingPath,
        locale: contentGap.requestedLocale,
        content_type: contentGap.contentType,
        frequency: await getContentGapFrequency(contentGap.missingPath),
        priority: calculateContentPriority(contentGap),
        timestamp: contentGap.timestamp
      })
    });
  } catch (error) {
    console.error('Failed to notify content team:', error);
  }
}

// Calculate priority for missing content based on request frequency and user context
function calculateContentPriority(contentGap: {
  missingPath: string;
  requestedLocale?: string;
  contentType?: string;
}): 'low' | 'medium' | 'high' {
  // High priority: core pages (programs, volunteer), frequent requests
  if (['programs', 'programmes', 'volunteer', 'benevolat'].includes(contentGap.contentType || '')) {
    return 'high';
  }
  
  // Medium priority: blog content, secondary pages
  if (['blog'].includes(contentGap.contentType || '')) {
    return 'medium';
  }
  
  return 'low';
}
```
