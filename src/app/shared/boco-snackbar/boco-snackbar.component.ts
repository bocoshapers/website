import { Component } from '@angular/core';

@Component({
  selector: 'boco-snackbar',
  template: `
    <div class="snackbar__wrapper">
      {{message}}
    </div>`,
  styles: [`
    .snackbar__wrapper {
      color: white;
      text-align: center;
    }
  `]
})
export class BocoSnackbarComponent {
  public message: string = '';
}
