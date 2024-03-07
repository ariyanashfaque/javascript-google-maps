import { Library, Loader } from "@googlemaps/js-api-loader";
import { environment } from "src/environments/environment";
import { MAPBACKGROUND } from "src/app/utils/constant.util";
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from "@angular/core";
import { LocationService } from "src/app/services/location-service/location.service";

@Component({
  standalone: true,
  selector: "app-maps-component",
  templateUrl: "./maps.component.html",
  styleUrls: ["./maps.component.scss"],
})
export class MapsComponent implements OnInit {
  private locationService = inject(LocationService);

  loader: any;
  map: google.maps.Map;
  mapMptions: google.maps.MapOptions;
  mapCenter: google.maps.LatLngLiteral;
  mapMarker: google.maps.marker.AdvancedMarkerElement;
  @ViewChild("mapRef", { static: true }) mapRef: ElementRef;

  constructor() {
    this.loader = new Loader({
      version: "weekly",
      apiKey: environment.browserKey,
    });

    this.mapCenter = { lat: 23.7731, lng: 90.3657 };
    this.mapMptions = {
      zoom: 16,
      maxZoom: 20,
      minZoom: 10,
      mapId: "g-maps",
      mapTypeId: "roadmap",
      mapTypeControl: false,
      // styles: MAPBACKGROUND,
      center: this.mapCenter,
      disableDefaultUI: true,
      streetViewControl: false,
      keyboardShortcuts: false,
      disableDoubleClickZoom: true,
    };
  }

  ngOnInit(): void {
    this.InitializeMap();
  }

  ionViewDidEnter(): void {}

  InitializeMap = async () => {
    const { Map, StyledMapType } = await this.ImportMapsLibrary("maps");
    this.map = new Map(this.mapRef.nativeElement, this.mapMptions);

    const styledMaps = new StyledMapType(MAPBACKGROUND, { name: "Map" });

    console.log(styledMaps);

    this.map.mapTypes.set("styled_map", styledMaps);
    this.map.setMapTypeId("styled_map");

    this.AddMarker();
  };

  AddMarker = async () => {
    const { AdvancedMarkerElement } = await this.ImportMapsMarkerLibrary(
      "marker"
    );

    const marker = new AdvancedMarkerElement({
      map: this.map,
      title: "Uluru",
      position: this.mapCenter,
    });

    const { Circle } = await this.ImportMapsMarkerCircleLibrary("maps");

    const circle = new Circle({
      radius: 5,
      map: this.map,
      center: this.mapCenter,
    });

    console.log(circle);
  };

  ImportMapsLibrary = async (type: Library) => {
    return (await this.loader.importLibrary(type)) as google.maps.MapsLibrary;
  };
  ImportMapsMarkerLibrary = async (type: Library) => {
    return (await this.loader.importLibrary(type)) as google.maps.MarkerLibrary;
  };
  ImportMapsMarkerCircleLibrary = async (type: Library) => {
    return (await this.loader.importLibrary(type)) as google.maps.MapsLibrary;
  };
}
