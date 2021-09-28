import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { AppComponent } from './app.component';
import { MenuService } from './app.menu.service';

@Component({
  selector: 'dh-main',
  templateUrl: './app.main.component.html',
})
export class AppMainComponent {
  sidebarStatic: boolean;

  sidebarActive = false;

  staticMenuMobileActive: boolean;

  menuClick: boolean;

  topbarItemClick: boolean;

  activeTopbarItem: unknown;

  topbarMenuActive: boolean;

  searchClick = false;

  search = false;

  configActive: boolean;

  configClick: boolean;

  menuHoverActive = false;

  constructor(
    private menuService: MenuService,
    private primengConfig: PrimeNGConfig,
    public app: AppComponent
  ) {}

  onLayoutClick() {
    if (!this.topbarItemClick) {
      this.activeTopbarItem = null;
      this.topbarMenuActive = false;
    }

    if (!this.menuClick && (this.isHorizontal() || this.isSlim())) {
      this.menuService.reset();
    }

    if (this.configActive && !this.configClick) {
      this.configActive = false;
    }

    if (!this.menuClick) {
      if (this.staticMenuMobileActive) {
        this.staticMenuMobileActive = false;
      }

      this.menuHoverActive = false;
      this.unblockBodyScroll();
    }

    if (!this.searchClick) {
      this.search = false;
    }

    this.searchClick = false;
    this.configClick = false;
    this.topbarItemClick = false;
    this.menuClick = false;
  }

  onMenuButtonClick(event) {
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

  onTopbarItemClick(event, item) {
    this.topbarItemClick = true;

    if (this.activeTopbarItem === item) {
      this.activeTopbarItem = null;
    } else {
      this.activeTopbarItem = item;
    }

    if (item.className === 'topbar-item search-item') {
      this.search = !this.search;
      this.searchClick = !this.searchClick;
    }

    event.preventDefault();
  }

  onRippleChange(event) {
    this.app.ripple = event.checked;
    this.primengConfig.ripple = event.checked;
  }

  onConfigClick() {
    this.configClick = true;
  }

  onSidebarClick() {
    this.menuClick = true;
  }

  onToggleMenu() {
    this.menuClick = true;
    this.sidebarStatic = !this.sidebarStatic;

    event.preventDefault();
  }

  onSidebarMouseOver() {
    if (this.app.menuMode === 'sidebar' && !this.sidebarStatic) {
      this.sidebarActive = !this.isMobile();
    }
  }

  onSidebarMouseLeave() {
    if (this.app.menuMode === 'sidebar' && !this.sidebarStatic) {
      setTimeout(() => {
        this.sidebarActive = false;
      }, 250);
    }
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
}
