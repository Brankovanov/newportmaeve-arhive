# Design System & Style Guide

## Overview

The Newport Maeve Chronicles design system is built on a comprehensive set of design tokens that establish consistent styling across the application. All design decisions reflect the dark, atmospheric aesthetic of the brand with period-inspired typography and a carefully curated color palette.

---

## Design Tokens

### Color Palette

#### Backgrounds
- **$color-void** (`#0a0a0a`) — Deepest background for hero sections and full-bleed areas
- **$color-pitch** (`#111111`) — Default page background
- **$color-charcoal** (`#1a1a1a`) — Card and panel backgrounds
- **$color-slate-dark** (`#222222`) — Elevated surfaces, nav bar
- **$color-slate** (`#2e2e2e`) — Borders, dividers, input backgrounds
- **$color-slate-light** (`#3d3d3d`) — Hover states on dark surfaces

#### Text
- **$color-fog** (`#f0ece4`) — Primary text (warm off-white)
- **$color-fog-muted** (`#b8b0a4`) — Secondary and caption text
- **$color-fog-dim** (`#7a7269`) — Placeholder and disabled text
- **$color-fog-ghost** (`#3f3b36`) — Barely-visible divider text

#### Brass (Primary Accent)
- **$color-brass** (`#c9a84c`) — Primary accent for nav, CTAs, active states
- **$color-brass-light** (`#e0c070`) — Hover highlight on brass elements
- **$color-brass-dark** (`#9c7f36`) — Pressed state, deep accent
- **$color-brass-dim** (`#5a4a20`) — Subtle brass for section labels

#### Blood (Danger/Emphasis)
- **$color-blood** (`#8b1a1a`) — Crimson red for dramatic emphasis
- **$color-blood-bright** (`#c0392b`) — Highlighted blood accent, hover
- **$color-blood-dim** (`#4a0e0e`) — Deep red for backgrounds

#### Angelic (Faction)
- **$color-angelic** (`#5b8dd9`) — Cold blue for OneTrue faction
- **$color-angelic-glow** (`#a8c8ff`) — Glowing blue effects

#### Overlays
- **$color-overlay-dark** (`rgba(0, 0, 0, 0.72)`) — Modal backdrop
- **$color-overlay-mid** (`rgba(0, 0, 0, 0.45)`) — Image overlays
- **$color-overlay-light** (`rgba(0, 0, 0, 0.20)`) — Subtle dimming

### Typography

#### Font Families
- **$font-display** — Cinzel (period serif, headings & logo)
- **$font-body** — Crimson Text (body copy, warm & readable)
- **$font-utility** — JetBrains Mono (labels, tags, codes)
- **$font-sans** — Inter (navigation & UI chrome)

#### Font Sizes (Fluid Scale with `clamp()`)
- `$fs-xs` — 0.70-0.80rem (labels, captions)
- `$fs-sm` — 0.85-0.95rem (tags, metadata)
- `$fs-base` — 1.00-1.13rem (body paragraph)
- `$fs-md` — 1.13-1.25rem (lead text)
- `$fs-lg` — 1.25-1.50rem (subheadings)
- `$fs-xl` — 1.50-2.00rem (H3/section titles)
- `$fs-2xl` — 2.00-3.00rem (H2/headings)
- `$fs-3xl` — 2.75-4.50rem (H1/hero headline)
- `$fs-display` — 3.50-6.50rem (hero display)

#### Font Weights
- `$fw-regular` — 400
- `$fw-medium` — 500
- `$fw-semibold` — 600
- `$fw-bold` — 700

#### Line Heights
- `$lh-tight` — 1.15 (display, headings)
- `$lh-snug` — 1.35 (subheadings, character names)
- `$lh-base` — 1.65 (body copy)
- `$lh-loose` — 1.85 (blockquotes, bios)

