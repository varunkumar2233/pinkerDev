import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-welcome-pinkerton',
  templateUrl: './welcome-pinkerton.component.html',
  styleUrls: ['./welcome-pinkerton.component.scss']
})
export class WelcomePinkertonComponent implements OnInit {
 // modalRef: BsModalRef;
  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
  }

  closeModal(){
    this.modalService.hide();
  }

}
