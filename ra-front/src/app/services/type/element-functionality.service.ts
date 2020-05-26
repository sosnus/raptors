import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {StoreService} from "../store.service";
import {ElementFunctionality} from "../../model/Robots/ElementFunctionality";

@Injectable({
  providedIn: 'root'
})
export class ElementFunctionalityService {

  private readonly elementFunctionalityURL: string;

  constructor(private http: HttpClient,
              private store: StoreService) {
    this.elementFunctionalityURL = store.baseURL + '/robots/element-functionalities/';
  }

  public getAll(): Observable<ElementFunctionality[]> {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.get<ElementFunctionality[]>(this.elementFunctionalityURL + "all", {headers: headers, responseType: 'json'})
  }

  public save(elementFunctionality: ElementFunctionality) {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.post<ElementFunctionality>(this.elementFunctionalityURL + 'add', elementFunctionality, {headers: headers});
  }

  public delete(elementFunctionality: ElementFunctionality) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + sessionStorage.getItem('token')
      }), body: elementFunctionality
    };
    return this.http.delete(this.elementFunctionalityURL + 'delete', httpOptions);
  }

}
