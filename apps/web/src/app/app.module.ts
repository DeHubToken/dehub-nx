import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  ServiceWorkerModule,
  SwRegistrationOptions,
} from '@angular/service-worker';
import { AngularCoreModule } from '@dehub/angular/core';
import { EnvToken } from '@dehub/angular/model';
import { AngularMoralisModule } from '@dehub/angular/moralis';
import { BuyDehubButtonModule } from '@dehub/angular/ui/components/buy-dehub-button';
import { BuyDehubFloozModule } from '@dehub/angular/ui/components/buy-dehub-flooz';
import { TabMenuModule } from '@dehub/angular/ui/components/tab-menu';
import { ContentfulDraftDirectiveModule } from '@dehub/angular/ui/directives/contentful-draft';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { MenuModule } from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';
import { Env } from '../environments/env';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppMainComponent } from './app.main.component';
import { AppFooterComponent } from './footer/app.footer.component';
import { AppTopBarComponent } from './topbar/app.topbar.component';
import { AppMenuComponent } from './topbar/menu/app.menu.component';
import { MenuService } from './topbar/menu/app.menu.service';
import { AppMenuitemComponent } from './topbar/menu/app.menuitem.component';

const { appId, serverUrl } = environment.moralis;
@NgModule({
  imports: [
    // Angular
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register(`web/ngsw-worker.js`),
    ContentfulDraftDirectiveModule,

    // PrimeNg
    ButtonModule,
    RippleModule,
    MenuModule,
    DynamicDialogModule,

    // Optional feature modules
    AngularCoreModule.forRoot(),
    AngularMoralisModule.forRoot({ appId, serverUrl }),

    // Libs
    TabMenuModule,
    BuyDehubButtonModule,
    BuyDehubFloozModule,

    AppRoutingModule,
  ],
  declarations: [
    AppComponent,

    // Layout from Freya
    AppMainComponent,
    AppMenuComponent,
    AppMenuitemComponent,
    AppTopBarComponent,
    AppFooterComponent,
  ],
  providers: [
    MenuService,
    DialogService,
    { provide: EnvToken, useValue: environment },
    {
      provide: APP_BASE_HREF,
      useFactory: ({ baseUrl }: Env) => baseUrl,
      deps: [EnvToken],
    },
    {
      provide: SwRegistrationOptions,
      useFactory: ({ production, baseUrl }: Env) => ({
        enabled: production,
        ...(production && { scope: `${baseUrl}/` }),
        /**
         * Register the ServiceWorker as soon as the app is stable
         * or after 30 seconds (whichever comes first)
         */
        registrationStrategy: 'registerWhenStable:30000',
      }),
      deps: [EnvToken],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
