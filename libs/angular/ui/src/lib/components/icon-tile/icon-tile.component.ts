import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import { IconTileFragment } from '@dehub/shared/model';
import { WINDOW } from '@ng-web-apis/common';
import { ButtonModule } from 'primeng/button';
import { ContentfulDraftDirective } from '../../directives/contentful-draft/contentful-draft.directive';
import { NgIf } from '@angular/common';

@Component({
    selector: 'dhb-icon-tile',
    template: `
    <div
      *ngIf="iconTile"
      [dhbContentfulDraft]="iconTile.sys"
      class="card bg-gradient-1 border-neon-3 border-round text-center px-5 pt-6 pb-7 w-full h-full"
    >
      <!-- Icon -->
      <i [class]="iconTile.icon + ' icon-color-duotone-1 text-6xl'"></i>

      <!-- Title -->
      <h3 class="pt-2">{{ iconTile.title }}</h3>

      <!-- Description -->
      <p>{{ iconTile.description }}</p>

      <p-button
        *ngIf="iconTile.callToActionUrl as ctaUrl"
        [label]="iconTile.callToActionButtonLabel ?? 'Click'"
        (onClick)="onCTAClicked($event)"
        styleClass="p-button-secondary p-button-lg p-button-raised w-9"
      ></p-button>
    </div>
  `,
    styles: [``],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgIf, ContentfulDraftDirective, ButtonModule]
})
export class IconTileComponent implements OnInit {
  @Input() iconTile!: IconTileFragment;

  constructor(@Inject(WINDOW) private readonly windowRef: Window) {}

  ngOnInit() {}

  onCTAClicked(event: Event) {
    event.preventDefault();
    if (this.iconTile.callToActionUrl) {
      this.windowRef.open(
        this.iconTile.callToActionUrl,
        '_blank',
        'noopener,noreferrer'
      );
    }
  }
}
