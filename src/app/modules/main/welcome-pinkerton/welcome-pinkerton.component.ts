import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-pinkerton',
  templateUrl: './welcome-pinkerton.component.html',
  styleUrls: ['./welcome-pinkerton.component.scss']
})
export class WelcomePinkertonComponent implements OnInit {
 // modalRef: BsModalRef;
  constructor(private router: Router) {
   }

  ngOnInit(): void {
  }

  closeModalPane(){
    //this.modalService.hide();
    this.router.navigateByUrl('/main', { skipLocationChange: false });
  }

}
