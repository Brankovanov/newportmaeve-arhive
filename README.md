# Newportmaeve Archives

A modern, SEO-optimized, and accessible web application for archiving and browsing historical collections. Built with Angular 22, TypeScript, and server-side rendering.

**Repository:** https://github.com/Brankovanov/newportmaeve-arhive  
**Documentation:** See [ARCHITECTURE.md](./ARCHITECTURE.md) and [DEVELOPMENT_SETUP.md](./DEVELOPMENT_SETUP.md) for architecture and setup guides  
**Checklist:** Track progress with [DEVELOPMENT_CHECKLIST.md](./DEVELOPMENT_CHECKLIST.md)

---

## 🎯 Project Vision

Newportmaeve Archives aims to provide a comprehensive, user-friendly digital archive platform that:
- **Preserves** historical collections with semantic organization
- **Discovers** archived items through intuitive search and browsing
- **Engages** visitors with rich, accessible content experiences
- **Ranks** well in search engines through SEO optimization
- **Performs** efficiently on all devices with optimized delivery

---

## 🏗️ Architecture Overview

### Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Framework** | Angular | 22.0.0 |
| **Language** | TypeScript | 6.0.2 |
| **Styling** | SCSS | (built-in) |
| **Forms** | Reactive Forms / Signal Forms | 22.0.0 |
| **State** | Signals API | (built-in) |
| **Server** | Express | 5.1.0 |
| **SSR** | Angular SSR | 22.0.2 |
| **Testing** | Vitest | 4.0.8 |
| **Package Manager** | npm | 11.13.0 |

### Project Structure

```
newportmaeve-achives/
├── src/
│   ├── app/
│   │   ├── app.ts                 # Root component
│   │   ├── app.html               # Root template
│   │   ├── app.scss               # Root styles
│   │   ├── app.routes.ts          # Application routes
│   │   ├── app.config.ts          # Client configuration
│   │   ├── app.config.server.ts   # Server configuration
│   │   ├── app.routes.server.ts   # Server-side routes
│   │   └── app.spec.ts            # Root component tests
│   ├── main.ts                    # Client bootstrap
│   ├── main.server.ts             # Server bootstrap
│   ├── server.ts                  # Express SSR server
│   ├── styles.scss                # Global styles
│   └── index.html                 # HTML entry point
├── public/                        # Static assets
├── angular.json                   # Angular CLI configuration
├── tsconfig.json                  # TypeScript configuration
├── package.json                   # Dependencies
├── DEVELOPMENT_CHECKLIST.md       # Development tasks
├── DEVELOPMENT.md                 # Architecture & setup (TODO)
├── CONTRIBUTING.md                # Contribution guidelines (TODO)
└── README.md                      # This file
```

### Key Features

✅ **Server-Side Rendering (SSR)** — Full page rendering on the server for SEO crawlability  
✅ **Standalone Components** — Modern Angular architecture without NgModules  
✅ **Signals API** — Reactive state management with minimal boilerplate  
✅ **Lazy-Loaded Routes** — Code splitting for optimized performance  
✅ **SCSS Theming** — Customizable color palette and design tokens  
✅ **TypeScript Strict Mode** — Maximum type safety and developer experience  
✅ **Accessible by Default** — WCAG AA compliance and AXE audit passing  
✅ **SEO Optimized** — Meta tags, structured data, and semantic HTML  

### Story Routes

| Route | Content |
|-------|---------|
| `/` | Hero landing with animated-style tagline, entry CTA, and series introduction |
| `/listen` | Prequel audiobook section with embedded YouTube player |
| `/characters` | Character roster with reveal mechanic |
| `/characters/:slug` | Individual character detail page |
| `/city` | Newport Maeve overview with district map links |
| `/city/:district` | Individual district deep-dive page |
| `/author` | Dean Jordanov about section |
| `/connect` | External links (YouTube, Wiki, DeviantArt, Facebook) |

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 20.x or higher
- **npm** 11.x or higher
- **Git** 2.x or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/Brankovanov/newportmaeve-arhive.git
cd newportmaeve-achives

# Install dependencies
npm install

