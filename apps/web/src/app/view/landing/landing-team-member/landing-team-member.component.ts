import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

export interface TeamMember {
  avatar: string;
  name: string;
  title: string;
  social: { icon: string; link: string }[];
}

@Component({
  selector: 'dhb-landing-team-member',
  template: `
    <div *ngIf="teamMember" class="card image-card shadow-8">
      <img
        [src]="
          'assets/landing/team/avatars/' + teamMember.avatar + '-avatar.jpg'
        "
        [alt]="teamMember.name"
      />
      <div class="image-content">
        <h6>{{ teamMember.name }}</h6>
        <p>{{ teamMember.title }}</p>
        <ng-container *ngFor="let link of teamMember.social">
          <button
            pButton
            pRipple
            type="button"
            [icon]="link.icon"
            class="button-rounded button-text mr-2 mb-2 w-2rem"
          ></button>
        </ng-container>
      </div>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingTeamMemberComponent implements OnInit {
  @Input() teamMember?: TeamMember;

  constructor() {}

  ngOnInit(): void {}
}
