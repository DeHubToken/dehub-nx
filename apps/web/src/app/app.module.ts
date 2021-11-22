import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { EnvToken, GraphQLModule } from '@dehub/angular/core';
import { ButtonModule } from 'primeng/button';
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

const angularModules = [
  CommonModule,
  BrowserModule,
  FormsModule,
  AppRoutingModule,
  HttpClientModule,
  BrowserAnimationsModule,
];

const primeNgModules = [ButtonModule, RippleModule, MenuModule];

/** Layout components from Freya */
const layoutComponents = [
  AppMainComponent,
  AppMenuComponent,
  AppMenuitemComponent,
  AppTopBarComponent,
  AppFooterComponent,
];

@NgModule({
  imports: [
    angularModules,
    primeNgModules,

    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      /**
       * Register the ServiceWorker as soon as the app is stable
       * or after 30 seconds (whichever comes first)
       */
      registrationStrategy: 'registerWhenStable:30000',
    }),

    GraphQLModule,
  ],
  declarations: [AppComponent, layoutComponents],
  providers: [MenuService, { provide: EnvToken, useValue: environment }],
  bootstrap: [AppComponent],
})
export class AppModule {}
