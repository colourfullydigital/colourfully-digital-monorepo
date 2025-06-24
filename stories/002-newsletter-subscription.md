---
title: Implement Newsletter Subscription Form
story_id: 002
---

### User Story

As a website visitor, I want to be able to subscribe to the newsletter, so that I can stay informed about the foundation's activities.

### Acceptance Criteria

- A newsletter subscription form is available on the website.
- The form contains a field for an email address.
- The form is a Netlify Form named `newsletter`.
- On successful submission, the user is redirected to a success page.
- The form submission triggers a Make.com webhook.
- Client-side validation is implemented for the email field.

### Technical Details

- Create a React component for the form.
- Use Netlify Forms for submission.
- The form should be created in `apps/website/src/components/forms/NewsletterForm.tsx`.
