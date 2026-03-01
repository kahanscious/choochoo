# Skill: test-gen

# Skill: test-gen

## Purpose

`test-gen` automatically generates comprehensive test suites based on code structure and common patterns.

It prevents:
- Missing test coverage in critical code paths
- Inconsistent test patterns across a codebase
- Manual test writing that misses edge cases
- Poor test quality due to lack of test generation expertise

Instead, it:
- Analyzes code structure to identify testable units
- Generates appropriate test types (unit, integration, e2e) based on code being tested
- Supports multiple testing frameworks (Jest, pytest, etc.)
- Includes coverage analysis and suggestions for missing test scenarios
- Follows existing code conventions and patterns

This skill should be invoked when new code needs testing, existing tests are missing, or test coverage needs to be improved.

---

## Invocation

### Explicit

```text
/test-gen
/test-gen src/api/user.js --framework=jest
/test-gen . --type=coverage --threshold=80
/test-gen src/services --format=pytest --scope=integration
/test-gen --dry-run --output=test-plan.md
```

### Natural Language Triggers

If the user says things like:
- "Generate tests for this code."
- "Add test coverage for this module."
- "Create unit tests for this function."
- "Write integration tests for this API."
- "Check test coverage for this project."
- "Add tests to this codebase."
- "Generate test suite for this feature."

You MUST treat it as a test-gen invocation.

---

## Arguments

All optional:

- `<target>` — File, directory, or module to generate tests for. Default: current directory.
- `--framework=jest|pytest|unittest|vitest|go-test|junit|custom`
  - jest/pytest/unittest/vitest/go-test/junit: Standard frameworks for respective languages
  - custom: Use framework detected from existing codebase
  - Default: infer from project structure and existing tests
- `--type=unit|integration|e2e|coverage|full`
  - unit: Generate unit tests for functions/classes
  - integration: Generate integration tests for API endpoints, database operations
  - e2e: Generate end-to-end tests for user workflows
  - coverage: Analyze existing coverage and suggest missing tests
  - full: Generate all test types
  - Default: unit for single files, full for directories
- `--scope=public|private|all`
  - public: Only test public API (exported functions/classes)
  - private: Also test private/internal functions
  - all: Test everything including helper functions
  - Default: public
- `--threshold=<number>` — Minimum coverage percentage to aim for (e.g., 80). Default: 70
- `--dry-run` — Show what tests would be generated without creating files
- `--output=<path>` — Write test plan to file instead of generating tests
- `--format=<format>` — Output format (markdown, json, code). Default: code
- `--update` — Update existing tests instead of creating new ones
- `--skip-existing` — Skip files that already have tests

---

## Behavior

When test-gen is invoked, you MUST:

1. **Analyze the target**
   - Identify the scope (file, directory, module, entire project)
   - Detect the language and framework
   - Identify key exports, functions, classes, and modules
   - Check for existing tests and test patterns

2. **Determine test strategy**
   - For `--type=unit`: identify functions, methods, classes to test
   - For `--type=integration`: identify API endpoints, database operations, external integrations
   - For `--type=e2e`: identify user workflows and critical paths
   - For `--type=coverage`: analyze existing coverage and identify gaps

3. **Extract testable units**
   - Parse function signatures (name, params, return types)
   - Identify class structures and methods
   - Detect dependencies and exports
   - Find edge cases and error conditions

4. **Generate test patterns**
   - Create test templates following existing conventions
   - Generate test data and fixtures
   - Create mock objects for dependencies
   - Include edge case testing

5. **Output or write**
   - If `--output` specified: write test plan to that path
   - If `--dry-run`: print what would be generated
   - Otherwise: generate test files in appropriate test directories

---

## Output Structure

### For Test Plan (--dry-run or --output):

```markdown
# Test Generation Plan

## Target
`<file or directory>`

## Framework
`jest` (inferred from package.json)

## Test Types to Generate
- Unit tests for 12 functions
- Integration tests for 3 API endpoints
- Coverage analysis suggests 15 missing test scenarios

## Files to Create/Update

### Unit Tests
- `src/utils.test.js` — 8 test cases for utility functions
- `src/services/user.test.js` — 4 test cases for user service

### Integration Tests
- `tests/integration/api.test.js` — 3 test cases for API endpoints

### Coverage Suggestions
- Missing tests for error handling in `src/utils/validation.js`
- Missing tests for edge cases in `src/services/payment.js`

## Test Patterns
- Uses describe/it structure for Jest
- Mocks external dependencies with jest.mock
- Includes both success and failure scenarios

## Coverage Target
80% minimum coverage
```

