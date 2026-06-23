# Development Checklist - Newportmaeve Archives

**Last Updated:** 2026-06-23  
**Current Phase:** Phase 3 - Static Content Architecture  
**Overall Progress:** Rebaselined for static informational scope

---

## Phase 1: Foundation & Core Infrastructure (Weeks 1-2)

### Project Setup & Documentation
- [x] Update `README.md` with project vision and architecture overview
- [x] Add `CONTRIBUTING.md` for development guidelines
- [x] Create `.env.example` for environment variables
- [x] Document project structure in architecture guide
- [x] Create `DEVELOPMENT_SETUP.md` for local development instructions

### Routing & Navigation
- [x] Define route structure and feature modules
- [ ] Create feature module for archive functionality (SKIPPED)
- [x] Implement lazy loading for all feature routes
- [x] Create main navigation component (header/sidebar)
- [x] Create layout wrapper component
- [x] Set up 404 error page
- [x] Set up error boundary/error page
- [x] Implement breadcrumb navigation for SEO

### SEO & Meta Management
- [x] Create meta service for dynamic title/description management
- [x] Implement `Meta` service integration for Open Graph tags
- [x] Add `robots.txt` to public folder
- [x] Create XML sitemap generator service
- [x] Add canonical URL management service
- [x] Create structured data (JSON-LD) service

**Subtotal Phase 1:** 19/19 tasks ✅ **PHASE 1 COMPLETE**

---

## Phase 2: UI/UX & Design System (Weeks 2-3)

### Design System Foundation
- [x] Create shared component library folder structure (`src/shared/components`)
- [x] Extract existing color tokens into SCSS variables (`src/styles/_variables.scss`)
- [x] Define typography scale and font weights
- [x] Create spacing/sizing scales
- [x] Document all design tokens in style guide
- [x] Create SCSS utility classes

### Reusable Components (Basic)
- [x] Button component (primary, secondary, tertiary variants)
- [ ] Input text component (SKIPPED)
- [ ] Input textarea component (SKIPPED)
- [ ] Select dropdown component (SKIPPED)
- [ ] Checkbox component (SKIPPED)
- [ ] Radio button component (SKIPPED)

### Reusable Components (Complex)
- [x] Card component
- [x] Modal/Dialog component
- [ ] Toast/Notification component (SKIPPED)
- [x] Loading spinner component
- [x] Skeleton loader component
- [ ] Pagination component (SKIPPED)
- [ ] Badge/Tag component (SKIPPED)

### Navigation Components
- [x] Header/Navigation component
- [x] Sidebar/Menu component
- [x] Tabs component
- [x] Breadcrumb component
- [x] Footer component

### Accessibility Compliance
- [ ] Run AXE audit on all components (SKIPPED)
- [x] Implement focus management across all interactive elements
- [x] Add ARIA labels and descriptions where needed
- [ ] Test with keyboard navigation only (SKIPPED)
- [ ] Test color contrast ratios (WCAG AA minimum) (SKIPPED)
- [x] Create accessibility testing checklist
- [x] Document accessibility patterns

**Subtotal Phase 2:** 20/36 tasks

---

## Phase 3: Static Content Architecture (Weeks 3-4)

### Content Model & JSON Structure
- [ ] Define JSON schemas/interfaces for all content domains (characters, city, districts, author, connect)
- [ ] Create central `src/app/core/content` folder for content models and utilities
- [ ] Create typed data loaders for local JSON files in `public/` or `src/assets/`
- [ ] Add runtime guards/validation for malformed JSON data
- [ ] Create slug-index maps for fast route lookups (character and district detail pages)
- [ ] Document JSON authoring rules (required fields, slug format, image references)

### Content Delivery (No Backend)
- [ ] Replace API-oriented services with static content services
- [ ] Ensure all pages read from predefined JSON files only
- [ ] Implement graceful fallback for missing content records
- [ ] Add shared empty/error display for content-not-found states
- [ ] Ensure SSR renders static content correctly for all routes

