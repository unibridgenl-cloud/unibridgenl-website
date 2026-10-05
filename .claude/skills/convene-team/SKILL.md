---
name: convene-team
description: Convene one of the UniBridge NL AI department teams (exec, legal, hr, marketing, audit, finance, students, sales, tech) — or several — on a task. Runs the specialists in parallel, then has the team lead consolidate. Use when the user says "ask the legal team", "have marketing and audit look at…", "/convene-team legal …", or wants a whole-department review.
---

# Convene a UniBridge NL team

Teams and their agents live in `.claude/agents/` (roster: `.claude/AGENTS.md`).
Agent names are `<team>-<role>`; each team has one lead and four specialists.

| Team key  | Team                       | Lead agent (office cast)                     |
|-----------|----------------------------|----------------------------------------------|
| exec      | Executive (Corporate)      | exec-ceo (Robert California)                 |
| legal     | Legal & Compliance         | legal-general-counsel (Jan Levinson)         |
| audit     | Audit & Quality Assurance  | audit-chief-auditor (Charles Miner)          |
| finance   | Accounting & Finance       | finance-head-of-accounting (Angela Martin)   |
| sales     | Sales & Customer Service   | sales-head-of-sales (Dwight Schrute)         |
| marketing | Marketing                  | marketing-director (Ryan Howard)             |
| students  | Student Services           | students-operations-lead (Darryl Philbin)    |
| tech      | Website & Technology       | tech-lead (Nick)                             |
| hr        | Human Resources            | hr-head (Toby Flenderson)                    |

Office cast names map to agents through each agent's description ("Office cast:
…"), so "ask Dwight" means `sales-head-of-sales`. The org chart is in
`.claude/company-brief.md`.

## Steps

1. Parse the arguments: the first word(s) name the team(s); the rest is the task.
   If no team is named, first run `exec-regional-manager` (Michael Scott) to
   route the task; then convene the teams he names.
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
