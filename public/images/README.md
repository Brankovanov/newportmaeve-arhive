# Images Directory Structure

This directory contains all static images used throughout the Newport Maeve Archives application.

## Folder Organization

```
images/
├── characters/          # Character portrait and sheet images
├── districts/          # District maps and location images
├── author/             # Author profile image
└── content/            # General content images and placeholders
```

## Adding Images

### Characters
Place character images in `images/characters/`:
- Portrait images: `{character-slug}.jpg` or `{character-slug}.png`
- Sheet images: `{character-slug}-sheet.jpg` or `{character-slug}-sheet.png`

Example:
- `miroslav-dion.png` (portrait)
- `miroslav-dion-sheet.png` (character sheet)

### Districts
Place district images in `images/districts/`:
- District map: `{district-slug}.jpg` or `{district-slug}.png`

Example:
- `market-district.png`
- `living-district-a.png`

### Author
Place author images in `images/author/`:
- `author.png` or `author.jpg`

### General Content
Place general/helper images in `images/content/`:
- `placeholder.svg` - Used as fallback for missing images
- Any other shared images

## Image Requirements

- **Format**: PNG or JPG (SVG for icons/placeholders)
- **Size**: Optimize for web (typically <500KB per image)
- **Alt Text**: All images must have descriptive alt text in the JSON data
- **Responsive**: Consider providing multiple sizes for optimal performance
- **Naming**: Use lowercase, hyphenated names matching JSON references

## JSON Configuration

In your JSON files (characters.json, city.json, etc.), reference images like:

```json
{
  "slug": "character-name",
  "name": "Character Name",
  "images": {
    "portrait": {
      "src": "character-name.png",
      "alt": "Portrait of Character Name",
      "type": "characters",
      "width": 300,
      "height": 400
    }
  }
}
```

## Image Optimization Tips

1. Use CSS for layout/styling when possible
2. Lazy-load images below the fold
3. Provide `width` and `height` in JSON for better CLS scores
4. Use `NgOptimizedImage` directive in Angular templates
5. Consider WebP format for modern browsers (with fallback)

## Performance

The `ImageService` in `src/app/core/services/image.service.ts` handles:
- Path resolution from JSON references
- Placeholder substitution for missing images
- Image metadata extraction for optimization
