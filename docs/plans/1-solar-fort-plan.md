Church Ministry Dashboard First-Pass Plan

Recommended approach

Replace the starter placeholder with a production-quality, responsive church operations dashboard that borrows the supplied BookWise screenshot’s compact admin composition: persistent left navigation, slim top header, dense but readable summary cards, and two-column content panels. The screenshot will guide layout density and interaction patterns, while the product language, data, accent color, and page content will be specific to the Church Ministry Management System.

Keep the first implementation focused on the shared application shell and Dashboard page, with a reusable placeholder page for the remaining navigation destinations so no navigation item 404s. Keep all displayed records in a separate typed mock-data module so the UI can later switch to REST responses without moving business logic into presentation components.

Implementation steps

Create the shared admin shell

Add a reusable layout component built on the existing Radix/shadcn sidebar primitives.

Include church brand mark/name, active navigation, grouped primary/settings links, collapse behavior, mobile drawer behavior, top search, notifications, breadcrumb/page context, and current-user menu.

Use React Router NavLink/Link for all internal navigation and preserve a consistent shell around dashboard and placeholders.

Build the Dashboard homepage

Replace client/pages/Index.tsx with the church dashboard route, removing the starter /api/demo request.

Add typed mock data in a dedicated client data module for attendance metrics, trend points, attendance categories, missing members, upcoming events, and recent ministry activity.

Implement the first-pass dashboard sections: welcome/context header, today’s attendance stat cards, period filter, attendance trend chart, attendance-by-category breakdown, missing-members table, and upcoming-events/activity panels.

Use existing Card, Badge, Avatar, Progress, Table, ChartContainer, DropdownMenu, Input, Button, Tooltip, and responsive primitives where they fit.

Include sensible empty/search states and lightweight success feedback for demonstrable interactions; do not add backend or database logic.

Add non-dead navigation destinations

Register reusable placeholder routes for Members, Attendance, Cell Groups, Ministries, Programs, Events, Reports, and Settings above the catch-all route.

Make each placeholder use the shared shell and explain that the section is ready for the next implementation pass, without pretending it is fully functional.

Fix the existing NotFound router import and use Link instead of a raw internal anchor.

Apply the visual system globally

Update client/global.css HSL CSS variables and tailwind.config.ts semantic color mappings for a calm, modern church-operations palette with one strong brand accent plus success, warning, error, info, and neutral states.

Tune typography, page background, card borders/radii, sidebar contrast, focus rings, and responsive spacing to match the screenshot’s professional density while remaining accessible.

Update the document title in index.html to the church management product name if needed by the final UI.

Validate the user experience

Run pnpm typecheck, pnpm build, and the existing test command.

Start/use the dev preview to verify the dashboard golden path, sidebar collapse, mobile drawer, navigation to every placeholder, chart/filter controls, narrow-table behavior, and visible focus/contrast states.

Critical files

client/pages/Index.tsx — dashboard page replacement.

client/App.tsx — route registration and shared route composition.

client/components/layout/\* — reusable shell and navigation.

client/components/dashboard/\* — reusable dashboard sections where repetition warrants extraction.

client/data/\* — typed mock data boundary for dashboard records.

client/pages/Placeholder.tsx — reusable unfinished-section page.

client/pages/NotFound.tsx — router import and internal-link cleanup.

client/global.css — HSL theme tokens and global visual foundations.

tailwind.config.ts — semantic brand/status token mappings.

index.html — product document title.
