import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { ThemeMode, Themes } from './app.model';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private theme: Themes = '';

  constructor(@Inject(DOCUMENT) private document: Document) {}

  /** Toggle Theme between Dehub and an alternative */
  toggleTheme(): ThemeMode {
    this.theme = this.theme === '' ? '-alternative' : '';

    const themeLink = this.document.getElementById(
      'theme'
    ) as HTMLLinkElement | null;
    const layoutLink = this.document.getElementById(
      'layout'
    ) as HTMLLinkElement | null;

    if (themeLink) themeLink.href = `theme${this.theme}.css`;
    if (layoutLink) layoutLink.href = `layout${this.theme}.css`;

    // Default theme is dark, alternative is light
    return this.theme === '' ? 'dark' : 'light';
  }
}
