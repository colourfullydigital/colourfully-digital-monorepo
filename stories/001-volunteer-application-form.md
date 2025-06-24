---
title: Implement Volunteer Application Form
story_id: 001
---

### User Story

As a potential volunteer, I want to be able to submit a volunteer application through a form on the website, so that I can offer my time and skills to the foundation.

### Acceptance Criteria

- A volunteer application form is available at `/en/volunteer` and `/fr/benevolat`.
- The form contains fields for first name, last name, email, a message, and a consent checkbox.
- The form is a Netlify Form named `volunteer-application`.
- On successful submission, the user is redirected to a success page.
- The form submission triggers a Make.com webhook.
- Client-side validation is implemented for all required fields.

### Technical Details

- Create a React component for the form.
- Use Netlify Forms for submission.
- The form should be created in `apps/website/src/components/forms/VolunteerForm.tsx`.
- The pages `/en/volunteer.astro` and `/fr/benevolat.astro` should render the form.
