# Web Fonts Directory

This directory contains self-hosted font files for the Newport Maeve Archives application. Self-hosting provides better performance, privacy, and control over font loading compared to external CDNs.

## Folder Structure

```
fonts/
├── cinzel/                 # Display font for headers and titles
│   ├── Cinzel-Regular.woff2
│   ├── Cinzel-Regular.woff
│   ├── Cinzel-SemiBold.woff2
│   ├── Cinzel-SemiBold.woff
│   ├── Cinzel-Bold.woff2
│   └── Cinzel-Bold.woff
├── crimson-text/           # Body font for prose and article text
│   ├── CrimsonText-Regular.woff2
│   ├── CrimsonText-Regular.woff
│   ├── CrimsonText-Italic.woff2
│   ├── CrimsonText-Italic.woff
│   ├── CrimsonText-SemiBold.woff2
│   ├── CrimsonText-SemiBold.woff
│   ├── CrimsonText-Bold.woff2
│   └── CrimsonText-Bold.woff
├── jetbrains-mono/         # Monospace font for code and data
│   ├── JetBrainsMono-Regular.woff2
│   ├── JetBrainsMono-Regular.woff
│   ├── JetBrainsMono-SemiBold.woff2
│   └── JetBrainsMono-SemiBold.woff
└── inter/                  # Sans-serif font for UI components
    ├── Inter-Regular.woff2
    ├── Inter-Regular.woff
    ├── Inter-Medium.woff2
    ├── Inter-Medium.woff
    ├── Inter-SemiBold.woff2
    └── Inter-SemiBold.woff
```

## Font Usage Guide

All fonts are configured in `src/styles/_fonts.scss` with `@font-face` declarations.

### Cinzel (Display Font)
- **Usage**: Main headings (H1, H2), navigation logo, section titles
- **CSS**: `font-family: 'Cinzel', 'Palatino Linotype', Georgia, serif;`
- **Weights**: 400, 600, 700
- **Best for**: High-contrast, decorative typography

### Crimson Text (Body Font)
- **Usage**: Paragraph text, article prose, body content
- **CSS**: `font-family: 'Crimson Text', 'Georgia', 'Times New Roman', serif;`
- **Weights**: 400, 600, 700
- **Styles**: Normal, Italic
- **Best for**: Long-form reading and content

### JetBrains Mono (Monospace Font)
- **Usage**: Code blocks, technical content, data tables
- **CSS**: `font-family: 'JetBrains Mono', 'Consolas', 'Courier New', monospace;`
- **Weights**: 400, 600
- **Best for**: Fixed-width code display

### Inter (Sans-serif Font)
- **Usage**: Navigation, buttons, UI labels, utility text
- **CSS**: `font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;`
- **Weights**: 400, 500, 600
- **Best for**: Clear, modern UI chrome

## Adding Font Files

### 1. Download Font Files
Download fonts from these sources:
- **Cinzel**: https://fonts.google.com/specimen/Cinzel
- **Crimson Text**: https://fonts.google.com/specimen/Crimson+Text
- **JetBrains Mono**: https://fonts.jetbrains.com/
- **Inter**: https://rsms.me/inter/

### 2. Convert to WOFF/WOFF2
Recommended formats:
- **WOFF2**: Modern browsers (92%+ coverage) — ~60% smaller than TTF
- **WOFF**: Fallback for older browsers (IE 9+)

Conversion tools:
- [Font Squirrel WebFont Generator](https://www.fontsquirrel.com/tools/webfont-generator)
- [CloudConvert](https://cloudconvert.com/)
- ffmpeg (command-line): `ffmpeg -i input.ttf output.woff2`

### 3. Place in Correct Folder
Save converted files to the appropriate subdirectory with naming convention:
```
fonts/{family-name}/{Family-Name}-{Weight}.woff2
fonts/{family-name}/{Family-Name}-{Weight}.woff
```

Examples:
- `fonts/cinzel/Cinzel-Regular.woff2`
- `fonts/crimson-text/CrimsonText-Bold.woff2`
- `fonts/inter/Inter-Medium.woff2`

### 4. Update SCSS Declaration
Update `src/styles/_fonts.scss` with new `@font-face` rule:

```scss
@font-face {
  font-family: 'Font Name';
  src: url('/fonts/folder/FontName-Weight.woff2') format('woff2'),
       url('/fonts/folder/FontName-Weight.woff') format('woff');
  font-weight: 400; // or appropriate weight
  font-style: normal;
  font-display: swap;
}
```

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

### Performance Tips

1. **Preload Critical Fonts**
```html
<link rel="preload" as="font" type="font/woff2" href="/fonts/cinzel/Cinzel-Regular.woff2" crossorigin>
<link rel="preload" as="font" type="font/woff2" href="/fonts/crimson-text/CrimsonText-Regular.woff2" crossorigin>
```

2. **Subset Fonts**
- Only include characters used on your site
- Can reduce file size by 70%+
- Use `unicode-range` in @font-face

3. **Variable Fonts**
- Single file for multiple weights
- Reduce requests and file size
- Check if available for each font

4. **Compression**
- Ensure server gzips WOFF/WOFF2 files
- Already highly compressed, but helps

5. **Resource Hints**
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
