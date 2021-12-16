import { Component, OnInit } from '@angular/core';
import { MenuItem } from '@dehub/shared/models';
import { environment } from '../../environments/environment';
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
export class AppMenuComponent implements OnInit {
  model?: MenuItem[];

  constructor(public appMain: AppMainComponent) {}

  ngOnInit() {
    this.model = [
      {
        label: 'Dapps',
        items: [
          {
            label: 'Prize Draw',
            routerLink: [''],
            icon: 'fa fa-ticket-alt',
          },
          {
            label: 'De Game',
            routerLink: ['/tournaments'],
            icon: 'fa fa-trophy-alt',
          },
        ],
      },
    ];

    if (environment.env === 'dev')
      this.model.push({
        label: 'Demo',
        items: [{ label: 'Components', routerLink: ['/components'] }],
      });
  }
}
