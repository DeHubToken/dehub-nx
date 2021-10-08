import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private actualTheme: '' | '-alternative' = '';

  constructor(@Inject(DOCUMENT) private document: Document) {}

  /** Toggle Theme between Dehub and an alternative custom one */
  toggleTheme() {
    this.actualTheme = this.actualTheme === '' ? '-alternative' : '';

    const themeLink = this.document.getElementById(
      'theme'
    ) as HTMLLinkElement | null;
    const layoutLink = this.document.getElementById(
      'layout'
    ) as HTMLLinkElement | null;

    if (themeLink) themeLink.href = `theme${this.actualTheme}.css`;
    if (layoutLink) layoutLink.href = `layout${this.actualTheme}.css`;
  }
}
