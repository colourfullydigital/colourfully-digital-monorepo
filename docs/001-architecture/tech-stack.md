# Tech Stack

### Technology Stack Table

### Frontend Application (Astro + React Islands)

**Responsibility:** Core user-facing website with static content and interactive components

**Key Interfaces:**

- Sanity.io Content API for build-time data fetching
- Netlify Forms for form submissions
- External service redirects (Eventbrite)

**Dependencies:** Sanity.io CMS, Netlify Forms, Make.com

**Technology Stack:** Astro 5.9, React 19.0.0, TypeScript, Tailwind CSS

### Form Processing (Netlify Forms + Make.com)

**Responsibility:** Form data collection and automated workflow processing

**Key Interfaces:**

- Netlify Forms for form data collection
- Make.com webhooks for workflow automation
- EmailOctopus API integration
- Document generation services

**Dependencies:** EmailOctopus, Make.com

**Technology Stack:** Netlify Forms, Make.com workflows

### Content Store (Sanity.io CMS)

**Responsibility:** Headless content management and storage

**Key Interfaces:**

- GROQ query API for content retrieval
- Sanity Studio for content editing
- Webhook triggers for build automation

**Dependencies:** None (external SaaS)

**Technology Stack:** Sanity.io 3.x

### Component Diagrams

```mermaid
C4Context
  title Component Diagram for Colourfully Digital Foundation Website
  Person(visitor, "Website Visitor", "Uses the website to find information and volunteer")
  Person(editor, "Content Editor", "Manages content within the CMS")
  System_Ext(sanity, "Sanity.io CMS", "SaaS: The source of all content")
  System_Ext(eventbrite, "Eventbrite", "SaaS: Handles program registrations")
  System_Ext(emailoctopus, "EmailOctopus", "SaaS: Manages mailing lists and sends initial emails")
  System_Ext(make, "Make.com", "SaaS: Workflow automation for form processing and integrations")
  System_Ext(ga, "Google Analytics", "SaaS: Provides analytics on user behavior")
  
  System_Boundary(netlify, "Colourfully Digital Foundation Platform (Hosted on Netlify)") {
    System(website, "Frontend Application", "Astro + React: The statically-generated website that the user interacts with")
    System(forms, "Netlify Forms", "Form Handler: Collects form submissions and triggers automation workflows")
  }
  
  Rel(visitor, website, "Views pages, submits forms", "HTTPS")
  Rel(website, forms, "Submits form data", "HTTPS")
  Rel_Back(forms, website, "Returns success/error responses")
  Rel(website, ga, "Sends analytics events", "HTTPS")
  Rel(website, eventbrite, "Redirects user to register", "HTTPS")
  Rel(forms, make, "Triggers workflows via webhook", "HTTPS/JSON")
  Rel(make, emailoctopus, "Sends notifications and subscriber data", "HTTPS/JSON")
  Rel(editor, sanity, "Manages content")
  Rel(website, sanity, "Reads content at build time", "API")
  Rel(sanity, website, "Triggers new builds via webhook", "HTTPS")
```
