import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularGraphQLModule } from '@dehub/angular/graphql';

import { AddressPipe } from '@dehub/angular/ui/pipes/address/address.pipe';

import { LetModule } from '@rx-angular/template/let';
import { PushModule } from '@rx-angular/template/push';
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
    AngularFeatureShopRoutingModule,
    AngularFeatureShopComponent,
    AngularFeatureShopProductDetailComponent,
    ProductDetailComponent,
    ProductOrdersComponent,
    CheckoutFormComponent,
  ],
  providers: [ProductDetailService],
})
export class AngularFeatureShopModule {}
