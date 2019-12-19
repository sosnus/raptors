import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Robot } from '../model/Robot';

@Injectable({
  providedIn: 'root'
})

export class RobotService {

  private readonly robotIP: string;

  constructor() {
  }

}
