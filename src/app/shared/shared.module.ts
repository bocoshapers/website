import {NgModule} from '@angular/core';
import {SharedRoutes} from "./shared.routes";
import {LoginComponent} from "./login/login.component";
import {FormsModule} from "@angular/forms";
import {ShaperComponent} from "./shaper/shaper.component";
import {CommonModule} from "@angular/common";
import {MaterialModule} from "@angular/material";

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    SharedRoutes,
    MaterialModule
  ],
  exports: [
    ShaperComponent,
    CommonModule,
    MaterialModule
  ],
  declarations: [
    LoginComponent,
    ShaperComponent
  ]
})
export class SharedModule {}
