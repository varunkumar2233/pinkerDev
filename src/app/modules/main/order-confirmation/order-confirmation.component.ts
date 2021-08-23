import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { SharedService } from '../../shared/services/shared-service.service';
import { addToCartServie } from '../services/add-to-cart.service';
import { Subscription, Subject } from 'rxjs';
import { AlertServiceService } from '../../shared/services/alert-service.service';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.scss']
})

export class OrderConfirmationComponent implements OnInit {
order_ID : any;
isActive: Subject<boolean> = new Subject();
orderList : Array<any> = [];
paymentData : any;



  constructor(private route: ActivatedRoute,
    private shared_service :SharedService,
    private service : addToCartServie,
    private alert_service : AlertServiceService

    ) { }

  ngOnInit(): void {

    this.shared_service.startLoading();
    this.route.queryParams.subscribe(params => {
     this.order_ID=  params['order_id']
  });
  this.getOrderSummary();
   this.shared_service.stopLoading();
  }


  getOrderSummary()
  {
    this.service.getOrderSummary(this.order_ID).pipe(takeUntil(this.isActive)).subscribe(data =>{
      this.bindOrderSummaryDetails(data);
    });
  }

 bindOrderSummaryDetails(req)
  {
    var reportData = [];
    req.reports.forEach(function (value) { // report data
      reportData.push(
        {
          "id": value.id,
          "address": value.address, // this will change...
          "report_type": value.report_type,
          "country": value.usa,
          "price": value.price
        }
      );
    });

    this.orderList= reportData;

    var payments = {
          "subtotal" : req.payment.subtotal,
          "tax": req.payment.tax,
          "total":req.payment.total
    }
    this.paymentData = payments;
    if(this.orderList.length >0)
    {
     this.callReportgenrationEndPoints(this.orderList);
    }
  }

 async callReportgenrationEndPoints(reportsObj)
    {
      debugger;
        for(var i=0;i<reportsObj.length;)
        {
           this.service.genrateReport(reportsObj[i].id).toPromise();
          i++;
        }
    }
}
