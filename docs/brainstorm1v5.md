Great. **We now have enough requirements to start designing the actual system.** The offline requirement in particular changes some of the architecture significantly.

I want to first lock in what you've told me, because there are several important rules that should become formal system requirements.

# 1. Your system is not just attendance

I would now define the project as:

> **Church People, Discipleship & Attendance Management System**

with these major modules:

```text
CHURCH SYSTEM
│
├── People
│
├── Leadership Hierarchy
│
├── Cell Groups
│
├── Attendance
│   ├── Sunday Celebration
│   ├── Cell Group
│   ├── Devotion
│   ├── Equipping
│   └── Ministries
│
├── Equipping / Discipleship
│   └── Encounter → Post-E → LWAP → ...
│
├── Ministries
│   ├── Music
│   ├── Dance
│   └── Other
│
├── Follow-up
│
├── Reports / Analytics
│
└── User Access / Audit
```

---

# 2. Person becomes the central entity

Every person has **one permanent identity in the system**.

Something conceptually like:

```text
PERSON
────────────────────────
Person ID
First Name
Last Name
Contact Number
Address
Birthday
Gender
Marital Status
Date Joined
Date Converted
Date Became Member
Status
Primary Leader
```

And then additional relationships attach to that person.

For example:

```text
Juan
│
├── Leader: Shawn
├── Cell Group
├── Equipping Enrollment
├── Music Team
├── Attendance
└── Follow-up
```

This is much safer than having separate "Sunday members," "Equipping members," "Music members," etc.

---

# 3. Your "elderly" definition is actually marital/couple-based

This is an important correction.

You aren't defining the dashboard category simply by age.

You're effectively saying:

> **Boys/Girls = youth/unmarried category**
>
> **Elderly = married/couple category**

So the dashboard can produce something like:

| Category      |   Total |
| ------------- | ------: |
| Boys          |      82 |
| Girls         |      91 |
| Elderly Men   |      13 |
| Elderly Women |      14 |
| **Total**     | **200** |

We should probably call this internally something more neutral like `marital_category`, rather than literally calling the database field `elderly`, because your church's definition may evolve.

---

# 4. Ministries are many-to-many

A person can belong to multiple ministries:

```text
Juan
 ├── Music Team
 ├── Dance Team
 └── Other Ministry
```

And each ministry can have its own attendance.

So:

```text
PERSON
   ↕
MINISTRY MEMBERSHIP
   ↕
MINISTRY
```

Then:

```text
MINISTRY ATTENDANCE
```

can track:

> Music rehearsal — Present
> Dance practice — Present
> Leadership training — Present

This is exactly why we shouldn't put:

```text
ministry = "Music"
```

inside the Person table.

---

# 5. Your offline requirement is a BIG architectural requirement

This is probably the most technically important thing you've told me.

Your church has:

> **No reliable internet/Wi-Fi at the church.**

But individual phones may have connectivity.

You want the system to behave more like an offline-capable application:

```text
                CHURCH
                  │
             NO INTERNET
                  │
        ┌─────────┴─────────┐
        ↓                   ↓
   Device A             Device B
 Attendance             Attendance
        │                   │
        └─────────┬─────────┘
                  │
             Local Data
                  │
           Later Sync
                  ↓
              SERVER
                  │
           CENTRAL DATABASE
```

This means we **cannot simply build a normal web CRUD application and expect it to work perfectly**.

We need an **offline-first architecture**.

---

# 6. Your QR/barcode requirement fits this very well

Your attendance workflow could eventually be:

```text
PERSON ARRIVES
      ↓
QR / BARCODE SCANNED
      ↓
Device identifies Person ID
      ↓
Attendance saved LOCALLY
      ↓
Timestamp recorded
      ↓
"Present"
      ↓
Later internet becomes available
      ↓
SYNC TO CENTRAL SERVER
```

And manual fallback:

```text
QR unavailable
      ↓
Search person's name
      ↓
Mark Present
```

And emergency fallback:

```text
Device unavailable
      ↓
Paper
      ↓
Later encoded by Attendance Team
```

So your system should support **three capture methods**:

1. **Barcode/QR — primary**
2. **Manual digital entry — secondary**
3. **Paper → later encoding — emergency fallback**

That's a very practical architecture for your environment.

---

# 7. We need to be careful with duplicate attendance during synchronization

Imagine two attendance devices scan Juan:

```text
Device A
Juan
8:41 AM

Device B
Juan
8:42 AM
```

The server cannot create:

> Juan = 2 attendances

for the same event.

So each attendance event needs a unique identity, something conceptually like:

