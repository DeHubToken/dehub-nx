import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { IconTileFragment } from '@dehub/shared/model';

@Component({
  selector: 'dhb-icon-tile',
  template: `
    <div
      *ngIf="iconTile"
      [dhbContentfulDraft]="iconTile.sys"
      class="card bg-gradient-1 border-neon-3 border-round text-center px-5 pt-6 pb-7 w-full"
    >
      <!-- Icon -->
      <i [class]="iconTile.icon + ' icon-color-duotone-1 text-6xl'"></i>

      <!-- Title -->
      <h3 class="pt-2">{{ iconTile.title }}</h3>

      <!-- Description -->
      <p>{{ iconTile.description }}</p>
    </div>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconTileComponent implements OnInit {
  @Input() iconTile!: IconTileFragment;

  constructor() {}

  ngOnInit() {}
}
