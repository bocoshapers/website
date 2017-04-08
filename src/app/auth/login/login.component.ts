import { Component, OnInit } from '@angular/core';

import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {MdSnackBar} from "@angular/material";

@Component({
  selector: 'boco-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
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
    let snackBarRef = this.bocoSnackbar.openFromComponent(BocoSnackbar, {
      duration: 3500
    });
    //sometimes the error message is a string or an object with a message prop.
    snackBarRef.instance.message = e.message || e;
  }

  private _goToUser(id) {
    this.router.navigate(['/users', id]);
  }
}


@Component({
  selector: 'boco-snackbar',
  template: `
    <div class="snackbar__wrapper">
      {{message}} ☹️
    </div>`,
  styles: [`
    .snackbar__wrapper {
      color: white;
    }
  `]
})
export class BocoSnackbar {
  public message: string = '';
}
