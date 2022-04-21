import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { FooterCollectionService } from '@dehub/angular/graphql';
import { EnvToken } from '@dehub/angular/model';
import { SharedEnv } from '@dehub/shared/config';
import { FooterFragment } from '@dehub/shared/model';
import { MenuItem } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { tabMenuItems } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuService } from './topbar/menu/app.menu.service';

@Component({
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
  tabMenuItems = tabMenuItems;
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
          (this.activeMenuItem = tabMenuItems.find(
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
