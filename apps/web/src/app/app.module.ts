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
import { LoaderModule } from '@dehub/angular/ui/components/loader';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';
import { Env } from '../environments/env';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppMainComponent } from './app.main.component';
import { AppFooterComponent } from './footer/app.footer.component';
import { AppMenuComponent } from './menu/app.menu.component';
import { MenuService } from './menu/app.menu.service';
import { AppMenuitemComponent } from './menu/app.menuitem.component';
import { AppTopBarComponent } from './topbar/app.topbar.component';

const angularModules = [
  CommonModule,
  BrowserModule,
  FormsModule,
  AppRoutingModule,
  HttpClientModule,
  BrowserAnimationsModule,
];

const primeNgModules = [ButtonModule, RippleModule, MenuModule];

const libModules = [LoaderModule];

/** Layout components from Freya */
const layoutComponents = [
  AppMainComponent,
  AppMenuComponent,
  AppMenuitemComponent,
  AppTopBarComponent,
  AppFooterComponent,
];

const { appId, serverUrl } = environment.moralis;
@NgModule({
  imports: [
    angularModules,
    primeNgModules,
    libModules,

    AngularCoreModule.forRoot(),

    // PWA
    ServiceWorkerModule.register(`web/ngsw-worker.js`),

    // GraphQL
    GraphQLModule,

    // Moralis
    AngularMoralisModule.forRoot({ appId, serverUrl }),
  ],
  declarations: [AppComponent, layoutComponents],
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
