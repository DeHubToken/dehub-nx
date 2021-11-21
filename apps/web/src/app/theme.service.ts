import { APP_BASE_HREF, DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { EnvToken } from '@dehub/angular/core';
import { Env } from '@dehub/shared/config';
import { ThemeMode, Themes } from '@dehub/shared/models';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private theme: Themes = '';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(APP_BASE_HREF) private baseHref: string,
    @Inject(EnvToken) private env: Env
  ) {}

  /** Toggle Theme between Dehub and an alternative */
  toggleTheme(): ThemeMode {
    this.theme = this.theme === '' ? '-alternative' : '';

    const themeLink = this.document.getElementById(
      'theme'
    ) as HTMLLinkElement | null;
    const layoutLink = this.document.getElementById(
      'layout'
    ) as HTMLLinkElement | null;

    const subPath = `${this.env.production ? `${this.baseHref}/` : ''}`;

    if (themeLink) themeLink.href = `${subPath}theme${this.theme}.css`;
    if (layoutLink) layoutLink.href = `${subPath}layout${this.theme}.css`;

    // Default theme is dark, alternative is light
    return this.theme === '' ? 'dark' : 'light';
  }
}
