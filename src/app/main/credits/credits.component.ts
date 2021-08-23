import { Component, OnInit } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.scss']
})
export class CreditsComponent implements OnInit {

  constructor() { }
  value: number = 5;
  options: Options = {
    floor: 1,
    ceil: 100
  };
  ngOnInit(): void {
  }

}
