import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Navigation } from '../app-routing.module';

@Component({
  selector: 'dhb-tab-menu',
  template: `
    <p-tabMenu [model]="items" [activeItem]="activeItem!"></p-tabMenu>
  `,
  styles: [],
})
export class TabMenuComponent implements OnInit {
  constructor() {}

  items: MenuItem[] = [];

  activeItem?: MenuItem;

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'fa fa-home-alt',
        routerLink: [Navigation.Home],
        routerLinkActiveOptions: '{ exact: true }',
      },
    ];

    this.activeItem = this.items[0];
  }
}