### Asset Strategy (Images & Media)
- [ ] Define folder convention for image assets (`public/images/...`)
- [ ] Map JSON image keys to local asset paths
- [ ] Implement `NgOptimizedImage` for all static content images
- [ ] Add image metadata rules (alt text, dimensions, optional captions)
- [ ] Add default/fallback image handling for missing assets

**Subtotal Phase 3:** 0/16 tasks

---

## Phase 4: Read-Only UX & Navigation Polish (Weeks 4-5)

### Read-Only Experience
- [ ] Remove/avoid all login, signup, and account-related routes/components
- [ ] Remove/avoid all CRUD-oriented UI (create, edit, delete, save actions)
- [ ] Ensure content pages are optimized for reading and discovery only
- [ ] Improve typography and spacing for long-form informational reading
- [ ] Add section anchors/table of contents where content is lengthy

### Navigation & Discovery
- [ ] Add/verify clear navigation between list pages and detail pages
- [ ] Improve breadcrumbs across all detail routes
- [ ] Add related-content blocks (e.g., related characters/districts)
- [ ] Add client-side filtering/search for local datasets (no server)
- [ ] Ensure all internal links are crawlable and SSR-friendly

### Security Baseline (Static Site)
- [ ] Add/verify Content Security Policy headers in SSR server config
- [ ] Add/verify secure headers for static delivery
- [ ] Sanitize and validate any externally sourced links in content JSON
- [ ] Run dependency vulnerability scan and resolve critical issues

**Subtotal Phase 4:** 0/14 tasks

---

## Phase 5: Testing & Quality Assurance (Weeks 5-6)

### Unit Tests
- [ ] Write tests for static content services/loaders (target: 80%+ coverage)
- [ ] Write tests for all components
- [ ] Test JSON parsing and malformed-data scenarios
- [ ] Test error scenarios in content services
- [ ] Test error scenarios in components
- [ ] Test edge cases
- [ ] Achieve 80%+ overall code coverage

### Integration Tests
- [ ] Test static content loading and display flows
- [ ] Test route-to-content mapping by slug
- [ ] Test navigation flows
- [ ] Test accessibility in real components
- [ ] Test SSR rendering

### E2E Testing
- [ ] Set up Cypress or Playwright
- [ ] Create data browsing journey tests
- [ ] Create local search/filter functionality tests
- [ ] Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test on different screen sizes (mobile, tablet, desktop)
- [ ] Test SEO functionality (meta tags rendering)

### Code Quality
- [ ] Set up ESLint rules validation
- [ ] Configure Prettier code formatting
- [ ] Verify TypeScript strict mode compliance
- [ ] Add pre-commit hooks (Husky)
- [ ] Add commit message linting

**Subtotal Phase 5:** 0/31 tasks

---

## Phase 6: Performance Optimization (Weeks 6-7)

### Build Optimization
- [ ] Enable production build optimizations
- [ ] Implement code splitting for routes
- [ ] Lazy load images with `NgOptimizedImage`
- [ ] Minify and compress assets
- [ ] Analyze bundle size with webpack-bundle-analyzer
- [ ] Optimize initial bundle size

### Runtime Performance
- [ ] Implement virtual scrolling for large lists
- [ ] Add lazy loading for below-the-fold content
- [ ] Confirm default change detection strategy is retained (Angular v22+ defaults)
- [ ] Review and optimize change detection
- [ ] Implement memoization for expensive computations
- [ ] Monitor Core Web Vitals (LCP, FID, CLS)
- [ ] Optimize images for different screen sizes

### Server Performance
- [ ] Add caching headers for static assets
- [ ] Implement compression (gzip/brotli)
- [ ] Add response caching for static JSON and SSR pages
- [ ] Optimize SSR rendering performance
- [ ] Implement service worker for offline capability
- [ ] Cache static HTML pages

**Subtotal Phase 6:** 0/21 tasks

---

## Phase 7: DevOps & Deployment (Weeks 7-8)

### CI/CD Pipeline
- [ ] Set up GitHub Actions workflow
- [ ] Automated testing on PR
- [ ] Automated linting and formatting checks
- [ ] Build production artifacts
- [ ] Deploy to staging environment
- [ ] Deploy to production environment
- [ ] Set up environment secrets management

