import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TeamMembersService } from '@dehub/angular/core';
import { TeamMember } from '@dehub/shared/models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Component({
  template: `
    <div class="grid">
      <!-- Team Members loading -->
      <ng-container *ngIf="teamMembersLoading$ | async; else teamMembersLoaded">
        <div *ngFor="let i of teamMembersSkeleton" class="col-12 md:col-3">
          <dhb-team-member-skeleton></dhb-team-member-skeleton>
        </div>
      </ng-container>

      <!-- Team Members loaded -->
      <ng-template #teamMembersLoaded>
        <div
          *ngFor="let teamMember of teamMembers$ | async"
          class="col-12 md:col-3"
        >
          <dhb-team-member [teamMember]="teamMember"></dhb-team-member>
        </div>
      </ng-template>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamComponent implements OnInit {
  teamMembers$?: Observable<TeamMember[]>;
  teamMembersLoading$?: Observable<boolean>;
  teamMembersSkeleton = [...Array(4)];

  constructor(private teamMembersService: TeamMembersService) {}

  ngOnInit() {
    const temMembersQuery$ = this.teamMembersService.watch({
      isPreview: environment.contentful.isPreview,
    }).valueChanges;

    this.teamMembers$ = temMembersQuery$.pipe(
      map(({ data }) => data?.teamMemberCollection?.items as TeamMember[])
    );

    this.teamMembersLoading$ = temMembersQuery$.pipe(
      map(({ loading }) => loading)
    );
  }
}
