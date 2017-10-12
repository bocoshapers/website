import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthService {
  constructor(private afAuth: AngularFireAuth) { }

  get getAuth() {
    return this.afAuth.authState;
  }

  login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.afAuth.auth.signOut();
  }
}
