# Newport Maeve Archives — JSON Content Authoring Guide

## Overview

Static content for the Newport Maeve Archives is managed as structured JSON files in `public/data/`. This guide documents the required schema, validation rules, and publishing workflows for content authors.

## Content Files Location

All content JSON files are stored in: `public/data/`

- `series.json` — Series metadata, tagline, description, stats
- `audiobook.json` — Prequel audiobook info, YouTube embed ID
- `characters.json` — Character roster with full profiles
- `city.json` — City metadata, overview, and district list
- `quotes.json` — In-universe quotes from the prequel
- `author.json` — Author profile and social links
- `community.json` — External community platform links

## TypeScript Models

All schemas are defined in: `src/app/core/content/models/index.ts`

Refer to this file as the canonical source for required fields, types, and structure.

---

## Content Schemas

### series.json

Series-level metadata shown in the hero section and site headers.

**Required Fields:**
- `title` (string) — Series name
- `tagline` (string) — One-liner hook
- `description` (string[]) — Array of paragraphs
- `stats` (array) — Eye-catching statistics
  - `value` (string) — Number or symbol (e.g., "9", "∞")
  - `label` (string) — Description
- `coverImage` (object) — Hero cover image
  - `src` (string) — Image URL or path
  - `alt` (string) — Alt text for accessibility
- `ironcladImage` (object) — Secondary image (optional)
  - `src` (string)
  - `alt` (string)

**Example:**
```json
{
  "title": "The Newport Maeve Chronicles",
  "tagline": "An immortal. A city of steam & shadows. A debt come due.",
  "description": [
    "The Newport Maeve Chronicles is a gothic noir fantasy series…",
    "Now old, dark forces are seeking vengeance…"
  ],
  "stats": [
    { "value": "9", "label": "Chapters in the Prequel" },
    { "value": "1", "label": "City. Countless Secrets." }
  ],
  "coverImage": {
    "src": "https://newportmaeve.com/assets/images/cover.webp",
    "alt": "Cover art for The Newport Maeve Chronicles"
  }
}
```

---

### audiobook.json

Information about the prequel audiobook, including YouTube embed details.

**Required Fields:**
- `title` (string) — Audiobook title
- `subtitle` (string) — Audiobook subtitle
- `description` (string) — Short description
- `youtubeId` (string) — YouTube video ID (used for iframe embeds)
- `youtubeUrl` (string) — Full YouTube watch URL
- `chapterCount` (number) — Number of chapters
- `chapters` (array, optional) — Chapter metadata (future use)

**Example:**
```json
{
  "title": "Miroslav Dion: A Glimpse of Centuries Past",
  "subtitle": "The Official Prequel to the Newport Maeve Chronicles",
  "description": "Nine chapters. One immortal. A city that does not yet know what is coming.",
  "youtubeId": "gg5DZfQgrho",
  "youtubeUrl": "https://youtu.be/gg5DZfQgrho?si=nwGPkU6QQ4LaS6uQ",
  "chapterCount": 9,
  "chapters": []
}
```

---

### characters.json

Array of character profiles. Each character appears on the roster and has a detail page.

**Required Fields per Character:**
- `slug` (string) — URL-safe identifier (lowercase, alphanumeric + hyphens)
  - Must match the route parameter in `/characters/:slug`
- `name` (string) — Display name
- `tagline` (string) — Short descriptor (e.g., "First of the BloodBlessed")
- `quote` (string) — In-universe quote or title
- `race` (string) — One of: `'Vampire (Blood Blessed Human)'`, `'Angel'`, `'Human'`, `'Unknown'`
- `role` (string) — Character's role/title
- `age` (string) — Age or descriptor (can be "Unknown" or descriptive)
- `appearance` (object)
  - `hair` (string)
  - `eyes` (string)
- `abilities` (string[]) — Array of ability descriptions
- `affiliations` (string[]) — Faction/organization memberships
- `traits` (string[]) — Character traits
- `bio` (string) — Full biography prose
- `images` (object)
  - `sheet` (image) — Full character sheet
  - `portrait` (image) — Portrait image
  - `item` (image) — Signature item, insignia, or sigil
  - `turnaround` (image) — Character turnaround model
