import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { SkeletonModule } from 'primeng/skeleton';
import { ComponentsRoutingModule } from './components-routing.module';
import { TeamMemberComponent } from './team/team-member.component';
import { TeamMemberSkeletonComponent } from './team/team-member-skeleton.component';
import { TeamComponent } from './team/team.component';

const angularModules = [CommonModule];

const primeNgModules = [ButtonModule, RippleModule, SkeletonModule];

@NgModule({
  imports: [angularModules, primeNgModules, ComponentsRoutingModule],
  declarations: [
    TeamComponent,
    TeamMemberComponent,
    TeamMemberSkeletonComponent,
  ],
})
export class ComponentsModule {}
