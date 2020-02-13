import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-collapsetemplate',
  templateUrl: './collapsetemplate.component.html',
  styleUrls: ['./collapsetemplate.component.css']
})
export class CollapsetemplateComponent implements OnInit {

  @Input() name: string;
  @Input() templateID: string;
  @Input() multipleExpand: boolean = false;


  constructor() {
  }

  ngOnInit() {
  }

}
