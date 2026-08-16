# Church Ministry Management System — UI/UX Generation Prompt

Build a modern, mobile-first responsive **Church Management System** for managing church members, attendance, cell groups, ministries, spiritual-development programs, leaders, and church activities.

## 1. Project Goal

The goal is to replace the church's current paper-based attendance and member-monitoring process with a centralized web application.

The current problems are:

- Attendance is recorded manually on paper.
- It is difficult to quickly determine the total attendance for a service.
- Leaders cannot easily see who is absent.
- Some members do not write their names on the attendance sheet.
- Elderly members or people who have difficulty writing may be missed.
- Different types of attendance are difficult to track separately.
- Member spiritual progress is difficult to monitor.
- Cell-group and ministry leaders lack a centralized view of their members.
- Leadership cannot easily see overall ministry activity and attendance trends.

The system should make it easy for church staff and leaders to:

1. Manage members.
2. Record and monitor attendance.
3. Identify absent members.
4. Manage cell groups.
5. Manage ministries.
6. Track spiritual-development progress.
7. Monitor leaders and workers.
8. View attendance statistics and trends.
9. Manage church events and activities.
10. Quickly understand the current state of the ministry from a dashboard.

---

# 2. Technology Stack

Generate the frontend using:

- **Next.js 15**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**
- **Lucide React icons**

The backend architecture will eventually use:

- **Node.js**
- **Express.js**
- **PostgreSQL**
- **Supabase** for PostgreSQL infrastructure and potentially authentication/storage

Important:

The generated UI should be designed so that it can later consume REST APIs.

Do NOT put business logic, database queries, or mock backend logic directly into presentation components.

Use realistic mock data only where necessary to demonstrate the UI.

---

# 3. Design Direction

Create a professional SaaS-style administrative dashboard rather than a typical church website.

The interface should feel:

- Modern
- Clean
- Calm
- Professional
- Data-oriented
- Accessible
- Easy for non-technical church leaders to use
- Appropriate for both desktop and tablet
- Responsive on mobile

Avoid:

- Excessive gradients
- Overly decorative church imagery
- Generic landing-page aesthetics
- Excessive animations
- Excessive rounded cards
- Huge hero sections
- Cluttered dashboards

Prioritize information hierarchy and usability.

The application should feel similar to a polished modern admin product.

---

# 4. Design System

Use **shadcn/ui** components wherever appropriate.

Create a consistent design system using:

### Typography

Use a modern sans-serif font with clear hierarchy.

Establish:

- Page title
- Section heading
- Card title
- Body text
- Caption
- Metadata
- Table text

### Colors

Use a neutral light interface with one strong primary accent.

The design should support semantic colors for:

- Success
- Warning
- Error
- Information
- Neutral

Do not hard-code colors throughout individual components.

Use Tailwind design tokens / CSS variables so the theme can be changed globally.

---

# 5. Application Shell

Create a reusable application shell.

Desktop:

```text
┌─────────────────────────────────────────────────────────┐
│ Header                                                  │
├──────────────┬──────────────────────────────────────────┤
│              │                                          │
│ Sidebar      │ Main Content                             │
│              │                                          │
│ Dashboard    │                                          │
│ Members      │                                          │
│ Attendance   │                                          │
│ Cell Groups  │                                          │
│ Ministries   │                                          │
│ Programs     │                                          │
│ Events       │                                          │
│ Reports      │                                          │
│              │                                          │
│ Settings     │                                          │
│              │                                          │
└──────────────┴──────────────────────────────────────────┘
```

The sidebar should:

- Support active navigation state.
- Support icons.
- Be collapsible.
- Have a mobile-friendly drawer version.
- Clearly separate primary navigation from settings.

The header should include:

- Page context/breadcrumb when appropriate
- Search
- Notifications
- Current user
- User avatar
- User menu

---

# 6. Main Navigation

Create these primary sections:

### Dashboard

Overview of the church/ministry.

### Members

Member directory and member profiles.

### Attendance

Attendance records and monitoring.

### Cell Groups

Cell groups, leaders, and members.

### Ministries

Ministry teams and assignments.

### Programs

Spiritual-development programs and progress.

### Events

Church activities and special events.

### Reports

Attendance and ministry reports.

### Settings

System configuration and user/role management.

---

# 7. Dashboard

Create a comprehensive but clean dashboard.

The dashboard should contain:

## Attendance Overview

Show:

- Today's attendance
- Present
- Absent
- Attendance percentage
- Comparison with previous attendance period

Use reusable statistic cards.

Example:

```text
Today's Attendance

142
Present

28
Absent

83.5%
Attendance Rate
```

