# Database Schema

For the MVP, a traditional managed database is not required.

**Content Storage:** All website content (Program, BlogPost, Partner, etc.) is stored and managed exclusively within the Sanity.io CMS using their document-based schema system.

**Dynamic Data Handling:** Data from user submissions (e.g., Volunteer Applications) is processed by Netlify Forms and passed to Make.com workflows which handle all third-party service integrations (EmailOctopus, document generation). For administrative record-keeping, submissions are logged securely via Make.com automation.

This approach eliminates server infrastructure management overhead and reduces costs by using Netlify's free form handling service, aligning perfectly with the serverless and headless architecture.
