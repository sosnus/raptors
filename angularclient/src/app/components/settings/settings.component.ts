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
  modalID1 = 'settingsTypeModal1';
  modalID2 = 'settingsTypeModal2';

  contactInfo: ContactInfo[] = [new ContactInfo(), new ContactInfo()];
  instanceInfo: InstanceInfo = new InstanceInfo('', '', '');
  currentMap: CurrentMap = new CurrentMap('', 0, 0, 0, 0);

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

  updateInstanceInfo() {
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

  updateContactInfo() {
    this.settingsService.updateContactInfo(this.contactInfo).subscribe(
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

  editInstanceInfo(instanceInfo: InstanceInfo) {
    Object.assign(this.instanceInfo, instanceInfo);
  }

  editContactInfo(contactInfoArray: ContactInfo[]) {
    console.log(contactInfoArray);
    Object.assign(this.contactInfo, contactInfoArray);
  }

}
