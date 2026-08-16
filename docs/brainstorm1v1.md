Yes. Your answers are enough to reveal that this is **much bigger than an attendance counter**.

What you're describing is essentially a **Church Attendance & Member Management System** with a single source of truth.

The core problem appears to be:

> **Capture attendance once → identify exactly who attended → immediately know who is absent → trigger the correct follow-up → produce historical reports.**

And because you want to scale from ~200 to ~400+, we should design the data model correctly **before** touching the UI.

### What I understand so far

Your system needs to handle:

- ~200 people initially, eventually ~400+
- People
- Permanent/long-term cell leader relationships
- Cell groups
- Attendance teams
- Equipping/training tracks
- Multiple event types
- Sunday service
- Sunday cell group
- Encounter
- Post-Encounter
- LWAP
- How to Lead
- Soul 1/2/3
- Undercover
- Ladder of Success
- Leadership training
- Gimmick/anniversary
- Music team activities
- Special/custom events
- Attendance history
- Absence counting
- Leader follow-up
- Pastor escalation
- Reports on active/inactive members
- Cell-group growth
- Real-time attendance totals

There's also an important constraint:

**Paper attendance isn't completely reliable.** Some people can't write, some forget, and some arrive after the attendance process.

So we shouldn't simply build a digital version of the paper sheet. We need to design a **better attendance-capture workflow**.

---

# Round 2 — Let's design the actual attendance process

These questions are more important now.

### 11. How should attendance actually be captured?

Which of these would realistically work in your church?

**A. Attendance team searches/selects person's name**

> "Shawn Lapuz" → Present

**B. QR code**

Each member has a QR code/card → attendance team scans it.

**C. Self check-in**

Member scans a QR code at the entrance → selects/confirm their name.

**D. Combination**

QR/self-check-in + attendance team manually adds people who weren't captured.

My instinct is **D**, but I want to understand your actual environment.

---

### 12. Do you need to know the exact attendance time?

For example:

> Shawn — Sunday Service — 8:47 AM

versus simply:

> Shawn — Sunday Service — PRESENT

This matters because you mentioned people arriving late.

---

### 13. Can one person attend multiple activities on the same day?

For example:

> Sunday Service — Present
> Sunday Cell Group — Present
> Leadership Training — Present

all on **August 9, 2026**.

If yes, these must be separate attendance records, even though they're on the same date.

---

### 14. What happens when someone attends but doesn't write?

You mentioned elders and people who cannot write.

Who should be able to say:

> "Yes, I saw Juan. He was here."

and mark Juan as present?

Is it:

- Attendance team
- Cell leader
- Ministry leader
- Any authorized staff
- Pastor

?

---

### 15. What happens when someone is a visitor?

This is extremely important.

Suppose:

> Someone comes to Sunday service for the first time.

Do you want the system to create them as a **new person/member record**, or just record:

> Visitor — 1

?

And if they come again next Sunday, should the system recognize them?

---

### 16. What happens when someone becomes a member?

For example:

> Visitor → New believer → Cell member → Equipping → Leader

Do you have a formal progression/process like this?

If yes, tell me the actual stages you use.

---

### 17. What exactly does "three absences = dropped" mean?

This needs to be very precise.

Is it:

> 1st consecutive absence → reminder
> 2nd consecutive absence → leader must follow up
> 3rd consecutive absence → dropped

?

Or are you counting **any three absences**, even if they are separated?

For example:

> Present
> Absent
> Present
> Absent
> Present
> Absent

Does that person get dropped?

---

### 18. Is absence counted per activity?

This is another major design question.

Suppose Maria attends:

- Sunday Service ✅
- Sunday Cell Group ❌
- Soul 1 ✅
- Soul 2 ❌

Should the system say:

> Maria has 1 Sunday-service absence

and separately:

> Maria has 1 Soul 2 absence

?

Or do you have an overall attendance/discipleship status?

---

### 19. What does "active member" mean?

This is one of the most important definitions in the entire system.

Is someone **active** if they:

- attended at least once in the last month?
- attended Sunday service?
- attended their cell group?
- are currently enrolled in an equipping class?
- are being actively followed by a leader?

We need one formal definition, or possibly **multiple statuses**.

---

### 20. What does a leader need to see?

Imagine a Cell Leader opens the system on Monday morning.

What should their screen show?

For example:

> **My Cell Group**
>
> 12 Members
> 10 Present Sunday
> 2 Absent
>
> 🔴 Juan — 2 consecutive absences
> 🟡 Pedro — 1 absence
> 🟢 Maria — Present
>
> **Follow-up required: 2**

Would something like that solve the problem?

---

### 21. What should the attendance team see during Sunday service?

This is a different screen from the leader's screen.

Imagine **200 people arriving within 30–60 minutes**.

What should the attendance team's screen look like?

Do they need:

> Search person → tap Present

or:

> Scan QR → automatically mark Present

or potentially:

> Search + QR + manual correction

?

---

### 22. Who can edit attendance after the event?

This is critical for your "single source of truth."

Suppose someone says:

> "I was there yesterday, but I wasn't recorded."

Who can correct it?

- Attendance team
- Cell leader
- Pastor
- Admin
- Anyone?

And should the system keep an **audit trail**?

For example:

> Attendance originally: Absent
> Changed to Present
> Changed by: Shawn
> Date: Aug 10, 2026

I strongly recommend **yes** if this becomes your official church record.

---

### 23. Do you need historical data from the paper records?

You currently have paper records.

Do you want the new system to start:

**A. From today onward**

or

**B. Import previous attendance history**

or

**C. Gradually encode old records when needed**

?

---

### 24. What are the different organizational levels?

This will determine the database structure.

For example, is your structure something like:

> Church
> → Area
> → Cell Group
> → Cell Leader
> → Members

Or something else?

Please describe your **actual hierarchy**, even if it's messy.

---

### 25. Finally: who should have access to what?

For example:

| Role            | Can see               |
| --------------- | --------------------- |
| Attendance Team | Everyone's attendance |
| Cell Leader     | Own members           |
| Area Leader     | Own area              |
| Pastor          | Everything            |
| Member          | Own attendance        |
| Admin           | Everything            |

Is that approximately how you envision it?

---

## One architectural principle I already see

I would **not** make your database like:

```text
Person
SundayAttendance
CellGroupAttendance
EncounterAttendance
PostEncounterAttendance
Soul1Attendance
Soul2Attendance
Soul3Attendance
...
```

That will become painful when you add your 15th, 20th, or 30th activity.

Instead, I'm leaning toward a generalized model:

```text
PERSON
   │
   ├── CELL GROUP
   │
   ├── LEADER
   │
   └── ATTENDANCE
          │
          └── EVENT
                 │
                 ├── Sunday Service
                 ├── Cell Group
                 ├── Encounter
                 ├── Soul 1
                 ├── Soul 2
                 ├── Soul 3
                 ├── Leadership Training
                 └── Custom Event
```

That means when your church invents a new activity next year, **you don't need to redesign the database**.

You simply create a new event type.

That's the kind of thinking we need if your goal is genuinely **"build it once and let it scale."**

Answer **11–25** in whatever format is easiest. After that, I'll move us into the next layer: **the actual database entities and relationships**, and we'll start designing what your full-stack application should look like.
