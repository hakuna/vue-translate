# Vue Translate Tests

This directory contains tests for the Vue Translate library. The test structure mirrors the source code structure.

## Test Structure

- `__tests__/util/` - Unit tests for utility functions
- `__tests__/*.test.ts` - Unit tests for core functionality
- `__tests__/integration/` - Integration tests for full plugin functionality

## Running Tests

The following npm scripts are available for running tests:

```bash
# Run all tests once
npm test

# Run tests in watch mode (great for development)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## Writing Tests

### Unit Tests

Unit tests should test individual functions and modules in isolation. They should be placed in files that match the source file structure.

### Integration Tests

Integration tests should test how multiple components work together. These tests should generally involve mounting Vue components and testing real-world scenarios.

## Test Coverage

Aim for high test coverage, especially for critical functionality like translation lookups, variable substitution, and pluralization.

## Mocking

When testing components that depend on the Vue context, use Vitest's mocking capabilities to mock the Vue dependency injection system.

```typescript
vi.mock("vue", () => ({
  getCurrentInstance: vi.fn(),
  inject: vi.fn(),
}))
```
