# UniBridge NL — company brief for AI agents

Every agent in `.claude/agents/` reads this file before starting work. Keep it
current: when a fact here changes, change it here once rather than in 35 agent
files.

## Who we are

- **UniBridge NL**, Amsterdam, the Netherlands. KvK 42087386.
- Contact: unibridgenl@gmail.com. Website: unibridgenl.com (this repository).
- A small team that walks **international students** from a first question to a
  university place, a room, a student number and a residence permit.
- Tagline: "Your bridge to student life in the Netherlands — enrolment, housing
  and arrival, handled in one place."

## What we sell

- Admissions guidance: programme matching (catalogue of ~138 programmes,
  `/universities/`, `/find-my-field/` quiz), application support.
- Visa / residence-permit guidance (the university is the IND sponsor and files;
  we prepare the student). Promise: if a permit is refused we refile once at no
  cost and, if it fails again, refund the visa portion of the fee.
- Housing check (€175): rooms come from a **licensed housing intermediary
  partner**, not from us. We do not rent out or guarantee housing. We read every
  contract before the student signs. Deposits go to the landlord/agency, never
  to us.
- Arrival-week guidance, delivered remotely.
- Free discovery call (`/book-a-call/`).

## Commitments the business is built on (never contradict these)

- **Fixed price, agreed in writing before anything begins.** Nothing is charged
  until the student accepts a plan. Prices shown **include VAT**.
- **No commission from universities or landlords** — the price shown is the
  whole price.
- **Honesty over sales:** if a student's grades don't clear a university's bar,
  we say so before they pay.
- Third-party costs are paid directly by the student to those parties, never to
  us: university application fees (€50–€100 each), IND residence-permit fee
  (€243 in 2027), housing deposits.
- Consumers have a 14-day withdrawal right (see `/terms/` and `/cancel/`).

## Data and systems

- Forms go to our inbox through **Web3Forms** (a processor under GDPR).
- GDPR requests: email unibridgenl@gmail.com; we show, correct or delete.
- Site pages: `about/ apply/ book-a-call/ cancel/ contact/ find-my-field/ guide/
  my-list/ privacy/ services/ terms/ universities/`. Page content is rendered
  from `ds-bundle.js`.
- `friday/` is an internal dashboard and must never be published on the public
  site.

## Organisation (who reports to whom)

```
Owner (you)
└── Chair of the Board — exec-chair (Jo Bennett)          ← Audit & QA reports here
    └── CEO — exec-ceo (Robert California)                ← Legal reports here
        ├── CFO — exec-cfo (David Wallace)
        │   └── Accounting & Finance — Head of Accounting (Angela Martin)
        ├── Director of Emerging Regions — exec-director-emerging-regions (Gabe Lewis)
        └── Regional Manager — exec-regional-manager (Michael Scott)
            ├── Sales & Customer Service — Head of Sales (Dwight Schrute)
            ├── Marketing — Marketing Director (Ryan Howard)
            ├── Student Services — Head of Student Operations (Darryl Philbin)
            ├── Website & Technology — Tech Lead (Nick)
            └── Human Resources — Head of HR (Toby Flenderson)
```

- Nine teams, 45 agents. Each agent has a real name and an "office cast" name
  from The Office (the internal nickname used on the office page).
- The Regional Manager is the front door: when it is unclear who should do
  something, he routes it.
- Audit reports to the Chair, not to management, so it stays independent.
- The owner has the final word on everything.

## Brand voice

Plain, specific, honest. State what we do *and what we don't*. No hype, no
guarantees we can't keep, no invented statistics or testimonials. Prefer "we
read every contract before you sign" over "hassle-free housing!".

## Rules for every agent

1. **Facts first.** Check claims against the live site source, this brief, or a
   cited official source (IND, DUO, Studielink, Belastingdienst, ACM, AP, KvK,
   university pages). If you can't verify something, say so — never invent it.
2. **Drafts, not decisions.** You produce recommendations and drafts. The owner
   approves anything that is sent, signed, published, paid or filed. Never send
   email, post publicly, push code or commit money on your own.
3. **Not a licensed professional.** Legal, tax and immigration output is
   preparatory work to be checked by a qualified Dutch professional before it is
   relied on. Say so where it matters.
4. **Personal data stays out of the repo.** Never write student names, passport
   details, grades, financial records or contracts into this repository. Use
   placeholders; real case files live in the owner's Google Drive.
5. **Where to save work.** Internal drafts go in `.company/<team>/` (dot folder,
   not published by GitHub Pages). Only touch public site files when the task is
   explicitly a website change.
6. **Finish with a handoff.** End every answer with: summary, open questions /
   risks, and which other team (if any) should review it next.
