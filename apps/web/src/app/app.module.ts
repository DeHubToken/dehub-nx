import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';
import { environment } from '../environments/environment';
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
import { LandingDistributionComponent } from './view/landing/landing-distribution/landing-distribution.component';
import { LandingLinksComponent } from './view/landing/landing-links/landing-links.component';
import { LandingListedComponent } from './view/landing/landing-listed/landing-listed.component';
import { LandingPartnerComponent } from './view/landing/landing-partner/landing-partner.component';
import { LandingPartnersComponent } from './view/landing/landing-partners/landing-partners.component';
import { LandingSlogenComponent } from './view/landing/landing-slogen/landing-slogen.component';
import { LandingTeamMemberComponent } from './view/landing/landing-team-member/landing-team-member.component';
import { LandingTeamComponent } from './view/landing/landing-team/landing-team.component';
import { LandingTrikenomicComponent } from './view/landing/landing-trikenomic/landing-trikenomic.component';
import { LandingTrikenomicsComponent } from './view/landing/landing-trikenomics/landing-trikenomics.component';
import { LandingViewComponent } from './view/landing/landing-view.component';
import { LandingYoutubeComponent } from './view/landing/landing-youtube/landing-youtube.component';
import { LandingZoneComponent } from './view/landing/landing-zone/landing-zone.component';
import { LandingZonesComponent } from './view/landing/landing-zones/landing-zones.component';

const primeNgModules = [ButtonModule, RippleModule, MenuModule, ChartModule];
@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ...primeNgModules,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      /**
       * Register the ServiceWorker as soon as the app is stable
       * or after 30 seconds (whichever comes first)
       */
      registrationStrategy: 'registerWhenStable:30000',
    }),
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
    LandingPartnersComponent,
    LandingPartnerComponent,
    LandingZonesComponent,
    LandingZoneComponent,
    LandingDistributionComponent,
    LandingTrikenomicsComponent,
    LandingTrikenomicComponent,
  ],
  providers: [MenuService, AppMainComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
