import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { IconTileFragment } from '@dehub/shared/model';

@Component({
  selector: 'dhb-page-section-icon-tile',
  template: `
    <div *ngIf="iconTile" [dhbContentfulDraft]="iconTile.sys">
      <!-- Icon -->
      <i [class]="iconTile.icon"></i>

      <!-- Title -->
      <h3>{{ iconTile.title }}</h3>

      <!-- Description -->
      <p>{{ iconTile.description }}</p>
    </div>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageSectionIconTileComponent implements OnInit {
  @Input() iconTile!: IconTileFragment;

  constructor() {}

  ngOnInit() {}
}
