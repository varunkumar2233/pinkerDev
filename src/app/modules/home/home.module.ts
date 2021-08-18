import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { MapOnHomeComponent } from './components/map-on-home//map-on-home.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeService } from './services/home.service';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SignUpComponent } from './components/sign-up/components/sign-up.component';
import { LeftWrapperComponent } from './components/sign-up/components/left-wrapper/left-wrapper.component';
//import { RequestIntercepterService } from '../../services/request-intercepter.service';
@NgModule({
	declarations: [HomeComponent,MapOnHomeComponent,SignUpComponent,LeftWrapperComponent],
	//exports: [HomeComponent],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		HomeRoutingModule
	  ],
	  providers: [
		
		HomeService],
})
export class HomeModule {
}
