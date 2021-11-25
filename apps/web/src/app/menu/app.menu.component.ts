import { Component, OnInit } from '@angular/core';
import { MenuItem } from '@dehub/shared/models';
import { environment } from '../../environments/environment';
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

    if (environment.env === 'dev')
      this.model.push({
        label: 'Demo',
        items: [{ label: 'Components', routerLink: ['/components'] }],
      });
  }
}
