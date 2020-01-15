import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Behaviour} from "../../model/Robots/Behaviour";

@Injectable({
  providedIn: 'root'
})
export class BehaviourService {

  private readonly behaviourURL: string;

  constructor(private http: HttpClient) {
    this.behaviourURL = 'http://localhost:8080/robots/behaviours/';
  }

  public getByID(id: string): Observable<Behaviour> {
    return this.http.get<Behaviour>(this.behaviourURL + id, {responseType: 'json'});
  }

  public getAll(): Observable<Behaviour[]> {
    return this.http.get<Behaviour[]>(this.behaviourURL + 'all', {responseType: 'json'});
  }

  public save(behaviour: Behaviour) {
    return this.http.post<Behaviour>(this.behaviourURL + 'add', behaviour);
  }

  public delete(behaviour: Behaviour) {
    const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: behaviour};
    return this.http.delete(this.behaviourURL + 'delete', httpOptions);
  }
}
