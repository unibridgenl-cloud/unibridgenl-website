# UniBridge NL — AI agent teams

35 Claude Code subagents organised as 7 departments of 5 (one lead + four specialists).
Every agent reads `../company-brief.md` first — update company facts there, once.

## How to use

- **One specialist:** ask in plain words, e.g. *"Ask Sophie (legal-privacy-officer) to check our privacy page"*, or type `@` and pick the agent.
- **A whole team:** `/convene-team legal Review our new refund policy` — runs the four specialists in parallel, then the lead consolidates.
- **Several teams:** `/convene-team marketing legal Draft and check a TikTok campaign for Indian students`.
- Internal work is saved to `.company/<team>/` (not published to the website).
- Agents only draft and recommend. Sending, publishing, signing and paying stay with you.

## Roster

### Legal & Compliance

| Name | Agent | Role |
|---|---|---|
| Mehmet Yılmaz | `legal-consumer-law-specialist` | Consumer Law Specialist |
| Daniel Okafor | `legal-contracts-counsel` | Contracts Counsel |
| Eva de Vries | `legal-general-counsel` | General Counsel (team lead) |
| Priya Raman | `legal-immigration-compliance-specialist` | Immigration Compliance Specialist |
| Sophie Janssen | `legal-privacy-officer` | Privacy Officer (GDPR / AVG) |

### Marketing

| Name | Agent | Role |
|---|---|---|
| Noah Bakker | `marketing-content-writer` | Content Writer |
| Lotte Visser | `marketing-director` | Marketing Director (team lead) |
| Kenji Tanaka | `marketing-growth-analyst` | Growth Analyst |
| Aisha Rahman | `marketing-seo-specialist` | SEO Specialist |
| Mila Hendriks | `marketing-social-media-manager` | Social Media Manager |

### Audit & Quality

| Name | Agent | Role |
|---|---|---|
| Pieter van Dijk | `audit-chief-auditor` | Chief Auditor (team lead) |
| Lucas Meijer | `audit-compliance-auditor` | Compliance Auditor |
| Fatima El Amrani | `audit-financial-auditor` | Financial Auditor |
| Tomás García | `audit-service-quality-auditor` | Service Quality Auditor |
| Ingrid Smit | `audit-website-claims-auditor` | Website Claims Auditor |

### Finance

| Name | Agent | Role |
|---|---|---|
| Sanne de Groot | `finance-bookkeeper` | Bookkeeper |
| Marieke Bos | `finance-cfo` | CFO (team lead) |
| Amara Osei | `finance-forecasting-analyst` | Forecasting Analyst |
| Wei Chen | `finance-pricing-analyst` | Pricing Analyst |
| Ruben Mulder | `finance-tax-specialist` | Tax Specialist |

### Student Services (Operations)

| Name | Agent | Role |
|---|---|---|
| Arjun Mehta | `students-admissions-advisor` | Admissions Advisor |
| Yara Dekker | `students-arrival-coach` | Arrival Coach |
| Bram Kok | `students-housing-coordinator` | Housing Coordinator |
| Femke van Leeuwen | `students-operations-lead` | Head of Student Operations (team lead) |
| Leila Haddad | `students-visa-coordinator` | Visa & Residence Permit Coordinator |

### Sales & Customer Success

| Name | Agent | Role |
|---|---|---|
| Lin Nguyen | `sales-customer-support-specialist` | Customer Support Specialist |
| Omar Benali | `sales-discovery-call-specialist` | Discovery Call Specialist |
| Jasper Vermeulen | `sales-head-of-sales` | Head of Sales & Customer Success (team lead) |
| Zoë Peters | `sales-lead-qualifier` | Lead Qualifier |
| Hannah Schouten | `sales-proposal-writer` | Proposal Writer |

### Website & Technology

| Name | Agent | Role |
|---|---|---|
| Sam Brouwer | `tech-accessibility-specialist` | Accessibility Specialist |
| Nadia Kowalski | `tech-frontend-developer` | Frontend Developer |
| Thijs Willems | `tech-lead` | Tech Lead (team lead) |
| Emma Jacobs | `tech-qa-tester` | QA Tester |
| Viktor Ivanov | `tech-security-engineer` | Security & Privacy Engineer |

## Adding the second company

To set up the same structure for your other company, copy `.claude/agents/`,
`.claude/company-brief.md` and `.claude/skills/convene-team/` into the other company's
repository, rewrite the brief, and adjust the role descriptions that are specific to
student services (the `students-*` team and the immigration specialist).
