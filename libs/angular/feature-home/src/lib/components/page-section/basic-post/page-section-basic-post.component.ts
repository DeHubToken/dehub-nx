import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { BasicPostFragment } from '@dehub/shared/model';

@Component({
  selector: 'dhb-page-section-basic-post',
  template: `
    <ng-container *ngIf="basicPost">
      <div
        [dhbContentfulDraft]="basicPost.sys"
        class="card image-card shadow-8"
      >
        <!-- Main Picture -->
        <ng-container *ngIf="basicPost.mainPicture as mainPicture">
          <img [src]="mainPicture.url" [alt]="mainPicture.title" />
        </ng-container>

        <div class="image-content">
          <!-- Title -->
          <h3>{{ basicPost.title }}</h3>

          <!-- Date -->
          <p>
            {{
              basicPost.sys.publishedAt | date: 'EEE, MMM d, y, hh:mm:ss zzzz'
            }}
          </p>

          <!-- Summary -->
          <p>{{ basicPost.summary }}</p>

          <!-- Read More -->
          <p-button
            label="Read More"
            [routerLink]="['/news/' + basicPost.slug]"
            styleClass="p-button-link p-mr-2"
          ></p-button>
        </div>
      </div>
    </ng-container>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageSectionBasicPostComponent implements OnInit {
  @Input() basicPost!: BasicPostFragment;

  constructor() {}

  ngOnInit() {}
}
