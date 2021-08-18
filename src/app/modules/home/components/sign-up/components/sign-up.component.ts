import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first,takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { HomeService } from '../../../services/home.service';
import { environment } from '../../../../../../environments/environment';
import { AlertServiceService } from '../../../../shared/services/alert-service.service';
import { SharedService } from '../../../../shared/services/shared-service.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  isUserLoggedin = false;
  private userType: string;
  private isActive = new Subject();
  private accessToken : string;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private homeService: HomeService,
      private alertService: AlertServiceService,
      private sharedService : SharedService
  ) {
  }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        phone: ['', [Validators.required, Validators.pattern('(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{3,4})')]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}'), Validators.minLength(8)]]
        //has_agreed_tos: ['', Validators.required]
      });
      this.accessToken = localStorage.getItem('AccessToken')

  }



  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }
  SingnIn()
  {
    localStorage.clear();
    this.userType = 'client';
    localStorage.removeItem('AuthType');
    localStorage.setItem('AuthType', this.userType);
    this.router.navigateByUrl(`/auth?username=${'clientuser'}`, { skipLocationChange: true });

    // const accessToken = localStorage.getItem('AccessToken');
    // const authType = localStorage.getItem('AuthType');
    // if(accessToken && (authType =='client'))
    // {
    //   this.validateLoginStatus();
    //   //window.location.href = environment.postLoginRedirectUri.termscondition;
    // }
    // else{
     
    // }
  }
  onSubmit() {
      this.submitted = true;
      if (this.registerForm.invalid) {
          return;
      }

      this.sharedService.startLoading();
      this.homeService.register(this.registerForm.value)
          .pipe(first())
          .subscribe({
              next: (data) => {
                  //console.log(data.toString())
                  localStorage.clear();
                  this.alertService.success('Registration successful. Click sign in to login. ', { keepAfterRouteChange: true });
                  this.router.navigate(['../'], { relativeTo: this.route });
                  this.sharedService.stopLoading();
              },
              error: error => {
                //error.error["email"]
                  this.alertService.error(error.error["email"], { keepAfterRouteChange: true });
                 // JSON.stringify(error)
                  console.log(error);
                  this.sharedService.stopLoading();
                 // this.loading = false;
              }
          });
          this.sharedService.stopLoading();
  }

  validateLoginStatus() {

    this.sharedService.startLoading();
		//const authType = localStorage.getItem('AuthType');
		//const accessToken = localStorage.getItem('AccessToken');
		this.homeService.getUserInfo().pipe(takeUntil(this.isActive)).subscribe((res: any) => {
			if (!res.isError) {
				if(!res.has_agreed_tos)
				{
           this.sharedService.stopLoading();
           this.router.navigate(['main/terms-condition']);
				}
        else
        {
        this.sharedService.stopLoading();
				window.location.href = environment.postLoginRedirectUri.landingMain;
				console.log('success getUserInfo api');
        }
			}
		  }, (err) => {
        this.sharedService.stopLoading();
        alert('error in getUserInfo api close brower cache.');
		  });
	}
}