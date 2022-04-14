import { APP_BASE_HREF } from '@angular/common';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ServiceWorkerModule } from '@angular/service-worker';
import { GraphQLModule } from '@dehub/angular/graphql';
import { EnvToken } from '@dehub/angular/model';
import { MessageService } from 'primeng/api';
import { Env } from '../environments/env';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppMainComponent } from './app.main.component';
import { AppFooterComponent } from './footer/app.footer.component';
import { AppTopBarComponent } from './topbar/app.topbar.component';
import { AppMenuComponent } from './topbar/menu/app.menu.component';

describe('AppComponent', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          // Angular
          NoopAnimationsModule,
          RouterTestingModule,
          ServiceWorkerModule.register('ngsw-worker.js', { enabled: false }),

          // GraphQL
          GraphQLModule,
        ],
        declarations: [
          AppComponent,
          AppMainComponent,
          AppTopBarComponent,
          AppMenuComponent,
          AppFooterComponent,
        ],
        providers: [
          MessageService,
          { provide: EnvToken, useValue: environment },
          {
            provide: APP_BASE_HREF,
            useFactory: ({ baseUrl }: Env) => baseUrl,
            deps: [EnvToken],
          },
        ],
      }).compileComponents();
    })
  );
  it(
    'should create the app',
    waitForAsync(() => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
    })
  );
});
