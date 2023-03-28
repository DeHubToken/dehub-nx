import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import { PersonPostFragment } from '@dehub/shared/model';
import { WINDOW } from '@ng-web-apis/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ContentfulDraftDirectiveModule } from '../../directives/contentful-draft';

interface SocialLink {
  name: string;
  icon: string;
  url?: string;
}

@Component({
  standalone: true,
  selector: 'dhb-person-post',
  imports: [
    // Angular
    CommonModule,
    NgOptimizedImage,

    // PrimeNg
    ButtonModule,
    CardModule,
    TagModule,

    // Libs
    ContentfulDraftDirectiveModule,
  ],
  template: `
    <div [dhbContentfulDraft]="personPost.sys" class="w-full">
      <p-card
        *ngIf="personPost"
        styleClass="person h-full text-center mt-2 px-2 pt-6 pb-4 border-neon-1 bg-gradient-2 anim-hover-1-reverse"
      >
        <ng-template pTemplate="header">
          <ng-container *ngIf="personPost.avatar as avatar">
            <img
              [dhbContentfulDraft]="avatar.sys"
              [ngSrc]="
                avatar.url ?? path + '/assets/dehub/images/avatar-default.svg'
              "
              [width]="avatar.width"
              [height]="avatar.height"
              [alt]="avatar.description ?? avatar.title ?? 'Avatar'"
              sizes="(min-width: 66em) 33vw, (min-width: 44em) 50vw, 100vw"
              class="h-auto border-circle border-3 border-cyan-900 shadow-5 w-8 bg-gradient-1"
            />
          </ng-container>
        </ng-template>

        <!-- Name -->
        <p-tag
          *ngIf="personPost.name as name"
          [value]="name"
          styleClass="block mx-auto mb-3 px-3 py-2 font-normal text-xl shadow-3 bg-cyan-900"
          [style]="{ width: 'fit-content', 'margin-top': '-66px' }"
        ></p-tag>

        <!-- Title -->
        <p-tag
          *ngIf="personPost.title as title"
          [value]="title"
          styleClass="uppercase text-sm px-3 py-1 bg-gradient-4 shadow-2"
        ></p-tag>

        <div *ngIf="personPost.description as desc" class="text-sm pt-5">
          {{ desc }}
        </div>

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
              (click)="onSocialClicked($event, link.url)"
            ></button>
          </ng-container>
        </div>
      </p-card>
    </div>
  `,
  styles: [
    `
      /* Important for keeping all items stretched to same height */
      :host {
        height: 100%;
        & > div {
          height: 100%;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonPostComponent implements OnInit {
  @Input() personPost!: PersonPostFragment;
  @Input() path?: string;

  socialLinks: SocialLink[] = [];

  constructor(@Inject(WINDOW) private readonly windowRef: Window) {}

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

  onSocialClicked(event: Event, url: string) {
    event.preventDefault();
    this.windowRef.open(url, '_blank', 'noopener,noreferrer');
  }
}
