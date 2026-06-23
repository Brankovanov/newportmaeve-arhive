# Newportmaeve Archives - Architecture Guide

## 📐 System Architecture Overview

This document describes the architecture of the Newportmaeve Archives application, including system design, component organization, data flow, and technology decisions.

---

## Table of Contents

1. [High-Level Architecture](#high-level-architecture)
2. [Folder Structure](#folder-structure)
3. [Core Concepts](#core-concepts)
4. [Component Architecture](#component-architecture)
5. [Data Management](#data-management)
6. [Services Layer](#services-layer)
7. [Routing & Navigation](#routing--navigation)
8. [State Management](#state-management)
9. [Security](#security)
10. [Performance Considerations](#performance-considerations)
11. [Testing Strategy](#testing-strategy)

---

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Client (Angular 22)                       │
├─────────────────────────────────────────────────────────────┤
│  UI Layer: Standalone Components, Templates, Styles         │
│  State Layer: Signals, Services, Computed Values            │
│  Routing: Feature-based lazy-loaded routes                  │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                  Server (Express + SSR)                      │
├─────────────────────────────────────────────────────────────┤
│  Renders Angular app on server for SEO crawlability        │
│  Serves pre-rendered HTML to clients                        │
│  Handles static file serving with caching                  │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                      Backend APIs                           │
├─────────────────────────────────────────────────────────────┤
│  RESTful endpoints for archives, users, search, etc.       │
│  Database persistence (PostgreSQL, MongoDB, etc.)          │
│  Business logic and data validation                        │
└─────────────────────────────────────────────────────────────┘
```

### Technology Layers

| Layer | Technology | Responsibility |
|-------|-----------|-----------------|
| **Presentation** | Angular 22 Components | User interface, interactivity |
| **State** | Signals API | Reactive state management |
| **Services** | Angular Services | Business logic, HTTP calls |
| **Routing** | Angular Router | Navigation, lazy loading |
| **Styling** | SCSS | Visual presentation |
| **Server** | Express 5 | SSR, static file serving |
| **Build** | Angular CLI 22 | Compilation, optimization |
| **Testing** | Vitest | Unit and integration tests |

---

## Folder Structure

### Recommended Organization

```
newportmaeve-achives/
├── src/
│   ├── app/
│   │   ├── features/                    # Feature modules (lazy-loaded)
│   │   │   ├── archive/
│   │   │   │   ├── archive.routes.ts    # Feature routes
│   │   │   │   ├── archive-list/
│   │   │   │   │   ├── archive-list.ts
│   │   │   │   │   ├── archive-list.html
│   │   │   │   │   ├── archive-list.scss
│   │   │   │   │   └── archive-list.spec.ts
│   │   │   │   ├── archive-detail/
│   │   │   │   ├── archive-edit/
│   │   │   │   └── services/
│   │   │   │       └── archive.service.ts
│   │   │   ├── search/
│   │   │   ├── user/
│   │   │   └── admin/
│   │   ├── shared/                     # Shared across app
│   │   │   ├── components/
│   │   │   │   ├── button/
│   │   │   │   ├── card/
│   │   │   │   ├── breadcrumbs/
│   │   │   │   ├── footer/
│   │   │   │   ├── header-navigation/
│   │   │   │   ├── modal/
│   │   │   │   ├── sidebar-menu/
│   │   │   │   ├── skeleton-loader/
│   │   │   │   ├── spinner/
│   │   │   │   └── tabs/
│   │   │   ├── pipes/
│   │   │   │   ├── safe-html.pipe.ts
│   │   │   │   └── date-format.pipe.ts
│   │   │   ├── directives/
│   │   │   │   ├── highlight.directive.ts
│   │   │   │   └── click-outside.directive.ts
│   │   │   └── models/
│   │   │       ├── archive.model.ts
│   │   │       ├── user.model.ts
│   │   │       └── api-response.model.ts
│   │   ├── core/                       # Singleton services
│   │   │   ├── interceptors/
│   │   │   │   ├── auth.interceptor.ts
│   │   │   │   ├── error.interceptor.ts
│   │   │   │   └── logging.interceptor.ts
│   │   │   ├── guards/
│   │   │   │   ├── auth.guard.ts
│   │   │   │   └── unsaved-changes.guard.ts
│   │   │   ├── services/
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── meta.service.ts
│   │   │   │   ├── api.service.ts
│   │   │   │   └── cache.service.ts
│   │   │   └── config/
│   │   │       └── error-handler.config.ts
│   │   ├── app.ts                      # Root component
│   │   ├── app.html
│   │   ├── app.scss
│   │   ├── app.routes.ts               # Root routes
│   │   ├── app.config.ts               # App configuration
│   │   └── app.spec.ts
│   ├── main.ts                         # Client bootstrap
│   ├── main.server.ts                  # Server bootstrap
│   ├── server.ts                       # Express SSR server
│   ├── styles.scss                     # Global styles
│   │   ├── _variables.scss
│   │   ├── _mixins.scss
│   │   ├── _reset.scss
│   │   └── _utilities.scss
│   └── index.html
├── public/                             # Static assets
│   ├── favicon.ico
│   ├── robots.txt
│   ├── sitemap.xml
│   └── images/
├── dist/                               # Build output
├── angular.json                        # Angular CLI config
├── package.json
├── tsconfig.json
└── README.md
```

### Folder Responsibilities

| Folder | Purpose | Scope |
|--------|---------|-------|
| `features/` | Business-specific modules | Feature-specific components, services, routes |
| `shared/` | Reusable components & utilities | Used by multiple features |
| `core/` | Singleton services | App-wide services, interceptors, guards |
| `styles/` | Global styling | Design system, variables, utilities |

---

## Core Concepts

### Standalone Components

All components in this project are **standalone** — they don't require NgModule declarations.

```typescript
// ✅ Correct: Standalone component
import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-archive-card',
  templateUrl: './archive-card.html',
  styleUrl: './archive-card.scss',
  imports: [CommonModule]  // Specify dependencies directly
})
export class ArchiveCardComponent {
  archive = input.required<Archive>();
  onSelect = output<Archive>();
}
```

### Signals API

Use **Signals** for all state management instead of traditional Subject/BehaviorSubject patterns.

```typescript
// State with Signals
export class ArchiveService {
  archives = signal<Archive[]>([]);
  loading = signal(false);
  
  // Derived state with computed()
  publishedCount = computed(() => 
    this.archives().filter(a => a.isPublished).length
  );
  
  // Update state with set() or update()
  loadArchives() {
    this.loading.set(true);
    this.api.getArchives().subscribe({
      next: (data) => this.archives.set(data),
      finalize: () => this.loading.set(false)
    });
  }
}
```

### Dependency Injection

Use the `inject()` function instead of constructor parameters.

```typescript
// ✅ Correct: Using inject()
import { inject } from '@angular/core';

@Component(...)
export class ArchiveListComponent {
  archiveService = inject(ArchiveService);
  metaService = inject(MetaService);
  
  ngOnInit() {
    this.archiveService.loadArchives();
  }
}

// ❌ Avoid: Constructor injection
export class ArchiveListComponent {
  constructor(private archiveService: ArchiveService) {}
}
```

---

## Component Architecture

### Component Responsibilities

Each component should have a single, well-defined responsibility.

```typescript
// ✅ Good: Focused component
@Component({
  selector: 'app-archive-item',
  templateUrl: './archive-item.html'
})
export class ArchiveItemComponent {
  // Input: data received from parent
  item = input.required<Archive>();
  
  // Output: events sent to parent
  onSelect = output<Archive>();
  onDelete = output<string>();  // Delete by ID
  
  // Local state
  isHovered = signal(false);
  
  select() {
    this.onSelect.emit(this.item());
  }
}

// ❌ Bad: Too many responsibilities
@Component({...})
export class ArchiveListComponent {
  // Fetching data, filtering, sorting, display, editing...
}
```

### Component Hierarchy

```
App Shell (Root)
├── Header Navigation
├── Main Content
│   ├── Breadcrumbs
│   └── Feature (Lazy-loaded)
│       ├── Container (Smart)
│       │   ├── Presentational
│       │   ├── Presentational
│       │   └── Presentational
│       └── Container (Smart)
│           └── Presentational
└── Footer
```

### Smart vs Presentational Components

**Smart (Container) Components:**
- Handle data fetching and business logic
- Manage state with signals and services
- Pass data down via inputs
- Receive events via outputs

**Presentational (Dumb) Components:**
- Only receive data via inputs
- Only emit events via outputs
- No service dependencies
- Easy to test and reuse

---

## Data Management

### HTTP Communication

```typescript
// API Service (Core)
@Service
export class ApiService {
  #http = inject(HttpClient);
  baseUrl = 'http://localhost:3000/api';
  
  getArchives(): Observable<Archive[]> {
    return this.#http.get<Archive[]>(`${this.baseUrl}/archives`);
  }
}

// Feature Service
@Service
export class ArchiveService {
  #api = inject(ApiService);
  archives = signal<Archive[]>([]);
  
  loadArchives() {
    this.#api.getArchives().subscribe(
      data => this.archives.set(data)
    );
  }
}

// Component
export class ArchiveListComponent implements OnInit {
  archiveService = inject(ArchiveService);
  archives = this.archiveService.archives;
  
  ngOnInit() {
    this.archiveService.loadArchives();
  }
}
```

### State Update Patterns

```typescript
// ✅ Correct patterns

// 1. Set entire state
state.set(newValue);

// 2. Update specific properties
state.update(current => ({
  ...current,
  property: newValue
}));

// 3. Computed derived state
derived = computed(() => 
  this.state().items.filter(item => item.active)
);

// ❌ Avoid
state.mutate(current => current.property = newValue);
```

---

## Services Layer

### Service Organization

```
core/services/
├── api.service.ts              # HTTP base service
├── auth.service.ts             # Authentication
├── meta.service.ts             # SEO meta tags
├── cache.service.ts            # Caching strategy
└── error-handler.service.ts    # Error handling

features/archive/services/
└── archive.service.ts          # Archive-specific logic
```

### Service Pattern

```typescript
// Singleton service (provided in root)
@Service({
  providedIn: 'root'
})
export class ArchiveService {
  #http = inject(HttpClient);
  #cache = inject(CacheService);
  
  archives = signal<Archive[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  
  // Public API
  loadArchives(forceRefresh = false) {
    if (!forceRefresh && this.#cache.has('archives')) {
      this.archives.set(this.#cache.get('archives'));
      return;
    }
    
    this.loading.set(true);
    this.#http.get<Archive[]>('/api/archives')
      .pipe(
        tap(data => {
          this.archives.set(data);
          this.#cache.set('archives', data);
        }),
        catchError(err => {
          this.error.set(err.message);
          return of([]);
        }),
        finalize(() => this.loading.set(false))
      )
      .subscribe();
  }
}
```

---

## Routing & Navigation

### Route Structure

Current implementation in `src/app/app.routes.ts` uses lazy-loaded standalone pages:

| Route | Content | Loading strategy |
|-------|---------|------------------|
| `/` | Hero landing, entry CTA, series intro | `loadComponent` |
| `/listen` | Prequel audiobook with embedded YouTube player | `loadComponent` |
| `/characters` | Character roster with reveal mechanic | `loadComponent` |
| `/characters/:slug` | Character profile page | `loadComponent` |
| `/city` | City overview with district links | `loadComponent` |
| `/city/:district` | District deep-dive page | `loadComponent` |
| `/author` | Dean Jordanov about section | `loadComponent` |
| `/connect` | External social/platform links | `loadComponent` |
| `**` | Fallback redirect to `/` | redirect |

Server-side rendering route strategy in `src/app/app.routes.server.ts` is configured as `RenderMode.Server` to support dynamic parameterized routes without prerender param manifests.

### Shared Navigation Components

The application shell currently composes the primary navigation and supporting navigation UI from shared standalone components:

- `header-navigation` for the sticky global header and primary route links
- `breadcrumbs` for route-aware location context and SEO-friendly trails
- `sidebar-menu` for sectioned archive navigation in future feature screens
- `tabs` for route-backed or local tabbed views
- `footer` for site-wide secondary links and metadata

The shared loading and dialog primitives live alongside them in `src/app/shared/components/` and currently include `button`, `card`, `modal`, `spinner`, `skeleton-loader`, and `breadcrumbs`.

### Lazy Loading Benefits

- ✅ Faster initial load time
- ✅ Smaller bundle size
- ✅ Better code organization
- ✅ Feature isolation

---

## State Management

### Signal-Based State

```typescript
// Global state service
@Service({
  providedIn: 'root'
})
export class AppStateService {
  // User state
  user = signal<User | null>(null);
  isAuthenticated = computed(() => this.user() !== null);
  
  // UI state
  sidebarOpen = signal(true);
  theme = signal<'light' | 'dark'>('light');
  
  // Combined state
  appConfig = computed(() => ({
    user: this.user(),
    theme: this.theme(),
    sidebar: this.sidebarOpen()
  }));
}
```

### State Update Example

```typescript
export class AuthService {
  #state = inject(AppStateService);
  
  login(credentials: Credentials) {
    return this.api.login(credentials).pipe(
      tap(response => {
        this.#state.user.set(response.user);
        localStorage.setItem('token', response.token);
      })
    );
  }
}
```

---

## Security

### Authentication Flow

```
1. User submits credentials
2. Backend validates and returns JWT token
3. Client stores token (sessionStorage preferred)
4. Interceptor adds token to API requests
5. Server validates token on each request
6. Expired token triggers refresh flow
```

### HTTP Interceptors

```typescript
// Auth Interceptor
@Service
export class AuthInterceptor implements HttpInterceptor {
  #auth = inject(AuthService);
  
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.#auth.getToken();
    
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    
    return next.handle(req);
  }
}

// Error Interceptor
@Service
export class ErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError(error => {
        if (error.status === 401) {
          // Handle unauthorized
        }
        return throwError(() => error);
      })
    );
  }
}
```

### Route Guards

```typescript
@Service
export class AuthGuard implements CanActivate {
  #auth = inject(AuthService);
  #router = inject(Router);
  
  canActivate(): boolean {
    if (this.#auth.isAuthenticated()) {
      return true;
    }
    this.#router.navigate(['/login']);
    return false;
  }
}

// Use in routes
{
  path: 'admin',
  canActivate: [AuthGuard],
  loadChildren: () => import('./admin/admin.routes')
}
```

---

## Performance Considerations

### Change Detection

- ✅ Default is `OnPush` in Angular 22+ (automatic)
- ✅ Use signals for reactive updates
- ✅ Use async pipe for observables
- ❌ Avoid frequent property changes

### Code Splitting

```typescript
// Lazy load routes
{
  path: 'feature',
  loadChildren: () => import('./feature/feature.routes')
}

// Lazy load components
const AdvancedComponent = lazy(() => 
  import('./advanced.component').then(m => m.AdvancedComponent)
);
```

### Image Optimization

```html
<!-- ✅ Use NgOptimizedImage -->
<img ngSrc="archive.jpg" alt="Archive" 
     width="400" height="300" priority />

<!-- ❌ Avoid standard img -->
<img src="archive.jpg" alt="Archive" />
```

### Caching Strategy

```typescript
// Cache API responses
@Service
export class CacheService {
  #cache = new Map<string, {data: any, timestamp: number}>();
  TTL = 5 * 60 * 1000; // 5 minutes
  
  get<T>(key: string): T | null {
    const cached = this.#cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.TTL) {
      return cached.data;
    }
    this.#cache.delete(key);
    return null;
  }
  
  set(key: string, data: any) {
    this.#cache.set(key, {data, timestamp: Date.now()});
  }
}
```

---

## Testing Strategy

### Unit Testing Structure

```typescript
describe('ArchiveService', () => {
  let service: ArchiveService;
  let httpMock: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArchiveService]
    });
    service = TestBed.inject(ArchiveService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  
  it('should load archives', () => {
    const mockArchives = [/* ... */];
    
    service.loadArchives();
    
    const req = httpMock.expectOne('/api/archives');
    expect(req.request.method).toBe('GET');
    req.flush(mockArchives);
    
    expect(service.archives()).toEqual(mockArchives);
  });
  
  afterEach(() => {
    httpMock.verify();
  });
});
```

### Component Testing

```typescript
describe('ArchiveListComponent', () => {
  let component: ArchiveListComponent;
  let fixture: ComponentFixture<ArchiveListComponent>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchiveListComponent]
    }).compileComponents();
    
    fixture = TestBed.createComponent(ArchiveListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('should display archives', () => {
    expect(component.archives().length).toBeGreaterThan(0);
  });
});
```

---

## Deployment Architecture

### SSR (Server-Side Rendering)

```
Request
  ↓
Express Server (Node.js)
  ↓
Angular Platform Server renders app
  ↓
HTML sent to browser
  ↓
Browser hydrates Angular app
  ↓
Client-side app takes over
```

### Build Output

```
dist/newportmaeve-achives/
├── browser/            # Client bundle
├── server/             # Server bundle
└── prerendered/        # Static HTML files
```

---

## Decision Records

### Why Signals Instead of RxJS?

- ✅ Simpler API for local component state
- ✅ Better performance with fine-grained reactivity
- ✅ Built-in TypeScript support
- ✅ Less boilerplate than Subjects

### Why Standalone Components?

- ✅ Simpler mental model (no NgModule)
- ✅ Better tree-shaking (smaller bundles)
- ✅ Clearer dependency management
- ✅ Aligns with latest Angular best practices

### Why Lazy Loaded Routes?

- ✅ Faster initial load (smaller bundle)
- ✅ On-demand feature loading
- ✅ Better code organization
- ✅ Scalability for large apps

---

## Additional Resources

- [Angular Documentation](https://angular.dev)
- [Signals API Guide](https://angular.dev/guide/signals)
- [Standalone Components](https://angular.dev/guide/standalone-components)
- [Performance Guide](https://angular.dev/guide/performance-best-practices)
- [Security Guide](https://angular.dev/guide/security)

---

**Architecture Last Updated:** 2026-06-23