- `wikiUrl` (string, optional) — Link to fandom wiki entry
- `revealOnHover` (boolean) — Whether the character is revealed on hover on the roster

**Slug Requirements:**
- Lowercase only
- Alphanumeric + hyphens (e.g., `miroslav-dion`, `the-unknown-emissary`)
- No spaces, underscores, or special characters

**Example Character:**
```json
{
  "slug": "miroslav-dion",
  "name": "Miroslav Dion",
  "tagline": "First of the BloodBlessed",
  "quote": "Outlived kings. Shaped empires. Still standing.",
  "race": "Vampire (Blood Blessed Human)",
  "role": "First of the Blood Blessed",
  "age": "Appears 40, but much older",
  "appearance": {
    "hair": "Dark with silver at temples",
    "eyes": "Crimson Red"
  },
  "abilities": [
    "Undetermined Lifespan",
    "Preternatural strength and speed"
  ],
  "affiliations": [
    "The Ironclad Consortium",
    "The Blood Blessed"
  ],
  "traits": [
    "Disciplined",
    "Calculating"
  ],
  "bio": "He was a soldier lifetimes ago, then he became a Blood Blessed Predator…",
  "images": {
    "sheet": {
      "src": "https://newportmaeve.com/assets/images/characters/miroslav-dion-sheet.webp",
      "alt": "Full character sheet of Miroslav Dion"
    },
    "portrait": { "src": "…", "alt": "…" },
    "item": { "src": "…", "alt": "…" },
    "turnaround": { "src": "…", "alt": "…" }
  },
  "wikiUrl": "https://newport-maeve.fandom.com/…",
  "revealOnHover": true
}
```

---

### city.json

City and district information.

**City Object:**
- `name` (string) — City name
- `subtitle` (string) — Geographic subtitle (e.g., "Where the Zarina River meets the Moon Sea")
- `overview` (string) — Prose overview paragraph
- `geography` (object)
  - `river` (string) — River name
  - `sea` (string) — Sea/water body name
- `mapImage` (image) — City map illustration
- `districts` (array) — Array of district objects

**District Object:**
- `slug` (string) — URL-safe identifier (lowercase, alphanumeric + hyphens)
- `name` (string) — District display name
- `summary` (string) — One-sentence summary for cards/tooltips
- `description` (string) — Full paragraph for detail page
- `image` (image) — District illustration
- `tags` (string[]) — District categories (e.g., `['commercial', 'dangerous']`)
- `displayOrder` (number) — Sort order on city page (1 = first)

**Example City:**
```json
{
  "name": "Newport Maeve",
  "subtitle": "Where the Zarina River meets the Moon Sea",
  "overview": "Newport Maeve is a vast industrial metropolis…",
  "geography": {
    "river": "Zarina River",
    "sea": "Moon Sea"
  },
  "mapImage": {
    "src": "https://newportmaeve.com/assets/images/map.webp",
    "alt": "Illustrated map of Newport Maeve"
  },
  "districts": [
    {
      "slug": "market-district",
      "name": "Market District",
      "summary": "The commercial heart of Newport Maeve.",
      "description": "The Market District is the commercial heart…",
      "image": {
        "src": "https://newportmaeve.com/assets/images/city/market-district.webp",
        "alt": "Market District illustration"
      },
      "tags": ["commercial", "dangerous"],
      "displayOrder": 1
    }
  ]
}
```

---

### quotes.json

Array of in-universe quotes.

**Required Fields per Quote:**
- `id` (string) — Unique identifier (e.g., `q-entity-presumption`)
- `text` (string) — Quote text
- `speaker` (string) — Character or narrator name
- `context` (string, optional) — Scene/chapter context
- `characterSlug` (string, optional) — Character slug for linking to detail page

