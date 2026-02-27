---
name: security
description: >
  Identifies common vulnerability patterns and provides secure coding
  checks. Helps prevent security issues before they reach production.
---

# Skill: security

## Purpose

`security` helps identify and prevent common security vulnerabilities
in code. It provides patterns, checks, and remediation guidance.

It prevents:

- Security vulnerabilities reaching production
- Hardcoded secrets in code
- SQL injection and XSS attacks
- Insecure authentication/authorization
- Vulnerable dependencies

Instead, it:

- Scans for common vulnerability patterns
- Provides secure coding guidelines
- Checks for secrets and credentials
- Reviews authentication/authorization
- Analyzes dependencies for known vulnerabilities

Use this for security audits, code reviews, or before deployments.

---

## Invocation

### Explicit

```text
/security
/security scan
/security check-auth
/security secrets
/security dependencies
/security audit
```

### Natural Language Triggers

If the user says things like:
- "Security check"
- "Find vulnerabilities"
- "Is this secure?"
- "Check for secrets"
- "Audit for security"
- "Authentication review"
- "Authorization check"
- "Dependency security"

And they want security analysis, treat as security.

---

## Arguments

All optional:

- `scan` — Full security scan of codebase
- `check-auth` — Authentication and authorization review
- `secrets` — Secrets and credentials check
- `dependencies` — Dependency vulnerability analysis
- `audit` — Comprehensive security audit
- `--path=<directory>` — Directory to scan. Default: current.
- `--severity=low|medium|high|critical` — Filter by severity. Default: all.
- `--category=auth|input|secrets|deps|crypto|config` — Filter by category. Default: all.

---

## Behavior

When security is invoked, you MUST:

### Mode 1: Scan (with `scan` argument)

Scan codebase for common security patterns:

1. **Input validation:**
   - SQL injection risks
   - XSS vulnerabilities
   - Command injection
   - Path traversal
   - File upload risks

2. **Authentication/Authorization:**
   - Hardcoded credentials
   - Weak password policies
   - Missing auth checks
   - Privilege escalation
   - Session management issues

3. **Secrets and Credentials:**
   - Hardcoded API keys
   - Database credentials
   - JWT secrets
   - Private keys
   - Environment variables

4. **Dependencies:**
   - Outdated packages
   - Known vulnerabilities
   - Vulnerable versions
   - Unused dependencies

5. **Configuration:**
   - Debug endpoints enabled
   - CORS misconfiguration
   - Insecure defaults
   - Exposed admin interfaces

Present findings with severity ratings and remediation.

### Mode 2: Check Auth (with `check-auth`)

Review authentication and authorization:

1. **Authentication patterns:**
   - Password storage (hashing, salting)
   - Session management
   - Multi-factor auth
   - Account lockout
   - Password policies

2. **Authorization patterns:**
   - Role-based access
   - Permission checks
   - Data access controls
   - Resource ownership

3. **Common auth issues:**
   - Missing auth checks
   - Insecure defaults
   - Token leakage
   - Session fixation

### Mode 3: Secrets (with `secrets`)

Scan for secrets and credentials:

1. **Common secret patterns:**
   - API keys (Bearer, API_KEY, etc.)
   - Database URLs/credentials
   - JWT secrets
   - Private keys
   - Passwords

2. **Secret locations:**
   - Code files
   - Configuration files
   - Environment files
   - Documentation
   - Comments

3. **Secret formats:**
   - Base64 encoded
   - URL encoded
   - Plain text
   - Obfuscated

### Mode 4: Dependencies (with `dependencies`)

Analyze dependency security:

1. **Package analysis:**
   - Outdated versions
   - Known vulnerabilities
   - License issues
   - Unused packages

2. **Lock file review:**
   - Dependency versions
   - Transitive dependencies
   - Security patches

3. **Package manager checks:**
   - npm audit
   - pip check
   - cargo audit
   - gem audit

### Mode 5: Audit (with `audit`)

Comprehensive security audit combining all modes.

---

## Security Patterns

### Common Vulnerabilities

| Pattern | Description | Example |
|---------|-------------|---------|
| SQL Injection | Unsanitized user input in queries | `SELECT * FROM users WHERE name = '${input}'` |
| XSS | Reflected or stored cross-site scripting | `echo '<script>' . $_GET['name'] . '</script>'` |
| Command Injection | Unsanitized shell commands | `system("rm -rf " . $_GET['file'])` |
| Path Traversal | Directory traversal attacks | `include($_GET['file'])` |
| Hardcoded Secrets | Credentials in source code | `const API_KEY = 'sk-...'` |

### Secure Coding Guidelines

1. **Input validation:** Always validate and sanitize user input
2. **Parameterized queries:** Use prepared statements for database queries
3. **Output encoding:** Encode output to prevent XSS
4. **Authentication:** Use strong password policies and MFA
5. **Authorization:** Implement proper access controls
6. **Secrets management:** Use environment variables or secret managers
7. **Dependency management:** Keep packages updated and scan for vulnerabilities

---

## Output Structure

When scanning, present findings in markdown:

```markdown
# Security Scan Results

**Date:** <YYYY-MM-DD>
**Path:** <scanned directory>
**Issues Found:** <N>

---

## Critical

### <Issue Title>

- **Category:** <category>
- **Severity:** critical
- **Risk:** <what breaks>
- **Location:** <file:line>
- **Remediation:** <how to fix>

---

## High
...

## Medium
...

## Low
...

---

## Summary

| Severity | Count |
|----------|-------|
| critical | <N> |
| high     | <N> |
| medium   | <N> |
| low      | <N> |
```

---

## Constraints and Guarantees

- Never expose real secrets in output - redact them
- Provide actionable remediation for each finding
- Rate severity based on impact and exploitability
- Include file locations and line numbers when possible
- If no issues found, state "No security issues detected"

---

## Philosophy

Security is everyone's responsibility.

security makes security visible and actionable. It catches common vulnerabilities before they reach production and provides clear guidance for remediation.

---

(End of file)
