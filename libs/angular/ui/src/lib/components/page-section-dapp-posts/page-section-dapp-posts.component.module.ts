import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DappPostModule } from '@dehub/angular/ui/components/dapp-post/dapp-post.module';
import { PageSectionDappPostsComponent } from '@dehub/angular/ui/components/page-section-dapp-posts/page-section-dapp-posts.component';
import { ContentfulDraftDirectiveModule } from '../../directives/contentful-draft';

@NgModule({
  declarations: [PageSectionDappPostsComponent],
  imports: [
    // Angular
    CommonModule,

    // Libs
    ContentfulDraftDirectiveModule,
    DappPostModule,
  ],
  exports: [PageSectionDappPostsComponent],
})
export class PageSectionDappPostsModule {}
