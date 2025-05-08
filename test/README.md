# API Test Files

This directory contains HTTP test files for testing the API endpoints.

## Directory Structure

```
test/
├── http/
│   ├── environment.http      # Common environment variables
│   ├── auth/                 # Authentication related tests
│   ├── health/               # Health check tests
│   ├── users/                # User management tests
```

## Usage

1. Install REST Client extension in VS Code
2. Open any .http file
3. Click "Send Request" above each request to test

## Environment Variables

Edit `environment.http` to set:
- Base URL
- API Prefix
- Content Type
- Authentication tokens

## Naming Convention

- Files: `{resource}.http`
- Request names: `{resource}{action}`
- Example: `usersCreate`, `plansUpdate` 