import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RippleModule } from 'primeng/ripple';
import { TabViewModule } from 'primeng/tabview';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppMainComponent } from './app.main.component';
import { AppFooterComponent } from './footer/app.footer.component';
import { AppMenuComponent } from './menu/app.menu.component';
import { MenuService } from './menu/app.menu.service';
import { AppMenuitemComponent } from './menu/app.menuitem.component';
import { AppTopBarComponent } from './topbar/app.topbar.component';
import { LandingAboutComponent } from './view/landing/landing-about/landing-about.component';
import { LandingAuditsComponent } from './view/landing/landing-audits/landing-audits.component';
import { LandingLinksComponent } from './view/landing/landing-links/landing-links.component';
import { LandingSlogenComponent } from './view/landing/landing-slogen/landing-slogen.component';
import { LandingViewComponent } from './view/landing/landing-view.component';
import { LandingYoutubeComponent } from './view/landing/landing-youtube/landing-youtube.component';
import { LandingListedComponent } from './view/landing/landing-listed/landing-listed.component';
import { LandingTeamMemberComponent } from './view/landing/landing-team-member/landing-team-member.component';
import { LandingTeamComponent } from './view/landing/landing-team/landing-team.component';

const primeNgModules = [
  ButtonModule,
  RippleModule,
  InputTextModule,
  MenuModule,
  RadioButtonModule,
  TabViewModule,
];
@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    primeNgModules,
  ],
  declarations: [
    AppComponent,
    AppMainComponent,
    AppMenuComponent,
    AppMenuitemComponent,
    AppTopBarComponent,
    AppFooterComponent,

    // Landing
    LandingViewComponent,
    LandingSlogenComponent,
    LandingAboutComponent,
    LandingLinksComponent,
    LandingAuditsComponent,
    LandingYoutubeComponent,
    LandingListedComponent,
    LandingTeamMemberComponent,
    LandingTeamComponent,
  ],
  providers: [MenuService, AppMainComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
