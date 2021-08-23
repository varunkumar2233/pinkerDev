import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-map-on-home',
  templateUrl: './map-on-home.component.html',
  styleUrls: ['./map-on-home.component.scss']
})
export class MapOnHomeComponent implements OnInit {

  map?: mapboxgl.Map;
  style = 'mapbox://styles/varunkumarmca/ckqywbn485njg17rwpdiwd665/draft';
  lat = 37.0902;
  lng = 95.7129;
  zoom = 1
  constructor() {
    (mapboxgl as any).accessToken = environment.mapbox.accessToken;
  }
  buildMap() {
    
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: this.zoom,
      center: [this.lng, this.lat]
    })

    var nav = new mapboxgl.NavigationControl();
    this.map.addControl(nav, 'top-left');


    
    // Set options ,marker
// var marker = new mapboxgl.Marker({
//         color: "#FFFFFF",
//         draggable: true
//       }).setLngLat([30.5, 50.5])
//       .addTo(this.map);

    this.map.addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
          enableHighAccuracy: true
      },
      trackUserLocation: true
  }));
  }
  ngOnInit(): void {
    this.buildMap()
  }

}
