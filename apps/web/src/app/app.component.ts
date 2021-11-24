import { Component, HostListener, OnInit } from '@angular/core';
import { CoreService } from '@dehub/angular/core';
import { MenuMode, ThemeMode } from '@dehub/shared/models';
import { isThemeSwitchKey } from '@dehub/shared/utils';
import { PrimeNGConfig } from 'primeng/api';
import { ThemeService } from './theme.service';
@Component({
  selector: 'dhb-root',
  template: `<router-outlet></router-outlet> `,
})
export class AppComponent implements OnInit {
  menuMode: MenuMode = 'horizontal';

  darkMode: ThemeMode = 'dark';
  topbarTheme: ThemeMode = 'dark';
  menuTheme: ThemeMode = 'dark';

  constructor(
    private coreService: CoreService,
    private primengConfig: PrimeNGConfig,
    private themeService: ThemeService
  ) {}

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (isThemeSwitchKey(event)) {
      this.setMode(this.themeService.toggleTheme());
    }
  }

  ngOnInit() {
    this.coreService.loadManifest();
    this.coreService.loadIcon();
    this.coreService.loadTheme();
    this.coreService.loadPrimeCss();
    this.primengConfig.ripple = true;
  }

  private setMode(mode: ThemeMode) {
    this.darkMode = mode;
    this.topbarTheme = mode;
    this.menuTheme = mode;
  }
}
