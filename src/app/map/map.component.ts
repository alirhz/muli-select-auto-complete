import { AfterViewInit, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { MatDialog } from '@angular/material/dialog';
import { MarkerDialogComponent } from './marker dialog/marker.dialog.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [HttpClient],
})
export class MapComponent implements OnInit, AfterViewInit {
  private map: any;
  private marker: any;
  private circle: any;
  private readOnly: boolean = false;

  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  private initMap(): void {
    this.map = L.map('map', {
      center: [35.6, 51.3],
      zoom: 4,
    });
    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );
    tiles.addTo(this.map);
  }

  initMarker(lat?: number, lng?: number) {
    const iconRetinaUrl =
      'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png';
    const iconUrl =
      'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png';
    const shadowUrl =
      'https://unpkg.com/leaflet@1.6.0/dist/images/marker-shadow.png';
    const iconDefault = L.icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41],
    });
    L.Marker.prototype.options.icon = iconDefault;
     // if user registerd we have lat and lng values
     // remove below values to get user location from browser
    lat = 30;
    lng = 35;

    if (lat && lng) {
      this.marker = L.marker([lat, lng], {
        icon: iconDefault,
      }).addTo(this.map);
      this.circle = L.circleMarker([lat, lng]);
      this.circle.addTo(this.map);
      this.map.setZoom(14);
      this.map.panTo(new L.LatLng(lat, lng));
      this.marker.bindPopup(
        '<b>' + '<p>Name: John</p> <p>Last name: Doe</p>' + '</b>'
      );
    } else {
      this.map
        .locate({
          setView: true,
          watch: true,
        })
        .on('locationfound', (e: any) => {
          let { lat, lng } = e.latlng;
          this.marker = L.marker([lat, lng]).addTo(this.map);
          this.circle = L.circleMarker([lat, lng]);
          this.circle.addTo(this.map);
          this.marker.bindPopup(
            '<b>' + '<p>Name: John</p> <p>Last name: Doe</p>' + '</b>'
          );
          this.map.off('locationfound');
        })
        .on('locationerror', () => {
          this.map.off('locationfound');
        });
    }
  }

  ngAfterViewInit() {
    this.initMap();
    this.initMarker();
    this.onClickEventMap();
  }

  onClickEventMap() {
    if (!this.readOnly)
      this.map.on('click', (e: any) => {
        this.openDialog(e);
      });
    else this.map.off('click');
  }

  openDialog(event: any): void {
    const dialogRef = this.dialog.open(MarkerDialogComponent, {
      width: '250px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let { lat, lng } = event.latlng;
        if (this.marker != undefined) {
          this.map.removeLayer(this.marker);
          this.map.removeLayer(this.circle);
        }
        this.marker = L.marker([lat, lng]).addTo(this.map);
        this.circle = L.circleMarker([lat, lng]);
        this.circle.addTo(this.map);

        this.marker.bindPopup(
          '<b>' + '<p>Name: John</p> <p>Last name: Doe</p>' + '</b>'
        );
      } else {
        return;
      }
    });
  }
}
