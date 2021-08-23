import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  countryselected!: string;
  selectdrop: any = "Country";
  mx: any = "Afghanistan";

  constructor() { }

  countries = [
    { countryID: "1", countryName: "Afghanistan" },
    { countryID: "2", countryName: "Albania" },
    { countryID: "13", countryName: "Algeria" },
    { countryID: "333", countryName: "Andorra" },
    { countryID: "123", countryName: "Angola" },
    { countryID: "112", countryName: "Antigua and Barbuda" },
    { countryID: "212", countryName: "Argentina" },
    { countryID: "321", countryName: "Armenia" },
    { countryID: "126", countryName: "Australia" },

  ];



  ngOnInit(): void {
  }

  getValue = (item: string) => {
    console.log(item);
    this.selectdrop = item;
  }

  // click() {
  //   var selText = $(this).text();
  //   $(this).parents('.btn-group').find('.dropdown-toggle').html(selText + ' <span class="caret"></span>');
  // }


}
