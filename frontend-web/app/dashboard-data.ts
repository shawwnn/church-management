export type ChangeTone = "positive" | "warning" | "neutral";
export type TrendRange = "week" | "month" | "quarter";

export type AttendanceMetric = {
  label: string;
  value: string;
  comparison: string;
  tone: ChangeTone;
  detail: string;
};

export type AttendanceTrendPoint = {
  label: string;
  value: number;
};

export type AttendanceCategory = {
  label: string;
  attended: number;
  expected: number;
};

export type MissingMember = {
  member: string;
  initials: string;
  cellGroup: string;
  leader: string;
  lastAttendance: string;
  status: "Follow up" | "Urgent" | "Excused";
};

export type UpcomingEvent = {
  title: string;
  date: string;
  location: string;
  type: string;
};

export type MinistryActivity = {
  title: string;
  detail: string;
  time: string;
  initials: string;
};

export const attendanceMetrics: AttendanceMetric[] = [
  { label: "Today's attendance", value: "142", comparison: "+8.4%", tone: "positive", detail: "vs. previous Sunday" },
  { label: "Present", value: "142", comparison: "+12", tone: "positive", detail: "members checked in" },
  { label: "Absent", value: "28", comparison: "5 urgent", tone: "warning", detail: "members to follow up" },
  { label: "Attendance rate", value: "83.5%", comparison: "+4.2%", tone: "positive", detail: "of expected members" },
];

export const attendanceTrends: Record<TrendRange, AttendanceTrendPoint[]> = {
  week: [
    { label: "Mon", value: 82 },
    { label: "Tue", value: 96 },
    { label: "Wed", value: 88 },
    { label: "Thu", value: 112 },
    { label: "Fri", value: 104 },
    { label: "Sat", value: 128 },
    { label: "Sun", value: 142 },
  ],
  month: [
    { label: "Week 1", value: 118 },
    { label: "Week 2", value: 126 },
    { label: "Week 3", value: 134 },
    { label: "Week 4", value: 142 },
  ],
  quarter: [
    { label: "Jan", value: 108 },
    { label: "Feb", value: 126 },
    { label: "Mar", value: 142 },
  ],
};

export const attendanceCategories: AttendanceCategory[] = [
  { label: "Sunday Celebration", attended: 142, expected: 170 },
  { label: "Cell Group", attended: 96, expected: 112 },
  { label: "Equipping", attended: 74, expected: 88 },
  { label: "Devotion", attended: 61, expected: 76 },
  { label: "Ministry activity", attended: 48, expected: 58 },
];

export const missingMembers: MissingMember[] = [
  { member: "Maria Santos", initials: "MS", cellGroup: "G12-A", leader: "Pedro Cruz", lastAttendance: "Mar 2, 2025", status: "Urgent" },
  { member: "Jonathan Reyes", initials: "JR", cellGroup: "G08-B", leader: "Anna Lim", lastAttendance: "Feb 23, 2025", status: "Follow up" },
  { member: "Clarissa Dela Cruz", initials: "CD", cellGroup: "G04-A", leader: "Mark Villanueva", lastAttendance: "Mar 2, 2025", status: "Follow up" },
  { member: "Rafael Mendoza", initials: "RM", cellGroup: "G09-C", leader: "Liza Garcia", lastAttendance: "Feb 16, 2025", status: "Excused" },
];

export const upcomingEvents: UpcomingEvent[] = [
  { title: "Sunday Celebration", date: "Today · 9:00 AM", location: "Main auditorium", type: "Service" },
  { title: "Leaders prayer meeting", date: "Tomorrow · 6:30 PM", location: "Fellowship hall", type: "Leadership" },
  { title: "Community outreach", date: "Sat, Mar 15 · 8:00 AM", location: "North district", type: "Outreach" },
];

export const recentMinistryActivity: MinistryActivity[] = [
  { title: "Youth ministry completed attendance", detail: "48 members recorded", time: "12 min ago", initials: "YM" },
  { title: "New member added to G12-A", detail: "Welcome, Hannah Flores", time: "1 hr ago", initials: "HF" },
  { title: "Equipping session marked complete", detail: "How to Lead · 22 attendees", time: "Yesterday", initials: "EL" },
];
