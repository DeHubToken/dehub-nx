import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ContentfulDraftDirectiveModule } from '../../directives/contentful-draft';
import { PersonPostComponent } from './person-post.component';

@NgModule({
  declarations: [PersonPostComponent],
  imports: [
    // Angular
    CommonModule,

    // PrimeNg
    ButtonModule,
    CardModule,
    TagModule,

    // Libs
    ContentfulDraftDirectiveModule,
  ],
  exports: [PersonPostComponent],
})
export class PersonPostModule {}
