import {NgModule} from '@angular/core';
import {ShaperComponent} from "./shaper/shaper.component";
import {CommonModule} from "@angular/common";
import {ModalComponent} from "./modal/modal.component";
import {FlexLayoutModule} from "@angular/flex-layout";
import {
  MdButtonModule,
  MdCardModule, MdChipsModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdSlideToggleModule,
  MdSnackBarModule,
  MdToolbarModule,
  MdTooltipModule,
  OverlayContainer
} from '@angular/material';
import { BocoSnackbarComponent } from './boco-snackbar/boco-snackbar.component';

let materialModules = [
  MdButtonModule,
  MdCardModule,
  MdInputModule,
  MdSnackBarModule,
  MdToolbarModule,
  MdTooltipModule,
  MdSlideToggleModule,
  MdIconModule,
  MdListModule,
  MdChipsModule
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
    ModalComponent,
    BocoSnackbarComponent
  ],
  entryComponents: [
    BocoSnackbarComponent
  ]
})
export class SharedModule {
  constructor(overlayContainer: OverlayContainer) {
    overlayContainer.themeClass = 'md-boco-theme';
  }
}
