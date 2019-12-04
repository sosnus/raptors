import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

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

  rotateIcon(elementID: string): void {
    document.getElementById(elementID).classList.toggle('down');
  }
}