```text
attendance_id
person_id
event_id
timestamp
device_id
sync_status
```

Then the server can enforce:

> **One person can only have one attendance record for a particular event/session.**

That's a critical rule for your offline architecture.

---

# 8. Attendance correction needs an audit trail

You've confirmed:

> Admin can change attendance.

But we should preserve:

```text
Original:
Absent

Changed to:
Present

Changed by:
Admin Shawn

Changed at:
Aug 14, 2026 9:32 PM

Reason:
Attendance team missed person
```

That gives you a trustworthy **single source of truth**.

The attendance team doesn't need permission to modify historical records.

---

# 9. Your dashboard priority is now very clear

When you open the application, the first screen should answer:

### 1. How many attended?

### 2. Who is absent?

### 3. How does attendance compare with previous periods?

### 4. Who needs follow-up?

### 5. What else needs my attention?

So instead of designing a dashboard around random charts, we can organize it around **decision-making**.

Something like:

```text
┌───────────────────────────────────────────────┐
│              TODAY / CURRENT                  │
├───────────────┬───────────────┬───────────────┤
│ TOTAL PRESENT │ ABSENT        │ ATTENDANCE %  │
│     182       │      18       │      91%      │
└───────────────┴───────────────┴───────────────┘

┌───────────────────────────────────────────────┐
│             ATTENDANCE TREND                  │
│                                               │
│ This week       91%                           │
│ Last week       87%                           │
│ Last month      86%                           │
│                                               │
│          📈 graph                             │
└───────────────────────────────────────────────┘

┌───────────────────┐ ┌─────────────────────────┐
│ ABSENT            │ │ FOLLOW-UP               │
│ 18 people         │ │ 7 people                │
│                   │ │                         │
│ Search / Filter   │ │ 2 absences              │
└───────────────────┘ └─────────────────────────┘
```

Then below that:

- Sunday
- Cell Group
- Equipping
- Devotion
- Ministries
- Leadership
- Equipping progression

---

# 10. Email notifications

For MVP:

> **Email notifications**

is sufficient.

For example:

> **Equipping Attendance Alert**

> Juan has reached 2 absences in SOL 1.

Then:

> **Equipping Drop Alert**

> Juan has reached 3 absences in SOL 1 and has been marked for the drop/re-enrollment process.

Later, if you build a mobile app:

> Push notifications

can be added without redesigning the core database.

---

# 11. I would make the system "rules-driven"

This is another important architectural decision.

Don't hard-code:

```text
if absences == 3:
    drop_student()
```

Instead, the system should have configurable rules.

Conceptually:

```text
Attendance Rule
────────────────────────
Activity: Equipping
Maximum Absences: 3
Action: Notify + Mark for Drop
```

Because you already told me:

> The Senior Pastor can adjust the progression depending on the situation.

So your system should be flexible enough that the church's rules can evolve without rewriting the whole application.

---

# 12. We are now ready for the actual ERD

At this point, I would **stop asking you generic questions**.

The next step should be to take everything you've told me and design the **domain model**.

I expect something roughly in this direction:

```text
PERSON
   │
   ├─────────────── LEADERSHIP_RELATIONSHIP
   │
   ├─────────────── CELL_GROUP
   │
   ├─────────────── EQUIPPING_ENROLLMENT
   │                         │
   │                         └── EQUIPPING_BATCH
   │                                  │
   │                                  └── TEACHER
   │
   ├─────────────── MINISTRY_MEMBERSHIP
   │                         │
   │                         └── MINISTRY
   │
   └─────────────── ATTENDANCE
                           │
                           └── EVENT
                                  │
                                  ├── Sunday
                                  ├── Cell Group
                                  ├── Devotion
                                  ├── Equipping
                                  └── Ministry
```

And around that:

```text
USER
ROLE
PERMISSION
NOTIFICATION
FOLLOW_UP
AUDIT_LOG
SYNC
DEVICE
```

The **offline synchronization layer** will sit between the attendance device and the central API/database.

---

## One last design decision before I draw the actual ERD

There is one thing I don't want to guess:

### What technology are you planning to use?

Given your previous web-dev work, I'm guessing you may want something like:

**Frontend**

- React / Next.js
- Tailwind
- shadcn/ui

**Backend**

- Node.js
- Express or Next.js API

**Database**

- PostgreSQL

But the **offline-first requirement** makes the choice particularly important.

If you're still deciding, that's okay. Tell me simply:

> **"Choose the stack for me."**

or tell me your preferred stack.

Then I can design the **actual database schema and full-stack architecture around the 200 → 400+ scaling requirement and offline attendance**, rather than giving you a generic CRUD architecture.
