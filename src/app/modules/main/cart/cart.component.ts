import { Component, OnInit } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { addToCartServie } from '../services/add-to-cart.service';
import { SharedService } from '../../shared/services/shared-service.service';
import { AlertServiceService } from '../../shared/services/alert-service.service';
import { ShopifyService } from '../services/shopify.service';
import { DataProviderService } from '../services/data-provider.service';
import { debug } from 'console';
import { takeUntil } from 'rxjs/operators';
import { Subscription, Subject } from 'rxjs';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  countryselected!: string;
  selectdrop: any = "Country";
  mx: any = "Afghanistan";
  cartList : Array<any>;
  totalAmount:any;
  itemCount: any;
  standartReportAmount : any;
  platiumReportAmount : any;
  isActive: Subject<boolean> = new Subject();   // Subject used to take until the component is alive.

  constructor(private cart_service : addToCartServie,
    private shared_service : SharedService, 
    private alert_service : AlertServiceService,
    private shopify: ShopifyService,
    private date_Provider_Service: DataProviderService, ) {
      this.date_Provider_Service.getViewCartDetailData().pipe(takeUntil(this.isActive)).subscribe((data:any)=>{
      //  this.loadCartData(); 
      this.cartList = data;
      this.itemCount = this.cartList.length;
      this.calculateItemSum();
      });
     }

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
    this.getReportPricesfromShopify();
    setTimeout(() => {  
      this.loadCartData();
     }, 1000); 
  }

  getValue = (item: string) => {
    console.log(item);
    this.selectdrop = item;
  }

  async getReportPricesfromShopify()
  {
    // const products = await this.shopify.getProducts();
    // this.standartReportAmount = products.find(e => e.handle === `standard-report`).variants[0].price;
    // this.platiumReportAmount = products.find(e => e.handle === `platinum-report`).variants[0].price;

    this.shopify.getProducts().then(data => {
      this.standartReportAmount = data.find(e => e.handle === `standard-report`).variants[0].price;
      this.platiumReportAmount = data.find(e => e.handle === `platinum-report`).variants[0].price;
    });
  }

  loadCartData()
  {
      this.cart_service.displayCartData().pipe(takeUntil(this.isActive)).subscribe(data =>{
      this.myCartList(data);
    });
  }


  myCartList(req)
  {

    var tempArray = [];
    var amount =0;
    var standardAmount= this.standartReportAmount;
    var platiumAmount= this.platiumReportAmount;
    req.reports.forEach(function (value) { // report data
      tempArray.push(
        {
          "id": value.id,
          "address": value.address, // this will change...
          "report_type": value.report_type,
          "country": value.usa,
          "lon": value.lon,
          "lat": value.lat,
          "geo_id": value.geo_id,
          "price": value.report_type=='platinum' ? platiumAmount : standardAmount,
          "quantity": ''
        }
      );
    });
    // credit data.
    var premCred = req.platinum_credits;
    var standCred = req.standard_credits;

    if(standCred!=0)
    {
    var standareCreditRequest = {
        "id": 0,
        "address": '', // this will change...
        "report_type": 'standard_credits',
        "country": '',
        "lon": '',
        "lat": '',
        "geo_id": '',
        "price": this.getCreditTotalPrice(standCred,'standard_credits'),
        "quantity":standCred
      };
      tempArray.push(standareCreditRequest);
    }

    if(premCred!=0)
    {
     var platiumCreditRequest = { // we can show the add to cart data for credits & reports.
        "id": 0,
        "address": '', // this will change...
        "report_type": 'platinum_credits',
        "country": '',
        "lon": '',
        "lat": '',
        "geo_id": '',
        "price": this.getCreditTotalPrice(premCred,'platinum_credits'),
        'quantity' : premCred
      };
      tempArray.push(platiumCreditRequest);
    }
      this.cartList = tempArray;
      this.itemCount = this.cartList.length;
      this.calculateItemSum();
  }

  calculateItemSum()
  {
    var  total = 0;
    var creditAmount=0;
    var amount =0 ;
    //var creditAmounts = this.getCreditTotalPrice(1,2);


for(var i=0;i<this.cartList.length;i++)
{
  total += parseInt(this.cartList[i].price);
}
 this.totalAmount = total;

 }


  getCreditTotalPrice(quantity,credittype)
  {
    if(credittype==='standard_credits')
    {
              if(quantity>=25 && quantity <=49)
              {
                return quantity * 250;
              
              } else if(quantity>=50) {
                return quantity * 200;
            
              } else
              {
                return quantity * 350;
              }
    }
    else
    {
              if(quantity>=25 && quantity <=49)
                    {
                      return quantity * 770;
                    
                    } else if(quantity>=50) {
                      return quantity * 615;
                  
                    } else
                    {
                      return quantity * 1000;
                    }
          }
  }
  
  checkoutfinal()
  {
    this.shared_service.startLoading();
    this.alert_service.info('redirecting ... please wait');
    this.shopify.getAuthenticatedCheckoutUrl().then(data => 
     //console.log((<any>data).url)
      window.open((<any>data).url,'_self')
    ).catch(function(error) { 
      alert('error');
      this.shared_service.stopLoading();
      // Catch and handle exceptions from success/error/finally functions
    });
   // this.shared_service.stopLoading();
  }
}
