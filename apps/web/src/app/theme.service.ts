import { Injectable } from '@angular/core';
import { CoreService } from '@dehub/angular/core';
import { ThemeMode, Themes } from '@dehub/shared/models';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private theme: Themes = '';

  constructor(private coreService: CoreService) {}

  /** Toggle Theme between Theme and an Alternative */
  toggleTheme(): ThemeMode {
    this.theme = this.theme === '' ? '-alternative' : '';

    this.coreService.setTheme(
      `theme${this.theme}.css`,
      `layout${this.theme}.css`
    );

    // Default theme is dark, alternative is light
    return this.theme === '' ? 'dark' : 'light';
  }
}
