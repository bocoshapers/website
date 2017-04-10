import {NgModule} from '@angular/core';
import {ShaperComponent} from "./shaper/shaper.component";
import {CommonModule} from "@angular/common";
import {MaterialModule} from "@angular/material";
import {ModalComponent} from "./modal/modal.component";
import {FlexLayoutModule} from "@angular/flex-layout";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  exports: [
    ShaperComponent,
    ModalComponent,
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  declarations: [
    ShaperComponent,
    ModalComponent
  ]
})
export class SharedModule {}
