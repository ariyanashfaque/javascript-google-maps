import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "google-maps",
  },
  {
    path: "google-maps",
    loadComponent: () =>
      import("./pages/google-maps/google-maps.page").then(
        (m) => m.GoogleMapsPage
      ),
  },
];
