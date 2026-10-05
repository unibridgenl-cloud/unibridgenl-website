# UniBridge NL — AI agent teams

35 Claude Code subagents organised as 7 departments of 5 (one lead + four specialists).
Every agent reads `../company-brief.md` first — update company facts there, once.

## How to use

- **One specialist:** ask in plain words, e.g. *"Use legal-privacy-officer to check our privacy page"*, or type `@` and pick the agent.
- **A whole team:** `/convene-team legal Review our new refund policy` — runs the four specialists in parallel, then the lead consolidates.
- **Several teams:** `/convene-team marketing legal Draft and check a TikTok campaign for Indian students`.
- Internal work is saved to `.company/<team>/` (not published to the website).
- Agents only draft and recommend. Sending, publishing, signing and paying stay with you.

## Roster

### Legal & Compliance

| Agent | Role |
|---|---|
| `legal-consumer-law-specialist` | Consumer Law Specialist |
| `legal-contracts-counsel` | Contracts Counsel |
| `legal-general-counsel` | General Counsel (team lead) |
| `legal-immigration-compliance-specialist` | Immigration Compliance Specialist |
| `legal-privacy-officer` | Privacy Officer (GDPR / AVG) |

### Marketing

| Agent | Role |
|---|---|
| `marketing-content-writer` | Content Writer |
| `marketing-director` | Marketing Director (team lead) |
| `marketing-growth-analyst` | Growth Analyst |
| `marketing-seo-specialist` | SEO Specialist |
| `marketing-social-media-manager` | Social Media Manager |

### Audit & Quality

| Agent | Role |
|---|---|
| `audit-chief-auditor` | Chief Auditor (team lead) |
| `audit-compliance-auditor` | Compliance Auditor |
| `audit-financial-auditor` | Financial Auditor |
| `audit-service-quality-auditor` | Service Quality Auditor |
| `audit-website-claims-auditor` | Website Claims Auditor |

### Finance

| Agent | Role |
|---|---|
| `finance-bookkeeper` | Bookkeeper |
| `finance-cfo` | CFO (team lead) |
| `finance-forecasting-analyst` | Forecasting Analyst |
| `finance-pricing-analyst` | Pricing Analyst |
| `finance-tax-specialist` | Tax Specialist |

### Student Services (Operations)

| Agent | Role |
|---|---|
| `students-admissions-advisor` | Admissions Advisor |
| `students-arrival-coach` | Arrival Coach |
| `students-housing-coordinator` | Housing Coordinator |
| `students-operations-lead` | Head of Student Operations (team lead) |
| `students-visa-coordinator` | Visa & Residence Permit Coordinator |

### Sales & Customer Success

| Agent | Role |
|---|---|
| `sales-customer-support-specialist` | Customer Support Specialist |
| `sales-discovery-call-specialist` | Discovery Call Specialist |
| `sales-head-of-sales` | Head of Sales & Customer Success (team lead) |
| `sales-lead-qualifier` | Lead Qualifier |
| `sales-proposal-writer` | Proposal Writer |

### Website & Technology

| Agent | Role |
|---|---|
| `tech-accessibility-specialist` | Accessibility Specialist |
| `tech-frontend-developer` | Frontend Developer |
| `tech-lead` | Tech Lead (team lead) |
| `tech-qa-tester` | QA Tester |
| `tech-security-engineer` | Security & Privacy Engineer |

## Adding the second company

To set up the same structure for your other company, copy `.claude/agents/`,
`.claude/company-brief.md` and `.claude/skills/convene-team/` into the other company's
repository, rewrite the brief, and adjust the role descriptions that are specific to
student services (the `students-*` team and the immigration specialist).
