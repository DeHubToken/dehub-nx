import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RouterLink } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { NgFor, NgClass, NgStyle } from '@angular/common';

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
            class="flex align-items-center fal fa-long-arrow-right text-3xl"
          ></i>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgFor, ButtonModule, RippleModule, RouterLink, NgClass, NgStyle],
})
export class TabMenuComponent implements OnInit {
  @Input() swipeHintClass?: string;
  @Input() menuItems?: MenuItem[];
  @Input() activeMenuItem?: MenuItem;

  ngOnInit() {}
}
