# Skill: security-overview

# Skill: security-overview

## Purpose

`security-overview` provides comprehensive, high-level security assessments of entire codebases. It delivers actionable intelligence for security teams while respecting choochoo's intentional context control philosophy.

It prevents:
- Incomplete security assessments
- Missed vulnerabilities across application layers
- Poor risk prioritization
- Lack of actionable remediation
- Disconnected security findings

Instead, it:
- Maps security posture across all application layers
- Identifies vulnerabilities by category and severity
- Prioritizes risks based on business impact
- Provides comprehensive remediation guidance
- Generates security reports and dashboards

Use this for security audits, compliance reviews, or before major deployments.

---

## Invocation

### Explicit

```text
/security-overview
/security-overview scan
/security-overview report
/security-overview dashboard
/security-overview compliance
/security-overview threat-model
```

### Natural Language Triggers

If the user says things like:
- "Security assessment"
- "Security overview"
- "Security audit"
- "Security posture"
- "Risk assessment"
- "Compliance check"
- "Threat modeling"
- "Security dashboard"

And they want comprehensive security analysis, treat as security-overview.

---

## Arguments

All optional:

- `scan` — Full security assessment (default)
- `report` — Generate security report
- `dashboard` — Create security dashboard
- `compliance` — Compliance assessment
- `threat-model` — Threat modeling analysis
- `--path=<directory>` — Directory to scan. Default: current.
- `--profile=<web|api|mobile|desktop|iot>` — Application profile. Default: auto-detect.
- `--framework=<react|node|django|flutter|etc>` — Technology framework. Default: auto-detect.
- `--severity=low|medium|high|critical` — Filter by severity. Default: all.
- `--category=auth|input|secrets|deps|crypto|config|infra|data|compliance` — Filter by category. Default: all.
- `--compliance=<soc2|iso27001|gdpr|hipaa|pci>` — Compliance framework. Default: none.
- `--output=<markdown|json|html|pdf>` — Output format. Default: markdown.
- `--budget=<number>` — Token budget for context assembly. Default: 2000.

---

## Behavior

When security-overview is invoked, you MUST:

### Mode 1: Scan (with `scan` argument)

Perform comprehensive security assessment:

#### Layer Analysis

1. **Application Layer**
   - Authentication/authorization patterns
   - Input validation and sanitization
   - Session management
   - API security
   - Business logic vulnerabilities

2. **Data Layer**
   - Database security
   - Data encryption
   - Access controls
   - Data leakage risks
   - Backup security

3. **Infrastructure Layer**
   - Configuration management
   - Network security
   - Container security
   - Cloud security
   - Secrets management

4. **Compliance Layer**
   - Regulatory requirements
   - Data protection
   - Audit logging
   - Access monitoring

#### Vulnerability Categories

1. **Authentication & Authorization**
   - Weak password policies
   - Missing MFA
   - Privilege escalation
   - Broken access controls
   - Session fixation

2. **Input Validation**
   - SQL injection
   - XSS vulnerabilities
   - Command injection
   - Path traversal
   - File upload risks

3. **Secrets Management**
   - Hardcoded credentials
   - API key exposure
   - Environment variables
   - Secret rotation
   - Key management

4. **Dependency Security**
   - Vulnerable packages
   - Outdated versions
   - License compliance
   - Supply chain risks

5. **Configuration Security**
   - Debug endpoints
   - CORS misconfiguration
   - Default credentials
   - Exposed admin interfaces

6. **Data Security**
   - Data encryption
   - Data classification
   - Data retention
   - Privacy controls

7. **Infrastructure Security**
   - Network segmentation
   - Firewall rules
   - Container security
   - Cloud configuration

#### Risk Assessment

1. **Impact Analysis**
   - Business impact
   - Data sensitivity
   - Availability requirements
   - Compliance requirements

2. **Likelihood Assessment**
   - Exploitability
   - Attack surface
   - Detection difficulty
   - Mitigation effectiveness

