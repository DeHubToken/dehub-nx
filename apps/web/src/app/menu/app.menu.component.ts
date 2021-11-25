import { Component, OnInit } from '@angular/core';
import { MenuItem } from '@dehub/shared/models';
import { AppMainComponent } from '../app.main.component';

@Component({
  selector: 'dhb-menu',
  templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
  model?: MenuItem[];

  constructor(public appMain: AppMainComponent) {}

  ngOnInit() {
    this.model = [
      { label: 'Components', routerLink: ['/components'] },
      {
        label: 'Dapps',
        items: [
          {
            label: 'De Raffle',
            routerLink: [''],
          },
        ],
      },
    ];
  }
}