## Attendance Trend

Create a clean line/bar chart showing attendance over time.

Allow filtering by:

- Week
- Month
- Quarter

## Attendance by Category

Show attendance breakdown for:

- Sunday Service
- Sunday Cell Group
- Encounter
- Post Encounter
- LWAP
- How to Lead
- Soul 1
- Soul 2
- Soul 3
- Leadership Training
- Gimik
- Music Team

## Missing Members

Show a table of members who were expected but did not attend.

Columns:

- Member
- Cell Group
- Leader
- Last Attendance
- Status
- Action

## Upcoming Events

Show upcoming church activities.

---

# 8. Members Page

Create a professional member-management interface.

Top section:

- Page title
- Description
- Search
- Filters
- Add Member button

Table columns:

- Member
- Age
- Category
- Cell Group
- Ministry
- Membership Status
- Last Attendance
- Actions

Include:

- Search
- Filtering
- Sorting
- Pagination
- Column actions
- Empty state
- Loading state
- Error state

Use shadcn/ui Data Table patterns where appropriate.

---

# 9. Member Profile

Create a detailed member profile page.

Header:

- Avatar
- Full name
- Status
- Cell group
- Leader
- Quick actions

Sections:

## Personal Information

- Full name
- Birthday
- Age
- Contact number
- Address
- Date joined
- Date converted
- Date became member

## Church Information

- Cell group
- Cell leader
- Ministry
- Ministry role
- Membership status

## Spiritual Journey

Create a visual progress/timeline component.

Example:

```text
Conversion
   ↓
Pre-Encounter       ✓
   ↓
Encounter           ✓
   ↓
Post Encounter      ✓
   ↓
Ladder of Success   ✓
   ↓
How to Lead         ✓
   ↓
Soul 1              ✓
   ↓
Soul 2              ○
   ↓
Soul 3              ○
```

## Attendance History

Show recent attendance records.

## Ministry Involvement

Show ministries the member belongs to.

---

# 10. Attendance Page

Create the main attendance-management interface.

Top controls:

- Attendance type
- Date
- Cell group
- Ministry
- Search

Attendance types should include:

- Sunday Service
- Sunday Cell Group
- Encounter
- Post Encounter
- LWAP
- How to Lead
- Soul 1
- Soul 2
- Soul 3
- Leadership Training
- Gimik
- Music Team

Show summary cards:

- Expected
- Present
- Absent
- Attendance Rate

Main table:

```text
Member | Cell Group | Status | Time | Recorded By | Action
```

Use clear visual states:

Present
Absent
Excused
Not Recorded

Include an easy attendance-recording interaction.

The interface should be optimized for fast data entry.

---

# 11. Cell Groups

Create a cell-group management page.

Display cell groups as cards or a table.

Each cell group should show:

- Group name
- Leader
- Assistant leader
- Number of members
- Attendance rate
- Latest activity

Cell group detail page:

```text
Cell Group
────────────────────

Leader
Assistant

Members
12

Attendance
91%

Recent Attendance
...
```

Provide:

- Member list
- Attendance history
- Leader information
- Group statistics

---

# 12. Ministries

Create ministry-management screens.

Example ministries:

- Music Team
- Attendance Team
- Encounter Team
- Media Team
- Youth Ministry
- Leadership Team

Ministry cards should show:

- Ministry name
- Leader
- Number of members
- Attendance
- Active status

Ministry detail page:

- Ministry information
- Members
- Leaders
- Attendance
- Events
- Activity history

---

# 13. Programs / Spiritual Development

Create a program-tracking interface.

Programs may include:

- Pre-Encounter
- Encounter
- Post Encounter
- LWAP
- How to Lead
- Soul 1
- Soul 2
- Soul 3
- Ladder of Success

Show program progress for each member.

Use:

- Progress indicators
- Timeline
- Status badges
- Completion dates
- Program tables

Allow leaders to quickly identify:

- Completed
- In progress
- Not started

---

# 14. Events

Create an event-management interface.

Each event should display:

- Event name
- Date
- Time
- Location
- Event type
- Expected attendance
- Actual attendance
- Status

Event detail should include attendance information.

---

# 15. Reports

Create reporting screens for:

### Attendance Report

- Daily attendance
- Weekly attendance
- Monthly attendance
- Attendance by group
- Attendance by ministry
- Attendance trends

### Member Report

- Total members
- Active members
- New members
- Members with low attendance

### Program Report

- Program participation
- Completion rates
- Members needing follow-up

Reports should use:

- Charts
- Tables
- Summary cards
- Date filters
- Export button UI

The export functionality can be a placeholder for now.

---

# 16. UX Requirements

The system will be used by church leaders who may not be highly technical.

Therefore:

- Keep navigation simple.
- Avoid unnecessary nested menus.
- Use clear labels.
- Prefer recognizable icons.
- Provide confirmation for destructive actions.
- Use tooltips where appropriate.
- Provide empty states.
- Provide loading states.
- Provide error states.
- Provide success feedback.
- Provide template for empty searches, empty states, and blank pages or sample empty features. that are not yet starting to develop
- Make important information visible without excessive clicking.

Attendance recording should require as few interactions as possible.

---

# 17. Accessibility

Follow accessible UI practices.

Use:

- Proper semantic HTML
- Keyboard navigation
- Visible focus states
- Accessible labels
- Adequate contrast
- Screen-reader-friendly controls
- Accessible dialogs and dropdowns

Use shadcn/ui/Radix primitives where appropriate instead of manually recreating accessible interaction patterns.

---

# 18. Responsive Behavior

Desktop is the primary environment.

However, the system must work on:

- Desktop
- Laptop
- Tablet
- Mobile

On mobile:

- Sidebar becomes a drawer.
- Tables should become horizontally scrollable or transform into cards where appropriate.
- Dashboard cards should stack.
- Forms should become single-column.
- Important actions should remain easily accessible.

---

# 19. Component Architecture

Create reusable components rather than duplicating UI.

Recommended structure:

```text
components/
├── ui/
├── layout/
├── dashboard/
├── members/
├── attendance/
├── cell-groups/
├── ministries/
├── programs/
├── events/
└── reports/
```

Examples:

```text
StatCard
PageHeader
SearchInput
FilterBar
DataTable
StatusBadge
MemberAvatar
MemberCard
AttendanceStatus
AttendanceTable
ProgressTimeline
EmptyState
ConfirmDialog
```

Keep components modular and reusable.

---

# 20. Data Layer Boundary

Do not tightly couple UI components to a database.

Use mock/placeholder data through clearly separated data structures.

Example:

```ts
type Member = {
  id: string;
  name: string;
  age: number;
  category: string;
  cellGroupId: string;
  ministryId?: string;
  status: string;
};
```

The UI should later be able to replace mock data with API calls without requiring major component rewrites.

---

# 21. Important Business-Domain Considerations

The system needs to support:

- Members belonging to cell groups.
- Members belonging to ministries.
- Leaders overseeing members.
- Members participating in multiple programs.
- Multiple attendance types.
- Attendance by date.
- Attendance by event/program.
- Member spiritual-development progress.
- Historical attendance.
- Different user permissions.

Do not hard-code these relationships into the UI.

Treat them as data coming from the backend.

---

# 22. Roles and Permissions

Prepare the UI for role-based access.

Potential roles:

- Super Admin
- Pastor
- Primary Leader
- Cell Leader
- Ministry Leader
- Attendance Team
- Staff
- Member

The UI should be structured so navigation and actions can later be hidden or disabled according to permissions.

Do not implement complex authorization logic in the frontend yet.

---

# 23. Important UI States

Every major page should account for:

### Loading

Use skeleton components.

### Empty

Example:

"No members found."

### Error

Example:

"Something went wrong while loading members."

### Success

Use toast notifications.

### Confirmation

Use dialogs for destructive actions.

### No Search Results

Clearly distinguish between an empty database and a search with no results.

---

# 24. Builder.io Instructions

Generate production-quality React/Next.js UI.

Prefer existing shadcn/ui components when possible.

Use Tailwind utility classes.

Do not introduce another UI framework.

Do not use Bootstrap.

Do not use Material UI.

Do not create unnecessary custom CSS.

Do not create a completely separate design system for every page.

Maintain visual consistency across the entire application.

Create reusable components whenever a UI pattern appears more than once.

Prioritize the actual administrative workflow over decorative visuals.

The final product should feel like a **professional church operations platform**, not a generic dashboard template.

Start by creating the **application shell and Dashboard**, then use the same design system for the remaining pages.

### One important adjustment

I would **not paste this entire prompt every time** you ask Builder to create a page.

Use this as your **Master Project Prompt** first. Then give Builder smaller prompts such as:

> "Using the existing application shell and design system, now create the Members page..."

That will produce much more consistent results.

And for your project specifically, I'd build the UI in this order:

**App Shell → Dashboard → Members → Member Profile → Attendance → Cell Groups → Ministries → Programs → Events → Reports → Settings**

The **Members + Attendance + Member Profile** combination should be your first real MVP because those three screens directly address the paper-attendance problem you originally identified.
