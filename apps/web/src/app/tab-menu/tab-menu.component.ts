import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { tabMenuItems } from '../app-routing.module';

@Component({
  selector: 'dhb-tab-menu',
  template: `
    <div class="dhb-tab-menu">
      <button
        *ngFor="let item of model"
        class="p-button-text p-button-plain p-button-lg mt-3 mr-3"
        [ngClass]="{ active: item.routerLink === activeMenuItem?.routerLink }"
        pButton
        pRipple
        type="button"
        label="{{ item.label }}"
        icon="{{ item.icon }}"
        routerLink="{{ item.routerLink }}"
      ></button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabMenuComponent implements OnInit, OnDestroy {
  model = tabMenuItems;

  /** Can be undefined if none of the tab menu items is active */
  activeMenuItem: MenuItem | undefined;

  private sub: Subscription;

  constructor(private router: Router) {
    const isNavigationEnd = (event: unknown): event is NavigationEnd =>
      event instanceof NavigationEnd;

    // Issue: PrimeNG TabLink not shows the activated route, so we need to set it manually based on url
    // Docs: https://www.primefaces.org/primeng/showcase/#/tabmenu
    this.sub = this.router.events
      .pipe(filter(isNavigationEnd))
      .subscribe(
        ({ url }) =>
          (this.activeMenuItem = tabMenuItems.find(
            ({ routerLink }) => routerLink && url.includes(routerLink[0])
          ))
      );
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
