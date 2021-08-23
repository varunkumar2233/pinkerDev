import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainRoutingModule } from './main-routing.module';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { LeftNavigationComponent } from './left-navigation/left-navigation.component';

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { WrapperComponent } from './wrapper/wrapper.component';
import { TermsConditionComponent } from './terms-condition/terms-condition.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsetConfig, TabsModule } from 'ngx-bootstrap/tabs';
import { MainpageComponent } from './mainpage/mainpage.component';
import { MapHomeComponent } from './map-home/map-home.component';
import { SampleReportsComponent } from './sample-reports/sample-reports.component';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { CreditsComponent } from './credits/credits.component';
import { ProfileAccountSettingComponent } from './profile-account-setting/profile-account-setting.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { ReachUsComponent } from './reach-us/reach-us.component';
import { CrossComponent } from './cross/cross.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { CartComponent } from './cart/cart.component';
import { PaymentTabComponent } from './cart/payment-tab/payment-tab.component';
import { InformationOverviewComponent } from './profile-account-setting/information-overview/information-overview.component';
import { ChangePasswordComponent } from './profile-account-setting/change-password/change-password.component';
import { PaymentMethodComponent } from './profile-account-setting/payment-method/payment-method.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { PurchaseReportsComponent } from './purchase-reports/purchase-reports.component';
import { CreditBalanceComponent } from './credit-balance/credit-balance.component';
@NgModule({
  declarations: [
     HeaderComponent,
     WrapperComponent,
    LeftNavigationComponent,
    TermsConditionComponent,
    MainpageComponent,
    MapHomeComponent,
    SampleReportsComponent,
    CreditsComponent,
    CartComponent,
    ProfileAccountSettingComponent,
    ReachUsComponent,
    CrossComponent,
    PaymentTabComponent,
    InformationOverviewComponent,
    ChangePasswordComponent,
    PaymentMethodComponent,
    PurchaseReportsComponent,
    CreditBalanceComponent,
  ],
  exports: [PaymentTabComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    NgxSliderModule,
    HttpClientModule,
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    TypeaheadModule.forRoot(),
    AccordionModule.forRoot(),
    CarouselModule.forRoot()

  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [BsDropdownModule, TabsetConfig],

})
export class MainModule { }
