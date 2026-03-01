# Security Overview Command Reference

## Overview

The `/security-overview` skill provides comprehensive security assessments for entire codebases. It integrates with existing choochoo skills and supports multiple output formats.

## Basic Usage

```bash
# Full security assessment
/security-overview scan

# Generate security report
/security-overview report

# Create security dashboard
/security-overview dashboard

# Compliance assessment
/security-overview compliance

# Threat modeling
/security-overview threat-model
```

## Advanced Options

```bash
# Scan specific directory
/security-overview scan --path=./src

# Application-specific assessment
/security-overview scan --profile=web --framework=react

# Compliance-focused assessment
/security-overview compliance --compliance=gdpr

# Custom output format
/security-overview report --output=json

# Token budget control
/security-overview scan --budget=3000
```

## Examples by Application Type

### Web Application
```bash
/security-overview scan --profile=web --framework=express
```

### Mobile Application
```bash
/security-overview scan --profile=mobile --framework=flutter
```

### API Service
```bash
/security-overview scan --profile=api --framework=fastapi
```

### Desktop Application
```bash
/security-overview scan --profile=desktop --framework=electron
```

## Integration Examples

### With Security Skill
```bash
# Use security-overview findings in detailed analysis
/security scan --category=auth --severity=critical
```

### With Tech Debt
```bash
# Map security issues to technical debt
/tech-debt add "SQL injection vulnerability" --severity=high --category=security
```

### With Dependency Audit
```bash
# Combine dependency and security analysis
/dependency-audit --severity=critical
```

## Output Formats

### Markdown (Default)
Human-readable reports with structured findings.

### JSON
Machine-readable output for API integration.

### HTML
Interactive dashboards with visualizations.

### PDF
Formal documentation for compliance submissions.

## Compliance Frameworks

### SOC 2
```bash
/security-overview compliance --compliance=soc2
```

### ISO 27001
```bash
/security-overview compliance --compliance=iso27001
```

### GDPR
```bash
/security-overview compliance --compliance=gdpr
```

### HIPAA
```bash
/security-overview compliance --compliance=hipaa
```

## Severity Levels

### Critical
- CVSS 9.0+
- Active exploitation possible
- Immediate action required

### High
- CVSS 7.0-8.9
- Significant business impact
- High priority remediation

### Medium
- CVSS 4.0-6.9
- Moderate business impact
- Planned remediation

### Low
- CVSS 0.1-3.9
- Minimal business impact
- Low priority remediation

## Categories

### Authentication & Authorization
- Password policies
- Session management
- Access controls
- Privilege escalation

### Input Validation
- SQL injection
- XSS vulnerabilities
- Command injection
- Path traversal

### Secrets Management
- Hardcoded credentials
- API key exposure
- Environment variables
- Secret rotation

### Dependency Security
- Vulnerable packages
- Outdated versions
- License compliance
- Supply chain risks

### Configuration Security
- Debug endpoints
- CORS misconfiguration
- Default credentials
- Exposed admin interfaces

## Token Budget Management

### Default Budget
- 2000 tokens for context assembly

### Custom Budget
```bash
/security-overview scan --budget=3000
```

### Budget Optimization
- Prioritize critical findings
- Summarize lower severity issues
- Use structured output
- Avoid verbose explanations

## Security Assessment Layers

### Application Layer
- Business logic
- API endpoints
- Authentication flows
- Input handling

### Data Layer
- Database security
- Data encryption
- Access controls
- Data retention

### Infrastructure Layer
- Network security
- Container security
- Cloud configuration
- Secrets management

### Compliance Layer
- Regulatory requirements
- Audit logging
- Access monitoring
- Data protection

## Threat Modeling

### Asset Identification
- Data assets
- System assets
- User accounts
- API endpoints

### Threat Analysis
- External threats
- Internal threats
- Supply chain threats
- Zero-day threats

### Vulnerability Mapping
- Attack vectors
- Entry points
- Exploit paths
- Impact scenarios

## Reporting Features

### Executive Summary
- Overall security rating
- Critical issues count
- Business impact
- Compliance status

### Detailed Findings
- Issue descriptions
- Severity ratings
- Location information
- Remediation steps

### Risk Assessment
- Impact analysis
- Likelihood assessment
- Risk scoring
- Priority recommendations

### Compliance Assessment
- Framework requirements
- Gap analysis
- Remediation steps
- Certification status

## Integration with Development Workflow

### CI/CD Integration
```yaml
# GitHub Actions example
- name: Security Overview
  run: /security-overview scan --output=json
```

### Pre-commit Hooks
```bash
# Check for security issues before commit
/security-overview scan --severity=critical
```

### Pull Request Reviews
```bash
# Automated security review in PRs
/security-overview scan --path=./src --output=markdown
```

## Best Practices

### Regular Assessments
- Run weekly security scans
- Monthly compliance checks
- Quarterly threat modeling
- Annual comprehensive audits

### Team Collaboration
- Share security reports with team
- Track remediation progress
- Document security decisions
- Train developers on secure coding

### Continuous Improvement
- Update security policies
- Refine assessment criteria
- Improve remediation guidance
- Enhance reporting capabilities

## Troubleshooting

### Common Issues

#### Token Budget Exceeded
- Reduce scope with `--path` flag
- Increase budget with `--budget` flag
- Use `--severity` filter
- Split into multiple scans

#### Missing Findings
- Check application profile detection
- Verify framework detection
- Review category filters
- Update assessment rules

#### Integration Problems
- Verify skill installation
- Check file permissions
- Validate output format
- Review dependency requirements

### Support
- Check choochoo documentation
- Review security skill documentation
- Consult security team
- Report issues to maintainers

## Version History

### v1.0
- Initial comprehensive security assessment
- Multiple output formats
- Compliance framework support
- Integration with existing skills

### v1.1
- Enhanced threat modeling
- Improved token budget management
- Additional compliance frameworks
- Better error handling

### v1.2
- Real-time dashboard support
- API integration capabilities
- Advanced filtering options
- Performance optimizations

## License

This skill is part of the choochoo agent framework and follows the choochoo licensing terms.