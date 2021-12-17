import { Component } from '@angular/core';
import { menuItems } from '../app-routing.module';
import { AppMainComponent } from '../app.main.component';

@Component({
  selector: 'dhb-menu',
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
            *ngFor="let item of model; let i = index"
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
  model = menuItems;

  constructor(public appMain: AppMainComponent) {}
}
