import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { GraphcreatorComponent } from "./components/map/graphcreator/graphcreator.component";
import { PolygonsComponent } from "./components/map/polygons/polygons.component";
import { MapUploadComponent } from "./components/map/map-upload/map-upload.component";
import { BarrierGeneratorComponent } from "./components/map/barrier-generator/barrier-generator.component";
import { StandCreatorComponent } from "./components/map/stand-creator/stand-creator.component";
import { KioskPanelComponent } from "./components/map/kiosk-panel/kiosk-panel.component";
import { AdminPanelComponent } from "./components/adminpanel/admin-panel.component";
import { LoginComponent } from "./components/login/login.component";
import { MovementPathComponent } from "./components/map/movement-path/movement-path.component";
import { CorridorsComponent } from "./components/map/corridors/corridors.component";
import { TaskpanelComponent } from "./components/taskpanel/taskpanel.component";
import { AuthGuard } from "./services/auth.guard";
import { AccessForbiddenComponent } from "./components/access-forbidden/access-forbidden.component";
import { UserspanelComponent } from "./components/userspanel/userspanel.component";
import { TaskpanelListComponent } from "./components/taskpanel/taskpanel-list/taskpanel-list.component";
import { RobotListComponent } from "./components/robot-list/robot-list.component";
import { HealthzComponent } from "./components/healthz/healthz.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { TaskCreatorPanelComponent } from "./components/task-creator-panel/task-creator-panel.component";
import { TaskCreatorComponent } from "./components/task-creator-panel/task-creator/task-creator.component";
import { TaskDetailsComponent } from "./components/task-creator-panel/task-details/task-details.component";
import { RobotPanelComponentNew } from "./components/robotpanel-new/robot-panel.component";
import { MapMetadataComponent } from "./components/map-metadata/map-metadata.component"

import { TaskTemplateCreatorPanelComponent } from "./components/task-template-creator-panel/task-template-creator-panel.component";
import { TaskTemplateListComponent } from "./components/task-template-creator-panel/task-template-list/task-template-list.component";
import { TaskTemplateCreatorComponent } from "./components/task-template-creator-panel/task-template-creator/task-template-creator.component";
import { TaskTemplateDetailsComponent } from "./components/task-template-creator-panel/task-template-details/task-template-details.component";


const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: {
      rolesIDs: [
        "ROLE_ADMIN",
        "ROLE_REGULAR_USER",
        "ROLE_SUPER_USER",
        "ROLE_SERVICEMAN",
      ],
    },
  },
  { path: "", component: HomeComponent },
  { path: "taskpanel-details/:id", component: TaskpanelListComponent },
  { path: "robotpanel/:id", component: RobotPanelComponentNew },
  { path: "graphcreator", component: GraphcreatorComponent },
  { path: "polygons", component: PolygonsComponent },
  { path: "mapupload", component: MapUploadComponent },
  { path: "stands", component: StandCreatorComponent },
  { path: "kiosks", component: KioskPanelComponent },
  { path: "barriers", component: BarrierGeneratorComponent },
  {
    path: "adminpanel",
    component: AdminPanelComponent,
    canActivate: [AuthGuard],
    data: { rolesIDs: ["ROLE_ADMIN"] },
  },
  {
    path: "users",
    component: UserspanelComponent,
    canActivate: [AuthGuard],
    data: { rolesIDs: ["ROLE_ADMIN"] },
  },
  {
    path: "robots",
    component: RobotListComponent,
    canActivate: [AuthGuard],
    data: { rolesIDs: ["ROLE_ADMIN", "ROLE_SERVICEMAN"] },
  },
  { path: "login", component: LoginComponent },
  { path: "movementPaths", component: MovementPathComponent },
  { path: "corridors", component: CorridorsComponent },
  { path: "taskpanel", component: TaskpanelComponent },
  { path: "task-creator-panel", component: TaskCreatorPanelComponent },
  { path: "task-creator-panel/add", component: TaskCreatorComponent },
  { path: "task-creator-panel/edit/:id", component: TaskCreatorComponent },
  { path: "task-creator-panel/details/:id", component: TaskDetailsComponent },
  { path: "task-template-creator-panel", component: TaskTemplateCreatorPanelComponent },
  { path: "task-template-creator-panel/add", component: TaskTemplateCreatorComponent },
  { path: "task-template-creator-panel/edit/:id", component: TaskTemplateCreatorComponent },
  { path: "task-template-creator-panel/details/:id", component: TaskTemplateDetailsComponent },
  // { path: "task-kiosk-mapping-panel", component: TaskKioskMappingPanelComponent },
  // { path: "task-kiosk-mapping-panel/edit/:id", component: TaskKioskMappingCreatorComponent },
  { path: "access-denied", component: AccessForbiddenComponent },
  { path: "healthz", component: HealthzComponent },
  { path: "settings", component: SettingsComponent },
  { path: "map-metadata", component: MapMetadataComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
