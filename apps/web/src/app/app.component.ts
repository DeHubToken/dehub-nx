import { Component, OnInit } from '@angular/core';
import { CoreService } from '@dehub/angular/core';
import { MenuMode, ThemeMode } from '@dehub/shared/model';
import { PrimeNGConfig } from 'primeng/api';
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
    private primengConfig: PrimeNGConfig
  ) {}

  ngOnInit() {
    this.coreService.loadManifest();
    this.coreService.loadIcon();
    this.coreService.loadTheme();
    this.coreService.loadPrimeCss();
    this.primengConfig.ripple = true;
  }
}
