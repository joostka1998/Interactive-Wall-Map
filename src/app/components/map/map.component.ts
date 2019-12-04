import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {HereService} from '../../services/here.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements AfterViewInit {

  public query: string;
  Marker;

  coords1 = new google.maps.LatLng(51.9834493, 5.9056359);
  coords2 = new google.maps.LatLng(51.984914, 5.9124933);
  coords3 = new google.maps.LatLng(51.9189964, 5.8468648);

  public constructor(private here: HereService) {
    this.query = '';
  }

  @ViewChild('mapContainer') gmap: ElementRef;
  map: google.maps.Map;
  startlat = 51.98784;
  startlng = 5.95011;
  zoomlevel = 13;
  newMarkerCoordinates;

  coordinates = new google.maps.LatLng(this.startlat, this.startlng);

  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: this.zoomlevel
  };

  public getAddress() {
    if (this.query !== '') {
      this.here.getAddress(this.query).then(result => {
        this.newMarkerCoordinates = new google.maps.LatLng(
          result[0].Location.DisplayPosition.Latitude,
          result[0].Location.DisplayPosition.Longitude
        );
        this.addMarkerOnMap();

      }, error => {
        console.error(error);
      });
    }
  }


  ngAfterViewInit() {
    this.mapInitializer();

    this.Marker = new google.maps.Marker({
      position: this.coords1,
      map: this.map,
    });
    this.Marker = new google.maps.Marker({
      position: this.coords2,
      map: this.map,
    });
    this.Marker = new google.maps.Marker({
      position: this.coords3,
      map: this.map,
    });
    this.Marker.setMap(this.map);
  }

  addMarkerOnMap() {
    this.Marker = new google.maps.Marker({
      position: this.newMarkerCoordinates,
      map: this.map,
    });
    this.Marker.setMap(this.map);
  }

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement,
      this.mapOptions);
  }
}
