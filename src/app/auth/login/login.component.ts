import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { BocoSnackbarComponent } from '../../shared/boco-snackbar/boco-snackbar.component';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'boco-login',
  styles: [`
    .shaper__login {
      margin: 0.5em;
      padding: 0.5em;
      text-align: center;
    }

    .shaper__login mat-card {
      margin: 0 auto;
      max-width: 350px;
    }
  `],
  template: `
    <div class="shaper__login">
      <h1>Login</h1>
      <mat-card>
        <form (ngSubmit)="login()" #loginForm="ngForm">
          <mat-card-content>
            <mat-form-field>
              <input
                required
                matInput
                name="email"
                placeholder="Email"
                [(ngModel)]="email" type="text">
            </mat-form-field>
            <mat-form-field>
              <input
                required
                matInput
                name="password"
                placeholder="Password"
                [(ngModel)]="password"
                [type]="hidePassword ? 'password' : 'text'">
              <mat-icon
                matSuffix
                (click)="hidePassword = !hidePassword">
                {{ hidePassword ? 'visibility' : 'visibility_off' }}
              </mat-icon>
            </mat-form-field>
          </mat-card-content>
          <mat-card-actions>
            <button
              mat-button
              type="submit"
              [disabled]="!loginForm.form.valid">Login</button>
          </mat-card-actions>
          <img mat-card-lg-image src="assets/images/boco-logo.png"/>
        </form>
      </mat-card>
    </div>
  `
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  hidePassword = true;
  constructor(
    public bocoSnackbar: MatSnackBar,
    private auth: AuthService,
    private router: Router) {
  }

  ngOnInit() {
    this.auth.getAuth
      .subscribe(auth => {
        if (auth != null) {
          this._goToUser(auth.uid);
        }
      });
  }

  login() {
    this.auth.login(this.email, this.password)
      .then((auth) => {
        this._goToUser(auth.uid);
      })
      .catch(this._handleLoginError.bind(this));
  }

  _handleLoginError(e) {
    const snackBarRef = this.bocoSnackbar.openFromComponent(BocoSnackbarComponent, {
      duration: 3500
    });
    let errorMessage;
    // sometimes the error message is a string or an object with a message prop.
    if (e.message) {
      errorMessage = e.message
    } else {
      errorMessage = e;
    }
    snackBarRef.instance.message = errorMessage + ' ☹️';
  }

  private _goToUser(id) {
    this.router.navigate(['/users', id]);
  }
}

