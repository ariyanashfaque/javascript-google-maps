import { Injectable } from "@angular/core";
import { Geolocation, Position } from "@capacitor/geolocation";

@Injectable({
  providedIn: "root",
})
export class LocationService {
  public currentLocation: google.maps.LatLngLiteral;

  constructor() {
    this.GetCurrentLocation();
  }

  GetCurrentLocation = async () => {
    const currentPosition = await Geolocation.getCurrentPosition();
    this.currentLocation = {
      lat: currentPosition.coords.latitude,
      lng: currentPosition.coords.longitude,
    };
  };
}
