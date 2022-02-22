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
import {
  AngularCoreModule,
  EnvToken,
  GraphQLModule,
} from '@dehub/angular/core';
import { AngularMoralisModule } from '@dehub/angular/moralis';
import { BuyDehubButtonModule } from '@dehub/angular/ui/components/buy-dehub-button/buy-dehub-button.module';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';
import { TabMenuModule } from 'primeng/tabmenu';
import { Env } from '../environments/env';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppMainComponent } from './app.main.component';
import { AppFooterComponent } from './footer/app.footer.component';
import { TabMenuComponent } from './tab-menu/tab-menu.component';
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

    // PrimeNg
    ButtonModule,
    RippleModule,
    MenuModule,
    TabMenuModule,

    // Core
    GraphQLModule,
    AngularCoreModule.forRoot(),
    AngularMoralisModule.forRoot({ appId, serverUrl }),

    // Libs
    BuyDehubButtonModule,

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
    TabMenuComponent,
  ],
  providers: [
    MenuService,
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
