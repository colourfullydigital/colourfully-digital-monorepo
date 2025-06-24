# Coding Standards

### Critical Fullstack Rules

- **Type Sharing:** Always define types in packages/types and import from there
- **Environment Variables:** Access only through validated config objects, never process.env directly
- **Form Handling:** All forms must use Netlify Forms with proper validation and error handling
- **State Updates:** Never mutate state directly - use proper React state management patterns
- **Data Validation:** Form validation on both client-side and Make.com workflows

### Naming Conventions

| Element         | Frontend             | Forms      | Example             |
| :-------------- | :------------------- | :--------- | :------------------ |
| Components      | PascalCase           | -          | `VolunteerForm.tsx` |
| Hooks           | camelCase with 'use' | -          | `useFormState.ts`   |
| Form Names      | -                    | kebab-case | `volunteer-application` |
| Types           | PascalCase           | PascalCase | `VolunteerApplicationPayload` |
