import { Component } from '@angular/core';
import { PwaService } from '@dehub/angular/core';
import { getMenuItems } from '../../app-routing.module';
import { AppMainComponent } from '../../app.main.component';

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
  model = getMenuItems(this.pwaService);

  constructor(
    public appMain: AppMainComponent,
    private pwaService: PwaService
  ) {}
}
