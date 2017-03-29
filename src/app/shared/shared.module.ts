import {NgModule} from '@angular/core';
import {ShaperComponent} from "./shaper/shaper.component";
import {CommonModule} from "@angular/common";
import {MaterialModule} from "@angular/material";
import {ModalComponent} from "./modal/modal.component";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    ShaperComponent,
    ModalComponent,
    CommonModule,
    MaterialModule
  ],
  declarations: [
    ShaperComponent,
    ModalComponent
  ]
})
export class SharedModule {}
