# P3 Uplift Assessment - Insurance Claims Processing System

A TypeScript-based insurance claims processing system that evaluates claims against policies and determines eligibility and payout amounts.

## Project Overview

This project implements two main services:

- **PolicyService**: Manages insurance policies with validation and storage
- **ClaimService**: Evaluates claims against policies to determine approval and payout amounts

The system validates all inputs, enforces business rules, and provides comprehensive test coverage.

## Technology Stack

- **Language**: TypeScript 5.9+
- **Runtime**: Node.js (ESM modules)
- **Test Framework**: Vitest 4.0+
- **Module System**: ES Modules (`"type": "module"`)

## Installation
```bash
npm install
```

## Testing
### Interactive watch mode
```bash
npm run test
```

### Single run (CI mode)
```bash
npm run test:run
```

### Watch mode with file changes
```bash
npm run test:watch
```

### Open Vitest UI dashboard
```bash
npm run test:ui
```

### Generate coverage report
```bash
npm run coverage
```

## Design Decisions & Trade-offs
### In-Memory Storage (Map)
**Decision:** Used Map<string, Policy> for policy storage instead of a database to keep the implementation simple, fast, no external dependencies.
**Future:** Replace with database when persistence is needed.

### Validation in Service Layer
**Decision:** Implemented validation directly in PolicyService and ClaimService.
**Future:** Extract to a separate validator class or use a schema library.

### Synchronous Evaluation
**Decision:** All methods are synchronous (no async/await).
**Future:** Convert to async when integrating with external services.

## With more time:
Replace in-memory Map with database and async operations
Convert services to async/await patterns
Implement connection pooling and transaction support
Add database migration system
Implement runtime schema validation
Create reusable validators for Policy, Claim, ClaimResult
Create custom error classes (ValidationError, PolicyNotFoundError, ClaimEvaluationError)
Add structured logging 
Implement centralized error handler
Add retry strategies for transient failures
Build REST API layer
Add request validation middleware
Implement proper HTTP status codes and error responses
Generate OpenAPI/Swagger documentation
Add request/response logging
Add distributed tracing 
Implement caching layer for policies
Add performance metrics 
Benchmark claim evaluation speed
Reach 100% code coverage
Add integration tests with test database
Add E2E tests for full workflows
Add property-based testing (fast-check)