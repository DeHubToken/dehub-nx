import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { EnvToken, FooterCollectionService } from '@dehub/angular/core';
import { SharedEnv } from '@dehub/shared/config';
import { CallToActionFragment, FooterFragment } from '@dehub/shared/model';
import { resolveButtonStyle } from '@dehub/shared/utils';
import { WINDOW } from '@ng-web-apis/common';
import { map, Observable, tap } from 'rxjs';

@Component({
  selector: 'dhb-footer',
  template: `
    <div *ngIf="footer$ | async as footer" class="layout-footer">
      <div class="grid">
        <div class="col-12 lg-4">
          <div class="grid">
            <div
              *ngFor="let group of linkGroups"
              class="col-12 md:col-4 lg:col-2"
            >
              <ul>
                <li *ngFor="let link of group">
                  <a
                    *ngIf="link"
                    [dhbContentfulDraft]="link.sys"
                    [routerLink]="link.routerLink || undefined"
                    [class]="resolveButton(link.type, link.style, link.size)"
                    (onClick)="onButtonClicked($event, link.externalLink)"
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
export class AppFooterComponent implements OnInit {
  footer$?: Observable<FooterFragment | undefined>;
  // Will group links by 5 per column
  linkGroups: (CallToActionFragment | undefined)[][] = [];

  constructor(
    @Inject(EnvToken) private env: SharedEnv,
    @Inject(WINDOW) private readonly windowRef: Window,
    private footerCollectionService: FooterCollectionService
  ) {}

  ngOnInit() {
    this.footer$ = this.footerCollectionService
      .fetch({
        isPreview: this.env.contentful.isPreview,
      })
      .pipe(
        map(
          ({ data: { footerCollection } }) =>
            footerCollection?.items[0] ?? undefined
        ),
        // Group links by 5 per column
        tap(footer => {
          if (footer?.linksCollection) {
            const items = footer.linksCollection.items;
            const groupSize = 5;
            for (let i = 0; i < items.length; i += groupSize) {
              const group = items.slice(i, i + groupSize);
              this.linkGroups.push(group);
            }
          }
        })
      );
  }

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
