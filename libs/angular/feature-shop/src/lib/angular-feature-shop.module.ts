import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GraphQLModule } from '@dehub/angular/graphql';
import { PageHeaderModule } from '@dehub/angular/ui/components/page-header';
import { PageSectionsModule } from '@dehub/angular/ui/components/page-sections';
import { ContentfulDraftDirectiveModule } from '@dehub/angular/ui/directives/contentful-draft';
import { ContentfulRichMarkupPipeModule } from '@dehub/angular/ui/pipes/contentful-rich-markup';
import { SafeHtmlPipeModule } from '@dehub/angular/ui/pipes/safe-html';
import { ButtonModule } from 'primeng/button';
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';
import { SwiperModule } from 'swiper/angular';
import { AngularFeatureShopProductDetailComponent } from './angular-feature-shop-product-detail.component';
import { AngularFeatureShopRoutingModule } from './angular-feature-shop-routing.module';
import { AngularFeatureShopComponent } from './angular-feature-shop.component';
import { ProductDetailComponent } from './components/product-detail.component';

// Install Swiper modules
SwiperCore.use([Pagination, Navigation, Autoplay]);
@NgModule({
  imports: [
    // Angular
    CommonModule,

    // Libs
    GraphQLModule,
    ContentfulDraftDirectiveModule,
    ContentfulRichMarkupPipeModule,
    SafeHtmlPipeModule,
    PageHeaderModule,
    PageSectionsModule,

    // PrimeNg
    ButtonModule,

    // Swiper
    SwiperModule,

    AngularFeatureShopRoutingModule,
  ],
  declarations: [
    AngularFeatureShopComponent,
    AngularFeatureShopProductDetailComponent,
    ProductDetailComponent,
  ],
})
export class AngularFeatureShopModule {}
