import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TeamMembersService } from '@dehub/angular/core';
import { TeamMember } from '@dehub/shared/models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Component({
  template: `
    <div class="grid">
      <div class="col-12 md:col-3">
        <!-- Team Members loading -->
        <ng-container
          *ngIf="teamMembersLoading$ | async; else teamMembersLoaded"
        >
          <ng-container *ngFor="let i of teamMembersSkeleton">
            <dhb-team-member-skeleton></dhb-team-member-skeleton>
          </ng-container>
        </ng-container>

        <!-- Team Members loaded -->
        <ng-template #teamMembersLoaded>
          <ng-container *ngFor="let teamMember of teamMembers$ | async">
            <dhb-team-member [teamMember]="teamMember"></dhb-team-member>
          </ng-container>
        </ng-template>
      </div>
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