3. **Risk Scoring**
   - Critical: CVSS 9.0+
   - High: CVSS 7.0-8.9
   - Medium: CVSS 4.0-6.9
   - Low: CVSS 0.1-3.9

#### Threat Modeling

1. **Asset Identification**
   - Data assets
   - System assets
   - User accounts
   - API endpoints

2. **Threat Analysis**
   - External threats
   - Internal threats
   - Supply chain threats
   - Zero-day threats

3. **Vulnerability Mapping**
   - Attack vectors
   - Entry points
   - Exploit paths
   - Impact scenarios

### Mode 2: Report (with `report` argument)

Generate comprehensive security report:

```markdown
# Security Overview Report

**Generated:** <YYYY-MM-DD>
**Path:** <scanned directory>
**Profile:** <application profile>
**Framework:** <technology framework>
**Issues Found:** <N>

---

## Executive Summary

### Security Posture
- **Overall Rating:** <A-F>
- **Critical Issues:** <N>
- **High Issues:** <N>
- **Medium Issues:** <N>
- **Low Issues:** <N>

### Key Findings
- <Top 3 findings>
- <Business impact>
- <Compliance status>

---

## Security Assessment

### Layer Analysis

#### Application Layer
- **Authentication:** <status>
- **Input Validation:** <status>
- **Session Management:** <status>
- **API Security:** <status>

#### Data Layer
- **Database Security:** <status>
- **Data Encryption:** <status>
- **Access Controls:** <status>

#### Infrastructure Layer
- **Configuration:** <status>
- **Network Security:** <status>
- **Container Security:** <status>

#### Compliance Layer
- **Regulatory:** <status>
- **Audit Logging:** <status>
- **Access Monitoring:** <status>

---

## Risk Assessment

### Critical Risks

#### <Risk Title>
- **Category:** <category>
- **Severity:** critical
- **Risk:** <what breaks>
- **Location:** <file:line>
- **Remediation:** <how to fix>
- **Effort:** <hours>
- **Impact:** <business impact>

---

## Compliance Assessment

### <Framework>
- **Status:** <compliant/non-compliant>
- **Requirements:** <N> met, <N> missing
- **Gaps:** <list of gaps>
- **Remediation:** <compliance steps>

---

## Threat Model

### Assets
- <asset 1>
- <asset 2>

### Threats
- <threat 1>
- <threat 2>

### Vulnerabilities
- <vulnerability 1>
- <vulnerability 2>

---

## Recommendations

### Immediate Actions
1. <action 1>
2. <action 2>

### Short-term Improvements
1. <action 1>
2. <action 2>

### Long-term Strategy
1. <action 1>
2. <action 2>

---

## Conclusion

**Overall Security Rating:** <A-F>
**Next Review:** <date>
**Contact:** <security team>
```

### Mode 3: Dashboard (with `dashboard` argument)

Create security dashboard with visualizations:

```markdown
# Security Dashboard

## Metrics Overview

### Risk Distribution
```
| Severity | Count | Percentage |
|----------|-------|------------|
| Critical | <N>   | <P>%       |
| High     | <N>   | <P>%       |
| Medium   | <N>   | <P>%       |
| Low      | <N>   | <P>%       |
```

### Category Breakdown
```
| Category | Count | Average Severity |
|----------|-------|-------------------|
| auth     | <N>   | <severity>        |
| input    | <N>   | <severity>        |
| secrets  | <N>   | <severity>        |
| deps     | <N>   | <severity>        |
```

### Layer Analysis
```
| Layer | Issues | Avg Severity |
|-------|--------|--------------|
| App   | <N>    | <severity>   |
| Data  | <N>    | <severity>   |
| Infra | <N>    | <severity>   |
```

### Trend Analysis
- **New Issues:** <N> this week
- **Resolved Issues:** <N> this week
- **Open Issues:** <N> total
- **Average Resolution Time:** <hours>

---

## Compliance Status

### SOC 2
- **Type II:** <status>
- **Controls:** <N> implemented
- **Gaps:** <list>

### ISO 27001
- **Certification:** <status>
- **Controls:** <N> implemented
- **Audit:** <status>

---

## Threat Intelligence

### Active Threats
- <threat 1>
- <threat 2>

### Vulnerability Trends
- **Critical:** ↑/↓️
- **High:** ↑/↓️
- **Medium:** ↑/↓️

---

## Action Items

### High Priority
1. [ ] <task 1>
2. [ ] <task 2>

### Medium Priority
1. [ ] <task 1>
2. [ ] <task 2>

---

## Team Performance

### Security Team
- **Response Time:** <hours>
- **Resolution Rate:** <percentage>
- **Training Hours:** <hours>

### Development Team
- **Secure Coding:** <percentage>
- **Code Reviews:** <percentage>
- **Testing Coverage:** <percentage>
```

