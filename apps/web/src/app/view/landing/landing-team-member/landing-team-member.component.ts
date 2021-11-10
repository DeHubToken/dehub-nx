import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { TeamMember } from '@dehub/shared/contentful';

interface SocialLink {
  name: string;
  icon: string;
  url?: string;
}
@Component({
  selector: 'dhb-landing-team-member',
  template: `
    <div
      *ngIf="teamMember"
      [class.opacity-40]="!teamMember.sys.publishedAt"
      class="card image-card shadow-8"
    >
      <!-- Avatar -->
      <img [src]="teamMember.avatar?.url" [alt]="teamMember.name" />

      <div class="image-content">
        <!-- Name -->
        <h6>{{ teamMember.name }}</h6>

        <!-- Title -->
        <p>{{ teamMember.title }}</p>

        <!-- Social Links -->
        <ng-container *ngFor="let link of socialLinks">
          <button
            *ngIf="link.url"
            pButton
            pRipple
            [icon]="link.icon"
            [title]="link.name"
            type="button"
            class="p-button-rounded p-button-text p-button-plain mr-2 mb-2 w-2rem"
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

  socialLinks?: SocialLink[];

  constructor() {}

  ngOnInit() {
    if (!this.teamMember) return;

    this.socialLinks = [
      {
        icon: 'fab fa-twitter',
        url: this.teamMember.twitter,
        name: 'Twitter',
      },
      {
        icon: 'fab fa-linkedin',
        url: this.teamMember.linkedin,
        name: 'LinkedIn',
      },
      {
        icon: 'fab fa-instagram',
        url: this.teamMember.instagram,
        name: 'Instagram',
      },
      {
        icon: 'fab fa-github',
        url: this.teamMember.github,
        name: 'GitHub',
      },
    ];
  }
}
