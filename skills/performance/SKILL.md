---
name: performance
description: >
  Identifies performance bottlenecks and provides optimization
  strategies. Helps improve application speed and resource usage.
---

# Skill: performance

## Purpose

`performance` helps identify and resolve performance bottlenecks
in applications. It provides profiling, analysis, and optimization
strategies.

It prevents:

- Slow application response times
- High resource consumption
- Poor user experience
- Scalability issues
- Inefficient algorithms

Instead, it:

- Profiles application performance
- Identifies bottlenecks and hotspots
- Provides optimization strategies
- Analyzes database queries
- Reviews caching strategies

Use this for performance audits, optimization, or before scaling.

---

## Invocation

### Explicit

```text
/performance
/performance profile
/performance optimize
/performance database
/performance cache
/performance audit
```

### Natural Language Triggers

If the user says things like:
- "Performance issue"
- "Slow application"
- "Optimize code"
- "Database slow"
- "Memory leak"
- "CPU bottleneck"
- "Response time"
- "Scalability problem"

And they want performance analysis, treat as performance.

---

## Arguments

All optional:

- `profile` — Profile application performance
- `optimize` — Optimize specific code paths
- `database` — Database query performance
- `cache` — Caching strategy analysis
- `audit` — Comprehensive performance audit
- `--path=<directory>` — Directory to analyze. Default: current.
- `--metric=cpu|memory|response|throughput` — Focus metric. Default: all.
- `--threshold=<number>` — Performance threshold. Default: warn at 2x baseline.

---

## Behavior

When performance is invoked, you MUST:

### Mode 1: Profile (with `profile` argument)

Profile application performance:

1. **CPU profiling:**
   - Function execution time
   - Hot paths and bottlenecks
   - Recursive calls
   - Algorithm complexity

2. **Memory profiling:**
   - Memory allocation
   - Memory leaks
   - Object retention
   - Garbage collection

3. **I/O profiling:**
   - File operations
   - Network requests
   - Database queries
   - External API calls

4. **Response profiling:**
   - Request latency
   - Throughput
   - Concurrent users
   - Error rates

Present findings with optimization suggestions.

### Mode 2: Optimize (with `optimize`)

Optimize specific code paths:

1. **Algorithm optimization:**
   - Replace O(n²) with O(n log n)
   - Reduce nested loops
   - Use appropriate data structures
   - Cache expensive computations

2. **Database optimization:**
   - Add indexes
   - Optimize queries
   - Reduce N+1 queries
   - Use efficient joins

3. **Code optimization:**
   - Reduce function calls
   - Use lazy loading
   - Minimize allocations
   - Optimize loops

4. **Resource optimization:**
   - Connection pooling
   - Thread pooling
   - Buffer management
   - Compression

### Mode 3: Database (with `database`)

Analyze database performance:

1. **Query analysis:**
   - Slow queries
   - Missing indexes
   - Inefficient joins
   - N+1 queries

2. **Schema optimization:**
   - Index strategy
   - Table design
   - Partitioning
   - Normalization

3. **Connection optimization:**
   - Connection pooling
   - Query batching
   - Prepared statements
   - Transaction management

### Mode 4: Cache (with `cache`)

Review caching strategies:

1. **Cache analysis:**
   - Cache hit rates
   - Cache invalidation
   - Cache size
   - Expiration policies

2. **Caching strategies:**
   - In-memory caching
   - Distributed caching
   - CDN caching
   - Browser caching

3. **Cache optimization:**
   - Cache warming
   - Cache warming
   - Cache warming
   - Cache warming

### Mode 5: Audit (with `audit`)

Comprehensive performance audit combining all modes.

---

## Performance Patterns

### Common Bottlenecks

| Pattern | Description | Example |
|---------|-------------|---------|
| N+1 Queries | Multiple database queries in loops | `for user in users: user.posts` |
| Memory Leak | Objects not being garbage collected | Event listeners not removed |
| Inefficient Algorithm | Poor time complexity | Bubble sort on large datasets |
| Blocking I/O | Synchronous operations | `fs.readFileSync()` |
| Resource Contention | Shared resource contention | Database connection pool exhaustion |

### Optimization Strategies

1. **Algorithm optimization:** Choose appropriate algorithms and data structures
2. **Database optimization:** Index queries, reduce joins, use caching
3. **Caching:** Implement appropriate caching strategies
4. **Concurrency:** Use async/await, threading, or parallel processing
5. **Resource management:** Pool connections, manage memory, optimize I/O
6. **Profiling:** Measure before optimizing, focus on bottlenecks

---

## Output Structure

When profiling, present findings in markdown:

```markdown
# Performance Analysis

**Date:** <YYYY-MM-DD>
**Path:** <analyzed directory>
**Metrics:** <cpu|memory|response|throughput>

---

## Summary

| Metric | Value | Status |
|--------|-------|--------|
| CPU Usage | <value> | <ok|warn|critical> |
| Memory Usage | <value> | <ok|warn|critical> |
| Response Time | <value> | <ok|warn|critical> |
| Throughput | <value> | <ok|warn|critical> |

---

## Bottlenecks

### <Bottleneck Title>

- **Type:** <cpu|memory|io|response>
- **Impact:** <description>
- **Location:** <file:line>
- **Suggested Fix:** <how to address>

---

## Optimization Recommendations

1. **High Priority:**
   - <recommendation 1>
   - <recommendation 2>

2. **Medium Priority:**
   - <recommendation 3>

3. **Low Priority:**
   - <recommendation 4>
```

---

## Constraints and Guarantees

- Provide measurable metrics when possible
- Include file locations and line numbers
- Rate severity based on impact and frequency
- If no issues found, state "No performance issues detected"
- Include baseline comparisons when available

---

## Philosophy

You can't optimize what you can't measure.

performance makes performance visible and actionable. It identifies bottlenecks before they become problems and provides clear guidance for optimization.

---

(End of file)
