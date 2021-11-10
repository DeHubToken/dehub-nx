import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TeamMember, TeamMembersGQL } from '@dehub/shared/contentful';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'dhb-landing-team',
  template: `
    <div class="grid">
      <!-- Team Members loading -->
      <ng-container *ngIf="teamMembersLoading$ | async; else teamMembersLoaded">
        <div *ngFor="let i of teamMembersSkeleton" class="col-12 md:col-3">
          <dhb-landing-team-skeleton></dhb-landing-team-skeleton>
        </div>
      </ng-container>

      <!-- Team Members loaded -->
      <ng-template #teamMembersLoaded>
        <div
          *ngFor="let teamMember of teamMembers$ | async"
          class="col-12 md:col-3"
        >
          <dhb-landing-team-member
            [teamMember]="teamMember"
          ></dhb-landing-team-member>
        </div>
      </ng-template>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingTeamComponent implements OnInit {
  teamMembers$?: Observable<TeamMember[]>;
  teamMembersLoading$?: Observable<boolean>;
  teamMembersSkeleton = [...Array(4)];

  constructor(private teamMembersGQL: TeamMembersGQL) {}

  ngOnInit() {
    const temMembersQuery$ = this.teamMembersGQL.watch({
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
