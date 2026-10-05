# UniBridge NL — AI agent teams

45 Claude Code subagents in 9 teams of 5, organised like the staff of The Office's Dunder Mifflin.
Every agent reads `../company-brief.md` first; it holds the company facts and the org chart.

## How to use

- **Not sure who should do it?** *"Ask Michael (exec-regional-manager) who should handle …"*, or `/convene-team <task>` with no team named.
- **One person:** *"Ask Dwight to review our sales playbook"* or *"Use legal-privacy-officer to check our privacy page"*.
- **A whole team:** `/convene-team legal Review our new refund policy`: the four specialists work in parallel, then the lead combines their answers.
- **Several teams:** `/convene-team marketing legal Plan a TikTok campaign for Indian students`.
- **From the office page:** assign to a person or team and it starts a Claude Code session for you.
- Internal work is saved to `.company/<team>/` (not published). Agents only draft; you approve anything sent, published, signed or paid.

## Roster

### Executive (Corporate)

| Office cast | Name | Agent | Role |
|---|---|---|---|
| Robert California | Martijn de Wit | `exec-ceo` | Chief Executive Officer (team lead) |
| David Wallace | Marieke Bos | `exec-cfo` | Chief Financial Officer |
| Gabe Lewis | Gabriel Santos | `exec-director-emerging-regions` | Director of Emerging Regions |
| Jo Bennett | Joanna Smits | `exec-chair` | Chair of the Board |
| Michael Scott | Michiel Vos | `exec-regional-manager` | Regional Manager |

### Legal & Compliance

| Office cast | Name | Agent | Role |
|---|---|---|---|
| Jan Levinson | Eva de Vries | `legal-general-counsel` | General Counsel (team lead) |
| Bob Vance | Daniel Okafor | `legal-contracts-counsel` | Contracts Counsel |
| Danny Cordray | Sophie Janssen | `legal-privacy-officer` | Privacy Officer (GDPR / AVG) |
| Josh Porter | Mehmet Yılmaz | `legal-consumer-law-specialist` | Consumer Law Specialist |
| Robert Lipton | Priya Raman | `legal-immigration-compliance-specialist` | Immigration Compliance Specialist |

### Audit & Quality Assurance

| Office cast | Name | Agent | Role |
|---|---|---|---|
| Charles Miner | Pieter van Dijk | `audit-chief-auditor` | Chief Auditor (team lead) |
| Creed Bratton | Tomás García | `audit-service-quality-auditor` | Service Quality Auditor |
| Deangelo Vickers | Fatima El Amrani | `audit-financial-auditor` | Financial Auditor |
| Glenn | Ingrid Smit | `audit-website-claims-auditor` | Website Claims Auditor |
| Hunter | Lucas Meijer | `audit-compliance-auditor` | Compliance Auditor |

### Accounting & Finance

| Office cast | Name | Agent | Role |
|---|---|---|---|
| Angela Martin | Annelies Koster | `finance-head-of-accounting` | Head of Accounting (team lead) |
| Karen Filippelli | Wei Chen | `finance-pricing-analyst` | Pricing Analyst |
| Kevin Malone | Sanne de Groot | `finance-bookkeeper` | Bookkeeper |
| Nellie Bertram | Amara Osei | `finance-forecasting-analyst` | Forecasting Analyst |
| Oscar Martinez | Ruben Mulder | `finance-tax-specialist` | Tax Specialist |

### Sales & Customer Service

| Office cast | Name | Agent | Role |
|---|---|---|---|
| Dwight Schrute | Jasper Vermeulen | `sales-head-of-sales` | Head of Sales & Customer Success (team lead) |
| Jim Halpert | Omar Benali | `sales-discovery-call-specialist` | Discovery Call Specialist |
| Kelly Kapoor | Lin Nguyen | `sales-customer-support-specialist` | Customer Support Specialist |
| Phyllis Vance | Zoë Peters | `sales-lead-qualifier` | Lead Qualifier |
| Stanley Hudson | Hannah Schouten | `sales-proposal-writer` | Proposal Writer |

### Marketing

| Office cast | Name | Agent | Role |
|---|---|---|---|
| Ryan Howard | Lotte Visser | `marketing-director` | Marketing Director (team lead) |
| Andy Bernard | Mila Hendriks | `marketing-social-media-manager` | Social Media Manager |
| Clark Green | Aisha Rahman | `marketing-seo-specialist` | SEO Specialist |
| Pam Beesly | Noah Bakker | `marketing-content-writer` | Content Writer |
| Pete Miller | Kenji Tanaka | `marketing-growth-analyst` | Growth Analyst |

### Student Services

| Office cast | Name | Agent | Role |
|---|---|---|---|
| Darryl Philbin | Femke van Leeuwen | `students-operations-lead` | Head of Student Operations (team lead) |
| Carol Stills | Bram Kok | `students-housing-coordinator` | Housing Coordinator |
| Meredith Palmer | Leila Haddad | `students-visa-coordinator` | Visa & Residence Permit Coordinator |
| Roy Anderson | Yara Dekker | `students-arrival-coach` | Arrival Coach |
| Val Johnson | Arjun Mehta | `students-admissions-advisor` | Admissions Advisor |

### Website & Technology

| Office cast | Name | Agent | Role |
|---|---|---|---|
| Nick | Thijs Willems | `tech-lead` | Tech Lead (team lead) |
| Billy Merchant | Sam Brouwer | `tech-accessibility-specialist` | Accessibility Specialist |
| Hank Tate | Viktor Ivanov | `tech-security-engineer` | Security & Privacy Engineer |
| Lonny Collins | Nadia Kowalski | `tech-frontend-developer` | Frontend Developer |
| Madge Madsen | Emma Jacobs | `tech-qa-tester` | QA Tester |

### Human Resources

| Office cast | Name | Agent | Role |
|---|---|---|---|
| Toby Flenderson | Tobias Kramer | `hr-head` | Head of HR (team lead) |
| Cathy Simms | Carlos Mendes | `hr-payroll-benefits` | Payroll & Benefits Specialist |
| Erin Hannon | Esmée Prins | `hr-employee-experience` | Employee Experience Coordinator |
| Holly Flax | Hanna Lindqvist | `hr-recruitment-onboarding` | Recruitment & Onboarding Specialist |
| Nate Nickerson | Nathan Okoro | `hr-freelancer-coordinator` | Temps & Freelancer Coordinator |

## Adding the second company

To set up the same structure for your other company, copy `.claude/agents/`,
`.claude/company-brief.md` and `.claude/skills/convene-team/` into the other company's
repository, rewrite the brief, and adjust the roles that are specific to student
services (the `students-*` team and the immigration specialist).
