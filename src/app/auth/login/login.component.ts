import { Component, OnInit } from '@angular/core';

import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {BocoSnackbarComponent} from "../../shared/boco-snackbar/boco-snackbar.component";
import {MatSnackBar} from '@angular/material';
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

        <mat-card-actions>
          <mat-form-field>
            <input matInput placeholder="Email" [(ngModel)]="email" type="text">
          </mat-form-field>


          <mat-form-field>
            <input matInput placeholder="Password" [(ngModel)]="password" type="password">
          </mat-form-field>

          <button mat-button (click)="login()">login</button>
        </mat-card-actions>

        <img mat-card-image src="assets/images/boco-logo.png"/>
      </mat-card>
    </div>
  `
})
export class LoginComponent implements OnInit{
  email: string = '';
  password: string = '';
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
    let snackBarRef = this.bocoSnackbar.openFromComponent(BocoSnackbarComponent, {
      duration: 3500
    });
    let errorMessage;
    //sometimes the error message is a string or an object with a message prop.
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

