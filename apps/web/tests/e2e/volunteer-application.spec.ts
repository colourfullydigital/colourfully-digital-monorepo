import { test, expect } from '@playwright/test';

/**
 * E2E tests for volunteer application form functionality
 * Tests the complete user journey from clicking Apply Now to form submission
 */

test.describe('Volunteer Application Form E2E Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    // Start from the volunteer opportunities page
    await page.goto('/en/volunteer');
    await page.waitForLoadState('networkidle');
  });

  test('should navigate from volunteer opportunities to application form', async ({ page }) => {
    // Check that Apply Now buttons exist
    const applyButtons = page.locator('a[href="/en/volunteer/apply"]');
    await expect(applyButtons.first()).toBeVisible();
    
    // Click the first Apply Now button
    await applyButtons.first().click();
    
    // Should navigate to application page
    await expect(page).toHaveURL('/en/volunteer/apply');
    
    // Should see the application form
    await expect(page.locator('h1')).toContainText('Volunteer Application');
    await expect(page.locator('form[name="volunteer-application"]')).toBeVisible();
  });

  test('should display form with all required fields', async ({ page }) => {
    await page.goto('/en/volunteer/apply');
    
    // Personal Information Section
    await expect(page.locator('input[name="fullName"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="phone"]')).toBeVisible();
    await expect(page.locator('textarea[name="address"]')).toBeVisible();
    
    // Volunteer Information Section
    await expect(page.locator('select[name="roleSelection"]')).toBeVisible();
    await expect(page.locator('textarea[name="experience"]')).toBeVisible();
    await expect(page.locator('textarea[name="skills"]')).toBeVisible();
    
    // Availability checkboxes
    await expect(page.locator('input[name="availability"][value="weekdays"]')).toBeVisible();
    await expect(page.locator('input[name="availability"][value="evenings"]')).toBeVisible();
    await expect(page.locator('input[name="availability"][value="weekends"]')).toBeVisible();
    await expect(page.locator('input[name="availability"][value="flexible"]')).toBeVisible();
    
    // Legal requirements
    await expect(page.locator('input[name="backgroundCheckConsent"]')).toBeVisible();
    await expect(page.locator('input[name="termsAgreement"]')).toBeVisible();
    
    // Additional comments and submit button
    await expect(page.locator('textarea[name="additionalComments"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should validate required fields and show error messages', async ({ page }) => {
    await page.goto('/en/volunteer/apply');
    
    // Try to submit empty form
    await page.locator('button[type="submit"]').click();
    
    // Should show validation errors for required fields
    const errorMessages = page.locator('.error-message:not(.hidden)');
    await expect(errorMessages.first()).toBeVisible();
    
    // Form should not be submitted (still on same page)
    await expect(page).toHaveURL('/en/volunteer/apply');
  });

  test('should validate email format in real-time', async ({ page }) => {
    await page.goto('/en/volunteer/apply');
    
    const emailField = page.locator('input[name="email"]');
    
    // Enter invalid email and blur
    await emailField.fill('invalid-email');
    await emailField.blur();
    
    // Should show email validation error
    const emailError = emailField.locator('..').locator('.error-message');
    await expect(emailError).toBeVisible();
    await expect(emailError).toContainText('valid email address');
    
    // Enter valid email
    await emailField.fill('test@example.com');
    await emailField.blur();
    
    // Error should be hidden
    await expect(emailError).toBeHidden();
  });

  test('should validate phone format in real-time', async ({ page }) => {
    await page.goto('/en/volunteer/apply');
    
    const phoneField = page.locator('input[name="phone"]');
    
    // Enter invalid phone and blur
    await phoneField.fill('123');
    await phoneField.blur();
    
    // Should show phone validation error
    const phoneError = phoneField.locator('..').locator('.error-message');
    await expect(phoneError).toBeVisible();
    await expect(phoneError).toContainText('valid phone number');
    
    // Enter valid phone
    await phoneField.fill('(555) 123-4567');
    await phoneField.blur();
    
    // Error should be hidden
    await expect(phoneError).toBeHidden();
  });

  test('should require at least one availability option', async ({ page }) => {
    await page.goto('/en/volunteer/apply');
    
    // Fill all required fields except availability
    await page.locator('input[name="fullName"]').fill('John Doe');
    await page.locator('input[name="email"]').fill('john@example.com');
    await page.locator('input[name="phone"]').fill('(555) 123-4567');
    await page.locator('textarea[name="address"]').fill('123 Main St');
    await page.locator('select[name="roleSelection"]').selectOption({ index: 1 });
    await page.locator('input[name="backgroundCheckConsent"]').check();
    await page.locator('input[name="termsAgreement"]').check();
    
    // Try to submit without selecting availability
    await page.locator('button[type="submit"]').click();
    
    // Should show availability validation error
    const availabilityError = page.locator('fieldset .error-message');
    await expect(availabilityError).toBeVisible();
  });

  test('should successfully submit valid form', async ({ page }) => {
    await page.goto('/en/volunteer/apply');
    
    // Fill out complete valid form
    await page.locator('input[name="fullName"]').fill('Jane Smith');
    await page.locator('input[name="email"]').fill('jane.smith@email.com');
    await page.locator('input[name="phone"]').fill('+1 (555) 987-6543');
    await page.locator('textarea[name="address"]').fill('456 Oak Avenue, Toronto, ON M1A 2B3');
    
    // Select a volunteer role (assuming at least one exists)
    await page.locator('select[name="roleSelection"]').selectOption({ index: 1 });
    
    // Fill optional fields
    await page.locator('textarea[name="experience"]').fill('Previous volunteer work with local charities');
    await page.locator('textarea[name="skills"]').fill('Communication, event planning, social media');
    
    // Select availability options
    await page.locator('input[name="availability"][value="weekdays"]').check();
    await page.locator('input[name="availability"][value="weekends"]').check();
    
    // Accept legal requirements
    await page.locator('input[name="backgroundCheckConsent"]').check();
    await page.locator('input[name="termsAgreement"]').check();
    
    // Add additional comments
    await page.locator('textarea[name="additionalComments"]').fill('Very excited to contribute to the community!');
    
    // Mock the form submission to avoid actual Netlify submission in tests
    await page.route('**/volunteer/apply', route => {
      route.fulfill({
        status: 200,
        contentType: 'text/html',
        body: '<html><body>Success</body></html>'
      });
    });
    
    // Submit the form
    await page.locator('button[type="submit"]').click();
    
    // Should show success message
    await expect(page.locator('#successMessage')).toBeVisible();
    await expect(page.locator('#successMessage')).toContainText('Application Submitted Successfully');
  });

  test('should handle form submission errors gracefully', async ({ page }) => {
    await page.goto('/en/volunteer/apply');
    
    // Fill out valid form
    await page.locator('input[name="fullName"]').fill('Test User');
    await page.locator('input[name="email"]').fill('test@example.com');
    await page.locator('input[name="phone"]').fill('(555) 123-4567');
    await page.locator('textarea[name="address"]').fill('123 Test St');
    await page.locator('select[name="roleSelection"]').selectOption({ index: 1 });
    await page.locator('input[name="availability"][value="flexible"]').check();
    await page.locator('input[name="backgroundCheckConsent"]').check();
    await page.locator('input[name="termsAgreement"]').check();
    
    // Mock form submission error
    await page.route('**/volunteer/apply', route => {
      route.fulfill({
        status: 500,
        contentType: 'text/html',
        body: '<html><body>Server Error</body></html>'
      });
    });
    
    // Submit the form
    await page.locator('button[type="submit"]').click();
    
    // Should show error message
    await expect(page.locator('#errorMessage')).toBeVisible();
    await expect(page.locator('#errorMessage')).toContainText('Submission Failed');
    
    // Submit button should be re-enabled
    await expect(page.locator('button[type="submit"]')).toBeEnabled();
  });

  test('should work correctly in French', async ({ page }) => {
    await page.goto('/fr/benevole');
    
    // Check Apply Now button in French
    const applyButtons = page.locator('a[href="/fr/benevole/postuler"]');
    await expect(applyButtons.first()).toBeVisible();
    
    // Navigate to French application form
    await applyButtons.first().click();
    await expect(page).toHaveURL('/fr/benevole/postuler');
    
    // Should see French content
    await expect(page.locator('h1')).toContainText('Candidature de bénévole');
    
    // Form should have French labels
    await expect(page.locator('label[for="fullName"]')).toContainText('Nom complet');
    await expect(page.locator('label[for="email"]')).toContainText('Adresse courriel');
    
    // Submit button should be in French
    await expect(page.locator('button[type="submit"]')).toContainText('Soumettre la candidature');
  });

  test('should be responsive on mobile devices', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/en/volunteer/apply');
    
    // Form should be visible and usable on mobile
    await expect(page.locator('form[name="volunteer-application"]')).toBeVisible();
    
    // Fields should stack vertically on mobile
    const fullNameField = page.locator('input[name="fullName"]');
    const emailField = page.locator('input[name="email"]');
    
    const fullNameBox = await fullNameField.boundingBox();
    const emailBox = await emailField.boundingBox();
    
    // On mobile, email field should be below full name field
    expect(emailBox?.y).toBeGreaterThan(fullNameBox?.y ?? 0);
    
    // Form should still be functional
    await fullNameField.fill('Mobile Test');
    await expect(fullNameField).toHaveValue('Mobile Test');
  });
});

test.describe('Volunteer Application Form - Accessibility Tests', () => {
  
  test('should have proper ARIA labels and form structure', async ({ page }) => {
    await page.goto('/en/volunteer/apply');
    
    // Form should have proper labeling
    const form = page.locator('form[name="volunteer-application"]');
    await expect(form).toBeVisible();
    
    // Required fields should be marked
    const requiredFields = page.locator('input[required], select[required], textarea[required]');
    const count = await requiredFields.count();
    expect(count).toBeGreaterThan(0);
    
    // Labels should be associated with inputs
    const fullNameLabel = page.locator('label[for="fullName"]');
    const fullNameInput = page.locator('input#fullName');
    await expect(fullNameLabel).toBeVisible();
    await expect(fullNameInput).toBeVisible();
  });

  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/en/volunteer/apply');
    
    // Should be able to tab through form fields
    await page.keyboard.press('Tab');
    const firstField = page.locator('input[name="fullName"]');
    await expect(firstField).toBeFocused();
    
    await page.keyboard.press('Tab');
    const secondField = page.locator('input[name="email"]');
    await expect(secondField).toBeFocused();
  });
});
