import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountWrapperComponent } from './accountDetails/account-wrapper/account-wrapper.component';
import { CreatePasswordComponent } from './accountDetails/create-password/create-password.component';
import { ForgotPasswordComponent } from './accountDetails/forgot-password/forgot-password.component';
import { SignUpComponent } from './accountDetails/sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
//import { WrapperComponent } from './main/wrapper/wrapper.component';

//import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: AccountWrapperComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'forgotpassword', component: ForgotPasswordComponent },
  { path: 'createPassword', component: CreatePasswordComponent },
  // { path: 'home', component: WrapperComponent },

  {
    path: 'main', loadChildren: () => import(`./main/main.module`).then(
      module => module.MainModule
    )
  },

  // otherwise redirect to home,
  { path: 'pageNotFound', component: PageNotFoundComponent },
  { path: '**', redirectTo: 'pageNotFound' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }





