import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "../app-shell";

const sections = {
  members: {
    title: "Members",
    description: "Manage your member directory, profiles, and care follow-ups in one place.",
    action: "Add member",
  },
  attendance: {
    title: "Attendance",
    description: "Record services and activities, then monitor attendance across your church.",
    action: "Record attendance",
  },
  "cell-groups": {
    title: "Cell Groups",
    description: "Keep track of cell-group leaders, members, and regular gathering activity.",
    action: "Create cell group",
  },
  ministries: {
    title: "Ministries",
    description: "Organize ministry teams, assignments, and the people serving each week.",
    action: "Add ministry",
  },
  programs: {
    title: "Programs",
    description: "Follow spiritual-development programs and member progress over time.",
    action: "Create program",
  },
  events: {
    title: "Events",
    description: "Plan church activities, coordinate details, and keep everyone informed.",
    action: "Create event",
  },
  reports: {
    title: "Reports",
    description: "Review attendance and ministry reports to support your next leadership decision.",
    action: "Build report",
  },
  settings: {
    title: "Settings",
    description: "Configure church details, users, and access roles for your ministry workspace.",
    action: "Manage settings",
  },
} as const;

type SectionKey = keyof typeof sections;

export function generateStaticParams() {
  return Object.keys(sections).map((section) => ({ section }));
}

export default async function PlaceholderPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  if (!(section in sections)) notFound();

  const content = sections[section as SectionKey];

  return (
    <AppShell>
      <main className="placeholder-main">
        <div className="placeholder-card">
          <span className="placeholder-icon" aria-hidden="true">{content.title.slice(0, 1)}</span>
          <p className="eyebrow">Workspace section</p>
          <h1>{content.title}</h1>
          <p className="placeholder-description">{content.description}</p>
          <p className="placeholder-note">This section is ready for the next implementation pass. Your dashboard data and navigation are already connected.</p>
          <div className="placeholder-actions">
            <Link className="primary-action" href="/">Back to dashboard</Link>
            <button className="secondary-action" type="button">{content.action}</button>
          </div>
        </div>
      </main>
    </AppShell>
  );
}
