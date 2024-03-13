import { Library, Loader } from "@googlemaps/js-api-loader";
import { environment } from "src/environments/environment";
import { MAPBACKGROUND } from "src/app/utils/constant.util";
import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Signal,
  ViewChild,
  ViewEncapsulation,
  WritableSignal,
  inject,
  signal,
} from "@angular/core";
import { LocationService } from "src/app/services/location-service/location.service";
import { BehaviorSubject } from "rxjs";

@Component({
  standalone: true,
  selector: "app-maps-component",
  templateUrl: "./maps.component.html",
  styleUrls: ["./maps.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class MapsComponent implements OnInit {
  @Input() plants = new BehaviorSubject([]);

  private locationService = inject(LocationService);

  map: google.maps.Map;
  mapMptions: google.maps.MapOptions;
  mapCenter: google.maps.LatLngLiteral;
  mapMarker: google.maps.marker.AdvancedMarkerElement;
  @ViewChild("mapRef", { static: true }) mapRef: ElementRef;

  loader = new Loader({
    version: "weekly",
    apiKey: environment.browserKey,
  });

  constructor() {
    this.mapCenter = { lat: 18.4085962, lng: 77.0994331 };
    this.mapMptions = {
      zoom: 16,
      maxZoom: 20,
      // minZoom: 10,
      mapId: "g-maps",
      mapTypeId: "roadmap",
      mapTypeControl: false,
      center: this.mapCenter,
      disableDefaultUI: true,
      streetViewControl: false,
      keyboardShortcuts: false,
      disableDoubleClickZoom: true,
    };
  }

  ngOnInit(): void {
    this.InitializeMap();

    this.plants.subscribe({ next: (plants) => console.log(plants) });
  }

  ionViewDidEnter(): void {}

  InitializeMap = async () => {
    const { Map } = await this.importMapsLibrary("maps");
    this.map = new Map(this.mapRef.nativeElement, this.mapMptions);
    this.AddMapStyles();

    this.plants.subscribe({
      next: (plants) => {
        plants.forEach((plant) => {
          this.AddMarker(plant);
        });
      },
    });
  };

  AddMarker = async (plant: any) => {
    const markerContainer = document.createElement("div");

    const markerImage = document.createElement("img");
    markerImage.src = "../assets/check-in/plant_1.svg";
    markerImage.width = 72;
    markerImage.height = 72;

    const plantName = document.createElement("h1");
    plantName.textContent = plant.plant;
    const gruAndSegment = document.createElement("h3");
    gruAndSegment.textContent = `${plant.country}, ${plant.segment}`;
    const distanceInKm = document.createElement("h4");
    distanceInKm.textContent = `${plant.distanceInKm.toFixed(2)} km`;

    const mapMarker = document.createElement("div");
    mapMarker.className = "map-marker";
    mapMarker.appendChild(markerImage);

    markerContainer.appendChild(mapMarker);
    markerContainer.appendChild(plantName);
    markerContainer.appendChild(gruAndSegment);
    markerContainer.appendChild(distanceInKm);

    const { AdvancedMarkerElement } = await this.importMarkersLibrary("marker");

    const marker = new AdvancedMarkerElement({
      map: this.map,
      title: plant.plant,
      content: markerContainer,
      position: { lat: plant.lat, lng: plant.lng },
    });

    // const { Circle } = await this.ImportMapsMarkerCircleLibrary("maps");

    // const circle = new Circle({
    //   radius: 5,
    //   map: this.map,
    //   center: this.mapCenter,
    // });
  };

  AddMapStyles = async () => {
    const { StyledMapType } = await this.importMapsLibrary("maps");
    const styledMaps = new StyledMapType(MAPBACKGROUND);
    this.map.mapTypes.set("styled_map", styledMaps);
    this.map.setMapTypeId("styled_map");
  };

  importMapsLibrary = async (type: Library) => {
    return (await this.loader.importLibrary(type)) as google.maps.MapsLibrary;
  };
  importMarkersLibrary = async (type: Library) => {
    return (await this.loader.importLibrary(type)) as google.maps.MarkerLibrary;
  };
  importMarkerCircleLibrary = async (type: Library) => {
    return (await this.loader.importLibrary(type)) as google.maps.MapsLibrary;
  };
}
