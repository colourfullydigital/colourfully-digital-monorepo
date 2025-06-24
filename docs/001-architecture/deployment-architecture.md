# Deployment Architecture

### Deployment Strategy

**Frontend Deployment:**

- **Platform:** Netlify
- **Build Command:** `pnpm build`
- **Output Directory:** `apps/website/dist`
- **CDN/Edge:** Netlify global CDN with automatic optimization

**Form Processing:**

- **Platform:** Netlify Forms (free tier)
- **Configuration:** netlify.toml file
- **Automation:** Make.com webhooks triggered by form submissions

### CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml
name: Deploy to Netlify
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm test
      - run: pnpm build
      - name: Deploy to Netlify
        uses: netlify/actions/cli@master
        with:
          args: deploy --prod --dir=apps/website/dist
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

### Environments

| Environment | Frontend URL       | Form Processing    | Purpose                |
| :---------- | :----------------- | :----------------- | :--------------------- |
| Development | http://localhost:4321 | Local form testing | Local development      |
| Staging     | https://deploy-preview-*--site.netlify.app | Netlify Forms + Make.com | Pre-production testing |
| Production  | https://www.colourfully.digital | Netlify Forms + Make.com | Live environment       |
