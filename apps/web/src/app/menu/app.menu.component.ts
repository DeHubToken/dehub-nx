import { Component, OnInit } from '@angular/core';
import { AppMainComponent } from '../app.main.component';
export interface MenuItem {
  label: string;
  icon: string;
  routerLink?: string[];
  class?: string;
  badgeClass?: string;
  url?: string | string[];
  target?: '_blank' | '_parent' | '_top' | '_self';
  items?: MenuItem[];
  visible?: boolean;
  disabled?: boolean;
  command?: (event: unknown) => void;
}
@Component({
  selector: 'dh-menu',
  templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
  model?: MenuItem[];

  constructor(public appMain: AppMainComponent) {}

  ngOnInit() {
    this.model = [
      { label: 'Dashboard', icon: 'pi pi-home', routerLink: ['/'] },
    ];
  }
}
