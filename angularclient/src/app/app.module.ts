import {AppRoutingModule} from './app-routing.module';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HomeComponent} from './components/home/home.component';
import {MapComponent} from './components/map/map.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {MapService} from './services/map.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {RobotService} from './services/robot.service';
import {GraphcreatorComponent} from './components/map/graphcreator/graphcreator.component';
import {GraphService} from './services/graph.service';
import {MapUploadComponent} from './components/map/map-upload/map-upload.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {InputFileConfig, InputFileModule} from 'ngx-input-file';
import {StoreService} from "./services/store.service";
import {PolygonsComponent} from './components/map/polygons/polygons.component';
import {VertexListComponent} from './components/map/graphcreator/vertex-list/vertex-list.component';
import {StandCreatorComponent} from './components/map/stand-creator/stand-creator.component';
import {StandService} from "./services/stand.service";
import {AdminPanelComponent} from './components/adminpanel/admin-panel.component';
import {AreaTypesComponent} from './components/adminpanel/data/area-types/area-types.component';
import {CollapsetemplateComponent} from './components/adminpanel/shared/collapse-template/collapsetemplate.component';
import {AreaTypeService} from "./services/type/area-type.service";
import {FormModalTemplateComponent} from './components/adminpanel/shared/form-modal-template/form-modal-template.component';
import {ToastrModule} from "ngx-toastr";
import {ConfirmModalTemplateComponent} from './components/adminpanel/shared/confirm-modal-template/confirm-modal-template.component';
import {BatteryTypesComponent} from './components/adminpanel/data/battery-types/battery-types.component';
import {BatteryTypeService} from "./services/type/battery-type.service";
import {PropulsionTypesComponent} from './components/adminpanel/data/propulsion-types/propulsion-types.component';
import {PropulsionTypeService} from "./services/type/propulsion-type.service";
import {ParkingTypesComponent} from "./components/adminpanel/data/parking-types/parking-types.component";
import {ParkingTypeService} from "./services/type/parking-type.service";
import { TaskPrioritiesComponent } from './components/adminpanel/data/task-priorities/task-priorities.component';
import {TaskPriority} from "./model/type/TaskPriority";
import {TaskPriorityService} from "./services/type/task-priority.service";

const config: InputFileConfig = {};

// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    GraphcreatorComponent,
    HomeComponent,
    MapComponent,
    MapUploadComponent,
    SidebarComponent,
    GraphcreatorComponent,
    PolygonsComponent,
    VertexListComponent,
    StandCreatorComponent,
    AdminPanelComponent,
    AreaTypesComponent,
    CollapsetemplateComponent,
    FormModalTemplateComponent,
    ConfirmModalTemplateComponent,
    BatteryTypesComponent,
    PropulsionTypesComponent,
    ParkingTypesComponent,
    TaskPrioritiesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    InputFileModule.forRoot(config),
    ToastrModule.forRoot(),
    FormsModule,
  ],
  providers: [MapService,HttpClient, RobotService, GraphService, StoreService,
    StandService, AreaTypeService, BatteryTypeService, PropulsionTypeService,
    ParkingTypeService, TaskPriorityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
