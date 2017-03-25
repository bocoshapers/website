import {NgModule} from '@angular/core';
import {SharedRoutes} from "./shared.routes";
import {ShaperComponent} from "./shaper/shaper.component";
import {CommonModule} from "@angular/common";
import {MaterialModule} from "@angular/material";

@NgModule({
  imports: [
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
    ShaperComponent
  ]
})
export class SharedModule {}
