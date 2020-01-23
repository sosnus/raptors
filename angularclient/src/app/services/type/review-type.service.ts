import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ReviewType} from "../../model/type/ReviewType";

@Injectable({
  providedIn: 'root'
})
export class ReviewTypeService {

  private readonly reviewTypeURL: string;

  constructor(private http: HttpClient) {
    this.reviewTypeURL = 'http://localhost:8080/type/review-types/';
  }

  public getByID(id: string): Observable<ReviewType> {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.get<ReviewType>(this.reviewTypeURL + id, {headers: headers, responseType: 'json'})
  }

  public getAll(): Observable<ReviewType[]> {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.get<ReviewType[]>(this.reviewTypeURL + "all", {headers: headers, responseType: 'json'})
  }

  public save(reviewType: ReviewType) {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.post<ReviewType>(this.reviewTypeURL + 'add', reviewType, {headers: headers});
  }

  public delete(reviewType: ReviewType) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + sessionStorage.getItem('token')
      }), body: reviewType
    };
    return this.http.delete(this.reviewTypeURL + 'delete', httpOptions);
  }
}
