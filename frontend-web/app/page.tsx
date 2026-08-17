"use client";

import Link from "next/link";
import { useState } from "react";
import { AppShell } from "./app-shell";
import {
  attendanceCategories,
  attendanceMetrics,
  attendanceTrends,
  missingMembers,
  recentMinistryActivity,
  upcomingEvents,
  type TrendRange,
} from "./dashboard-data";

const trendRangeLabels: Record<TrendRange, string> = {
  week: "Week",
  month: "Month",
  quarter: "Quarter",
};

function getChartBarLevel(value: number, maximum: number) {
  const ratio = value / maximum;
  if (ratio >= 0.9) return "chart-bar-level-five";
  if (ratio >= 0.75) return "chart-bar-level-four";
  if (ratio >= 0.6) return "chart-bar-level-three";
  if (ratio >= 0.45) return "chart-bar-level-two";
  return "chart-bar-level-one";
}

function getProgressLevel(attended: number, expected: number) {
  const ratio = attended / expected;
  if (ratio >= 0.9) return "progress-level-five";
  if (ratio >= 0.8) return "progress-level-four";
  if (ratio >= 0.7) return "progress-level-three";
  return "progress-level-two";
}

export default function DashboardPage() {
  const [trendRange, setTrendRange] = useState<TrendRange>("week");
  const trendPoints = attendanceTrends[trendRange];
  const maximumTrendValue = Math.max(...trendPoints.map((point) => point.value));

  return (
    <AppShell>
      <main className="dashboard-main">
        <header className="page-header">
          <div>
            <p className="eyebrow">Sunday, March 9, 2025</p>
            <h1>Good morning, Admin</h1>
            <p className="page-introduction">Here is what is happening across your church today.</p>
          </div>
          <Link className="primary-action" href="/attendance">Record attendance <span aria-hidden="true">→</span></Link>
        </header>

        <section className="summary-grid" aria-label="Today's attendance summary">
          {attendanceMetrics.map((item) => (
            <article className="summary-card" key={item.label}>
              <div className="summary-card-heading">
                <p>{item.label}</p>
                <span className={`summary-icon summary-icon-${item.tone}`} aria-hidden="true">{item.label === "Attendance rate" ? "%" : "●"}</span>
              </div>
              <strong>{item.value}</strong>
              <div className="summary-card-footer">
                <span className={`summary-change ${item.tone}`}>{item.comparison}</span>
                <span>{item.detail}</span>
              </div>
            </article>
          ))}
        </section>

        <section className="dashboard-grid dashboard-grid-primary">
          <article className="content-card attendance-card">
            <div className="card-heading">
              <div>
                <p className="eyebrow">Attendance overview</p>
                <h2>Attendance trend</h2>
              </div>
              <div className="segmented-control" role="group" aria-label="Attendance trend period">
                {(Object.keys(trendRangeLabels) as TrendRange[]).map((range) => (
                  <button className={trendRange === range ? "is-selected" : ""} type="button" key={range} aria-pressed={trendRange === range} onClick={() => setTrendRange(range)}>
                    {trendRangeLabels[range]}
                  </button>
                ))}
              </div>
            </div>
            <div className="chart-summary">
              <strong>{trendPoints[trendPoints.length - 1].value}</strong>
              <span>members attended</span>
              <span className="chart-summary-change">+8.4% from last period</span>
            </div>
            <div className="attendance-visual" role="img" aria-label={`Attendance trend for the selected ${trendRange} period`}>
              <div className="chart-grid-lines" aria-hidden="true"><span /><span /><span /><span /></div>
              <div className="chart-bars">
                {trendPoints.map((point) => (
                  <div className="chart-column" key={point.label}>
                    <span className={`chart-bar ${getChartBarLevel(point.value, maximumTrendValue)}`} title={`${point.label}: ${point.value} attendees`} />
                    <small>{point.label}</small>
                  </div>
                ))}
              </div>
            </div>
          </article>

          <article className="content-card category-card">
            <div className="card-heading">
              <div>
                <p className="eyebrow">Participation</p>
                <h2>Attendance by category</h2>
              </div>
              <Link className="text-link" href="/reports">View report</Link>
            </div>
            <div className="category-list">
              {attendanceCategories.map((category) => {
                const percentage = Math.round((category.attended / category.expected) * 100);
                return (
                  <div className="category-item" key={category.label}>
                    <div className="category-heading">
                      <span>{category.label}</span>
                      <strong>{percentage}%</strong>
                    </div>
                    <div className="progress-track" aria-label={`${category.label}: ${category.attended} of ${category.expected} attended`}>
                      <span className={`progress-fill ${getProgressLevel(category.attended, category.expected)}`} />
                    </div>
                    <small>{category.attended} of {category.expected} expected</small>
                  </div>
                );
              })}
            </div>
          </article>
        </section>

        <section className="dashboard-grid dashboard-grid-secondary">
          <article className="content-card missing-members-card">
            <div className="card-heading">
              <div>
                <p className="eyebrow">Needs attention</p>
                <h2>Missing members</h2>
              </div>
              <Link className="text-link" href="/members">View all</Link>
            </div>
            <p className="card-description">Members who were expected but did not attend today.</p>
            <div className="table-scroll-area">
              <table className="members-table">
                <thead>
                  <tr><th>Member</th><th>Cell group</th><th>Leader</th><th>Last attendance</th><th>Status</th><th><span className="visually-hidden">Action</span></th></tr>
                </thead>
                <tbody>
                  {missingMembers.map((member) => (
                    <tr key={member.member}>
                      <td><div className="member-cell"><span className="member-avatar">{member.initials}</span><strong>{member.member}</strong></div></td>
                      <td>{member.cellGroup}</td>
                      <td>{member.leader}</td>
                      <td>{member.lastAttendance}</td>
                      <td><span className={`status-badge status-${member.status.toLowerCase().replace(" ", "-")}`}>{member.status}</span></td>
                      <td><Link className="row-action" href="/members">View</Link></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          <div className="dashboard-side-column">
            <article className="content-card events-card">
              <div className="card-heading">
                <div>
                  <p className="eyebrow">What is next</p>
                  <h2>Upcoming events</h2>
                </div>
                <Link className="text-link" href="/events">View all</Link>
              </div>
              <div className="event-list">
                {upcomingEvents.map((event) => (
                  <Link className="event-item" href="/events" key={event.title}>
                    <span className="event-dot" aria-hidden="true" />
                    <div><strong>{event.title}</strong><span>{event.date}</span><small>{event.location}</small></div>
                    <span className="event-type">{event.type}</span>
                  </Link>
                ))}
              </div>
            </article>

            <article className="content-card activity-card">
              <div className="card-heading"><div><p className="eyebrow">Stay updated</p><h2>Recent activity</h2></div></div>
              <div className="activity-list">
                {recentMinistryActivity.map((activity) => (
                  <div className="activity-item" key={activity.title}>
                    <span className="activity-avatar">{activity.initials}</span>
                    <div><strong>{activity.title}</strong><span>{activity.detail}</span><small>{activity.time}</small></div>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>
      </main>
    </AppShell>
  );
}