#### Letter Spacing
- `$ls-tight` — -0.02em (large display)
- `$ls-normal` — 0
- `$ls-wide` — 0.08em (section eyebrows)
- `$ls-wider` — 0.18em (all-caps labels)

### Spacing Scale

4px base unit with powers-of-2 scale:

```
$space-1   → 4px     $space-8   → 32px    $space-20  → 80px
$space-2   → 8px     $space-10  → 40px    $space-24  → 96px
$space-3   → 12px    $space-12  → 48px    $space-32  → 128px
$space-4   → 16px    $space-16  → 64px
$space-5   → 20px
$space-6   → 24px
```

#### Semantic Aliases
- `$gap-xs` → $space-2
- `$gap-sm` → $space-4
- `$gap-md` → $space-8
- `$gap-lg` → $space-12
- `$gap-xl` → $space-20
- `$gap-section` → $space-24

### Layout

- **$container-sm** — 640px
- **$container-md** — 768px
- **$container-lg** — 1024px
- **$container-xl** — 1280px (default max-width)
- **$container-2xl** — 1440px

### Shape & Borders

- **$radius-none** — 0 (sharp edges)
- **$radius-sm** — 2px (tags, badges)
- **$radius-md** — 4px (buttons, inputs)
- **$radius-lg** — 8px (cards)
- **$radius-pill** — 9999px (icon buttons, chips)

### Shadows & Glows

#### Shadows
- `$shadow-sm` — 0 1px 3px rgba(0,0,0,0.5)
- `$shadow-md` — 0 4px 12px rgba(0,0,0,0.6)
- `$shadow-lg` — 0 8px 32px rgba(0,0,0,0.75)

#### Glows (Emphasis)
- `$glow-brass` — 0 0 12px brass glow
- `$glow-brass-lg` — 0 0 28px larger brass glow
- `$glow-blood` — 0 0 12px blood glow
- `$glow-angelic` — 0 0 16px angelic glow

### Transitions

#### Easing Functions
- `$ease-out-expo` — cubic-bezier(0.16, 1, 0.3, 1) — fast exit
- `$ease-in-out` — cubic-bezier(0.4, 0, 0.2, 1) — standard
- `$ease-reveal` — cubic-bezier(0.25, 0.46, 0.45, 0.94) — content reveal

#### Durations
- `$duration-fast` — 150ms
- `$duration-base` — 300ms
- `$duration-slow` — 500ms
- `$duration-crawl` — 800ms (page transitions)

#### Transition Bundles
- `$transition-color` — color + background-color
- `$transition-border` — border-color
- `$transition-opacity` — opacity
- `$transition-transform` — transform
- `$transition-glow` — box-shadow
- `$transition-all` — all properties

### Z-Index Scale

- `$z-below` → -1
- `$z-base` → 0
- `$z-raised` → 10 (cards on hover)
- `$z-sticky` → 20 (sticky headers)
- `$z-nav` → 50 (top nav)
- `$z-overlay` → 80 (image overlays)
- `$z-modal` → 100 (modals)
- `$z-toast` → 110 (notifications)

---

## Using Design Tokens

### In Component Styles

```scss
@use '@/styles/variables' as v;

.card {
  background-color: v.$color-bg-elevated;
  border: v.$border-width solid v.$color-border;
  border-radius: v.$radius-md;
  padding: v.$space-8;
  color: v.$color-text;
  transition: v.$transition-all;

  &:hover {
    box-shadow: v.$glow-brass;
    transform: scale(1.02);
  }

  h3 {
    font-family: v.$font-display;
    font-size: v.$fs-lg;
    margin-bottom: v.$space-4;
  }
}
```

### In Templates

Use utility classes for quick styling:

```html
<div class="flex flex-between gap-md p-8 bg-elevated">
  <h2 class="text-accent">Title</h2>
  <button class="scale-hover">Action</button>
</div>
```

---

## Available Utility Classes

