import { ChangeDetectionStrategy, Component } from '@angular/core';
import { environment } from '../../environments/environment';

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
                <li><a [href]="landing">Disclaimer</a></li>
                <li>
                  <a [href]="landing + '/privacy-policy'">Privacy Policy</a>
                </li>
                <li>
                  <a [href]="landing + '/terms'">Terms & Conditions</a>
                </li>
                <li><a [href]="landing + '/careers'">Careers</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div class="col-12">
          <div class="footer-bottom">
            <h4>DeHub</h4>
            <h6>© 2021 DeHub.</h6>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppFooterComponent {
  landing = environment.dehub.landing;
}
