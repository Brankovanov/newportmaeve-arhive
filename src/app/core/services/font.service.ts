import { Injectable } from '@angular/core';

/**
 * FontService handles web font loading, checking, and fallback logic.
 * While most font loading is handled by CSS @font-face declarations,
 * this service provides programmatic control when needed.
 *
 * Available fonts (all variable format):
 * - Cinzel: Variable font from public/fonts/cinzel/ (TTF, weight axis 100-900)
 * - Crimson Text: Full family from public/fonts/crimson-text/ (TTF, weights 400-700 + italics)
 * - JetBrains Mono: Variable font from public/fonts/jetbrains-mono/ (TTF, weight axis + italics)
 * - Inter: Variable font from public/fonts/inter/ (TTF, weight & optical sizing axes + italics)
 */
@Injectable({
  providedIn: 'root'
})
export class FontService {
  private readonly basePath = '/fonts';

  /** Standard font families used throughout the application */
  readonly fontFamilies = {
    display: 'Cinzel',
    body: 'Crimson Text',
    utility: 'JetBrains Mono',
    sans: 'Inter'
  };

  /** Font weight names mapped to numeric values */
  readonly fontWeights = {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700
  };

  /**
   * Check if a specific font has loaded in the browser.
   * Uses the FontFaceSet API for accurate detection.
   */
  isFontLoaded(fontFamily: string, fontSize: string = '16px', weight: number = 400): boolean {
    try {
      const fontSpec = `${weight} ${fontSize} "${fontFamily}"`;
      return document.fonts.check(fontSpec);
    } catch (err) {
      console.warn(`Error checking font availability for ${fontFamily}:`, err);
      return false;
    }
  }

  /**
   * Wait for all fonts to load.
   * Useful for ensuring layout stability before rendering critical content.
   */
  async waitForFontsToLoad(timeout: number = 5000): Promise<void> {
    try {
      await Promise.race([
        document.fonts.ready,
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Font loading timeout')), timeout)
        )
      ]);
    } catch (err) {
      console.warn('Font loading timeout or error:', err);
    }
  }

  /**
   * Wait for specific fonts to load.
   */
  async waitForSpecificFonts(
    fonts: Array<{ family: string; weight?: number; style?: string }>,
    timeout: number = 5000
  ): Promise<void> {
    const checks = fonts.map((font) => {
      const weight = font.weight ?? 400;
      const style = font.style ?? 'normal';
      const fontSpec = `${style === 'italic' ? 'italic ' : ''}${weight} 16px "${font.family}"`;

      return new Promise<boolean>((resolve) => {
        const checkFont = () => {
          if (document.fonts.check(fontSpec)) {
            resolve(true);
          } else {
            setTimeout(checkFont, 50);
          }
        };
        checkFont();
      });
    });

    try {
      await Promise.race([
        Promise.all(checks),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Font loading timeout')), timeout)
        )
      ]);
    } catch (err) {
      console.warn('Error waiting for specific fonts:', err);
    }
  }

  /**
   * Get the font file path for a specific font.
   * Useful for preloading fonts programmatically.
   *
   * Available fonts (all variable format):
   * - cinzel: Variable TTF font (weight axis)
   * - crimson-text: TTF fonts in weights 400, 600, 700 (with italic variants)
   * - jetbrains-mono: Variable TTF font (weight axis + italics)
   * - inter: Variable TTF font (weight & optical sizing axes + italics)
   */
  getFontPath(
    family: 'cinzel' | 'crimson-text' | 'jetbrains-mono' | 'inter',
    weight: 'regular' | 'medium' | 'semibold' | 'bold' = 'regular',
    style: 'normal' | 'italic' = 'normal'
  ): string | null {
    // Cinzel: variable font
    if (family === 'cinzel') {
      return `${this.basePath}/cinzel/Cinzel-VariableFont_wght.ttf`;
    }

    // Crimson Text: discrete weight files
    if (family === 'crimson-text') {
      const weightMap: { [key: string]: string } = {
        'regular': 'Regular',
        'medium': 'Regular',
        'semibold': 'SemiBold',
        'bold': 'Bold'
      };

      const styleSuffix = style === 'italic' ? 'Italic' : '';
      const weightLabel = weightMap[weight];
      const fileName = `CrimsonText-${weightLabel}${styleSuffix}.ttf`;
      return `${this.basePath}/crimson-text/${fileName}`;
    }

    // JetBrains Mono: variable font with optional italic
    if (family === 'jetbrains-mono') {
      const italicPart = style === 'italic' ? '-Italic' : '';
      return `${this.basePath}/jetbrains-mono/JetBrainsMono${italicPart}-VariableFont_wght.ttf`;
    }

    // Inter: variable font with optional italic
    if (family === 'inter') {
      const italicPart = style === 'italic' ? '-Italic' : '';
      return `${this.basePath}/inter/Inter${italicPart}-VariableFont_opsz,wght.ttf`;
    }

    return null;
  }

  /**
   * Programmatically preload a font by adding a link tag to the document head.
   * Most fonts are already configured in _fonts.scss, but this allows dynamic loading.
   * Returns false if the font is not available.
   */
  preloadFont(
    family: 'cinzel' | 'crimson-text' | 'jetbrains-mono' | 'inter',
    weight: 'regular' | 'medium' | 'semibold' | 'bold' = 'regular',
    style: 'normal' | 'italic' = 'normal'
  ): boolean {
    const path = this.getFontPath(family, weight, style);

    if (!path) {
      console.warn(`Font path not found for ${family}`);
      return false;
    }

    // Check if preload link already exists
    if (document.querySelector(`link[href="${path}"]`)) {
      return true;
    }

    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.type = 'font/ttf';
    link.href = path;
    link.crossOrigin = 'anonymous';

    document.head.appendChild(link);
    return true;
  }

  /**
   * Get recommended font stack for a given role.
   * Includes fallbacks for graceful degradation.
   */
  getFontStack(role: 'display' | 'body' | 'utility' | 'sans'): string {
    const stacks: { [key: string]: string } = {
      display: "'Cinzel', 'Palatino Linotype', Georgia, serif",
      body: "'Crimson Text', 'Georgia', 'Times New Roman', serif",
      utility: "'JetBrains Mono', 'Consolas', 'Courier New', monospace",
      sans: "'Inter', 'Segoe UI', system-ui, sans-serif"
    };

    return stacks[role] ?? stacks['body'];
  }

  /**
   * Get CSS font-family value for direct use in styles.
   */
  getCSSFontFamily(role: 'display' | 'body' | 'utility' | 'sans'): string {
    return this.getFontStack(role);
  }
}
