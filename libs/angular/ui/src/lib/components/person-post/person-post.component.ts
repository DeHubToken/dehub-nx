import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { PersonPostFragment } from '@dehub/shared/model';

interface SocialLink {
  name: string;
  icon: string;
  url?: string;
}

@Component({
  selector: 'dhb-person-post',
  template: `
    <div [dhbContentfulDraft]="personPost.sys">
      <p-card
        *ngIf="personPost"
        [header]="personPost.title ?? ''"
        styleClass="p-card-shadow h-full"
      >
        <ng-template pTemplate="header">
          <img
            *ngIf="personPost.avatar as avatar"
            [dhbContentfulDraft]="avatar.sys"
            [src]="avatar.url"
            [alt]="avatar.title"
          />
        </ng-template>

        <!-- Name -->
        <h3>{{ personPost.name }}</h3>

        <!-- Title -->
        <p class="text-2xl bold uppercase">{{ personPost.title }}</p>

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
      </p-card>
    </div>
  `,
  styles: [
    `
      :host {
        display: flex;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonPostComponent implements OnInit {
  @Input() personPost!: PersonPostFragment;

  socialLinks: SocialLink[] = [];

  constructor() {}

  ngOnInit() {
    if (!this.personPost) return;

    const { twitter, github, linkedin, instagram } = this.personPost;

    if (twitter)
      this.socialLinks.push({
        icon: 'fab fa-twitter',
        url: this.personPost.twitter,
        name: 'Twitter',
      });

    if (linkedin)
      this.socialLinks.push({
        icon: 'fab fa-linkedin',
        url: this.personPost.linkedin,
        name: 'LinkedIn',
      });

    if (instagram)
      this.socialLinks.push({
        icon: 'fab fa-instagram',
        url: this.personPost.instagram,
        name: 'Instagram',
      });

    if (github)
      this.socialLinks.push({
        icon: 'fab fa-github',
        url: this.personPost.github,
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