### Deployment Configuration
- [ ] Set up environment-specific configs (dev, staging, prod)
- [ ] Create deployment documentation
- [ ] Implement zero-downtime deployments
- [ ] Set up monitoring and logging (Sentry, LogRocket)
- [ ] Create rollback procedures
- [ ] Configure CDN for static assets
- [ ] Set up database migrations strategy

### Development Tools & Automation
- [ ] Set up pre-commit hooks (Husky)
- [ ] Configure code formatting (Prettier)
- [ ] Set up ESLint configuration
- [ ] Add commit message linting (Commitizen)
- [ ] Create development environment setup script
- [ ] Document all deployment procedures

**Subtotal Phase 7:** 0/20 tasks

---

## Phase 8: Monitoring & Maintenance (Ongoing)

### Analytics & Monitoring
- [x] Implement Google Analytics 4 tracking
- [ ] Configure production GA4 Measurement ID in deployment configuration
- [ ] Verify `page_view` events for all routed pages in GA4 Realtime
- [ ] Track key engagement events (`share_click`, `outbound_link_click`, `audio_play`)
- [x] Implement reusable social sharing mechanisms (native share, copy link, platform links)
- [ ] Add route-aware `og:image` / `twitter:image` for richer social previews
- [ ] Add static social preview image assets for key informational pages
- [ ] Validate social share previews with platform debugger tools
- [ ] Test share UX on mobile and desktop (native and fallback paths)
- [ ] Set up error tracking (Sentry)
- [ ] Monitor performance metrics (Real User Monitoring)
- [ ] Track user engagement metrics
- [ ] Set up alerts for critical errors
- [ ] Create performance dashboard

### Documentation
- [ ] Document static content schema and publishing workflow
- [ ] Document component usage with Storybook
- [ ] Create deployment runbooks
- [ ] Document decision records (ADRs)
- [ ] Keep CHANGELOG updated
- [ ] Create troubleshooting guide
- [ ] Document testing strategies

### Maintenance & Improvements
- [ ] Schedule regular dependency updates
- [ ] Perform security vulnerability scanning (npm audit)
- [ ] Conduct quarterly performance optimization reviews
- [ ] Integrate user feedback loop
- [ ] Create bug triage process
- [ ] Plan feature improvements based on usage

**Subtotal Phase 8:** 2/26 tasks

---

## Summary

| Phase | Status | Progress |
|-------|--------|----------|
| Phase 1: Foundation & Infrastructure | Complete ✅ | 19/19 |
| Phase 2: UI/UX & Design System | In Progress | 20/36 |
| Phase 3: Static Content Architecture | Not Started | 0/16 |
| Phase 4: Read-Only UX & Navigation Polish | Not Started | 0/14 |
| Phase 5: Testing & QA | Not Started | 0/31 |
| Phase 6: Performance Optimization | Not Started | 0/21 |
| Phase 7: DevOps & Deployment | Not Started | 0/20 |
| Phase 8: Monitoring & Maintenance | In Progress | 2/26 |
| **TOTAL** | **In Progress** | **41/183** |

---

## Instructions for Using This Checklist

1. **Copy and paste** the ✓ character (or type `x` in brackets) to mark items as complete
2. **Update the date** at the top after significant progress
3. **Track progress** by counting checked items
4. **Commit changes** to git when you complete a phase: `git commit -am "Complete Phase X: [Description]"`
5. **Link issues** to specific checklist items in GitHub for better tracking

### Quick Reference Commands

```bash
# View checklist
cat DEVELOPMENT_CHECKLIST.md

# Count completed tasks (macOS/Linux)
grep -c "^- \[x\]" DEVELOPMENT_CHECKLIST.md

# Count total tasks
grep -c "^- \[ \]" DEVELOPMENT_CHECKLIST.md
```

---

## Next Actions (Start Here)

1. **☝️ Phase 3 Active** - Define JSON schemas/interfaces for all informational content
2. **Recommended next task:** Create typed static content loader service for predefined JSON files
3. **Then:** Wire characters/city detail routes to slug-indexed local content maps

Good luck! 🚀
