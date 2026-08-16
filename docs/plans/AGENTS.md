````markdown
# Church Management — AGENTS.md

## Project Overview

A production-ready church management system built with Next.js 15,
TypeScript, Tailwind CSS, shadcn/ui, and PostgreSQL/Supabase.

The application manages:

- Members
- Attendance
- Cell groups
- G12 leadership structure
- Ministries
- Equipping and training
- Devotion monitoring
- Events
- Dashboards
- Reports

## Tech Stack

- Next.js 15
- React
- TypeScript
- Next.js App Router
- Tailwind CSS
- shadcn/ui
- Radix UI
- Lucide React
- Zod
- PostgreSQL / Supabase
- pnpm

## Architecture

Use the Next.js 15 App Router architecture.

```text
app/
├── layout.tsx
├── page.tsx
├── dashboard/
│   └── page.tsx
├── members/
│   └── page.tsx
├── attendance/
│   └── page.tsx
├── cell-groups/
│   └── page.tsx
├── ministries/
│   └── page.tsx
├── equipping/
│   └── page.tsx
└── api/
    └── ...

components/
├── ui/
├── layout/
├── dashboard/
├── members/
├── attendance/
└── ...

lib/
├── utils.ts
├── db/
└── validations/

types/
└── ...

public/
```
````

Do NOT use the Fusion Starter architecture.

Do NOT create:

- `client/`
- `server/`
- `shared/`
- `client/App.tsx`
- React Router
- Vite

unless explicitly required by a future architectural decision.

## Routing

Use Next.js App Router.

Do NOT use React Router.

Use:

- `page.tsx` for routes
- `layout.tsx` for shared layouts
- `loading.tsx` for loading states
- `error.tsx` for route errors
- `not-found.tsx` for 404 states

Use `next/link` for internal navigation.

## Server and Client Components

Prefer Server Components by default.

Use `"use client"` only when the component requires:

- React state
- Event handlers
- Browser APIs
- Client-side interaction

Do not make entire pages Client Components unnecessarily.

## Components

Use shadcn/ui components whenever an appropriate component exists.

Prefer composing existing primitives instead of creating duplicate UI primitives.

Use Tailwind CSS for styling.

Use the `cn()` utility for conditional class names.

Keep components reusable and focused.

## Data

Keep mock data separate from UI components during initial development.

Use a structure such as:

```text
lib/
└── mock-data/
```

Do not place large datasets directly inside page components.

The UI should be designed so mock data can later be replaced with database/API data without requiring major UI restructuring.

## API and Server Logic

Prefer Next.js Server Actions and Server Components when appropriate.

Use Route Handlers only when an actual HTTP API endpoint is required.

Do not create API endpoints unnecessarily.

Server-side logic must remain server-side.

Never expose:

- Database credentials
- Supabase service-role keys
- Private API keys
- Secrets
- Authentication secrets

to Client Components or browser code.

## Database

The planned production database is PostgreSQL/Supabase.

Database access must happen server-side.

Do not import database clients or server-only database utilities into Client Components.

## UI/UX

Use a consistent application shell:

- Persistent sidebar on desktop
- Collapsible sidebar
- Mobile navigation drawer
- Top header
- Search
- Notifications
- User menu
- Breadcrumbs
- Responsive content area

The interface must be responsive across:

- Desktop
- Tablet
- Mobile

Tablet layouts should avoid unnecessarily dense multi-column layouts.

## Dashboard

The dashboard should support:

- Attendance totals
- Weekly attendance trends
- Month-to-month comparisons
- Quarter-to-quarter comparisons
- Scalable Y-axis charts
- Attendance categories
- Active members
- Absences
- Ministry metrics

Charts should aggregate attendance appropriately.

Weekly views should display weekly data rather than individual daily points.

Monthly views should support month-to-month comparison.

Quarterly views should support quarter-to-quarter comparison.

## Attendance

Attendance is a core feature.

The system should eventually support:

- Sunday Celebration
- Cell Group
- Equipping
- Devotion
- Encounter
- Post Encounter
- LWAP
- How to Lead
- Soul One
- Undercover
- Soul Two
- Ladder of Success
- Soul Three
- Ministry attendance
- Special events

Attendance records must preserve historical data.

Attendance changes should be auditable.

## Church Structure

The system should support church leadership structures including:

- Pastors
- Leaders
- Members
- Cell groups
- G12 relationships
- Leadership hierarchy
- Ministries

A person may belong to a cell group and one or more ministries.

## Responsive Design

Always consider:

- Desktop
- Tablet
- Mobile

Do not assume desktop-only layouts.

For tablet layouts, prefer a simplified single-column or reduced-column experience when appropriate.

For mobile layouts:

- Use collapsible navigation
- Avoid horizontal overflow
- Make tables usable on small screens
- Stack cards and controls when necessary
- Preserve important actions

## Styling

Use Tailwind CSS utilities.

Use the existing project design tokens instead of introducing arbitrary colors throughout the application.

Prefer semantic theme variables such as:

- background
- foreground
- primary
- secondary
- muted
- accent
- destructive
- border

Use consistent spacing, typography, radius, and component patterns.

## Accessibility

Follow accessible UI practices.

Use semantic HTML.

Interactive elements must be keyboard accessible.

Buttons, inputs, dialogs, dropdowns, navigation, and forms should have appropriate accessible labels.

Do not use color alone to communicate important information.

## Development Rules

1. Use Next.js 15.
2. Use the App Router.
3. Do not use React Router.
4. Do not use Vite.
5. Do not recreate the Fusion Starter `client/server/shared` architecture.
6. Prefer Server Components.
7. Use Client Components only when interaction requires them.
8. Prefer shadcn/ui primitives.
9. Use Tailwind CSS for styling.
10. Keep mock data separate from UI.
11. Keep secrets server-side.
12. Avoid unnecessary API endpoints.
13. Preserve historical data.
14. Design every feature responsively.
15. Keep components reusable.
16. Avoid unnecessary dependencies.
17. Follow existing project conventions before introducing new patterns.

## Builder.io

Builder.io-generated UI must follow this project's existing Next.js 15 architecture.

Generated pages and components must use:

- Next.js 15
- App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- Existing project components
- Existing design tokens

Do not generate:

- React Router routes
- Vite configuration
- Fusion Starter `client/` architecture
- Unnecessary Express servers
- Unnecessary API endpoints

Builder-generated UI should integrate into the existing application rather than replacing the project's architecture.

## Code Quality

Prefer simple, maintainable solutions.

Before creating a new component, utility, or UI primitive, check whether an existing project component can be reused.

Do not duplicate functionality.

Keep business logic separate from presentation when practical.

Use TypeScript types instead of `any`.

Validate external input with Zod where appropriate.

## Future Architecture

The project may eventually expand to include:

- Mobile application
- Dedicated backend services
- Shared packages
- Documentation
- Offline-first attendance synchronization

Do not introduce these architectures prematurely.

Build the current Next.js web application cleanly so it can evolve into a larger monorepo later.

```

```
