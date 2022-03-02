import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'dhb-footer',
  template: `
    <div class="layout-footer">
      <div class="grid">
        <div class="col-12 lg-4">
          <div class="grid">
            <div class="col-6">
              <span class="footer-menutitle"></span>
              <ul>
                <li><a [routerLink]="['/legal/disclaimer']">Disclaimer</a></li>
                <li><a [routerLink]="['/legal/privacy']">Privacy Policy</a></li>
                <li>
                  <a [routerLink]="['/legal/terms']">Terms & Conditions</a>
                </li>
                <li><a [routerLink]="['/legal/careers']">Careers</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div class="col-12">
          <div class="footer-bottom">
            <h4>DeHub</h4>
            <h6>© 2022 DeHub.</h6>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppFooterComponent {}
