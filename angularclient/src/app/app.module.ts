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
import {TaskPrioritiesComponent} from './components/adminpanel/data/task-priorities/task-priorities.component';
import {TaskPriorityService} from "./services/type/task-priority.service";
import {CorridorsComponent} from './components/map/corridors/corridors.component';
import {StandTypesComponent} from './components/adminpanel/data/stand-types/stand-types.component';
import {StandTypeService} from "./services/type/stand-type.service";
import {StandStatusesComponent} from './components/adminpanel/data/stand-statuses/stand-statuses.component';
import {StandStatusService} from "./services/type/stand-status.service";
import {ReviewTypesComponent} from './components/adminpanel/data/review-types/review-types.component';
import {ReviewTypeService} from "./services/type/review-type.service";
import {BehaviourComponent} from './components/adminpanel/data/behaviour/behaviour.component';
import {RobotStatusesComponent} from './components/adminpanel/data/robot-statuses/robot-statuses.component';
import {RobotModelsComponent} from './components/adminpanel/data/robot-models/robot-models.component';
import {MatSelectModule} from "@angular/material/select";
import {LoginComponent} from './components/login/login.component';
import {MovementPathComponent} from "./components/map/movement-path/movement-path.component";
import { TaskpanelComponent } from './components/taskpanel/taskpanel.component';
import {GraphListComponent} from "./components/map/graphcreator/graph-list/graph-list.component";
import { PolygonListComponent } from './components/map/polygons/polygon-list/polygon-list.component';
import {StandListComponent} from "./components/map/stand-creator/stand-list/stand-list.component";
import {CorridorListComponent} from "./components/map/corridors/corridor-list/corridor-list.component";
import {MovementPathListComponent} from "./components/map/movement-path/movement-path-list/movement-path-list.component";
import { AccessForbiddenComponent } from './components/access-forbidden/access-forbidden.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { RobotPanelComponent } from './components/robotpanel/robot-panel.component';
import { RobotDetailsComponent } from './components/robotpanel/robot-details/robot-details.component';
import {MapScaledComponent} from "./components/robotpanel/map-scaled/map-scaled.component";
import { ExtraRobotElementComponent } from './components/adminpanel/data/extra-robot-element/extra-robot-element.component';
import { ElementFunctionalityComponent } from './components/adminpanel/data/element-functionality/element-functionality.component';
import { TaskpanelDetailsComponent } from './components/taskpanel/taskpanel-details/taskpanel-details.component';
import { TaskpanelListComponent } from './components/taskpanel/taskpanel-list/taskpanel-list.component';
import { UserspanelComponent } from './components/userspanel/userspanel.component';
import { RobotModelComponent } from './components/robotpanel/robot-model/robot-model.component';
import { LogsTableComponent } from './components/robotpanel/logs-table/logs-table.component';
import { RobotListComponent } from './components/robot-list/robot-list.component';
import { RobotsTableComponent } from './components/robot-list/robots-table/robots-table.component';
import { RobotsToApproveTableComponent } from './components/robot-list/robots-toapprove-table/robots-toapprove-table.component';
import {RobotaApprovalService} from "./services/robotapproval.service";
import { SpinnerComponent } from './components/adminpanel/shared/spinner/spinner.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import { TaskCreatorPanelComponent } from './components/task-creator-panel/task-creator-panel.component';
import { DragDropModule } from "@angular/cdk/drag-drop";
import { TaskListComponent } from './components/task-creator-panel/task-list/task-list.component';
import { TaskCreatorComponent } from './components/task-creator-panel/task-creator/task-creator.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialogModule} from '@angular/material/dialog';
import { TaskDetailsComponent } from './components/task-creator-panel/task-details/task-details.component';
import { SpecialTypeSelectComponent } from './components/task-creator-panel/special-type-select/special-type-select.component';


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
    CorridorsComponent,
    StandTypesComponent,
    StandStatusesComponent,
    ReviewTypesComponent,
    BehaviourComponent,
    RobotStatusesComponent,
    RobotModelsComponent,
    LoginComponent,
    MovementPathComponent,
    TaskpanelComponent,
    GraphListComponent,
    PolygonListComponent,
    StandListComponent,
    CorridorListComponent,
    MovementPathListComponent,
    AccessForbiddenComponent,
    RobotPanelComponent,
    RobotDetailsComponent,
    MapScaledComponent,
    ExtraRobotElementComponent,
    ElementFunctionalityComponent,
    UserspanelComponent,
    TaskpanelDetailsComponent,
    TaskpanelListComponent,
    RobotModelComponent,
    LogsTableComponent,
    RobotListComponent,
    RobotsTableComponent,
    RobotsToApproveTableComponent,
    SpinnerComponent,
    TaskCreatorPanelComponent,
    TaskListComponent,
    TaskCreatorComponent,
    TaskDetailsComponent,
    SpecialTypeSelectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    InputFileModule.forRoot(config),
    ToastrModule.forRoot(),
    FormsModule,
    MatSelectModule,
    MatSlideToggleModule,
    ColorPickerModule,
    DragDropModule,
    MatExpansionModule,
    MatDialogModule
  ],
  providers: [MapService,HttpClient, RobotService, GraphService, StoreService,
    StandService, AreaTypeService, BatteryTypeService, PropulsionTypeService,
    ParkingTypeService, TaskPriorityService, StandTypeService, StandStatusService,
    ReviewTypeService, RobotaApprovalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
