# Development Guide

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or later)
- pnpm (v8 or later)
- Git
- A code editor (VS Code recommended)
- Docker (for local development)

### Initial Setup

1. **Clone the Repository**
```bash
git clone <repository-url>
cd nestjs-base
```

2. **Install Dependencies**
```bash
pnpm install
```

3. **Set Up Environment Variables**
```bash
cp .env.example .env
```
Edit `.env` with your local configuration.

4. **Start Development Server**
```bash
pnpm run start:dev
```

## Development Workflow

### 1. Branch Naming Convention

- Feature branches: `feature/feature-name`
- Bug fixes: `fix/bug-name`
- Hotfixes: `hotfix/issue-name`
- Releases: `release/version-number`

### 2. Commit Message Format

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or modifying tests
- `chore`: Maintenance tasks

Example:
```
feat(auth): implement JWT authentication

- Add JWT strategy
- Implement auth guards
- Add user authentication endpoints

Closes #123
```

### 3. Code Style Guide

We use ESLint and Prettier for code formatting. Configuration files are included in the repository.

- Run linter: `pnpm run lint`
- Fix linting issues: `pnpm run lint:fix`
- Format code: `pnpm run format`

### 4. Testing

#### Unit Tests
```bash
# Run unit tests
pnpm run test

# Run tests in watch mode
pnpm run test:watch

# Generate coverage report
pnpm run test:cov
```

#### E2E Tests
```bash
# Run e2e tests
pnpm run test:e2e
```

### 5. Database Migrations

We use TypeORM for database management:

```bash
# Generate a new migration
pnpm run migration:generate src/database/migrations/MigrationName

# Run migrations
pnpm run migration:run

# Revert last migration
pnpm run migration:revert
```

## Project Structure

```
src/
├── config/              # Configuration files
├── modules/            # Feature modules
│   ├── auth/          # Authentication module
│   ├── users/         # Users module
│   └── common/        # Shared module
├── database/          # Database configurations and migrations
├── decorators/        # Custom decorators
├── filters/           # Exception filters
├── guards/            # Authentication guards
├── interfaces/        # TypeScript interfaces
├── pipes/             # Validation pipes
└── utils/             # Utility functions
```

## API Documentation

We use Swagger for API documentation. Access the Swagger UI at:
```
http://localhost:3000/api/docs
```

To update API documentation:
1. Use appropriate Swagger decorators in controllers
2. Update DTOs with class-validator decorators
3. Rebuild the application to see changes

## Debugging

### VS Code Configuration

1. Create/update `.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug NestJS",
      "runtimeExecutable": "pnpm",
      "runtimeArgs": ["run", "start:debug"],
      "console": "integratedTerminal",
      "restart": true,
      "protocol": "inspector",
      "port": 9229,
      "autoAttachChildProcesses": true
    }
  ]
}
```

2. Add breakpoints in your code
3. Start debugging session in VS Code

### Common Debug Points

- Request/Response cycle in controllers
- Service method execution
- Database queries in repositories
- Authentication flow
- Error handling in filters

## Performance Optimization

### 1. Database Optimization
- Use appropriate indexes
- Implement caching where necessary
- Use pagination for large datasets
- Optimize queries using TypeORM features

### 2. API Response Optimization
- Use DTOs for data transformation
- Implement response compression
- Use appropriate HTTP status codes
- Handle errors properly

### 3. Memory Management
- Avoid memory leaks
- Use streams for large files
- Implement garbage collection best practices

## Deployment

### Production Build
```bash
# Build the application
pnpm run build

# Start production server
pnpm run start:prod
```

### Docker Deployment
```bash
# Build Docker image
docker build -t nestjs-app .

# Run Docker container
docker run -p 3000:3000 nestjs-app
```

## Troubleshooting

### Common Issues

1. **Database Connection Issues**
   - Check environment variables
   - Verify database credentials
   - Ensure database service is running

2. **Build Errors**
   - Clear node_modules and reinstall
   - Check TypeScript configuration
   - Verify dependency versions

3. **Runtime Errors**
   - Check logs using `pnpm run start:dev`
   - Use debugging tools
   - Verify environment configuration

## Additional Resources

- [NestJS Documentation](https://docs.nestjs.com/)
- [TypeORM Documentation](https://typeorm.io/)
- [Jest Documentation](https://jestjs.io/)
- [Docker Documentation](https://docs.docker.com/) 