import { NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { trackByMenuItemFn } from '@dehub/angular/util';
import { AppMainComponent } from '../../app.main.component';
import { MenuService } from './app.menu.service';
import { AppMenuitemComponent } from './app.menuitem.component';

@Component({
  selector: 'dhb-menu',
  standalone: true,
  imports: [
    // Angular
    NgClass,
    NgFor,

    AppMenuitemComponent,
  ],
  template: `
    <div
      class="menu-wrapper"
      [ngClass]="{ 'layout-sidebar-active': appMain.sidebarActive }"
      (click)="appMain.onSidebarClick()"
    >
      <div class="layout-menu-container">
        <ul class="layout-menu">
          <li
            dhb-menuitem
            *ngFor="let item of model; let i = index; trackBy: trackByFn"
            [item]="item"
            [index]="i"
            [root]="true"
          ></li>
        </ul>
      </div>
    </div>
  `,
})
export class AppMenuComponent {
  model = this.menuService.getMenuItems();

  trackByFn = trackByMenuItemFn();

  constructor(
    public appMain: AppMainComponent,
    private menuService: MenuService
  ) {}
}
