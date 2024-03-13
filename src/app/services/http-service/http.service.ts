import { Observable } from "rxjs";
import { Injectable, inject } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class HttpService {
  private http = inject(HttpClient);
  headers: HttpHeaders = new HttpHeaders({
    "X-APIKey":
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQVRZVU5DSCIsImV4cGlyeSI6IjIwMzAtMTItMzEifQ.yCIP5K1QWxjNujwlOGrNXnEHNihU5lbfJwRuebP8ueo",
  });

  constructor() {}

  GetAllPlants = (): Observable<any> => {
    return this.http.post<any>(
      "https://us-central1-global-bog-staging.cloudfunctions.net/bogpro/getAllPlantList",
      {
        data: {
          latitude: 17.5407104,
          longitude: 78.3056896,
          email: "krishna.kottayada.ext1@holcim.com",
        },
      },
      { headers: this.headers }
    );
  };
}
