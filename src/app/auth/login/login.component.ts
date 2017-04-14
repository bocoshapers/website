import { Component, OnInit } from '@angular/core';

import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {MdSnackBar} from "@angular/material";
import {BocoSnackbarComponent} from "../../shared/boco-snackbar/boco-snackbar.component";

@Component({
  selector: 'boco-login',
  styles: [`
    .shaper__login {
      margin: 0.5em;
      padding: 0.5em;
      text-align: center;
    }

    .shaper__login md-card {
      margin: 0 auto;
      max-width: 350px;
    }
  `],
  template: `
    <div class="shaper__login">
      <h1>Login</h1>

      <md-card>

        <md-card-actions>
          <md-input-container>
            <input mdInput placeholder="Email" [(ngModel)]="email" type="text">
          </md-input-container>


          <md-input-container>
            <input mdInput placeholder="Password" [(ngModel)]="password" type="password">
          </md-input-container>

          <button md-button (click)="login()">login</button>
        </md-card-actions>

        <img md-card-image src="assets/images/boco-logo.png"/>
      </md-card>
    </div>
  `
})
export class LoginComponent implements OnInit{
  email: string = '';
  password: string = '';
  constructor(
    public bocoSnackbar: MdSnackBar,
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

