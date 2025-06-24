---
title: Display Blog Posts
story_id: 005
---

### User Story

As a website visitor, I want to be able to read blog posts, so that I can stay up-to-date with the foundation's news and stories.

### Acceptance Criteria

- A page at `/en/blog` and `/fr/blog` lists all available blog posts.
- Each blog post in the list links to a dedicated page for that post.
- The blog post pages display the post's title, content, author, and publication date from the CMS.
- Blog post data is fetched from the Sanity.io CMS at build time.

### Technical Details

- Create Astro pages for the blog list and individual blog posts.
- Fetch data from Sanity.io using GROQ queries.
- The pages should be created in `apps/website/src/pages/en/blog/` and `apps/website/src/pages/fr/blog/`.
