import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { LoggerToken } from '@dehub/angular/model';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { SwUpdateAvailableComponent } from './components/sw-update-available/sw-update-available.component';
import { ConsoleLoggerService } from './services/logger.service';

@NgModule({
  imports: [
    // Angular
    CommonModule,

    // PrimeNg
    ToastModule,
    ButtonModule,
  ],
  declarations: [SwUpdateAvailableComponent],
  exports: [SwUpdateAvailableComponent],
})
export class AngularCoreModule {
  static forRoot(): ModuleWithProviders<AngularCoreModule> {
    return {
      ngModule: AngularCoreModule,
      providers: [
        MessageService,
        { provide: LoggerToken, useClass: ConsoleLoggerService },
      ],
    };
  }
}
