import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './components/home/home.component';
import { MapComponent } from './components/map/map.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MapService } from './services/map.service';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {RobotService} from "./services/robot.service";

// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MapComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [MapService,HttpClient, RobotService],
  bootstrap: [AppComponent]
})
export class AppModule { }
