import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { SkeletonModule } from 'primeng/skeleton';
import { ComponentsRoutingModule } from './components-routing.module';
import { TeamMemberComponent } from './team/team-member.component';
import { TeamSkeletonComponent } from './team/team-skeleton.component';
import { TeamComponent } from './team/team.component';

const angularModules = [CommonModule];

const primeNgModules = [ButtonModule, RippleModule, SkeletonModule];

@NgModule({
  imports: [angularModules, primeNgModules, ComponentsRoutingModule],
  declarations: [TeamComponent, TeamSkeletonComponent, TeamMemberComponent],
})
export class ComponentsModule {}
