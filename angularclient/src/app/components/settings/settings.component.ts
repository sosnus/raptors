import {Component, OnInit} from '@angular/core';
import {ContactInfo} from '../../model/Settings/ContactInfo';
import {InstanceInfo} from '../../model/Settings/InstanceInfo';
import {CurrentMap} from '../../model/Settings/CurrentMap';
import {SettingsService} from '../../services/settings.service';
import {ContactInfos} from '../../model/Settings/ContactInfos';
import {AuthService} from '../../services/auth.service';
import {RobotTask} from '../../model/Robots/RobotTask';
import {User} from '../../model/User/User';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  modalID = 'settingsTypeModal';

  contactInfo: ContactInfo[];
  instanceInfo: InstanceInfo;
  currentMap: CurrentMap;

  constructor(private settingsService: SettingsService,
              public authService: AuthService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.settingsService.getInstanceInfo().subscribe(data =>
        this.instanceInfo = data,
      error => {
        console.log(error);
      }
    );
    this.settingsService.getContactInfo().subscribe(data =>
        this.contactInfo = data,
      error => {
        console.log(error);
      }
    );
    this.settingsService.getCurrentMap().subscribe(data =>
        this.currentMap = data,
      error => {
        console.log(error);
      }
    );
  }

  update() {
    console.log('update');
    this.settingsService.updateInstanceInfo(this.instanceInfo).subscribe(
      result => {
        this.toastr.success('Edytowano pomyślnie');
      },
      error => {
        console.log(error);
        this.toastr.error('Wystąpił bład podczas dodawania lub edycji');
      }
    );
  }

  reset() {
    console.log('reset');
  }

  edit(instanceInfo: InstanceInfo) {
    Object.assign(this.instanceInfo, instanceInfo);
  }

}
