import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { EnvToken } from '@dehub/angular/model';
import { FooterFragment, SharedEnv } from '@dehub/shared/model';
import { resolveButtonStyle } from '@dehub/shared/utils';
import { WINDOW } from '@ng-web-apis/common';
import { ButtonModule } from 'primeng/button';

import { ContentfulDraftDirective } from '../../directives/contentful-draft/contentful-draft.directive';
import { ContentfulRichMarkupPipe } from '../../pipes/contentful-rich-markup/contentful-rich-markup.pipe';
import { SafeHtmlPipe } from '../../pipes/safe-html/safe-html.pipe';
import { AwardPostComponent } from '../post/award-post/award-post.component';
import { CTAGroupPipe } from './cta-group.pipe';

@Component({
  selector: 'dhb-footer',
  standalone: true,
  imports: [
    // Angular
    CommonModule,
    RouterModule,
    NgOptimizedImage,
    // PrimeNg
    ButtonModule,
    // UI
    ContentfulDraftDirective,
    CTAGroupPipe,
    AwardPostComponent,
    ContentfulRichMarkupPipe,
    SafeHtmlPipe,
  ],
  template: `
    <div *ngIf="footer" class="layout-footer">
      <div class="grid">
        <div class="col-12 lg-4">
          <div class="grid">
            <!-- Links -->
            <div
              *ngFor="
                let group of footer?.linksCollection?.items | dhbCTAGroup: 5
              "
              class="col-12 md:col-4 lg:col-2"
            >
              <ul>
                <li *ngFor="let link of group">
                  <a
                    *ngIf="link"
                    [dhbContentfulDraft]="link.sys"
                    [routerLink]="link.routerLink || undefined"
                    [class]="resolveButton(link.type, link.style, link.size)"
                    (click)="onButtonClicked($event, link.externalLink)"
                  >
                    <i *ngIf="link.icon" [class]="link.icon"></i>
                    {{ link.label }}
                  </a>
                </li>
              </ul>
            </div>

            <!-- Awards -->
            <div class="col-12 md:col-6 lg:col-6">
              <div class="grid">
                <div
                  *ngFor="let awardPost of footer?.awardsCollection?.items"
                  class="col-12 md:col-6 lg:col-4"
                >
                  <dhb-award-post [awardPost]="awardPost"></dhb-award-post>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12">
          <div class="footer-bottom flex-wrap gap-3">
            <ul class="block w-full mb-3">
              <!-- Social Links -->
              <li
                *ngFor="let socialLink of footer.socialIconsCollection?.items"
                class="inline"
              >
                <p-button
                  *ngIf="socialLink"
                  [dhbContentfulDraft]="socialLink.sys"
                  [icon]="socialLink.icon || ''"
                  [routerLink]="socialLink.routerLink || undefined"
                  [styleClass]="
                    resolveButton(
                      socialLink.type,
                      socialLink.style,
                      socialLink.size
                    ) + ' text-white justify-content-start w-3rem px-0'
                  "
                  (onClick)="onButtonClicked($event, socialLink.externalLink)"
                >
                </p-button>
              </li>
            </ul>
            <div class="flex align-items-end gap-2 mb-2">
              <!-- Logo -->
              <img
                [ngSrc]="path + '/assets/dehub/logo-dehub-white.svg'"
                height="25"
                width="107"
                alt="DeHub logo"
              />
              <h6 *ngIf="footer.copyright" class="uppercase font-bold text-xs">
                {{ footer.copyright }}
              </h6>
            </div>

            <!-- Address -->
            <div
              [innerHtml]="
                footer.address?.json | dhbContentfulRichMarkup | dhbSafeHtml
              "
              class="line-height-3 block w-full"
            ></div>

            <!-- Year -->
            <h6 class="uppercase font-bold text-xs">© {{ thisYear }}</h6>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  @Input() footer?: FooterFragment | undefined;

  path = this.env.baseUrl;
  thisYear = new Date().getFullYear();

  constructor(
    @Inject(EnvToken) private env: SharedEnv,
    @Inject(WINDOW) private readonly windowRef: Window
  ) {}

  resolveButton(type?: string, style?: string, size?: string) {
    return resolveButtonStyle(type, style, size);
  }

  onButtonClicked(event: Event, link?: string) {
    event.preventDefault();
    if (link) {
      this.windowRef.open(link, '_blank', 'noopener,noreferrer');
    }
  }
}
