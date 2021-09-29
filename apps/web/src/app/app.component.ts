import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'dh-root',
  template: `<router-outlet></router-outlet> `,
})
export class AppComponent implements OnInit {
  menuMode = 'horizontal';

  darkMode = 'dark';

  topbarTheme = 'dark';

  menuTheme = 'dark';

  inputStyle = 'outlined';

  ripple = true;

  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
  }
}