---

## Integration Points

### With Existing Skills

#### /security
- Leverages existing vulnerability patterns
- Uses established remediation guidelines
- Maintains consistent severity ratings

#### /tech-debt
- Maps security debt to technical debt registry
- Links security issues to debt items
- Prioritizes security debt alongside technical debt

#### /dependency-audit
- Integrates dependency vulnerability findings
- Maps package vulnerabilities to security issues
- Provides unified dependency security view

### External Integrations

#### Security Tools
- OWASP ZAP integration
- Snyk vulnerability scanning
- GitHub Security tab
- SAST tools

#### Compliance Frameworks
- SOC 2 controls mapping
- ISO 27001 requirements
- GDPR data protection
- HIPAA healthcare security

#### Monitoring Tools
- SIEM integration
- Log analysis
- Alert correlation
- Incident response

---

## Security Assessment Methodology

### Frameworks Used

#### OWASP ASVS
- Application Security Verification Standard
- Level 1-3 requirements
- Security verification checks

#### NIST Cybersecurity Framework
- Identify, Protect, Detect, Respond, Recover
- Risk management framework
- Security control mapping

#### CIS Benchmarks
- Security configuration benchmarks
- Best practice controls
- Hardening guidelines

#### MITRE ATT&CK
- Adversarial tactics
- Techniques and procedures
- Threat modeling framework

### Assessment Process

#### Discovery Phase
1. **Application Profiling**
   - Technology stack identification
   - Architecture mapping
   - Data flow analysis

2. **Asset Identification**
   - Data assets
   - System assets
   - User accounts
   - API endpoints

#### Analysis Phase
1. **Vulnerability Scanning**
   - Static analysis
   - Dynamic analysis
   - Dependency scanning

2. **Configuration Review**
   - Security settings
   - Access controls
   - Network configuration

3. **Compliance Check**
   - Regulatory requirements
   - Industry standards
   - Internal policies

#### Reporting Phase
1. **Risk Assessment**
   - Impact analysis
   - Likelihood assessment
   - Risk scoring

2. **Remediation Planning**
   - Priority setting
   - Resource allocation
   - Timeline development

---

## Reporting Formats

### Markdown
- Human-readable reports
- Structured findings
- Actionable recommendations

### JSON
- Machine-readable output
- API integration
- Automated processing

### HTML
- Interactive dashboards
- Visualizations
- Drill-down capabilities

### PDF
- Formal documentation
- Compliance submissions
- Executive summaries

---

## Constraints and Guarantees

- Never expose real secrets in output - redact them
- Provide actionable remediation for each finding
- Rate severity based on business impact
- Include file locations and line numbers when possible
- Maintain consistency with existing choochoo skills
- Respect context budget and token limits
- Provide clear, concise, actionable output

---

## Philosophy

Security is a business enabler, not a blocker.

security-overview makes security visible, actionable, and integrated. It transforms security from a checkbox exercise into a strategic advantage, helping organizations build secure, compliant, and resilient applications.

---

Base directory for this skill: file:///Users/alex/.config/opencode/skills/choochoo/security-overview
Relative paths in this skill (e.g., scripts/, reference/) are relative to this base directory.
Note: file list is sampled.

<skill_files>

</skill_files>