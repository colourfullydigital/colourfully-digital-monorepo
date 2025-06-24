# External APIs

### Sanity.io API

- **Purpose:** Primary content source for website build-time data fetching
- **Documentation:** https://www.sanity.io/docs/http-api
- **Base URL(s):** https://{projectId}.api.sanity.io/v{apiVersion}/data/query/{dataset}
- **Authentication:** Public API token (environment variable)
- **Rate Limits:** Standard SaaS tier limits

**Key Endpoints Used:**

- `GET /data/query/{dataset}` - Fetch content using GROQ queries

**Integration Notes:** Used exclusively at build time for static site generation

### EmailOctopus API

- **Purpose:** Newsletter subscription management and transactional emails
- **Documentation:** https://emailoctopus.com/api-documentation
- **Base URL(s):** https://emailoctopus.com/api/1.6/
- **Authentication:** API Key (secure environment variable)
- **Rate Limits:** Standard SaaS tier limits

**Key Endpoints Used:**

- `POST /lists/{list_id}/contacts` - Add contacts to mailing lists

**Integration Notes:** Triggered by Make.com workflows for automated processing

### Make.com Webhook API

- **Purpose:** Workflow automation for form processing and integrations
- **Documentation:** Make.com webhook documentation
- **Base URL(s):** Custom webhook URLs (secret)
- **Authentication:** Secret webhook URL
- **Rate Limits:** Based on Make.com plan

**Key Endpoints Used:**

- `POST /{secret-webhook-path}` - Trigger automation workflows

**Integration Notes:** Receives form data from Netlify Forms and processes all backend logic

### Eventbrite API

- **Purpose:** Program registration redirects (no API integration)
- **Documentation:** N/A for current implementation
- **Base URL(s):** Public event pages
- **Authentication:** None required
- **Rate Limits:** N/A

**Key Endpoints Used:**

- Direct hyperlinks to public event pages

**Integration Notes:** Simple redirect approach for MVP

### Google Analytics 4

- **Purpose:** Client-side user behavior tracking
- **Documentation:** Google Analytics documentation
- **Base URL(s):** Google Analytics endpoints
- **Authentication:** Measurement ID
- **Rate Limits:** Standard GA4 limits

**Key Endpoints Used:**

- Client-side gtag.js integration

**Integration Notes:** Pure client-side implementation, no server API calls
