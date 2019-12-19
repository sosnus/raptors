import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GraphcreatorComponent } from './components/map/graphcreator/graphcreator.component';
import { MapUploadComponent } from './components/map/map-upload/map-upload.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'graphcreator', component: GraphcreatorComponent},
  {path: 'mapupload', component: MapUploadComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
