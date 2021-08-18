import { Component, OnInit, ViewChild } from '@angular/core';
import { ElementRef, Injectable } from '@angular/core';
import { MapboxServService } from '../services/mapbox-serv.service';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { WelcomePinkertonComponent } from '../welcome-pinkerton/welcome-pinkerton.component';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from "@angular/forms";
import { SharedService } from 'src/app/modules/shared/services/shared-service.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DataProviderService } from '../services/data-provider.service';
import { ShopifyService } from '../services/shopify.service';
import { AlertServiceService } from '../../shared/services/alert-service.service';

@Component({
  selector: '.mapHOmepage',
  templateUrl: './map-home.component.html',
  styleUrls: ['./map-home.component.scss']
})
export class MapHomeComponent implements OnInit {
  @ViewChild('geocoderContainer') geocoderContainer: ElementRef<HTMLDivElement>;
  bsModalRef!: BsModalRef;
  constructor(private map: MapboxServService,
    private router: Router,
    private activevateRoute: ActivatedRoute,
    private modalService: BsModalService,
    private httpRequest: HttpClient,
    private _fb: FormBuilder,
    private sharedService: SharedService,
    private shopify: ShopifyService,
    private reportStore: DataProviderService,
    private alertService: AlertServiceService,) { }
  private isActive = new Subject();
  addressselected!: string;
  countryselected!: string;
  countryCode!: string;
  selectedCountry: any = null;
  lat = -79.4512;
  lon = 43.6568;
  platinumReportPrice:number;
  standardReportPrice:number;
  countries = null;
  headers = ["Location/Name", "Crime Score", "Type", "Date"];
  rows = [
  ]
  bindedTwoWays = 'Something else here';
  myReportListStaging = [];
  filterTerm: string;
  productList: Array<any>;
  selectedAddress: string;
  selectedCountryCode: string;
  selectedPlaceImageURL: string;
  ngOnInit(): void {
    console.log("number of reports:" + this.rows.length)
    //this.shopify.getAuthenticatedCheckoutUrl().then(data => console.log(data))
    //console.log('get all products data');

    //console.log('checkout url.......');
    //this.shopify.getAuthenticatedCheckoutUrl().then(data => console.log(data));
    
    this.map.getCountryList().pipe(takeUntil(this.isActive)).subscribe(data => {
      this.countries = data;


      //do not delete this line below
      // this.bsModalRef = this.modalService.show(WelcomePinkertonComponent, Object.assign({}, { class: 'welcome-popup' }));
      // this.bsModalRef.content.closeBtnName = 'Close';
    });
    //this.shopify.getAuthenticatedCheckoutUrl().then(data => console.log(data))
    this.shopify.getProducts().then(data => {
      console.log(data)
      JSON.stringify(data)
      if(data[2].handle=="platinum-report"){
        this.platinumReportPrice = data[2].variants[0].price;
      }
      if(data[3].handle=="standard-report"){
        this.standardReportPrice = data[3].variants[0].price;
      }
      //console.log(data[0].variants[0].price);
      //console.log(data[3].handle);
    })


    this.bindMyReportsData();
  }

  myreportList(response) {
    var TempArray = [];
    this.myReportListStaging = [];
    response.forEach(function (value) {
      TempArray.push(
        {
          "address": value.address,
          "country": value.country,
          "timestamp": value.timestamp,
          "download_url": value.download_url,
          "report_type": value.report_type,
          "is_archived": value.is_archived,
          "lon": value.lon,
          "lat": value.lat

          //"crimescore_set" :
        }
      );
    });
    this.rows = TempArray;
    this.myReportListStaging = TempArray;
    //console.log(this.rows);
    // return TempArray;
  }


  onReportSearch(val) {

    //this.filterItem = val.toLocaleLowerCase();
    //this.rows = this.myReportListStaging.filter(a => a.address == "ma");
    // return this.rows.filter((product: any) =>
    //   product.address.toLocaleLowerCase().indexOf(this.filterItem) !== -1);
    //this.filterItem = val;
    //alert(val);
    //   if(val!=null){
    //  // var item = this.rows.find(item => item.address === val);
    // }
    // else
    // {
    //   //this.rows=this.myReportListStaging;
    // }
  }
  bindMyReportsData() {
    this.sharedService.startLoading();
    this.map.getMyReports().pipe(takeUntil(this.isActive)).subscribe((res: any) => {
      if (!res.isError) {
        this.myreportList(res);
        this.sharedService.stopLoading();
      }
    }, (err) => {
      console.log('my report api stach trace below');
console.log(err);
      this.sharedService.stopLoading();
      this.alertService.error('Error while fetching reports.');
    });
  }


  hideSearch() {
    this.isAnyReportAvaible = false;
  }

