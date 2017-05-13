import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Http } from '@angular/http';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { Location } from './location';
import { ApiService } from 'app/api.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  title: string = 'My first angular2-google-maps project';
  lat: number = 4.6381991;
  lng: number = -74.0884238;
  zoom: number = 16;
  locations: Location[];

  constructor(
    private apiService: ApiService,
    private http: Http,
  ) { }

  ngOnInit() {
   let timer = Observable.timer(0, 50000);
	 timer.subscribe(() => this.getLocations());
  }

  getLocations(){
		this.apiService.getLocations().subscribe(locations => this.locations = locations);
	}

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }
}
interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}