### For Generated Tests (code format):

```javascript
// src/utils.test.js
import { validateEmail, formatCurrency, calculateDiscount } from './utils';

describe('utils', () => {
  describe('validateEmail', () => {
    test('should return true for valid email', () => {
      expect(validateEmail('test@example.com')).toBe(true);
    });
    
    test('should return false for invalid email', () => {
      expect(validateEmail('invalid-email')).toBe(false);
    });
    
    test('should handle empty string', () => {
      expect(validateEmail('')).toBe(false);
    });
  });
  
  describe('formatCurrency', () => {
    test('should format number to currency string', () => {
      expect(formatCurrency(1234.56)).toBe('$1,234.56');
    });
    
    test('should handle negative numbers', () => {
      expect(formatCurrency(-100)).toBe('-$100.00');
    });
  });
});
```

---

## Integration Points

### With context-manager
- Use context-manager to build focused context for test generation
- Only analyze relevant files for the target scope
- Respect token budget when analyzing large codebases

### With refactor
- Generate tests before refactoring to establish baseline
- Generate tests after refactoring to verify functionality preserved
- Use refactor's safety checks to verify generated tests pass

### With doc-gen
- Generate tests alongside documentation for new features
- Use doc-gen's API analysis to inform test generation
- Ensure test examples match documentation examples

---

## Language-Specific Patterns

### JavaScript/TypeScript (Jest/Vitest)
```javascript
// Function test pattern
describe('functionName', () => {
  test('should handle valid input', () => {
    expect(functionName(validInput)).toBe(expectedOutput);
  });
  
  test('should handle invalid input', () => {
    expect(functionName(invalidInput)).toThrow();
  });
});

// Class test pattern
describe('ClassName', () => {
  let instance;
  
  beforeEach(() => {
    instance = new ClassName();
  });
  
  describe('methodName', () => {
    test('should do something', () => {
      expect(instance.methodName()).toBe(expected);
    });
  });
});
```

### Python (pytest)
```python
# Function test pattern
def test_function_name():
    assert function_name(valid_input) == expected_output
    
    with pytest.raises(ValueError):
        function_name(invalid_input)

# Class test pattern
def test_class_name():
    instance = ClassName()
    assert instance.method_name() == expected
```

### Go (testing package)
```go
// Function test pattern
func TestFunctionName(t *testing.T) {
    tests := []struct {
        name     string
        input    string
        expected bool
    }{
        {"valid", "test@example.com", true},
        {"invalid", "invalid-email", false},
    }
    
    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            if got := FunctionName(tt.input); got != tt.expected {
                t.Errorf("FunctionName() = %v, want %v", got, tt.expected)
            }
        })
    }
}
```

---

## Edge Cases and Error Handling

### No Tests Framework Detected
- If no testing framework is detected, prompt user to specify one
- Default to Jest for JavaScript/TypeScript, pytest for Python
- Create a basic test configuration if none exists

### Private Functions
- By default, only test public API (exported functions/classes)
- If `--scope=private`, generate tests for internal functions
- Use friend classes or testing utilities for private method testing

### External Dependencies
- Generate mock objects for external dependencies
- Use dependency injection patterns for testability
- Include integration tests for external API calls

### Complex Error Handling
- Identify try-catch blocks and error conditions
- Generate tests for both expected and unexpected errors
- Test error message content and error types

### Performance-Critical Code
- Generate benchmark tests for performance-sensitive functions
- Include stress tests for high-load scenarios
- Test memory usage and resource cleanup

---

## Coverage Analysis

### Coverage Calculation
- Calculate line coverage, branch coverage, and function coverage
- Identify untested code paths and edge cases
- Suggest specific test scenarios to improve coverage

### Coverage Thresholds
- Default to 70% coverage minimum
- Warn when coverage falls below threshold
- Suggest prioritization of critical missing tests

### Coverage Reporting
- Generate coverage reports in multiple formats (HTML, JSON, text)
- Integrate with CI/CD pipelines for automated coverage checks
- Track coverage trends over time

---

## Philosophy

Good tests are the foundation of reliable software.

test-gen makes it easy to create comprehensive test suites by automatically generating tests that follow best practices, cover edge cases, and integrate seamlessly with existing codebases.

---

Base directory for this skill: file:///Users/alex/.config/opencode/skills/choochoo/test-gen
Relative paths in this skill (e.g., scripts/, reference/) are relative to this base directory.
Note: file list is sampled.