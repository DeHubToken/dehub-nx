import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'dhb-tab-menu',
  template: `
    <div class="dhb-tab-menu">
      <div class="dhb-tab-menu-wrapper">
        <button
          *ngFor="let menuItem of menuItems"
          pButton
          pRipple
          [label]="menuItem.label ?? ''"
          [icon]="menuItem.icon ?? ''"
          [routerLink]="menuItem.routerLink"
          type="button"
          [ngClass]="{
            active: menuItem.routerLink === activeMenuItem?.routerLink
          }"
          class="p-button-text p-button-plain p-button-lg mt-3 mr-3"
        ></button>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabMenuComponent implements OnInit {
  @Input() menuItems?: MenuItem[];
  @Input() activeMenuItem?: MenuItem;

  ngOnInit() {}
}
