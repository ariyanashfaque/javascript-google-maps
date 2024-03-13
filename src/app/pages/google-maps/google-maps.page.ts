import { HttpErrorResponse } from "@angular/common/http";
import {
  Component,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from "@angular/core";
import { IonContent, LoadingController } from "@ionic/angular/standalone";
import { BehaviorSubject } from "rxjs";
import { MapsComponent } from "src/app/components/maps/maps.component";
import { HttpService } from "src/app/services/http-service/http.service";

@Component({
  standalone: true,
  selector: "app-google-maps",
  imports: [IonContent, MapsComponent],
  templateUrl: "./google-maps.page.html",
  styleUrls: ["./google-maps.page.scss"],
})
export class GoogleMapsPage implements OnInit {
  private httpService = inject(HttpService);
  private loadingCtrl = inject(LoadingController);

  isLoading: boolean = false;
  plants = new BehaviorSubject([]);

  constructor() {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.handlePlantsList();
  }

  async handlePlantsList() {
    this.isLoading = true;
    const loading = await this.loadingCtrl.create({
      spinner: "circles",
      message: "Loading...",
    });

    loading.present();

    this.httpService.GetAllPlants().subscribe({
      next: (data) => {
        this.plants.next(data.data.plant_list);
      },
      error: (error: HttpErrorResponse) => {
        loading.dismiss();
        this.isLoading = false;
        console.log(error.message);
      },
      complete: () => {
        loading.dismiss();
        this.isLoading = false;
      },
    });
  }
}
