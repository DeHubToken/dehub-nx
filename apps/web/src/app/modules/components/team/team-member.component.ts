import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { TeamMember } from '@dehub/shared/models';

interface SocialLink {
  name: string;
  icon: string;
  url?: string;
}
@Component({
  selector: 'dhb-team-member',
  template: `
    <div
      *ngIf="teamMember"
      [class.opacity-50]="!teamMember.sys.publishedAt"
      class="card image-card shadow-8"
    >
      <!-- Avatar -->
      <img [src]="teamMember.avatar?.url" [alt]="teamMember.name" />

      <div class="image-content">
        <!-- Name -->
        <h3>{{ teamMember.name }}</h3>

        <!-- Title -->
        <p class="text-2xl bold uppercase">{{ teamMember.title }}</p>

        <!-- Social Links -->
        <ng-container *ngFor="let link of socialLinks">
          <button
            *ngIf="link.url"
            pButton
            pRipple
            [icon]="link.icon"
            [title]="link.name"
            [disabled]="link.url === '#'"
            type="button"
            class="p-button-rounded p-button-text p-button-plain mr-2 mb-2 w-2rem text-xl"
          ></button>
        </ng-container>
      </div>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamMemberComponent implements OnInit {
  @Input() teamMember?: TeamMember;

  socialLinks: SocialLink[] = [];

  constructor() {}

  ngOnInit() {
    if (!this.teamMember) return;

    const { twitter, github, linkedin, instagram } = this.teamMember;

    if (twitter)
      this.socialLinks.push({
        icon: 'fab fa-twitter',
        url: this.teamMember.twitter,
        name: 'Twitter',
      });

    if (linkedin)
      this.socialLinks.push({
        icon: 'fab fa-linkedin',
        url: this.teamMember.linkedin,
        name: 'LinkedIn',
      });

    if (instagram)
      this.socialLinks.push({
        icon: 'fab fa-instagram',
        url: this.teamMember.instagram,
        name: 'Instagram',
      });

    if (github)
      this.socialLinks.push({
        icon: 'fab fa-github',
        url: this.teamMember.github,
        name: 'GitHub',
      });

    // Keep spacing in the team card
    if (this.socialLinks.length === 0)
      this.socialLinks.push({
        icon: '',
        url: '#',
        name: '',
      });
  }
}
