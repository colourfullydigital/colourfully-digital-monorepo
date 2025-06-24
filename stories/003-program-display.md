---
title: Display Program Information
story_id: 003
---

### User Story

As a website visitor, I want to be able to view the programs offered by the foundation, so that I can learn about their educational initiatives.

### Acceptance Criteria

- A page at `/en/programs` and `/fr/programmes` lists all available programs.
- Each program in the list links to a dedicated page for that program.
- The program pages display the program's title, description, and other details from the CMS.
- Program data is fetched from the Sanity.io CMS at build time.

### Technical Details

- Create Astro pages for the program list and individual program details.
- Fetch data from Sanity.io using GROQ queries.
- The pages should be created in `apps/website/src/pages/en/programs/` and `apps/website/src/pages/fr/programmes/`.