# Create environment file (optional)
cp .env.example .env.local
```

### Development Server

```bash
# Start the development server
npm start

# Navigate to http://localhost:4200/
# The application will automatically reload if you change any of the source files
```

### Building for Production

```bash
# Build for production
npm run build

# Output is in dist/newportmaeve-achives/

# Serve the production build with SSR
npm run serve:ssr:newportmaeve-achives
```

### Running Tests

```bash
# Run unit tests with Vitest
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

---

## 📋 Development Standards

This project enforces strict development standards. See [CLAUDE.md](./.claude/CLAUDE.md) or [.github/copilot-instructions.md](./.github/copilot-instructions.md) for the complete standards guide.

### TypeScript Best Practices

- ✅ Use strict type checking
- ✅ Prefer type inference when obvious
- ❌ Avoid `any` type; use `unknown` when uncertain

### Angular Best Practices

- ✅ Always use standalone components
- ✅ Use signals for state management
- ✅ Use `input()` and `output()` functions
- ✅ Lazy load feature routes
- ❌ Don't use NgModules or decorators like `@HostBinding`

### Accessibility & SEO Requirements

- ✅ **WCAG AA Compliance** — Minimum accessibility standard
- ✅ **AXE Audit Passing** — All automated accessibility checks pass
- ✅ **Semantic HTML** — Use `<header>`, `<main>`, `<article>`, `<nav>`, etc.
- ✅ **Meta Tags** — Dynamic title, description, canonical URLs, Open Graph
- ✅ **Structured Data** — Schema.org JSON-LD for rich snippets
- ✅ **Image Optimization** — Use `NgOptimizedImage` with alt attributes
- ✅ **Core Web Vitals** — LCP < 2.5s, FID < 100ms, CLS < 0.1

### Styling

- ✅ Use **SCSS** with variables and mixins
- ✅ Use design tokens for colors, spacing, typography
- ✅ Use **class bindings** instead of `ngClass`
- ✅ Use **style bindings** instead of `ngStyle`

### Component Architecture

- ✅ Keep components **small and focused**
- ✅ Use **external templates** (separate .html files)
- ✅ Use **external stylesheets** (separate .scss files)
- ✅ One component per file
- ✅ Use `computed()` for derived state

### Forms

- ✅ Prefer **Signal Forms** for new forms (Angular 22+)
- ✅ Use **Reactive Forms** when not using Signal Forms
- ❌ Don't use Template-driven forms

---

## 📚 Development Workflow

### 1. Feature Development

```bash
# Create a feature branch
git checkout -b feature/archive-list

# Make your changes following the standards above
# ...

# Commit with clear messages
git add .
git commit -m "feat: implement archive list component

- Add archive-list component with pagination
- Implement search filtering
- Add accessibility labels"

# Push and create a pull request
git push -u origin feature/archive-list
```

### 2. Code Quality Checks

Before committing, ensure:

```bash
# Run tests
npm test

# Check for TypeScript errors
npx tsc --noEmit

# Format code
npx prettier --write src/

# Check linting (when ESLint is configured)
npx eslint src/
```

### 3. Testing Requirements

- ✅ All components must have unit tests
- ✅ All services must have unit tests
- ✅ Minimum 80% code coverage
- ✅ All critical user flows must have E2E tests

---

## 🎨 Design System

The application uses a modern color palette with semantic meaning:

```scss
// Primary Colors
--bright-blue: oklch(51.01% 0.274 263.83);
--electric-violet: oklch(53.18% 0.28 296.97);
--french-violet: oklch(47.66% 0.246 305.88);
--vivid-pink: oklch(69.02% 0.277 332.77);
--hot-red: oklch(61.42% 0.238 15.34);
--orange-red: oklch(63.32% 0.24 31.68);

// Neutral Colors
--gray-900: oklch(19.37% 0.006 300.98);
--gray-700: oklch(36.98% 0.014 302.71);
--gray-400: oklch(70.9% 0.015 304.04);
```

See [src/styles.scss](./src/styles.scss) for the complete design system.

---

## 🔒 Security

