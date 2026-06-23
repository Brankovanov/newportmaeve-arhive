# Contributing to Newportmaeve Archives

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to the project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Testing Requirements](#testing-requirements)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Reporting Issues](#reporting-issues)
- [Questions?](#questions)

---

## Code of Conduct

Please note that this project is released with a [Contributor Code of Conduct](./CODE_OF_CONDUCT.md). By participating in this project, you agree to abide by its terms.

### Expected Behavior

- Be respectful and inclusive
- Welcome different perspectives and experiences
- Provide constructive feedback
- Focus on the code, not the person
- Help others learn and grow

### Unacceptable Behavior

- Harassment, intimidation, or discrimination
- Offensive comments or language
- Personal attacks
- Trolling or spam
- Any form of abuse

---

## Getting Started

### Prerequisites

- **Node.js** 20.x or higher ([download](https://nodejs.org/))
- **npm** 11.x or higher
- **Git** 2.x or higher ([download](https://git-scm.com/))
- A GitHub account

### Setup Your Development Environment

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/newportmaeve-arhive.git
   cd newportmaeve-achives
   ```

3. **Add upstream remote** to keep your fork in sync:
   ```bash
   git remote add upstream https://github.com/Brankovanov/newportmaeve-arhive.git
   ```

4. **Install dependencies**:
   ```bash
   npm install
   ```

5. **Create a development branch** (see Workflow section below)

6. **Follow the setup guide** in [DEVELOPMENT_SETUP.md](./DEVELOPMENT_SETUP.md)

---

## Development Workflow

### 1. Keep Your Fork in Sync

Before starting work, update your local fork with the latest changes:

```bash
git fetch upstream
git rebase upstream/main
```

### 2. Create a Feature Branch

Create a descriptive branch name following the pattern: `type/description`

**Branch Types:**
- `feature/` - New functionality
- `bugfix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `perf/` - Performance improvements
- `test/` - Test additions/improvements
- `chore/` - Build, dependencies, config changes

**Examples:**
```bash
git checkout -b feature/archive-search-filters
git checkout -b bugfix/navigation-menu-alignment
git checkout -b docs/installation-guide
```

### 3. Make Your Changes

- Follow all coding standards (see below)
- Keep commits atomic and logical
- Write descriptive commit messages
- Add tests for all new code
- Update documentation as needed

### 4. Keep Commits Clean

```bash
# Stage your changes
git add src/

# Commit with a descriptive message (see Commit Guidelines)
git commit -m "feat: add archive search filters component"

# If needed, squash commits before pushing
git rebase -i upstream/main
```

### 5. Push to Your Fork

```bash
git push -u origin feature/archive-search-filters
```

### 6. Create a Pull Request

See [Pull Request Process](#pull-request-process) below.

---

## Coding Standards

### General Rules

Follow the standards defined in:
- [.claude/CLAUDE.md](./.claude/CLAUDE.md) — AI assistant standards
- [README.md](./README.md) — Development standards section

### TypeScript

```typescript
// ✅ DO: Use strict types
function processArchives(items: Archive[]): Archive[] {
  return items.filter(item => item.isPublished);
}

// ❌ DON'T: Use `any` type
function processArchives(items: any[]): any {
  return items.filter(item => item.isPublished);
}
```

### Angular Components

```typescript
// ✅ DO: Use standalone components with external templates
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-archive-item',
  templateUrl: './archive-item.html',
  styleUrl: './archive-item.scss',
  imports: [CommonModule, NgOptimizedImage]
})
export class ArchiveItemComponent {
  item = input.required<Archive>();
  onSelect = output<Archive>();
}

// ❌ DON'T: Use NgModules or inline templates
@NgModule({
  declarations: [ArchiveItemComponent],
  imports: [CommonModule]
})
export class ArchiveModule {}
```

### File Organization

```
src/
├── app/
│   ├── features/
│   │   ├── archive/
│   │   │   ├── archive.routes.ts
│   │   │   ├── archive-list/
│   │   │   │   ├── archive-list.ts
│   │   │   │   ├── archive-list.html
│   │   │   │   ├── archive-list.scss
│   │   │   │   └── archive-list.spec.ts
│   │   │   └── archive-detail/
│   │   │       ├── archive-detail.ts
│   │   │       ├── archive-detail.html
│   │   │       ├── archive-detail.scss
│   │   │       └── archive-detail.spec.ts
│   ├── shared/
│   │   ├── components/
│   │   │   ├── button/
│   │   │   ├── card/
│   │   │   └── modal/
│   │   ├── services/
│   │   │   ├── meta.service.ts
│   │   │   └── meta.service.spec.ts
│   │   └── pipes/
│   └── core/
│       ├── interceptors/
│       ├── guards/
│       └── models/
```

### Naming Conventions

- **Files**: kebab-case (e.g., `archive-list.ts`)
- **Classes**: PascalCase (e.g., `ArchiveListComponent`)
- **Functions/Variables**: camelCase (e.g., `getArchiveById`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_ITEMS_PER_PAGE`)
- **Interfaces**: PascalCase with `I` prefix optional (e.g., `Archive` or `IArchive`)

### Code Quality

#### Linting & Formatting

All code must pass ESLint and be formatted with Prettier. Before committing:

```bash
# Format code
npx prettier --write src/

# Run linter (when configured)
npx eslint src/

# TypeScript check
npx tsc --noEmit
```

#### Comments & Documentation

```typescript
// ✅ DO: Document complex logic
/**
 * Filters archives by publication status and date range.
 * 
 * @param items - Array of archive items to filter
 * @param startDate - Earliest publication date (inclusive)
 * @param endDate - Latest publication date (inclusive)
 * @returns Filtered array of published archives
 */
function getPublishedArchives(
  items: Archive[],
  startDate: Date,
  endDate: Date
): Archive[] {
  return items.filter(
    item => item.isPublished &&
            item.publishedDate >= startDate &&
            item.publishedDate <= endDate
  );
}

// ❌ DON'T: Over-comment obvious code
// This function returns the length
const length = array.length; // Gets length

// ❌ DON'T: Leave commented-out code
// const oldFunction = () => { ... }
```

---

## Testing Requirements

### Unit Tests

All new code must include unit tests with minimum 80% coverage.

```typescript
// ✅ DO: Write clear, focused tests
describe('ArchiveService', () => {
  let service: ArchiveService;
  let httpClient: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArchiveService]
    });
    service = TestBed.inject(ArchiveService);
    httpClient = TestBed.inject(HttpTestingController);
  });

  it('should fetch archives from API', () => {
    const mockArchives = [{ id: 1, title: 'Archive 1' }];
    
    service.getArchives().subscribe(archives => {
      expect(archives).toEqual(mockArchives);
    });

    const req = httpClient.expectOne('/api/archives');
    expect(req.request.method).toBe('GET');
    req.flush(mockArchives);
  });

  afterEach(() => {
    httpClient.verify();
  });
});
```

### Running Tests

```bash
# Run all tests
npm test

# Run with coverage report
npm test -- --coverage

# Run specific test file
npm test -- archive.service

# Run in watch mode
npm test -- --watch
```

### Coverage Requirements

- **Statements**: 80%+
- **Branches**: 80%+
- **Functions**: 80%+
- **Lines**: 80%+

---

## Commit Guidelines

Use clear, descriptive commit messages following the [Conventional Commits](https://www.conventionalcommits.org/) format:

```
type(scope): subject

body

footer
```

### Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, missing semicolons, etc.)
- **refactor**: Code refactoring without feature changes
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **chore**: Build, dependencies, or config changes

### Examples

```bash
# Feature commit
git commit -m "feat(archive): add search filters to archive list

- Implement text search filter
- Add date range filter
- Add category filter
- Update component tests"

# Bug fix commit
git commit -m "fix(navigation): correct menu alignment on mobile

- Fix flexbox alignment issue
- Update responsive breakpoint
- Add unit test for mobile view"

# Documentation commit
git commit -m "docs: update installation instructions

- Add Node.js version requirement
- Include npm install command
- Add troubleshooting section"

# Chore commit
git commit -m "chore: update Angular dependencies

- Update Angular from 22.0.0 to 22.1.0
- Update TypeScript from 6.0.2 to 6.1.0"
```

### Good Commit Practices

✅ **DO:**
- Keep commits atomic (one logical change per commit)
- Write descriptive commit messages
- Include related changes together
- Reference issues in commits: `fix: resolve validation bug (closes #123)`

❌ **DON'T:**
- Mix multiple features in one commit
- Use vague messages like "update" or "fix bug"
- Commit large refactors with feature changes
- Leave debugging code or console.logs

---

## Pull Request Process

### Before Creating a PR

1. **Sync with upstream**:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Run all checks**:
   ```bash
   npm test              # Run tests
   npx tsc --noEmit      # Check TypeScript
   npx prettier --check src/  # Check formatting
   npx eslint src/       # Run linter
   npm run build         # Build project
   ```

3. **Fix any issues** before pushing

### Creating a Pull Request

1. **Push your branch**:
   ```bash
   git push -u origin feature/my-feature
   ```

2. **Open PR on GitHub** with:
   - **Title**: Clear, descriptive title (use conventional commit format)
   - **Description**: Follow the PR template
   - **References**: Link related issues with `closes #123`

### PR Description Template

```markdown
## Description
Brief description of the changes.

## Type of Change
- [ ] New feature
- [ ] Bug fix
- [ ] Breaking change
- [ ] Documentation update

## Related Issues
Closes #123

## Changes Made
- Detailed change 1
- Detailed change 2
- Detailed change 3

## Testing
- [ ] Unit tests added/updated
- [ ] Manual testing performed
- [ ] All tests passing
- [ ] Coverage >= 80%

## Accessibility & SEO
- [ ] AXE audit passing
- [ ] Keyboard navigation tested
- [ ] WCAG AA compliant
- [ ] Meta tags updated (if applicable)

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No breaking changes (or documented)
```

### PR Review Process

1. **Maintainers will review** your PR within 1-2 business days
2. **Address feedback** by pushing additional commits (don't force push)
3. **Keep PR updated** with main branch if conflicts occur
4. **Approval & merge** once all checks pass and maintainers approve

### PR Guidelines

✅ **Good PRs:**
- Have a clear, focused scope
- Include comprehensive tests
- Update documentation
- Have descriptive commit messages
- Address all feedback

❌ **PRs that may be rejected:**
- Missing tests or coverage
- Don't follow coding standards
- Include unrelated changes
- Lack documentation updates
- Have accessibility/SEO issues

---

## Reporting Issues

### Bug Reports

Click "[New Issue](https://github.com/Brankovanov/newportmaeve-arhive/issues/new?template=bug_report.md)" and include:

1. **Title**: Clear, concise bug description
2. **Description**: What happened and what should happen
3. **Steps to Reproduce**: Exact steps to reproduce the issue
4. **Expected vs Actual**: What you expected vs what actually happened
5. **Environment**: OS, Browser, Node version, etc.
6. **Screenshots**: If applicable
7. **Error Messages**: Full stack traces if available

### Feature Requests

Click "[New Issue](https://github.com/Brankovanov/newportmaeve-arhive/issues/new?template=feature_request.md)" and include:

1. **Title**: Clear feature description
2. **Problem Statement**: What problem does this solve?
3. **Proposed Solution**: How should this work?
4. **Alternatives**: Other approaches considered
5. **Additional Context**: Screenshots, links, etc.

---

## Questions?

- 💬 **Discussions**: Use GitHub Discussions
- 📧 **Issues**: Create a GitHub issue with `[question]` label
- 📖 **Docs**: Check [DEVELOPMENT.md](./DEVELOPMENT.md)

---

## Recognition

Contributors will be recognized in:
- [CONTRIBUTORS.md](./CONTRIBUTORS.md) file
- GitHub contributors page
- Release notes

---

Thank you for contributing to Newportmaeve Archives! 🎉
