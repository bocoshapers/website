import { Injectable } from '@angular/core';
import {AngularFire} from "angularfire2";

@Injectable()
export class AuthService {

  constructor(private af: AngularFire) { }

  getAuth() {
    return this.af.auth;
  }

  login(email: string, password: string) {
    return this.af.auth.login({
      email,
      password
    })
  }

  logout() {
    return this.af.auth.logout();
  }
}
