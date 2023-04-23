import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { PwaService } from '@dehub/angular/core';
import { MenuItem } from 'primeng/api';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MenuService {
  private menuSource = new Subject<string>();
  private resetSource = new Subject<void>();

  menuSource$ = this.menuSource.asObservable();
  resetSource$ = this.resetSource.asObservable();

  constructor(private pwaService: PwaService) {}

  getMenuItems = (): MenuItem[] => [
    {
      label: 'Dapps',
      items: [
        {
          label: 'DeStake',
          url: environment.dehub.dapps.staking,
          icon: 'far fa-coins',
        },
        {
          label: 'Test Mailing Modal',
          routerLink: ['/', { outlets: { modal: ['mailing', 'subscribe'] } }],
          icon: 'far fa-link',
        },
        {
          label: 'Test Auth Modals',
          icon: 'far fa-key',
          items: [
            {
              label: 'Auth Request',
              routerLink: ['/', { outlets: { modal: ['auth'] } }],
            },
            {
              label: 'Auth Connect',
              routerLink: ['/', { outlets: { modal: ['auth', 'connect'] } }],
            },
            {
              label: 'Auth Disconnect',
              routerLink: ['/', { outlets: { modal: ['auth', 'disconnect'] } }],
            },
            {
              label: 'Auth Connected',
              routerLink: ['/', { outlets: { modal: ['auth', 'connected'] } }],
            },
          ],
        },
        {
          label: 'Test PWA Info Toast',
          command: () =>
            this.pwaService.triggerSwUpdateAvailable('info', 'xxxx'),
          icon: 'fa-regular fa-circle-exclamation',
        },
        {
          label: 'Test PWA Warn Toast',
          command: () =>
            this.pwaService.triggerSwUpdateAvailable('warn', 'xxxx'),
          icon: 'fa-regular fa-triangle-exclamation',
        },
      ],
    },
  ];

  onMenuStateChange(key: string) {
    this.menuSource.next(key);
  }

  reset() {
    this.resetSource.next();
  }
}
