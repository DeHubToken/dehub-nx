import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'dhb-team-skeleton',
  template: `
    <div class="card image-card shadow-8">
      <!-- Avatar -->
      <p-skeleton
        width="100%"
        height="200px"
        borderRadius="24px"
        styleClass="mb-6"
      ></p-skeleton>

      <div class="image-content">
        <!-- Name -->
        <p-skeleton
          width="100px"
          borderRadius="16px"
          styleClass="mb-4"
        ></p-skeleton>

        <!-- Title -->
        <p-skeleton
          width="100px"
          borderRadius="16px"
          styleClass="mb-6"
        ></p-skeleton>

        <!-- Social Links -->
        <div class="flex">
          <ng-container *ngFor="let i of socialLinks">
            <p-skeleton
              width="20px"
              borderRadius="16px"
              class="mr-2 mb-2 w-2rem"
            ></p-skeleton>
          </ng-container>
        </div>
      </div>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamSkeletonComponent {
  socialLinks = [...Array(Math.floor(Math.random() * 3) + 1)];

  constructor() {}
}
