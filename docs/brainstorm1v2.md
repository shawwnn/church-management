Yes. This clarifies the architecture a lot. You’ve actually introduced a **very important distinction**: not all attendance is the same.

## What I now understand

You have **4 recurring weekly activities** that determine a person's normal weekly participation:

1. **Sunday Celebration**
2. **Cell Group**
3. **Equipping**
4. **Devotion**

These should each have their **own attendance and absence history**.

Then you have additional activities such as:

- Encounter
- Post-Encounter
- LWAP
- How to Lead
- Soul 1
- Undercover
- Soul 2
- Ladder of Success
- Soul 3
- Leadership Training
- Gimik/Anniversary
- Music Team
- Other special/custom events

### The important rule

For the four weekly activities:

> **Absent once ≠ automatically dropped.**

Instead, the system should track absences **per activity**.

For example:

| Person | Sunday | Cell Group | Equipping | Devotion |
| ------ | -----: | ---------: | --------: | -------: |
| Juan   |      0 |          1 |         0 |        2 |
| Maria  |      0 |          0 |         2 |        0 |
| Pedro  |      3 |          1 |         0 |        0 |

And the system can determine:

> Juan → needs Devotion follow-up
> Maria → needs Equipping follow-up
> Pedro → has reached 3 Sunday absences

For **equipping specifically**, reaching 3 absences triggers the "dropped" process.

And yes — I would make the **3rd-absence condition a system-generated alert/pop-up**, rather than relying on somebody remembering it.

---

# Your attendance capture is also becoming clear

During an event:

```text
Person arrives
      ↓
Attendance team searches/selects person
      ↓
Present = TRUE
      ↓
Exact timestamp recorded
      ↓
Central attendance database
```

And importantly:

> **Attendance team should NOT be editing complex information.**

Their job is essentially:

**"Was this person here?" → TRUE/FALSE**

That's good system design because it keeps the attendance interface extremely simple.

Other authorized people can handle corrections, but only **Super User/Admin** can modify attendance afterward.

---

# Your "single source of truth"

I think this should become one of the fundamental principles:

### ONE PERSON RECORD

There should never be:

```text
Juan in Sunday database
Juan in Equipping database
Juan in Soul 1 database
Juan in Cell Group database
```

Instead:

```text
                PERSON
                  │
       ┌──────────┼──────────┐
       ↓          ↓          ↓
   Cell Group  Training   Attendance
                            │
                    ┌───────┼───────┐
                    ↓       ↓       ↓
                  Sunday  Cell    Equipping
```

Juan is **one person**.

His attendance is simply a collection of records associated with that person.

This becomes extremely powerful when you ask:

> "Who hasn't attended anything for one month?"

The system doesn't need to search four different databases.

It queries the person's attendance history.

---

# Your hierarchy needs another clarification

You said:

> "If primary 12 or 144 or 1728..."

This tells me your church has a **discipleship/leadership hierarchy**, and this is probably going to be one of the most important parts of the database.

I don't want to assume the structure.

So let's do **Round 3**, specifically for your church's organizational model.

### 26. Explain Primary / 12 / 144 / 1728

What exactly do these mean?

For example, is it something like:

```text
Pastor
  ↓
12
  ↓
144
  ↓
1728
```

Or is it:

```text
Primary
 ├── 12
 │    ├── 144
 │    └── ...
```

Tell me how **one ordinary member** relates to these.

---

### 27. Can one person have multiple roles?

For example, someone could be:

> Member + Cell Leader + Music Team

or:

> Member + 12 + Equipping Leader

If yes, we shouldn't make `role` a single field like:

```text
role = "cell leader"
```

We'd need a proper role/assignment system.

---

### 28. Can someone become a leader later?

You said someone who attends has their own cell leader and can eventually have the ability to handle members.

So:

> Member → becomes leader → gets members

Correct?

If yes, should the system preserve the history?

Example:

