import { NgModule } from '@angular/core';
import { ShaperComponent } from './shaper/shaper.component';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatDatepickerModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatNativeDateModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';

import { BocoSnackbarComponent } from './boco-snackbar/boco-snackbar.component';
import { OverlayContainer } from '@angular/cdk/overlay';

const materialModules = [
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatTooltipModule,
  MatSlideToggleModule,
  MatIconModule,
  MatListModule,
  MatChipsModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSidenavModule
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
    overlayContainer.getContainerElement().classList.add('md-boco-theme');
  }
}
