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
    return this.http.get<ReviewType>(this.reviewTypeURL + id, {responseType: 'json'})
  }

  public getAll(): Observable<ReviewType[]> {
    return this.http.get<ReviewType[]>(this.reviewTypeURL + "all", {responseType: 'json'})
  }

  public save(reviewType: ReviewType) {
    return this.http.post<ReviewType>(this.reviewTypeURL + 'add', reviewType);
  }

  public delete(reviewType: ReviewType) {
    const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: reviewType};
    return this.http.delete(this.reviewTypeURL + 'delete', httpOptions);
  }
}
