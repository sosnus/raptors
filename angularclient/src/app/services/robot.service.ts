import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Robot } from '../model/Robot';

@Injectable({
  providedIn: 'root'
})

export class RobotService {

  private readonly robotIP: string;

  constructor(private http: HttpClient) {
    this.robotIP = 'http://localhost:8080/robots/models/ip/';
  }

  public getRobot(id: string): Observable<any> {
    return this.http.get(this.robotIP + id,{responseType: 'text'})
  }
}
