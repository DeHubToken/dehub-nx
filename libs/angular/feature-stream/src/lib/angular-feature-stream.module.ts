import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageSectionsModule } from '@dehub/angular/ui/components/page-sections';
import { ContentfulDraftDirectiveModule } from '@dehub/angular/ui/directives/contentful-draft';
import { AngularFeatureStreamRoutingModule } from './angular-feature-stream-routing.module';
import { AngularFeatureStreamComponent } from './angular-feature-stream.component';

@NgModule({
  imports: [
    // Angular Modules
    CommonModule,

    // Lib Modules
    ContentfulDraftDirectiveModule,
    PageSectionsModule,

    // PrimeNg Modules

    AngularFeatureStreamRoutingModule,
  ],
  declarations: [AngularFeatureStreamComponent],
})
export class AngularFeatureStreamModule {}
