import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class UserGuardService implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {

  }

  canActivate() {
    return this.auth.getAuth.map((auth) => {
      if (auth != null) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false
      }
    }).first()
  }
}
