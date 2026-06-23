# Web Fonts Directory

This directory contains self-hosted font files for the Newport Maeve Archives application. Self-hosting provides better performance, privacy, and control over font loading compared to external CDNs.

# Web Fonts Directory

This directory contains self-hosted font files for the Newport Maeve Archives application. Self-hosting provides better performance, privacy, and control over font loading compared to external CDNs.

## Folder Structure

```
fonts/
├── cinzel/                 # Display font for headers and titles
│   ├── Cinzel-VariableFont_wght.ttf
│   ├── OFL.txt
│   ├── README.txt
│   └── static/             # Static instances (alternative)
├── crimson-text/           # Body font for prose and article text
│   ├── CrimsonText-Regular.ttf
│   ├── CrimsonText-Italic.ttf
│   ├── CrimsonText-SemiBold.ttf
│   ├── CrimsonText-SemiBoldItalic.ttf
│   ├── CrimsonText-Bold.ttf
│   ├── CrimsonText-BoldItalic.ttf
│   └── OFL.txt
├── jetbrains-mono/         # Monospace font for code and data
│   ├── JetBrainsMono-VariableFont_wght.ttf
│   ├── JetBrainsMono-Italic-VariableFont_wght.ttf
│   ├── OFL.txt
│   ├── README.txt
│   └── static/             # Static instances (alternative)
└── inter/                  # Sans-serif font for UI components
    ├── Inter-VariableFont_opsz,wght.ttf
    ├── Inter-Italic-VariableFont_opsz,wght.ttf
    ├── OFL.txt
    ├── README.txt
    └── static/             # Static instances (alternative)
```

## Font Usage Guide

All fonts are configured in `src/styles/_fonts.scss` with `@font-face` declarations.

### Cinzel (Display Font)
- **Usage**: Main headings (H1, H2), navigation logo, section titles
- **CSS**: `font-family: 'Cinzel', 'Palatino Linotype', Georgia, serif;`
- **Format**: Variable font (TTF) with weight axis 100-900
- **Best for**: High-contrast, decorative typography

### Crimson Text (Body Font)
- **Usage**: Paragraph text, article prose, body content
- **CSS**: `font-family: 'Crimson Text', 'Georgia', 'Times New Roman', serif;`
- **Weights**: 400 (Regular), 600 (SemiBold), 700 (Bold)
- **Styles**: Normal, Italic
- **Format**: Discrete TTF files for each weight/style combination
- **Best for**: Long-form reading and content

### JetBrains Mono (Monospace Font)
- **Usage**: Code blocks, technical content, data tables
- **CSS**: `font-family: 'JetBrains Mono', 'Consolas', 'Courier New', monospace;`
- **Format**: Variable font (TTF) with weight axis 100-900, plus italic variant
- **Best for**: Fixed-width code display

### Inter (Sans-serif Font)
- **Usage**: Navigation, buttons, UI labels, utility text
- **CSS**: `font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;`
- **Format**: Variable font (TTF) with weight axis (100-900) and optical sizing axis, plus italic variant
- **Best for**: Clear, modern UI chrome

## Font Formats

All fonts use **TrueType Variable** format (TTF) with axes:
- **Cinzel**: Weight axis (100-900)
- **Crimson Text**: Discrete weights (no variable font available)
- **JetBrains Mono**: Weight axis (100-900) + italic variant
- **Inter**: Weight axis (100-900) + optical sizing axis + italic variant

**Benefits of Variable Fonts:**
- Single file per font family (vs. multiple files)
- Smooth weight transitions (not just discrete steps)
- Better performance and reduced bandwidth
- Modern browser support (95%+)

## Font Configuration

### In CSS (@font-face)
All fonts are configured in `src/styles/_fonts.scss`:

```scss
@font-face {
  font-family: 'Cinzel';
  src: url('/fonts/cinzel/Cinzel-VariableFont_wght.ttf') format('truetype-variations');
  font-weight: 100 900;
  font-display: swap;
}
```

### In Angular Services
Use the `FontService` to programmatically manage fonts:

```typescript
// Check if font is loaded
const isLoaded = fontService.isFontLoaded('Cinzel', '16px', 400);

// Preload a font
fontService.preloadFont('cinzel');

// Wait for fonts to load
await fontService.waitForFontsToLoad();

// Get font path
const path = fontService.getFontPath('cinzel');

// Get CSS font stack
const fontStack = fontService.getFontStack('display');
```

## Adding or Replacing Font Files

### 1. Download Font Files
Download fonts from these sources:
- **Cinzel**: https://fonts.google.com/specimen/Cinzel
- **Crimson Text**: https://fonts.google.com/specimen/Crimson+Text
- **JetBrains Mono**: https://fonts.jetbrains.com/
- **Inter**: https://rsms.me/inter/

