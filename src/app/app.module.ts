import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TeamComponent } from './team/team.component';
import {TeamService} from "./team/team.service";
import { ShaperComponent } from './shaper/shaper.component';

@NgModule({
  declarations: [
    AppComponent,
    TeamComponent,
    ShaperComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    TeamService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
