import { ElementRef, Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { GetCordsService } from './get-cords.service';

import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError, retry } from 'rxjs/operators';

import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class MapboxServService {

  geocoder:any;

  map?: mapboxgl.Map;
  style = 'mapbox://styles/pinkertonadmin/ckrdl5ku616tq17mtdhgdqjff/';

  zoom = 12;
  apiUrl: any;
  constructor(private geocord : GetCordsService, private httpRequest: HttpClient) {
    (mapboxgl as any).accessToken = environment.mapbox.accessToken;
    this.apiUrl = environment.apiUrl;
  }
  buildMap(longval:any, latval:any, zoomval:number, geocoderContainer:ElementRef<HTMLDivElement>) {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: zoomval,
      center: [longval, latval]
    });
    this.map.addControl(new mapboxgl.NavigationControl());


    this.geocoder= new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
    });
    this.geocoder.addTo(geocoderContainer.nativeElement)
  }

  getCountryList(){
    return this.httpRequest.get(`${environment.getCountryList}`);
  }

  getMyReports()
  {
    return this.httpRequest.get(`${environment.getMyReports}`);
  }

  getDocumentSasUrlByUrl(id)
  {
    return this.httpRequest.get(`${environment.apiUrl}report/download/`+ id +'/' +`${environment.securekey}`);
  }

  getAvailability(iso3, lon, lat) {
    return this.httpRequest.get(
        `${environment.apiUrl}report/availability/${iso3}/`+`${environment.securekey}`,
        { params: { lon, lat }}
    )
  }

}