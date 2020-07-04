import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { StoreService } from "./store.service";
import { Observable } from "rxjs";
import { JVMdata } from "../model/JVMdata";

@Injectable({
  providedIn: "root",
})
export class HealthzService {
  private readonly url: string;
  private readonly baseURL: string;

  constructor(private http: HttpClient, private store: StoreService) {
    this.url = store.baseURL + "/healthz/";
    this.baseURL = store.baseURL;
  }

  getBaseURL() {
    return this.baseURL;
  }

  getJVMData(): Observable<JVMdata> {
    const headers = {
      Authorization: "Basic " + sessionStorage.getItem("token"),
    };
    return this.http.get<JVMdata>(this.url + "jvmMonitor", {
      headers,
      responseType: "json",
    });
  }

  isDatabaseWorking() {
    // const headers = {Authorization: 'Basic ' + sessionStorage.getItem('token')};
    return this.http.get<boolean>(this.url + "database");
  }

  getDatabaseAdress() {
    // const headers = {Authorization: 'Basic ' + sessionStorage.getItem('token')};
    return this.http.get(this.url + "database/dbaddress", {
      responseType: "text",
    });
  }

  getDatabaseName() {
    // const headers = {Authorization: 'Basic ' + sessionStorage.getItem('token')};
    return this.http.get(this.url + "database/dbname", {
      responseType: "text",
    });
  }

  isBackendWorking() {
    const headers = {
      Authorization: "Basic " + sessionStorage.getItem("token"),
    };
    return this.http.get<boolean>(this.url + "backend", { headers });
  }

  getBackendVersion() {
    // const headers = {Authorization: 'Basic ' + sessionStorage.getItem('token')};
    return this.http.get(this.url + "backend/version", {
      responseType: "text",
    });
  }
  //  dznoiał to jest git xdńó
}
