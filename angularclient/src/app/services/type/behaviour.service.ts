import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Behaviour} from "../../model/Robots/Behaviour";
import {StoreService} from "../store.service";

@Injectable({
  providedIn: 'root'
})
export class BehaviourService {

  private readonly behaviourURL: string;

  constructor(private http: HttpClient,
              private store: StoreService) {
    this.behaviourURL = store.baseURL + '/robots/behaviours/';
  }

  public getByID(id: string): Observable<Behaviour> {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.get<Behaviour>(this.behaviourURL + id, {headers: headers, responseType: 'json'});
  }

  public getAll(): Observable<Behaviour[]> {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.get<Behaviour[]>(this.behaviourURL + 'all', {headers: headers, responseType: 'json'});
  }

  public save(behaviour: Behaviour) {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.post<Behaviour>(this.behaviourURL + 'add', behaviour, {headers: headers});
  }

  public delete(behaviour: Behaviour) {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + sessionStorage.getItem('token')
      }), body: behaviour
    };
    return this.http.delete(this.behaviourURL + 'delete', httpOptions);
  }
}
