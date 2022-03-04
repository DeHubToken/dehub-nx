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
    <div [dhbContentfulDraft]="personPost.sys" class="w-full">
      <p-card
        *ngIf="personPost"
        styleClass="person h-full text-center mt-2 px-2 pt-6 pb-4 border-neon-1 bg-gradient-2 anim-hover-1-reverse"
      >
        <ng-template pTemplate="header">
          <img
            *ngIf="personPost.avatar as avatar; else noAvatar"
            [dhbContentfulDraft]="avatar.sys"
            [src]="avatar.url"
            [alt]="avatar.title"
            class="border-circle border-3 border-cyan-900 shadow-5 w-9"
          />
          <ng-template #noAvatar>
            <div
              class="dummy-avatar border-circle border-3 border-cyan-900 shadow-5 mx-auto w-9 bg-gradient-1"
            >
              <i
                class="fad fa-user-astronaut text-8xl icon-color-duotone-1"
              ></i>
            </div>
          </ng-template>
        </ng-template>

        <!-- Name -->
        <p-tag
          *ngIf="personPost.name as name"
          [value]="name"
          styleClass="block mx-auto mb-3 px-3 py-2 font-normal text-2xl shadow-3 bg-cyan-900"
          [style]="{ width: 'fit-content', 'margin-top': '-66px' }"
        ></p-tag>

        <!-- Title -->
        <p-tag
          *ngIf="personPost.title as title"
          [value]="title"
          styleClass="uppercase text-base px-3 py-2 bg-gradient-4 shadow-2"
        ></p-tag>

        <!-- Social Links -->
        <div class="mt-4">
          <ng-container *ngFor="let link of socialLinks">
            <button
              *ngIf="link.url"
              pButton
              pRipple
              [icon]="link.icon"
              [title]="link.name"
              [disabled]="link.url === '#'"
              type="button"
              class="p-button-rounded p-button-text p-button-plain mr-2 mb-2 text-xl"
            ></button>
          </ng-container>
        </div>
      </p-card>
    </div>
  `,
  styles: [
    `
      :host {
        display: flex;
        width: 100%;
      }

      i {
        position: absolute;
        width: 100%;
        left: 0;
        top: 24%;
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