> 2025: Member under Leader A
> 2026: Became Cell Leader
> 2026: Assigned 8 members

---

### 29. What exactly is a Cell Group?

Is a cell group:

> **Leader + fixed members**

?

And can a cell group:

- grow?
- split?
- merge?
- become inactive?
- change its name?

This matters because **cell-group history** is important for your growth reports.

---

### 30. "One leader for a lifetime" — confirm the exception

You said the leader normally doesn't change unless there is a special case.

So I would design it as:

```text
Person
   ↓
Primary/Original Leader
```

and preserve that relationship permanently.

But separately allow:

```text
Current Cell Group
Current Leader
```

to change when an authorized admin makes an exception.

That gives you historical accuracy.

---

### 31. What exactly is "equipping"?

You mentioned:

> Win → Consolidate → Disciple → Send

Are these **four stages of the person's journey**?

For example:

```text
WIN
 ↓
CONSOLIDATE
 ↓
DISCIPLE
 ↓
SEND
```

And then within these stages are classes like:

> Encounter → Post-Encounter → LWAP → How to Lead → Soul 1 → ...

?

Or are those separate things?

---

### 32. Can a person be in multiple equipping classes simultaneously?

Example:

> Maria
> Post-Encounter ✅
> LWAP ✅
> Soul 1 ✅

Or must she complete one before moving to the next?

---

### 33. What happens when someone completes an equipping class?

Do you want the system to record:

```text
Class: Soul 1
Started: Aug 1
Completed: Sept 15
Status: COMPLETED
```

rather than simply:

```text
Soul 1 = TRUE
```

?

I strongly recommend the former if this system is going to become your church's long-term database.

---

### 34. What does "dropped" actually mean?

This is important.

If someone reaches 3 absences in Equipping, does the system:

**A.** Mark them `Dropped`

**B.** Mark them `Dropped` but preserve all historical attendance

**C.** Notify the leader and pastor, but let a human decide whether they're officially dropped

I'd recommend **C**:

> System detects → system alerts → authorized leader/pastor decides → system records decision.

That prevents automation from making a potentially important pastoral decision by itself.

---

### 35. What should the main dashboard answer?

You already gave me several questions. Let's turn them into requirements.

Should the dashboard be able to answer things like:

**Today**

- How many attended?
- How many are expected?
- How many are absent?
- Attendance percentage?

**This week**

- Sunday attendance
- Cell group attendance
- Equipping attendance
- Devotion attendance

**People**

- Who missed the last Sunday?
- Who has 2 consecutive absences?
- Who has 3?
- Who hasn't attended anything recently?
- Who is active?
- Who is inactive?

**Leadership**

- Which leaders have members with absences?
- Which leaders haven't followed up?
- Which cell groups are growing?
- Which are stagnant?
- Which leaders have the most/least active members?

**Equipping**

- Who is currently in each class?
- Who completed each class?
- Who dropped?
- Who is approaching 3 absences?

If that's roughly right, we're getting very close to the actual system requirements.

---

## One more thing I strongly recommend

Don't make the database's main concept **"attendance."**

Make it:

### **PERSON + EVENT + ATTENDANCE**

Something conceptually like:

```text
PERSON
  │
  ├── belongs to CELL GROUP
  ├── has LEADER
  ├── has DISCIPLESHIP STAGE
  ├── has EQUIPPING ENROLLMENTS
  │
  └── has ATTENDANCE RECORDS
             │
             └── EVENT
                  ├── Sunday Celebration
                  ├── Cell Group
                  ├── Devotion
                  ├── Soul 1
                  ├── Encounter
                  └── any future event
```

Then the system can scale from:

**200 → 400 → 1,000 → 5,000**

without us rebuilding the fundamental database every time you create a new church activity.

Once you answer **26–35**, I can start translating this into the **actual ERD/database design**—tables/entities, relationships, primary keys, foreign keys, attendance logic, absence logic, roles/permissions, and the eventual backend/frontend architecture.
