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
**Decision:** Used Map<string, Policy> for policy storage instead of a database to keep the implementation simple, fast, no external dependencies.<br/>
**Future:** Replace with database when persistence is needed.

### Validation in Service Layer
**Decision:** Implemented validation directly in PolicyService and ClaimService.<br/>
**Future:** Extract to a separate validator class or use a schema library.

### Synchronous Evaluation
**Decision:** All methods are synchronous (no async/await).<br/>
**Future:** Convert to async when integrating with external services.

## With more time:
Replace in-memory Map with database and async operations<br/>
Convert services to async/await patterns<br/>
Implement connection pooling and transaction support<br/>
Add database migration system<br/>
Implement runtime schema validation<br/>
Create reusable validators for Policy, Claim, ClaimResult<br/>
Create custom error classes (ValidationError, PolicyNotFoundError, ClaimEvaluationError)<br/>
Add structured logging<br/>
Implement centralized error handler<br/>
Add retry strategies for transient failures<br/>
Build REST API layer<br/>
Add request validation middleware<br/>
Implement proper HTTP status codes and error responses<br/>
Generate OpenAPI/Swagger documentation<br/>
Add request/response logging<br/>
Add distributed tracing<br/> 
Implement caching layer for policies<br/>
Add performance metrics<br/>
Benchmark claim evaluation speed<br/>
Reach 100% code coverage<br/>
Add integration tests with test database<br/>
Add E2E tests for full workflows<br/>
Add property-based testing (fast-check)<br/>