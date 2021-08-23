import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginFail: boolean = true;

  constructor(private router: Router) { }

  ngOnInit(): void {

    setTimeout(()=>{                           
      this.loginFail = false;
  }, 3000);
  }
  gotoHome(){
    this.router.navigateByUrl('/main');
  }
}
