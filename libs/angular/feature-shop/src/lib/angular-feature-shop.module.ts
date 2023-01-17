import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularGraphQLModule } from '@dehub/angular/graphql';
import { AddressFormModule } from '@dehub/angular/ui/components/address-form';
import { BackButtonModule } from '@dehub/angular/ui/components/buttons/back-button';
import { ContactsFormModule } from '@dehub/angular/ui/components/contacts-form';
import { LoadingModule } from '@dehub/angular/ui/components/loading';
import { PageHeaderModule } from '@dehub/angular/ui/components/page-header';
import { PageSectionsModule } from '@dehub/angular/ui/components/page-sections';
import { ProductMiniModule } from '@dehub/angular/ui/components/product-mini';
import { ContentfulDraftDirectiveModule } from '@dehub/angular/ui/directives/contentful-draft';
import { AddressPipe } from '@dehub/angular/ui/pipes/address';
import { ContentfulRichMarkupPipeModule } from '@dehub/angular/ui/pipes/contentful-rich-markup';
import { SafeHtmlPipeModule } from '@dehub/angular/ui/pipes/safe-html';
import { ForModule, LetModule, PushModule } from '@rx-angular/template';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';
import { SwiperModule } from 'swiper/angular';
import { AngularFeatureShopProductDetailComponent } from './angular-feature-shop-product-detail.component';
import { AngularFeatureShopRoutingModule } from './angular-feature-shop-routing.module';
import { AngularFeatureShopComponent } from './angular-feature-shop.component';
import { CheckoutFormComponent } from './components/checkout-form.component';
import { ProductDetailComponent } from './components/product-detail.component';
import { ProductOrdersComponent } from './components/product-orders.component';
import { ProductDetailService } from './services';

// Install Swiper modules
SwiperCore.use([Pagination, Navigation, Autoplay]);
@NgModule({
  imports: [
    // Angular
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    // Libs
    AngularGraphQLModule,
    ContentfulDraftDirectiveModule,
    ContentfulRichMarkupPipeModule,
    SafeHtmlPipeModule,
    PageHeaderModule,
    PageSectionsModule,
    ProductMiniModule,
    AddressFormModule,
    ContactsFormModule,
    LoadingModule,
    BackButtonModule,
    AddressPipe,

    // PrimeNg
    InputNumberModule,
    InputTextModule,
    InputMaskModule,

    // Swiper
    SwiperModule,

    // Rx Angular,
    LetModule,
    PushModule,
    ForModule,

    AngularFeatureShopRoutingModule,
  ],
  declarations: [
    AngularFeatureShopComponent,
    AngularFeatureShopProductDetailComponent,
    ProductDetailComponent,
    ProductOrdersComponent,
    CheckoutFormComponent,
  ],
  providers: [ProductDetailService],
})
export class AngularFeatureShopModule {}
