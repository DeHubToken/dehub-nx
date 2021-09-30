import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppMainComponent } from './app.main.component';

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: '',
          component: AppMainComponent,
        },
      ],
      {
        scrollPositionRestoration: 'enabled',
        initialNavigation: 'enabledBlocking',
      }
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
