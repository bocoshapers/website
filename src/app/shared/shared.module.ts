import {NgModule} from '@angular/core';
import {ShaperComponent} from "./shaper/shaper.component";
import {CommonModule} from "@angular/common";
import {ModalComponent} from "./modal/modal.component";
import {FlexLayoutModule} from "@angular/flex-layout";
import {
  MdButtonModule,
  MdCardModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdSlideToggleModule,
  MdSnackBarModule,
  MdToolbarModule,
  MdTooltipModule,
  OverlayContainer
} from "@angular/material";

let materialModules = [
  MdButtonModule,
  MdCardModule,
  MdInputModule,
  MdSnackBarModule,
  MdToolbarModule,
  MdTooltipModule,
  MdSlideToggleModule,
  MdIconModule,
  MdListModule
];

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    ...materialModules
  ],
  exports: [
    ShaperComponent,
    ModalComponent,
    CommonModule,
    FlexLayoutModule,
    ...materialModules
  ],
  declarations: [
    ShaperComponent,
    ModalComponent
  ]
})
export class SharedModule {
  constructor(overlayContainer: OverlayContainer) {
    overlayContainer.themeClass = 'md-boco-theme';
  }
}
