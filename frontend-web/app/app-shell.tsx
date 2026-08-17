"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const primaryNavigation = [
  { label: "Dashboard", href: "/", icon: "grid" },
  { label: "Members", href: "/members", icon: "users" },
  { label: "Attendance", href: "/attendance", icon: "check" },
  { label: "Cell Groups", href: "/cell-groups", icon: "group" },
  { label: "Ministries", href: "/ministries", icon: "spark" },
  { label: "Programs", href: "/programs", icon: "book" },
  { label: "Events", href: "/events", icon: "calendar" },
  { label: "Reports", href: "/reports", icon: "chart" },
];

function NavigationIcon({ name }: { name: string }) {
  const paths: Record<string, string> = {
    grid: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z",
    users: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
    check: "m5 12 4 4L19 6",
    group: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
    spark: "m12 3-1.5 5.5L5 10l5.5 1.5L12 17l1.5-5.5L19 10l-5.5-1.5L12 3ZM19 16l-.75 2.25L16 19l2.25.75L19 22l.75-2.25L22 19l-2.25-.75L19 16Z",
    book: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z",
    calendar: "M7 3v4M17 3v4M4 9h16M5 5h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z",
    chart: "M4 19V5M4 19h16M8 16v-5M12 16V8M16 16v-3",
    settings: "M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-1.7 1.7-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56V20h-2.4v-.2a1.7 1.7 0 0 0-1.03-1.56 1.7 1.7 0 0 0-1.88.34l-.06.06-1.7-1.7.06-.06A1.7 1.7 0 0 0 8.4 15a1.7 1.7 0 0 0-1.56-1.03H6v-2.4h.84A1.7 1.7 0 0 0 8.4 10a1.7 1.7 0 0 0-.34-1.88L8 8.06l1.7-1.7.06.06a1.7 1.7 0 0 0 1.88.34 1.7 1.7 0 0 0 1.03-1.56V5h2.4v.2A1.7 1.7 0 0 0 16.1 6.76a1.7 1.7 0 0 0 1.88-.34l.06-.06 1.7 1.7-.06.06A1.7 1.7 0 0 0 19.4 10a1.7 1.7 0 0 0 1.56 1.03h.04v2.4h-.04A1.7 1.7 0 0 0 19.4 15Z",
  };

  return (
    <svg className="navigation-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d={paths[name]} />
    </svg>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  return (
    <div className="dashboard-layout">
      <button className={`navigation-backdrop ${sidebarOpen ? "is-visible" : ""}`} type="button" aria-label="Close navigation" onClick={() => setSidebarOpen(false)} />
      <aside className={`navigation-panel ${sidebarOpen ? "is-open" : ""}`}>
        <div className="brand-lockup">
          <span className="brand-mark" aria-hidden="true">CM</span>
          <span>Church Ministry</span>
        </div>
        <nav aria-label="Main navigation" className="navigation-links">
          <p className="navigation-label">Workspace</p>
          {primaryNavigation.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link className={`navigation-link ${active ? "active" : ""}`} href={item.href} key={item.href} aria-current={active ? "page" : undefined}>
                <NavigationIcon name={item.icon} />
                <span>{item.label}</span>
              </Link>
            );
          })}
          <p className="navigation-label navigation-label-secondary">System</p>
          <Link className={`navigation-link ${pathname.startsWith("/settings") ? "active" : ""}`} href="/settings" aria-current={pathname.startsWith("/settings") ? "page" : undefined}>
            <NavigationIcon name="settings" />
            <span>Settings</span>
          </Link>
        </nav>
        <div className="navigation-footer">
          <span className="user-avatar" aria-hidden="true">AD</span>
          <div>
            <strong>Admin user</strong>
            <span>Church office</span>
          </div>
        </div>
      </aside>

      <section className="dashboard-content">
        <header className="topbar">
          <div className="topbar-context">
            <button className="icon-button menu-button" type="button" aria-label="Open navigation" aria-expanded={sidebarOpen} onClick={() => setSidebarOpen(true)}>
              <span className="menu-line" />
              <span className="menu-line" />
              <span className="menu-line" />
            </button>
            <div>
              <p className="topbar-kicker">Church operations</p>
              <p className="topbar-page">{pathname === "/" ? "Dashboard" : pathname.slice(1).replaceAll("-", " ")}</p>
            </div>
          </div>
          <div className="topbar-actions">
            <label className="search-field">
              <span className="search-icon" aria-hidden="true">⌕</span>
              <span className="visually-hidden">Search members and records</span>
              <input type="search" placeholder="Search members..." />
              <kbd>⌘ K</kbd>
            </label>
            <div className="popover-anchor">
              <button className="icon-button notification-button" type="button" aria-label="Notifications" aria-expanded={notificationsOpen} onClick={() => setNotificationsOpen((open) => !open)}>
                <span aria-hidden="true">♢</span>
                <span className="notification-dot" />
              </button>
              {notificationsOpen && (
                <div className="popover-card notification-popover">
                  <strong>Notifications</strong>
                  <p>You are all caught up.</p>
                </div>
              )}
            </div>
            <div className="popover-anchor">
              <button className="user-menu-button" type="button" aria-label="Open user menu" aria-expanded={userMenuOpen} onClick={() => setUserMenuOpen((open) => !open)}>
                <span className="user-avatar">AD</span>
                <span className="user-menu-copy"><strong>Admin user</strong><small>Administrator</small></span>
                <span className="user-menu-chevron" aria-hidden="true">⌄</span>
              </button>
              {userMenuOpen && (
                <div className="popover-card user-popover">
                  <strong>Admin user</strong>
                  <Link href="/settings" onClick={() => setUserMenuOpen(false)}>Account settings</Link>
                </div>
              )}
            </div>
          </div>
        </header>
        {children}
      </section>
    </div>
  );
}