### 2. Place in Correct Folder
For TTF variable fonts:
```
fonts/
├── cinzel/
│   └── Cinzel-VariableFont_wght.ttf
├── crimson-text/
│   ├── CrimsonText-Regular.ttf
│   ├── CrimsonText-Italic.ttf
│   ├── CrimsonText-SemiBold.ttf
│   ├── CrimsonText-SemiBoldItalic.ttf
│   ├── CrimsonText-Bold.ttf
│   └── CrimsonText-BoldItalic.ttf
├── jetbrains-mono/
│   ├── JetBrainsMono-VariableFont_wght.ttf
│   └── JetBrainsMono-Italic-VariableFont_wght.ttf
└── inter/
    ├── Inter-VariableFont_opsz,wght.ttf
    └── Inter-Italic-VariableFont_opsz,wght.ttf
```

### 3. Update SCSS Declaration
Update `src/styles/_fonts.scss` with new `@font-face` rule:

```scss
@font-face {
  font-family: 'Font Name';
  src: url('/fonts/folder/FontName-VariableFont_axes.ttf') format('truetype-variations');
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}
```

### 4. Update FontService (if needed)
Update `src/app/core/services/font.service.ts` `getFontPath()` method if adding new fonts.

### 5. Test
- Run `npm start` and verify font loads in browser DevTools
- Check Network tab for font file requests
- Verify no FOUT (Flash of Unstyled Text) or FOIT (Flash of Invisible Text)

## Font Performance Optimization

### Current Settings

**Font Display Strategy**: `font-display: swap`
- Shows fallback font immediately while web font loads
- Web font replaces fallback when ready
- Best for fast perceived performance

### Benefits of Current Setup

1. **Variable Fonts**
   - Single file per font family (reduces HTTP requests)
   - Smooth weight transitions
   - Better performance vs. discrete weight files
   - Modern browser support (95%+)

2. **TTF Format**
   - Supported by all modern browsers
   - Good balance of performance and compatibility
   - Modern alternative to WOFF2

3. **Self-Hosted**
   - Better privacy (no tracking from CDNs)
   - Faster delivery from same origin
   - Full control over font loading

### Performance Tips

1. **Preload Critical Fonts**
```html
<link rel="preload" as="font" type="font/ttf" href="/fonts/cinzel/Cinzel-VariableFont_wght.ttf" crossorigin>
<link rel="preload" as="font" type="font/ttf" href="/fonts/crimson-text/CrimsonText-Regular.ttf" crossorigin>
```

2. **Server Compression**
- Ensure server gzips TTF files
- Significantly reduces bandwidth usage
- Most servers do this by default

3. **Resource Hints** (optional)
```html
<link rel="dns-prefetch" href="...">
<link rel="preconnect" href="...">
<link rel="prefetch" href="/fonts/...">
```

## Font Fallback Chain

Each font variable includes fallbacks for graceful degradation:

```
Cinzel → Palatino Linotype → Georgia → serif
Crimson Text → Georgia → Times New Roman → serif
JetBrains Mono → Consolas → Courier New → monospace
Inter → Segoe UI → system-ui → sans-serif
```

If a self-hosted font fails to load, the browser will use the next available fallback.

## Checking Font Loading

### Browser DevTools

1. Open DevTools (F12)
2. Go to Network tab
3. Filter by type: Font
4. You should see requests for each font file
5. Check Response Headers for gzip compression

### CSS Check
```javascript
// Check if font has loaded
const fontFace = document.fonts;
fontFace.ready.then(() => {
  console.log('All fonts loaded!');
});

// Check specific font
const isLoaded = document.fonts.check('16px Cinzel');
console.log(isLoaded ? 'Font loaded' : 'Font not loaded');
```

## Troubleshooting

### Fonts Not Loading
- Check file paths in `_fonts.scss` (should be `/fonts/...` not relative)
- Verify files exist in `public/fonts/`
- Check browser console for CORS errors
- Ensure file names match exactly (case-sensitive)

### Slow Font Loading
- Use WOFF2 format (70% smaller than TTF)
- Preload critical fonts
- Consider subsetting to reduce file size
- Use `font-display: swap` or `block`

### FOUT/FOIT Issues
- Use `font-display: swap` to show fallback immediately
- Ensure fallback fonts are similar in metrics
- May see brief "flash" of fallback font (normal)

## References

- [MDN: @font-face](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face)
- [Google Fonts Guide](https://fonts.google.com/)
- [Font Loading Performance](https://web.dev/optimize-webfont-loading/)
- [Variable Fonts](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Fonts/Variable_Fonts_Guide)
