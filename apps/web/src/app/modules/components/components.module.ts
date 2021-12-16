import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { SkeletonModule } from 'primeng/skeleton';
import { ComponentsRoutingModule } from './components-routing.module';
import { TeamMemberComponent } from './team/team-member.component';
import { TeamMemberSkeletonComponent } from './team/team-member-skeleton.component';
import { TeamComponent } from './team/team.component';
import { ContentfulDraftDirectiveModule } from '@dehub/angular/ui/directives/contentful-draft';

const angularModules = [CommonModule];

const libModules = [ContentfulDraftDirectiveModule];
const primeNgModules = [ButtonModule, RippleModule, SkeletonModule];

@NgModule({
  imports: [
    angularModules,
    libModules,
    primeNgModules,
    ComponentsRoutingModule,
  ],
  declarations: [
    TeamComponent,
    TeamMemberComponent,
    TeamMemberSkeletonComponent,
  ],
})
export class ComponentsModule {}
