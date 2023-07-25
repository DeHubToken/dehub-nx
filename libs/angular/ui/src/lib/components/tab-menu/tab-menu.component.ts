import { NgClass, NgFor, NgStyle } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { trackByMenuItemFn } from '@dehub/angular/util';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'dhb-tab-menu',
  standalone: true,
  imports: [
    // Angular
    NgFor,
    NgClass,
    NgStyle,
    RouterLink,
    // PrimeNG
    ButtonModule,
    RippleModule,
  ],
  template: `
    <div class="dhb-tab-menu">
      <div class="dhb-tab-menu-wrapper">
        <button
          *ngFor="let menuItem of menuItems; trackBy: trackByFn"
          pButton
          pRipple
          [label]="menuItem.label ?? ''"
          [icon]="menuItem.icon ?? ''"
          [routerLink]="menuItem.routerLink"
          [fragment]="menuItem.fragment"
          [disabled]="menuItem.disabled"
          type="button"
          [ngClass]="{
            active: menuItem.routerLink === activeMenuItem?.routerLink
          }"
          class="p-button-text p-button-plain p-button-lg mt-3 mr-3"
        ></button>
        <div
          class="flex absolute right-0 mr-3 fadeinleft animation-duration-1000 animation-ease-in-out"
          [ngClass]="swipeHintClass"
          [ngStyle]="{
            'margin-top': '63px'
          }"
        >
          <span
            class="flex align-items-center uppercase font-bold text-xs pr-1"
          >
            swipe menu&nbsp;
          </span>
          <i
            class="flex align-items-center fal fa-long-arrow-right text-3xl fa-fade"
          ></i>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabMenuComponent implements OnInit {
  @Input() swipeHintClass?: string;
  @Input() menuItems?: MenuItem[];
  @Input() activeMenuItem?: MenuItem;

  trackByFn = trackByMenuItemFn();

  ngOnInit() {}
}
