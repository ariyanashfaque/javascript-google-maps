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
  map: google.maps.Map;
  mapMptions: google.maps.MapOptions;
  mapCenter: google.maps.LatLngLiteral;
  mapMarker: google.maps.marker.AdvancedMarkerElement;
  @ViewChild("mapRef", { static: true }) mapRef: ElementRef;

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
      // mapId: "7ed9fa6a25fc4b65",
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
    this.InitializeMap();
  }

  ionViewDidEnter(): void {}

  InitializeMap = async () => {
    const loader = new Loader({
      version: "weekly",
      apiKey: environment.browserKey,
    });

    const { Map } = await loader.importLibrary("maps");
    this.map = new Map(this.mapRef.nativeElement, this.mapMptions);

    const { Marker } = (await google.maps.importLibrary(
      "marker"
    )) as google.maps.MarkerLibrary;

    // console.log(this.map);

    const marker = new Marker({
      map: this.map,
      title: "Uluru",
      position: this.mapCenter,
    });

    // console.log(marker.position);

    // loader
    //   .importLibrary("maps")
    //   .then(({ Map }) => {
    //     new Map(this.mapRef.nativeElement, this.mapMptions);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };
}
