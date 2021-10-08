import { Component, HostListener, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { ThemeService } from './theme.service';

@Component({
  selector: 'dh-root',
  template: `<router-outlet></router-outlet> `,
})
export class AppComponent implements OnInit {
  menuMode = 'horizontal';

  darkMode = 'dark';

  topbarTheme = 'dark';

  menuTheme = 'dark';

  constructor(
    private primengConfig: PrimeNGConfig,
    private themeService: ThemeService
  ) {}

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.altKey && event.code === 'KeyT') {
      this.themeService.toggleTheme();
    }
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }
}
