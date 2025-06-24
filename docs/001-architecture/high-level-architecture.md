# High Level Architecture

### Technical Summary

This document outlines a headless architecture for the Colourfully Digital Foundation website. The primary goal is to create a flexible, scalable, and maintainable platform to support the foundation's mission of providing accessible STEM education. The system will leverage Sanity.io as a headless CMS for all content, a statically-generated frontend built with Astro and interactive React components, and Netlify Forms with Make.com workflows for dynamic operations like form submissions and backend automation. All code will be managed within a single monorepo to facilitate code sharing and streamlined development.

### Platform and Infrastructure Choice

**Platform:** Netlify

**Key Services:** Static Hosting, Netlify Forms, Build Automation, Deploy Previews

**Deployment Host and Regions:** Global CDN with automatic regional distribution

### Repository Structure

**Structure:** Monorepo

**Monorepo Tool:** Turborepo with pnpm workspaces

**Package Organization:** Apps (website), packages (shared libraries)

### High Level Architecture Diagram

```mermaid
C4Context
  title System Context Diagram for Colourfully Digital Foundation Website
  Person(visitor, "Website Visitor", "The public user of the website.")
  Person(editor, "Content Editor", "Foundation staff managing website content.")
  System_Ext(sanity, "Sanity.io CMS", "Headless Content Management System for all website content.")
  System_Ext(eventbrite, "Eventbrite", "External service for program registration.")
  System_Ext(emailoctopus, "EmailOctopus", "Handles newsletter subscriptions and automated email notifications.")
  System_Ext(make, "Make.com", "Workflow automation platform handling form processing and integrations.")
  System_Ext(ga, "Google Analytics 4", "Tracks user behavior and site performance.")
  System_Boundary(c1, "Colourfully Digital Foundation Platform") {
    System(website, "Website (Astro + React)", "Provides information, program details, and volunteer opportunities. Statically hosted on Netlify.")
    System(forms, "Netlify Forms", "Handles form submissions and triggers Make.com workflows.")
  }
  Rel(visitor, website, "Views content, submits forms")
  Rel(website, ga, "Sends user behavior data", "HTTPS")
  Rel(website, eventbrite, "Redirects for registration", "HTTPS")
  Rel_Back(website, visitor, "Serves static pages and UI")
  Rel(website, forms, "Submits form data", "HTTPS")
  Rel(forms, make, "Triggers workflows via webhook", "HTTPS/JSON")
  Rel(make, emailoctopus, "Adds subscribers and sends emails", "HTTPS/JSON")
  Rel(editor, sanity, "Manages all content", "HTTPS")
  Rel(website, sanity, "Provides content via API at build time", "HTTPS/JSON")
  Rel(sanity, website, "Can trigger rebuilds via webhook", "HTTPS")
```

### Architectural Patterns

- **Jamstack Architecture:** Static site generation with form-based APIs - _Rationale:_ Optimal performance and scalability for content-heavy applications with decoupled content management
- **Island Architecture:** Static HTML with selective React component hydration - _Rationale:_ Minimal JavaScript bundle size while maintaining interactivity where needed
- **Workflow Automation (iPaaS):** Form processing via Make.com workflows - _Rationale:_ Cost-effective backend logic without server management
- **Repository Pattern:** Abstracted data access to external systems - _Rationale:_ Decouples business logic from data source implementation details
