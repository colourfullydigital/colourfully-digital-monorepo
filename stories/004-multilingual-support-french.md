---
title: Implement French Language Support
story_id: 004
---

### User Story

As a French-speaking user, I want to be able to browse the website in French, so that I can have a fully localized experience.

### Acceptance Criteria

- All pages are available in both English and French.
- A language switcher is available to toggle between English and French.
- The routing is structured to support both languages (e.g., `/en/` and `/fr/`).
- Content is fetched from the CMS in the selected language.

### Technical Details

- Implement the routing structure as defined in the architecture document.
- Create a language switcher component.
- Ensure that all content from Sanity.io is queried with the correct language.
