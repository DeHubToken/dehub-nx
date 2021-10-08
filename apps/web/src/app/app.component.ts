import { Component, HostListener, OnInit } from '@angular/core';
import { ThemeMode } from '@dehub/shared/models';
import { PrimeNGConfig } from 'primeng/api';
import { ThemeService } from './theme.service';

@Component({
  selector: 'dh-root',
  template: `<router-outlet></router-outlet> `,
})
export class AppComponent implements OnInit {
  menuMode = 'horizontal';

  darkMode: ThemeMode = 'dark';
  topbarTheme: ThemeMode = 'dark';
  menuTheme: ThemeMode = 'dark';

  constructor(
    private primengConfig: PrimeNGConfig,
    private themeService: ThemeService
  ) {}

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent({ altKey, code }: KeyboardEvent) {
    if (altKey && code === 'KeyT') {
      this.setMode(this.themeService.toggleTheme());
    }
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }

  private setMode(mode: ThemeMode) {
    this.darkMode = mode;
    this.topbarTheme = mode;
    this.menuTheme = mode;
  }
}
