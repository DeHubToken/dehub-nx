import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ContentfulDraftDirectiveModule } from '@dehub/angular/ui/directives/contentful-draft';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { SkeletonModule } from 'primeng/skeleton';
import { DemosRoutingModule } from './demos-routing.module';
import { TeamMemberSkeletonComponent } from './team/team-member-skeleton.component';
import { TeamMemberComponent } from './team/team-member.component';
import { TeamComponent } from './team/team.component';

@NgModule({
  imports: [
    // Angular
    CommonModule,

    // PrimeNg
    ButtonModule,
    RippleModule,
    SkeletonModule,

    // Libs
    ContentfulDraftDirectiveModule,

    DemosRoutingModule,
  ],
  declarations: [
    TeamComponent,
    TeamMemberComponent,
    TeamMemberSkeletonComponent,
  ],
})
export class DemosModule {}
