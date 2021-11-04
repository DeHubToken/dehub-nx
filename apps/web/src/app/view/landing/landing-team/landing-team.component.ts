import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TeamMember, TeamMembersGQL } from '@dehub/shared/contentful';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'dhb-landing-team',
  template: `
    <div class="grid">
      <div
        *ngFor="let teamMember of teamMembers$ | async"
        class="col-12 md:col-3"
      >
        <dhb-landing-team-member
          [teamMember]="teamMember"
        ></dhb-landing-team-member>
      </div>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingTeamComponent implements OnInit {
  teamMembers$?: Observable<TeamMember[]>;

  constructor(private teamMembersGQL: TeamMembersGQL) {}

  ngOnInit() {
    this.teamMembers$ = this.teamMembersGQL
      .watch({ isPreview: environment.contentful.isPreview })
      .valueChanges.pipe(
        map(result => result.data.teamMemberCollection?.items as TeamMember[])
      );
  }
}
