import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-tab',
  templateUrl: './payment-tab.component.html',
  styleUrls: ['./payment-tab.component.scss']
})
export class PaymentTabComponent implements OnInit {
  oneAtATime = true;
  constructor() { }

  ngOnInit(): void {
  }

}
