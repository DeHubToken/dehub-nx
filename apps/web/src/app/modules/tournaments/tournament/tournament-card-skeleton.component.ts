import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
@Component({
  selector: 'dhb-tournament-skeleton-card',
  template: `
    <div class="border-round m-2">
      <div class="mb-4">
        <p-skeleton
          width="100%"
          [height]="expired ? '210px' : '550px'"
          styleClass="mb-6 w-full"
        ></p-skeleton>
      </div>

      <div class="px-4">
        <!-- Title -->
        <p-skeleton width="400px" height="20px" styleClass="mb-1"></p-skeleton>

        <!-- Date -->
        <p-skeleton width="200px" styleClass="mb-4"></p-skeleton>

        <!-- Count Down -->
        <p-skeleton width="250px" styleClass="mb-4"></p-skeleton>

        <!-- Badge -->
        <p-skeleton
          width="150px"
          borderRadius="16px"
          styleClass="mb-4"
        ></p-skeleton>

        <!-- Actions -->
        <div *ngIf="!expired" class="mb-4 flex">
          <!-- Show Rules -->
          <p-skeleton
            shape="rectangle"
            width="80px"
            height="40px"
            styleClass="mr-2 mb-2"
          ></p-skeleton>

          <!-- Register -->
          <p-skeleton
            shape="rectangle"
            width="80px"
            height="40px"
            styleClass="mr-2 mb-2"
          ></p-skeleton>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TournamentCardSkeletonComponent implements OnInit {
  @Input() expired = false;

  ngOnInit() {}
}
