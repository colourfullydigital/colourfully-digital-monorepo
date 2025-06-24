# Form Processing Architecture

### Netlify Forms Integration

**Form Configuration:**

```html
<!-- Volunteer Application Form -->
<form name="volunteer-application" method="POST" data-netlify="true" action="/volunteer/success">
  <input type="hidden" name="form-name" value="volunteer-application" />
  <input type="text" name="firstName" required />
  <input type="text" name="lastName" required />
  <input type="email" name="email" required />
  <textarea name="message" required></textarea>
  <input type="checkbox" name="consent" required />
  <button type="submit">Submit Application</button>
</form>

<!-- Newsletter Subscription Form -->
<form name="newsletter" method="POST" data-netlify="true" action="/newsletter/success">
  <input type="hidden" name="form-name" value="newsletter" />
  <input type="email" name="email" required />
  <button type="submit">Subscribe</button>
</form>
```

**Netlify Configuration (netlify.toml) with Strict Multilingual Support:**

```toml
[build]
  command = "pnpm build"
  publish = "apps/website/dist"

# Multilingual redirects for success pages only
[[redirects]]
  from = "/en/volunteer/success"
  to = "/en/volunteer-success.html"
  status = 200

[[redirects]]
  from = "/fr/benevolat/succes"
  to = "/fr/benevolat-succes.html"
  status = 200

[[redirects]]
  from = "/en/newsletter/success"  
  to = "/en/newsletter-success.html"
  status = 200

[[redirects]]
  from = "/fr/newsletter/succes"  
  to = "/fr/newsletter-succes.html"
  status = 200

# Error page redirects with locale support
[[redirects]]
  from = "/en/error"
  to = "/en/error.html"
  status = 200

[[redirects]]
  from = "/fr/erreur"
  to = "/fr/erreur.html"
  status = 200

# Missing content page redirects
[[redirects]]
  from = "/en/missing-content"
  to = "/en/missing-content.html"
  status = 200

[[redirects]]
  from = "/fr/contenu-manquant"
  to = "/fr/contenu-manquant.html"
  status = 200

# NO AUTOMATIC REDIRECTS - Content gaps surface as missing content errors
# This forces intentional content creation rather than hiding translation gaps

# Form notifications with locale-aware webhooks
[forms]
  [forms.volunteer-application-en]
    webhook_url = "https://hook.make.com/your-volunteer-webhook-en"
  
  [forms.volunteer-application-fr]
    webhook_url = "https://hook.make.com/your-volunteer-webhook-fr"
  
  [forms.newsletter-en]
    webhook_url = "https://hook.make.com/your-newsletter-webhook-en"
    
  [forms.newsletter-fr]
    webhook_url = "https://hook.make.com/your-newsletter-webhook-fr"

# Custom headers for multilingual support
[[headers]]
  for = "/fr/*"
  [headers.values]
    Content-Language = "fr-CA"
    
[[headers]]
  for = "/en/*"
  [headers.values]
    Content-Language = "en-CA"
    
[[headers]]
  for = "/*"
  [headers.values]
    Content-Language = "en-CA"  # Default fallback

# Custom error pages
[[redirects]]
  from = "/*"
  to = "/404.html"
  status = 404
```

### Make.com Workflow Architecture

**Volunteer Application Workflow (Multilingual):**

```text
Netlify Form Webhook → Make.com Scenario
├── 1. Parse Form Data (including locale field)
├── 2. Validate Required Fields with locale-aware messages
├── 3. Route to Locale-Specific Processing
│   ├── EN Branch:
│   │   ├── Add Contact to EmailOctopus (Volunteer List - EN)
│   │   ├── Generate PDF Certificate (English template)
│   │   └── Send Confirmation Email (English template)
│   └── FR Branch:
│       ├── Add Contact to EmailOctopus (Volunteer List - FR)
│       ├── Generate PDF Certificate (French template)
│       └── Send Confirmation Email (French template)
├── 4. Log to Admin Spreadsheet (with locale column)
└── 5. Return Success/Error Status with locale context
```

**Newsletter Subscription Workflow (Multilingual):**

```text
Netlify Form Webhook → Make.com Scenario  
├── 1. Parse Email Data (including locale field)
├── 2. Validate Email Format
├── 3. Route to Locale-Specific Processing
│   ├── EN Branch:
│   │   ├── Add Contact to EmailOctopus (Newsletter List - EN)
│   │   └── Send Welcome Email (English template)
│   └── FR Branch:
│       ├── Add Contact to EmailOctopus (Newsletter List - FR)
│       └── Send Welcome Email (French template)
├── 4. Log Subscription (with locale data)
└── 5. Return Success/Error Status with locale context
```

**Error Handling in Make.com (Multilingual):**

- Data validation filters at each step with locale-aware error messages
- Retry logic for API failures with locale-specific admin notifications
- Error notifications to admin including user locale context
- Fallback paths for critical failures with appropriate language redirect
- Separate error logging for French vs English user flows
- Locale-specific email templates for error notifications

**Make.com Scenario Configuration Examples:**

```javascript
// Locale detection filter
if ({{input.locale}} == "fr") {
    // Process French workflow
    errorRedirect = "/fr/erreur";
} else {
    // Process English workflow (default)
    errorRedirect = "/en/error";
}
```
