import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterFragment } from '@dehub/shared/model';
import { resolveButtonStyle } from '@dehub/shared/utils';
import { WINDOW } from '@ng-web-apis/common';
import { ButtonModule } from 'primeng/button';

import { ContentfulDraftDirective } from '../../directives/contentful-draft/contentful-draft.directive';
import { CTAGroupPipe } from './cta-group.pipe';

@Component({
  selector: 'dhb-footer',
  standalone: true,
  imports: [
    // Angular
    CommonModule,
    RouterModule,

    // PrimeNg
    ButtonModule,

    // UI
    ContentfulDraftDirective,
    CTAGroupPipe,
  ],
  template: `
    <div *ngIf="footer" class="layout-footer">
      <div class="grid">
        <div class="col-12 lg-4">
          <div class="grid">
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
          </div>
        </div>

        <div class="col-12">
          <div class="footer-bottom flex-wrap">
            <ul class="block w-full mb-3">
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
            <h4 class="mr-0">DeHub&nbsp;|&nbsp;</h4>
            <h6 *ngIf="footer.copyright" class="uppercase font-bold text-xs">
              {{ footer.copyright }}
            </h6>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  @Input() footer?: FooterFragment | undefined;

  constructor(@Inject(WINDOW) private readonly windowRef: Window) {}

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