- ✅ HTTPS enforcement in production
- ✅ Content Security Policy headers
- ✅ CSRF protection
- ✅ Input sanitization with `DomSanitizer`
- ✅ Secure HTTP headers middleware
- ✅ Regular dependency audits (`npm audit`)

---

## ⚡ Performance

### Core Web Vitals Targets

| Metric | Target |
|--------|--------|
| **LCP** (Largest Contentful Paint) | < 2.5s |
| **FID** (First Input Delay) | < 100ms |
| **CLS** (Cumulative Layout Shift) | < 0.1 |

### Optimization Strategies

- Code splitting with lazy loading
- Image optimization with `NgOptimizedImage`
- Virtual scrolling for large lists
- Memoization for expensive computations
- Service worker for offline support
- CDN for static assets
- Gzip/Brotli compression

---

## 📖 Documentation

| Document | Purpose |
|----------|---------|
| [ARCHITECTURE.md](./ARCHITECTURE.md) | System architecture and routing design |
| [DEVELOPMENT_SETUP.md](./DEVELOPMENT_SETUP.md) | Local setup and tooling guide |
| [DEVELOPMENT_CHECKLIST.md](./DEVELOPMENT_CHECKLIST.md) | Development tasks and progress tracking |
| [CONTRIBUTING.md](./CONTRIBUTING.md) | Contribution guidelines and workflow |
| [.claude/CLAUDE.md](./.claude/CLAUDE.md) | AI assistant instructions and standards |
| [.github/copilot-instructions.md](./.github/copilot-instructions.md) | GitHub Copilot guidance |

---

## 🤝 Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) before submitting pull requests.

### Quick Contribution Guide

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Follow** the development standards (see above)
4. **Write** tests for your changes
5. **Commit** with clear messages
6. **Push** to the branch (`git push origin feature/amazing-feature`)
7. **Open** a pull request with a detailed description

---

## 📊 Project Status

### Current Phase: **Phase 1 - Foundation & Core Infrastructure**

**Progress:** 9/187 tasks complete (4.8%)

**Immediate Next Steps:**
- [ ] Create meta service for dynamic title/description
- [ ] Add Open Graph integration
- [ ] Add robots.txt and sitemap generation
- [ ] Add canonical URL service

See [DEVELOPMENT_CHECKLIST.md](./DEVELOPMENT_CHECKLIST.md) for the complete roadmap.

---

## 🐛 Bug Reports & Features

Found a bug? Want a new feature?

- **Report a bug:** [GitHub Issues](https://github.com/Brankovanov/newportmaeve-arhive/issues/new?template=bug_report.md)
- **Request a feature:** [GitHub Issues](https://github.com/Brankovanov/newportmaeve-arhive/issues/new?template=feature_request.md)

---

## 📝 License

This project is private. Please contact the repository owner for licensing information.

---

## 👤 Author

**Georg** — [GitHub](https://github.com/Brankovanov)

---

## 🎯 Roadmap

See [DEVELOPMENT_CHECKLIST.md](./DEVELOPMENT_CHECKLIST.md) for the full development roadmap across 8 phases:

1. **Phase 1** (Weeks 1-2): Foundation & Core Infrastructure
2. **Phase 2** (Weeks 2-3): UI/UX & Design System
3. **Phase 3** (Weeks 3-4): Data Management & Services
4. **Phase 4** (Weeks 4-5): Authentication & Security
5. **Phase 5** (Weeks 5-6): Testing & Quality Assurance
6. **Phase 6** (Weeks 6-7): Performance Optimization
7. **Phase 7** (Weeks 7-8): DevOps & Deployment
8. **Phase 8** (Ongoing): Monitoring & Maintenance

---

## 📞 Support

For questions or support:
- 📧 Check documentation in [ARCHITECTURE.md](./ARCHITECTURE.md) and [DEVELOPMENT_SETUP.md](./DEVELOPMENT_SETUP.md)
- 🐛 Search [existing issues](https://github.com/Brankovanov/newportmaeve-arhive/issues)
- 💬 Create a [new issue](https://github.com/Brankovanov/newportmaeve-arhive/issues/new)

---

**Built with ❤️ for historical preservation and digital accessibility**
