// ─────────────────────────────────────────────────────────────────────────────
// Newport Maeve Chronicles — Angular Data Models
// ─────────────────────────────────────────────────────────────────────────────

// ── Shared primitives ────────────────────────────────────────────────────────

/** Image asset with optional alt text and category for path resolution */
export interface NmImage {
  src: string;
  alt: string;
  /** Image category for path resolution: 'characters' | 'districts' | 'author' | 'content' */
  type?: 'characters' | 'districts' | 'author' | 'content';
  /** Optional image dimensions for optimization */
  width?: number;
  height?: number;
}

/** A named external link */
export interface NmExternalLink {
  label: string;
  url: string;
  /** Icon identifier (e.g. 'youtube' | 'wiki' | 'deviantart' | 'facebook') */
  icon?: string;
}

// ── Character ─────────────────────────────────────────────────────────────────

export type CharacterRace =
  | 'Vampire (Blood Blessed Human)'
  | 'Angel'
  | 'Human'
  | 'Unknown';

export type CharacterFaction =
  | 'The Ironclad Consortium'
  | 'The Blood Blessed'
  | 'The OneTrue'
  | 'Lower Rank Holy Infantry Unit'
  | 'The Underground Network'
  | 'Citizen of Newport Maeve'
  | string;

/** Full character profile as sourced from the site */
export interface Character {
  /** URL-safe identifier — matches the original HTML filename */
  slug: string;
  name: string;
  /** Short tagline shown on the roster card */
  tagline: string;
  /** In-universe quote from the character */
  quote: string;
  race: CharacterRace;
  role: string;
  /** Display age — can be a number, "Unknown", or descriptive string */
  age: string;
  appearance: {
    hair: string;
    eyes: string;
  };
  abilities: string[];
  affiliations: CharacterFaction[];
  traits: string[];
  /** Prose biography shown on the character detail page */
  bio: string;
  images: {
    /** Card / roster image */
    sheet: NmImage;
    portrait: NmImage;
    /** Signature item, insignia, mark, or sigil */
    item: NmImage;
    turnaround: NmImage;
  };
  /** Link to the fandom wiki entry, if available */
  wikiUrl?: string;
  /** Whether the character is revealed on hover on the roster (mirrors original site mechanic) */
  revealOnHover: boolean;
}

// ── District ──────────────────────────────────────────────────────────────────

export type DistrictTag =
  | 'commercial'
  | 'industrial'
  | 'harbor'
  | 'residential'
  | 'luxury'
  | 'military'
  | 'dangerous'
  | 'green-space'
  | string;

/** A district of Newport Maeve */
export interface District {
  slug: string;
  name: string;
  /** One-sentence summary for map tooltips / roster cards */
  summary: string;
  /** Full descriptive paragraph for the district detail view */
  description: string;
  image: NmImage;
  tags: DistrictTag[];
  /** Order on the city page (top → bottom, west → east) */
  displayOrder: number;
}

// ── City ──────────────────────────────────────────────────────────────────────

/** Top-level city metadata */
export interface City {
  name: string;
  subtitle: string;
  /** General overview paragraph */
  overview: string;
  geography: {
    river: string;
    sea: string;
  };
  mapImage: NmImage;
  districts: District[];
}

// ── Quote ─────────────────────────────────────────────────────────────────────

/** An in-universe quote pulled from the prequel audiobook or character pages */
export interface Quote {
  id: string;
  text: string;
  speaker: string;
  /** Optional scene / chapter context */
  context?: string;
  /** Character slug — enables linking to the character detail page */
  characterSlug?: string;
}

// ── Audiobook ─────────────────────────────────────────────────────────────────

export interface AudiobookChapter {
  number: number;
  title?: string;
  /** YouTube embed id or timestamp-based URL if chapters are timestamped */
  youtubeTimestamp?: string;
}

export interface Audiobook {
  title: string;
  subtitle: string;
  description: string;
  youtubeId: string;
  /** Full YouTube watch URL */
  youtubeUrl: string;
  /** Number of chapters */
  chapterCount: number;
  chapters?: AudiobookChapter[];
}

// ── Author ────────────────────────────────────────────────────────────────────

export interface Author {
  name: string;
  bio: string;
  image: NmImage;
  links: NmExternalLink[];
}

// ── Series metadata ───────────────────────────────────────────────────────────

export interface SeriesStat {
  value: string;
  label: string;
}

export interface SeriesInfo {
  title: string;
  tagline: string;
  description: string[];
  /** Eye-catching stats shown in the hero counter block */
  stats: SeriesStat[];
  coverImage: NmImage;
  ironcladImage?: NmImage;
}

// ── Community links ───────────────────────────────────────────────────────────

export interface CommunityLink extends NmExternalLink {
  description: string;
}

// ── Root data shape (what gets composed in the Angular data service) ──────────

export interface NmData {
  series: SeriesInfo;
  audiobook: Audiobook;
  characters: Character[];
  city: City;
  quotes: Quote[];
  author: Author;
  communityLinks: CommunityLink[];
}
