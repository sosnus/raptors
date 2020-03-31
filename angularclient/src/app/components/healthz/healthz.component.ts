import {Component, OnInit} from '@angular/core';
import {HealthzService} from '../../services/healthz.service';
import {JVMdata} from '../../model/JVMdata';

declare var require: any;

@Component({
  selector: 'app-healthz',
  templateUrl: './healthz.component.html',
  styleUrls: ['./healthz.component.css']
})
export class HealthzComponent implements OnInit {

  frontVersion: string = require('../../../../package.json').version;
  backVersion: string = '';
  database: boolean = false;
  jvmDate: JVMdata = new JVMdata();

  constructor(private healthzService: HealthzService) {
  }

  ngOnInit() {
    this.healthzService.isDatabaseWorking().subscribe(data =>
        this.database = data,
      error => {
        console.log(error);
      }
    );
    this.healthzService.getBackendVersion().subscribe(data => {
        this.backVersion = data;
      },
      error => {
        console.log(error);
      }
    );
    this.healthzService.getJVMData().subscribe(data => {
        this.jvmDate = data;
      },
      error => {
        console.log(error);
      });
  }

}
