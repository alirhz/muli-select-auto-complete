import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Browser, Map, map, tileLayer } from 'leaflet';
import { marker } from './marker.image';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { GeoLocationService } from '../service/geo-location.service';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [HttpClient]
})
export class MapComponent implements OnInit {
  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;
  @Input()
  geoReverseService =
    'https://nominatim.openstreetmap.org/reverse?key=iTzWSiYpGxDvhATNtSrqx5gDcnMOkntL&format=json&addressdetails=1&lat={lat}&lon={lon}';

  constructor(private httpClient: HttpClient,private geoLocationService: GeoLocationService) {}

  ngOnInit() {
    this.geoLocationService.getLocation().subscribe((position) => {
      console.log(23, position);
    });
    this.reverseGeo();
  }

  ngAfterViewInit() {
    const initialState = { lng: 11, lat: 49, zoom: 10 };

    const lefletMap: Map = map(this.mapContainer.nativeElement).setView(
      [initialState.lat, initialState.lng],
      initialState.zoom
    );
  }

  reverseGeo() {
    const service = (this.geoReverseService || '')
      .replace(new RegExp('{lon}', 'ig'), `${52.520008}`)
      .replace(new RegExp('{lat}', 'ig'), `${13.404954}`)
    this.httpClient.get(service).subscribe((data: any) => {
      console.log(data);

    })
  }
}
