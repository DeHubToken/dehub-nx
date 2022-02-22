import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FeaturePostFragment } from '@dehub/shared/model';

@Component({
  selector: 'dhb-page-section-feature-post',
  template: `
    <ng-container *ngIf="featurePost">
      <div
        [dhbContentfulDraft]="featurePost.sys"
        class="card image-card shadow-8 mx-4"
      >
        <!-- Picture -->
        <ng-container *ngIf="featurePost.picture as picture">
          <img [src]="picture.url" [alt]="picture.title" />
        </ng-container>

        <div class="image-content">
          <!-- Title -->
          <h3>{{ featurePost.title }}</h3>

          <!-- Date -->
          <p>
            {{
              featurePost.sys.publishedAt | date: 'EEE, MMM d, y, hh:mm:ss zzzz'
            }}
          </p>

          <!-- Description -->
          <p>{{ featurePost.description }}</p>

          <!-- Call To Action -->
          <a
            *ngIf="
              featurePost.callToActionButtonLabel && featurePost.callToActionUrl
            "
            [href]="featurePost.callToActionUrl"
            target="_blank"
            styleClass="p-button-link p-mr-2"
            >{{ featurePost.callToActionButtonLabel }}</a
          >
        </div>
      </div>
    </ng-container>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageSectionFeaturePostComponent implements OnInit {
  @Input() featurePost!: FeaturePostFragment;

  constructor() {}

  ngOnInit() {}
}
