import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  robots: Object[] = [
    {
      id: '0',
      robotIP: '10.21.129.22',
      available: true
    },
    {
      id: '1',
      robotIP: '10.21.129.23',
      available: true
    },
    {
      id: '2',
      robotIP: '10.21.128.10',
      available: true
    }
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
