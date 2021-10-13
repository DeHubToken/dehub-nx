import { Component } from '@angular/core';
import { AppComponent } from './app.component';
import { MenuService } from './menu/app.menu.service';

@Component({
  selector: 'dhb-main',
  templateUrl: './app.main.component.html',
})
export class AppMainComponent {
  sidebarStatic?: boolean;

  sidebarActive = false;

  staticMenuMobileActive?: boolean;

  menuClick?: boolean;

  topbarMenuActive?: boolean;

  menuHoverActive = false;

  constructor(private menuService: MenuService, public app: AppComponent) {}

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
