import { Component, OnInit } from "@angular/core";
import { IonContent } from "@ionic/angular/standalone";
import { MapsComponent } from "src/app/components/maps/maps.component";

@Component({
  standalone: true,
  selector: "app-google-maps",
  imports: [IonContent, MapsComponent],
  templateUrl: "./google-maps.page.html",
  styleUrls: ["./google-maps.page.scss"],
})
export class GoogleMapsPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
