---
name: convene-team
description: Convene one of the UniBridge NL AI department teams (legal, marketing, audit, finance, students, sales, tech) — or several — on a task. Runs the specialists in parallel, then has the team lead consolidate. Use when the user says "ask the legal team", "have marketing and audit look at…", "/convene-team legal …", or wants a whole-department review.
---

# Convene a UniBridge NL team

Teams and their agents live in `.claude/agents/` (roster: `.claude/agents/README.md`).
Agent names are `<team>-<role>`; each team has one lead and four specialists.

| Team key  | Lead agent                  |
|-----------|-----------------------------|
| legal     | legal-general-counsel       |
| marketing | marketing-director          |
| audit     | audit-chief-auditor         |
| finance   | finance-cfo                 |
| students  | students-operations-lead    |
| sales     | sales-head-of-sales         |
| tech      | tech-lead                   |

## Steps

1. Parse the arguments: the first word(s) name the team(s); the rest is the task.
   If no team is named, pick the team(s) whose remit fits and say which.
2. For each team, launch its **four specialists in parallel** (one message,
   several Agent calls), each with the full task plus: "Answer only for your
   specialism; say 'nothing to add' if it is outside it."
3. When they finish, launch the **team lead** with the task and all specialist
   outputs, asking for one consolidated recommendation with priorities.
4. If several teams were convened, finish with a short cross-team summary that
   highlights disagreements (e.g. marketing wants a claim legal won't approve).
5. Report to the user: the consolidated recommendation, open decisions for the
   owner, and where any files were saved (`.company/<team>/`).

Subagents cannot launch other subagents, so this orchestration always happens
in the main session. Nothing is sent, published, signed or paid without the
owner's explicit approval.
