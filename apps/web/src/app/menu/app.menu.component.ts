import { Component, OnInit } from '@angular/core';
import { MenuItem } from '@dehub/shared/models';
import { AppMainComponent } from '../app.main.component';

@Component({
  selector: 'dh-menu',
  templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
  model?: MenuItem[];

  constructor(public appMain: AppMainComponent) {}

  ngOnInit() {
    this.model = [
      { label: 'Features', routerLink: ['/'] },
      { label: '$DEHUB', routerLink: ['/'] },
      { label: 'Partners', routerLink: ['/'] },
      { label: 'The Team', routerLink: ['/'] },
      { label: 'Contract', routerLink: ['/'] },
      { label: 'dApps', routerLink: ['/'] },
    ];
  }
}
