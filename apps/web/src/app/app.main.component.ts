import { NgClass } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { FooterCollectionService } from '@dehub/angular/core';
import { EnvToken } from '@dehub/angular/model';
import { FooterComponent } from '@dehub/angular/ui/components/footer/footer.component';

import { TabMenuComponent } from '@dehub/angular/ui/components/tab-menu/tab-menu.component';
import { FooterFragment, SharedEnv } from '@dehub/shared/model';
import { getTabMenuItems } from '@dehub/shared/utils';
import { PushModule } from '@rx-angular/template/push';
import { MenuItem } from 'primeng/api';
import { Observable, Subscription, filter, map } from 'rxjs';
import { AppComponent } from './app.component';
import { AppTopBarComponent } from './topbar/app.topbar.component';
import { MenuService } from './topbar/menu/app.menu.service';

@Component({
  standalone: true,
  imports: [
    // Angular
    NgClass,
    PushModule,
    RouterOutlet,
    // UI
    TabMenuComponent,
    FooterComponent,

    AppTopBarComponent,
  ],
  templateUrl: './app.main.component.html',
})
export class AppMainComponent implements OnInit, OnDestroy {
  sidebarStatic?: boolean;

  sidebarActive = false;

  staticMenuMobileActive?: boolean;

  menuClick?: boolean;

  topbarItemClick = false;

  topbarMenuActive?: boolean;

  menuHoverActive = false;

  /** Can be undefined if none of the tab menu items is active */
  activeMenuItem?: MenuItem;
  tabMenuItems = getTabMenuItems(this.env.dehub.landing);
  private sub: Subscription;

  footer$?: Observable<FooterFragment | undefined>;

  constructor(
    public app: AppComponent,
    @Inject(EnvToken) private env: SharedEnv,
    private menuService: MenuService,
    private router: Router,
    private footerCollectionService: FooterCollectionService
  ) {
    const isNavigationEnd = (event: unknown): event is NavigationEnd =>
      event instanceof NavigationEnd;

    // Issue: PrimeNG TabLink not shows the activated route, so we need to set it manually based on url
    // Docs: https://www.primefaces.org/primeng/showcase/#/tabmenu
    this.sub = this.router.events
      .pipe(filter(isNavigationEnd))
      .subscribe(
        ({ url }) =>
          (this.activeMenuItem = this.tabMenuItems.find(
            ({ routerLink }) => routerLink && url.includes(routerLink[0])
          ))
      );
  }

  ngOnInit() {
    this.footer$ = this.footerCollectionService
      .fetch({
        isPreview: this.env.contentful.isPreview,
      })
      .pipe(
        map(
          ({ data: { footerCollection } }) =>
            footerCollection?.items[0] ?? undefined
        )
      );
  }

  onLayoutClick() {
    if (!this.menuClick && (this.isHorizontal() || this.isSlim())) {
      this.menuService.reset();
    }

    if (!this.menuClick) {
      if (this.staticMenuMobileActive) {
        this.staticMenuMobileActive = false;
      }

      this.menuHoverActive = false;
      this.unblockBodyScroll();
    }

    this.menuClick = false;
  }

  onMenuButtonClick(event: MouseEvent) {
    this.menuClick = true;
    this.topbarMenuActive = false;

    if (this.isMobile()) {
      this.staticMenuMobileActive = !this.staticMenuMobileActive;
      if (this.staticMenuMobileActive) {
        this.blockBodyScroll();
      } else {
        this.unblockBodyScroll();
      }
    }

    event.preventDefault();
  }

  onSidebarClick() {
    this.menuClick = true;
  }

  onToggleMenu(event: MouseEvent) {
    this.menuClick = true;
    this.sidebarStatic = !this.sidebarStatic;

    event.preventDefault();
  }

  isSlim() {
    return this.app.menuMode === 'slim';
  }

  isHorizontal() {
    return this.app.menuMode === 'horizontal';
  }

  isDesktop() {
    return window.innerWidth > 991;
  }

  isMobile() {
    return window.innerWidth <= 991;
  }

  blockBodyScroll(): void {
    if (document.body.classList) {
      document.body.classList.add('blocked-scroll');
    } else {
      document.body.className += ' blocked-scroll';
    }
  }

  unblockBodyScroll(): void {
    if (document.body.classList) {
      document.body.classList.remove('blocked-scroll');
    } else {
      document.body.className = document.body.className.replace(
        new RegExp(
          '(^|\\b)' + 'blocked-scroll'.split(' ').join('|') + '(\\b|$)',
          'gi'
        ),
        ' '
      );
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
