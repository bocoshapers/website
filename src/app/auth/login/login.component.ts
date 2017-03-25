import { Component, OnInit } from '@angular/core';

import {Router} from "@angular/router";
import {AuthService} from "../auth.service";

@Component({
  selector: 'boco-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit{
  email: string = '';
  password: string = '';
  constructor(
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
      });
  }

  private _goToUser(id) {
    this.router.navigate(['/users', id]);
  }
}
