# Testing Strategy

### Testing Pyramid

```text
        E2E Tests
       /          \
   Frontend Tests    Form Tests
   /                  \
 Component Unit     Integration
```

### Test Organization

**Frontend Tests:**

```text
apps/website/tests/
├── unit/              # Component and utility tests
├── integration/       # Feature integration tests
├── forms/             # Form submission tests
└── e2e/              # End-to-end tests
```

**Form Integration Tests:**

```text
tests/forms/
├── volunteer-form.test.js    # Volunteer application form
└── newsletter-form.test.js   # Newsletter subscription form
```

### Test Examples

**Frontend Component Test:**

```typescript
import { render, screen } from '@testing-library/react';
import { VolunteerForm } from '@/components/forms/VolunteerForm';

test('renders volunteer form fields', () => {
  render(<VolunteerForm />);
  
  expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
});
```

**Form Integration Test:**

```typescript
import { test, expect } from '@playwright/test';

test('volunteer form submits successfully', async ({ page }) => {
  await page.goto('/volunteer');
  
  await page.fill('[name="firstName"]', 'John');
  await page.fill('[name="lastName"]', 'Doe');
  await page.fill('[name="email"]', 'john@example.com');
  await page.fill('[name="message"]', 'Test message');
  await page.check('[name="consent"]');
  
  await page.click('button[type="submit"]');
  
  await expect(page.locator('.success-message')).toBeVisible();
});
```