**Example:**
```json
[
  {
    "id": "q-entity-presumption",
    "text": "You presume the One True is asking.",
    "speaker": "The Entity",
    "context": "To Dion, from the prequel audiobook",
    "characterSlug": "the-unknown-emissary"
  }
]
```

---

### author.json

Author profile and links.

**Required Fields:**
- `name` (string) — Author's name
- `bio` (string) — Author biography
- `image` (image) — Author portrait
  - `src` (string)
  - `alt` (string)
- `links` (array) — Social/external links
  - `label` (string) — Link text
  - `url` (string) — Link URL
  - `icon` (string, optional) — Icon identifier (e.g., `'youtube'`, `'wiki'`, `'deviantart'`, `'facebook'`)

**Example:**
```json
{
  "name": "Dean Jordanov",
  "bio": "Blue collar from Eastern Europe gone world-builder…",
  "image": {
    "src": "https://newportmaeve.com/assets/images/architect.webp",
    "alt": "Dean Jordanov, creator of The Newport Maeve Chronicles"
  },
  "links": [
    {
      "label": "YouTube",
      "url": "https://youtu.be/gg5DZfQgrho",
      "icon": "youtube"
    }
  ]
}
```

---

### community.json

Array of community platform links.

**Required Fields per Link:**
- `label` (string) — Platform name (e.g., "YouTube", "Fandom Wiki")
- `description` (string) — What users will find there
- `url` (string) — External link URL
- `icon` (string, optional) — Icon identifier for UI rendering

**Example:**
```json
[
  {
    "label": "YouTube",
    "description": "Official prequel audiobook",
    "url": "https://youtu.be/gg5DZfQgrho",
    "icon": "youtube"
  },
  {
    "label": "Fandom Wiki",
    "description": "Lore, characters & world-building",
    "url": "https://newport-maeve.fandom.com/wiki/Newport_Maeve_Chronicles_Wiki",
    "icon": "wiki"
  }
]
```

---

## Validation Rules

The content loader (`ContentLoaderService`) enforces the following rules at load time:

### Slugs
- Must be lowercase
- Must contain only alphanumeric characters and hyphens
- Cannot be empty
- Used as URL parameters, so must be unique within their collection

### Images
- `src` must be a valid URL or relative path
- `alt` must be a non-empty string (required for accessibility)

### Arrays
- Characters must be an array (even if empty)
- Quotes must be an array
- Community links must be an array
- Abilities, traits, and affiliations must be arrays

### Required vs Optional
- Most fields are required and will cause a validation error if missing
- `wikiUrl` (characters), `chapters` (audiobook), `icon` (links) are optional

---

## Publishing Workflow

### Local Development

1. Edit the JSON file in `public/data/` or `src/app/core/content/models/`
2. Run `npm run build` to verify the bundle builds without errors
3. During build, the loader will validate all JSON files and report errors

### Production Deployment

1. Ensure all JSON files pass local validation
2. Push to main branch
3. GitHub Actions CI will run build validation
4. Content is deployed as part of the SSR build process

### Handling Errors

If a JSON file has validation errors:

1. Check the error message in the build log
2. Refer to the schema section above for the required structure
3. Ensure all required fields are present and correctly typed
4. Verify slug format (lowercase, alphanumeric + hyphens)
5. Re-run `npm run build` to validate

---

## Best Practices

1. **Keep Slugs Readable** — Use descriptive slugs that match character names when possible (e.g., `miroslav-dion` for "Miroslav Dion")
2. **Consistent Image Paths** — Use a naming convention for image assets (e.g., `/assets/images/characters/{slug}-{type}.webp`)
3. **Proofread Bio Text** — Long-form content should be reviewed for tone and consistency
4. **Test Links** — Verify external links (wiki, social media) before deployment
5. **Maintain Ordering** — Districts should be ordered by `displayOrder` to maintain consistent UI presentation

---

## Future Extensions

Currently, the content model supports static data. Future extensions may include:

- Chapter details and timestamps in `audiobook.json`
- Dynamic relationships between characters and districts
- User-submitted fan content or community polls
- Localization support for multiple languages
