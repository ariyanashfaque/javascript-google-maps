import { Loader } from "@googlemaps/js-api-loader";
import { environment } from "src/environments/environment";
import { MAPBACKGROUND } from "src/app/utils/constant.util";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";

@Component({
  standalone: true,
  selector: "app-maps-component",
  templateUrl: "./maps.component.html",
  styleUrls: ["./maps.component.scss"],
})
export class MapsComponent implements OnInit {
  mapMptions: google.maps.MapOptions;
  mapCenter: google.maps.LatLngLiteral;
  @ViewChild("map", { static: true }) map: ElementRef;

  constructor() {
    this.mapCenter = { lat: 23.7731, lng: 90.3657 };
    this.mapMptions = {
      zoom: 16,
      maxZoom: 20,
      minZoom: 10,
      mapTypeId: "roadmap",
      mapTypeControl: true,
      styles: MAPBACKGROUND,
      center: this.mapCenter,
      disableDefaultUI: true,
      streetViewControl: false,
      keyboardShortcuts: false,
      disableDoubleClickZoom: true,
      mapTypeControlOptions: {
        style: 1.0,
        position: 9.0,
        mapTypeIds: ["roadmap", "satellite"],
      },
    };
  }

  ngOnInit(): void {
    console.log(this.map.nativeElement);
    this.InitializeMap();
  }

  ionViewDidEnter(): void {
    // this.InitializeMap();
  }

  InitializeMap = () => {
    const loader = new Loader({
      version: "weekly",
      apiKey: environment.browserKey,
    });

    loader
      .importLibrary("maps")
      .then(({ Map }) => {
        new Map(this.map.nativeElement, this.mapMptions);
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
