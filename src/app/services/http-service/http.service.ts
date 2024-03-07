import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class HttpService {
  private http = inject(HttpClient);

  constructor() {}

  GetAllPlants = (data?: any): Observable<any> => {
    return this.http.post<any>("", data);
  };
}