  isAnyReportAvaible: boolean = false;
  isBothReportAvaible: boolean = false;
  availableReportData: any;

  ngAfterViewInit(): void {
    this.map.buildMap(this.lat, this.lon, 12, this.geocoderContainer);

    this.map.getCountryList().pipe(takeUntil(this.isActive)).subscribe((data: any) => {
      this.countries = data;
      // autoselect usa
      const usa = data.find(e => e.iso3 === 'usa')
      this.onCountrySelection(usa)
      // allow search in all available countries
      this.map.geocoder.setCountries(this.countries.map(e => e.iso2).join(','))
      //do not delete this line below
      // this.bsModalRef = this.modalService.show(WelcomePinkertonComponent, Object.assign({}, { class: 'welcome-popup' }));
      // this.bsModalRef.content.closeBtnName = 'Close';
    });


    // when location is selected in mapbox, check report availability
    this.map.geocoder.on('result', async res => {
      console.log(res)
      const [lon, lat] = res.result.center
      const resContext = res.result.context
      const iso2 = resContext[resContext.length - 1].short_code
      const iso3 = this.countries.find(e => e.iso2 === iso2).iso3
      //this.selectedAddress = res.result.
      this.selectedAddress = res.result.place_name;
      this.selectedCountryCode= iso2;
      
      // get image-start
      this.selectedPlaceImageURL = "https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/["+res.result.bbox+"]/100x100?padding=5,1,20&access_token="+environment.mapbox.accessToken+""
      console.log(this.selectedPlaceImageURL)
      // get image- end
      try {
        const data: any = await this.map.getAvailability(iso3, lon, lat).toPromise()

        this.availableReportData = data;

        if (data.standard || data.platinum) {
          if (data.standard && data.platinum) {
            this.isBothReportAvaible = true;
          }
          this.isAnyReportAvaible = true;
          console.log(this.isAnyReportAvaible)
          // TODO: show report options to user
          this.map.map.flyTo({
            center: res.result.center,
            zoom: 10
          })
        }
        else {
          alert('Reports are not available for this location.')
        }
      }
      catch (e) {
        alert('Reports are not available for this location.')
      }
    })
  }

  onCountrySelection = (item: any) => {
    this.selectedCountry = item;
    this.map.map.fitBounds(item.bbox)
    console.log(this.selectedCountry)
  }

  onExploreReports() {
    console.log("explore clicked")
    
    this.availableReportData['platinumReportPrice'] =  this.platinumReportPrice;
    this.availableReportData['standardReportPrice'] =  this.standardReportPrice;

    this.availableReportData['selectedAddress'] =  this.selectedAddress;
    this.availableReportData['selectedCountryCode'] =  this.selectedCountryCode;
    
    this.availableReportData['selectedPlaceImageURL'] =  this.selectedPlaceImageURL;
    
    this.reportStore.storeAvailableReport(this.availableReportData);
    this.router.navigate(['purchaseReports'], { relativeTo: this.activevateRoute });

    console.log(this.availableReportData)
  }

  fileDownloadViaSasUrl(req) {

    // this code is for download direct...
    //   var ch = 'https://storriskportalapidev01.blob.core.windows.net/user-file-storage/reports/17/United_States_platinum.pdf?se=2021-08-03T17%3A48%3A09Z&sp=r&sv=2019-02-02&sr=b&sig=gy3TBVMXGV9Do6KulmSQfhcXBpTCMprFXEm4eFY4wNg%3D';
    //   let link = document.createElement('a');
    // link.setAttribute('type', 'hidden');
    // link.href = ch;
    // link.download = 'ch.pdf';
    // document.body.appendChild(link);
    // link.click();
    // link.remove();
    var myRegexp = /(\d+)\D*$/g;
    var match = myRegexp.exec(req);
    this.sharedService.startLoading();
    this.map.getDocumentSasUrlByUrl(match[1]).pipe(takeUntil(this.isActive)).subscribe((res: any) => {
      if (res.url) {
        window.open(res.url, '_blank');
      }
      this.sharedService.stopLoading();
    }, (err) => {
      this.alertService.error('Error while downloading report.');
      this.sharedService.stopLoading();
    });

  }

  // onLocationSelected(res) {
  //   const [lon, lat] = res.result.center
  //   this.httpRequest.get(`${environment.apiUrl}report/availability/${this.selectedCountry.iso3}/`, {
  //     params: { lon, lat }
  //   })
  //     .subscribe((data : any) => {
  //       if (data.standard || data.platinum) {
  //         // TODO: show report options to user
  //         this.map.map.flyTo({
  //           center: res.result.center,
  //           zoom: 10
  //         })
  //       }
  //       else {
  //         console.error('Reports are not available for this location.')
  //       }
  //     })
  // }

}
