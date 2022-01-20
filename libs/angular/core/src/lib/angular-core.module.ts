import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { LoggerToken } from './models';
import { CoreService } from './services';
import { ConsoleLoggerService } from './services/logger.service';

@NgModule({
  imports: [CommonModule],
})
export class AngularCoreModule {
  static forRoot(): ModuleWithProviders<AngularCoreModule> {
    return {
      ngModule: AngularCoreModule,
      providers: [
        CoreService,
        { provide: LoggerToken, useClass: ConsoleLoggerService },
      ],
    };
  }
}
