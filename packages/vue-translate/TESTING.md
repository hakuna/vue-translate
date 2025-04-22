# Testing Vue Translate

## Overview

This document explains how to test the Vue Translate library. The test suite is built using Vitest and is structured to mirror the source code directory structure.

## Test Structure

- Unit tests for individual utility functions (`__tests__/util/`)
- Unit tests for core functionality (`__tests__/*.test.ts`)
- Integration tests for full Vue.js integration (`__tests__/integration/`)

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode for development
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## Writing New Tests

### Unit Tests

When adding new functionality to the library, add corresponding unit tests for:

1. Individual functions
2. Edge cases
3. Error handling

### Integration Tests

Integration tests should test real-world scenarios with Vue components using the plugin.

## Test Categories

The library has tests for:

1. **Utility Functions** - Standalone functions for formatting, parsing, etc.
2. **Core Functionality** - The main translation and localization API
3. **Vue Integration** - How the library integrates with Vue components
4. **Edge Cases** - Handling of missing translations, invalid locales, etc.

## Adding New Test Files

When adding new functionality:

1. Create test files that follow the same structure as source files
2. For utilities, create or update files in `__tests__/util/`
3. For core features, add tests directly in `__tests__/`
4. For Vue-specific integrations, add tests in `__tests__/integration/`

## Mock Strategy

The tests use mocking to isolate units under test:

- Vue injection system (getCurrentInstance, inject) is mocked
- @vue/test-utils is mocked for simple component testing

## Coverage Goals

The project aims for high coverage of critical functionality:

- Translation lookup and substitution
- Pluralization and formatting
- Component integration and reactivity
- Error handling and edge cases