| Class | Purpose |
|-------|---------|
| `.text-primary` | Primary text color |
| `.text-muted` | Muted text color |
| `.text-disabled` | Disabled text color |
| `.text-accent` | Accent color |
| `.text-danger` | Danger/error color |
| `.text-uppercase` | Uppercase with wide letter-spacing |
| `.font-display` | Display font family |
| `.font-body` | Body font family |
| `.font-utility` | Monospace utility font |
| `.flex` | Flex container |
| `.flex-col` | Flex column layout |
| `.flex-center` | Center flex items |
| `.flex-between` | Space-between flex layout |
| `.grid` | Grid container |
| `.grid-cols-2/3/4` | Grid columns |
| `.mt-1/2/4/8/12` | Top margin |
| `.mb-1/2/4/8/12` | Bottom margin |
| `.p-4/8/12` | Padding |
| `.gap-md/lg` | Gap between items |
| `.bg-elevated` | Elevated background |
| `.bg-accent` | Accent background |
| `.bg-danger` | Danger background |
| `.hidden` | Display: none |
| `.invisible` | Visibility: hidden |
| `.opacity-50/75` | Opacity levels |
| `.scale-hover` | Scale on hover (1.05x) |
| `.sr-only` | Screen reader only |

---

## Accessibility Testing Checklist

- Verify every interactive element is reachable with `Tab` and operable with keyboard only.
- Confirm visible focus styles appear on links, buttons, tabs, modal controls, and skip links.
- Ensure dialogs move focus into the modal on open and restore focus to the trigger on close.
- Confirm tab interfaces support arrow key navigation plus `Home` and `End` shortcuts.
- Validate loading indicators announce a useful status without exposing decorative shapes.
- Review route-level pages and shared components with an AXE audit before release.
- Re-check contrast for any new token or variant against WCAG AA before merging.

## Accessibility Patterns

- Use the `.sr-only` utility for supplementary screen-reader text that should not affect layout.
- Add a skip link at the application shell level so keyboard users can jump directly to `<main>`.
- Treat skeleton shapes as decorative with `aria-hidden` and announce loading on the component host.
- Keep animated spinners exposed as a single status message through the host `role="status"`.
- Use `aria-labelledby` and `aria-describedby` on dialogs, and trap focus while they are open.
- Keep tab sets on `role="tablist"` and expose each tab with `role="tab"`, `aria-selected`, and keyboard navigation.

---

## Color Maps

### Faction Colors

```scss
$faction-colors: (
  'blood-blessed':       $color-blood,
  'ironclad-consortium': $color-brass,
  'onetrue':             $color-angelic,
  'lower-rank-holy':     $color-angelic-glow,
  'underground-network': $color-fog-dim,
  'citizen':             $color-slate-light,
);
```

### District Colors

```scss
$district-colors: (
  'market-district':     #c9a84c,      // brass
  'industrial-district': #7a6a50,      // smoke-brown
  'northport-district':  #3d6b8a,      // steel-blue
  'living-district-b':   #5a6e4a,      // olive
  'living-district-a':   #6a6a5a,      // grey-green
  'luxury-district':     #d4af6a,      // pale gold
  'military-base':       #4a4e5a,      // gunmetal
);
```

---

## Accessibility

- All text color combinations meet WCAG AA contrast minimums
- Focus rings use `$color-focus-ring` (brass) with 2px offset
- Animations respect `prefers-reduced-motion` media query
- All interactive elements have visible hover/focus states

---

## Component Implementation

Components should:
1. Import design tokens: `@use '@/styles/variables' as v;`
2. Use semantic token names (`$color-text` not `#f0ece4`)
3. Respect spacing scale for consistent rhythm
4. Include focus states for interactive elements
5. Use transitions from the transition bundle
6. Maintain dark theme contrast requirements

---

## Further Reading

- See [CONTRIBUTING.md](../CONTRIBUTING.md) for component creation guidelines
- See [ARCHITECTURE.md](../ARCHITECTURE.md) for system design patterns
