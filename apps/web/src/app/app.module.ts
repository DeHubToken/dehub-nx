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
import { AngularGraphQLModule } from '@dehub/angular/graphql';
import { EnvToken } from '@dehub/angular/model';
import { AngularMoralisModule } from '@dehub/angular/moralis';
import { AnnouncementModule } from '@dehub/angular/ui/components/announcement';
import { LoaderModule } from '@dehub/angular/ui/components/loader';
import { ContentfulDraftDirectiveModule } from '@dehub/angular/ui/directives/contentful-draft';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { Env } from '../environments/env';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuService } from './topbar/menu/app.menu.service';

const { appId, serverUrl } = environment.web3.moralis;
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
    ToastModule,
    DynamicDialogModule,
    ConfirmDialogModule,

    // Optional feature modules
    AngularCoreModule.forRoot(),
    AngularMoralisModule.forRoot({ appId, serverUrl }),
    AngularGraphQLModule,

    // Libs
    LoaderModule,
    AnnouncementModule,
    ContentfulDraftDirectiveModule,

    AppRoutingModule,
  ],
  declarations: [AppComponent],
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
