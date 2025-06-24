# Development Workflow

### Local Development Setup

**Prerequisites:**

```bash
# Install Node.js 18+ and pnpm
node --version  # >= 18.0.0
pnpm --version  # >= 8.0.0
```

**Initial Setup:**

```bash
# Clone repository and install dependencies
git clone <repository-url>
cd colourfully-digital-monorepo
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys
```

**Development Commands:**

```bash
# Start all services
pnpm dev

# Start frontend only
pnpm --filter website dev

# Build for production
pnpm build

# Run tests
pnpm test
```

### Environment Configuration

**Required Environment Variables:**

```bash
# Frontend (.env.local)
SANITY_PROJECT_ID=your_project_id
SANITY_DATASET=production
PUBLIC_GOOGLE_ANALYTICS_ID=GA4_MEASUREMENT_ID

# Make.com Webhooks (added to Netlify Forms configuration)
MAKE_WEBHOOK_URL_VOLUNTEER=your_volunteer_webhook_url
MAKE_WEBHOOK_URL_NEWSLETTER=your_newsletter_webhook_url

# Shared
NODE_ENV=development
```
