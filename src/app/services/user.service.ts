import { Injectable } from '@angular/core';
import {AngularFire} from "angularfire2";
import * as firebase from 'firebase';
import {AuthService} from "./auth.service";
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';
import {Observable} from "rxjs";

@Injectable()
export class UserService {
  constructor(private af: AngularFire, private auth: AuthService) { }

  getCurrentUser() {
    return this.auth.getAuth
      .filter(auth => auth != null)
      .switchMap((auth) => this.getShaper(auth.uid));
  }

  getShaper(uuid: string) {
    return this.af.database.object(`/shapers/${uuid}`);
  }

  updateShaper(shaper) {
    return this.auth.getAuth
      .switchMap((auth) => this._updateShaper(auth.uid, shaper))
      .catch((err: any) => Observable.of(err));
  }

  private _updateShaper(uid, shaper) {
    return this.af.database.object(`/shapers/${uid}`).update(shaper);
  }


  uploadProfileImage(uuid: string, imageFile) {
    return firebase.storage().ref(`/assets/images/${uuid}/${imageFile.name}`).put(imageFile);
  }
}
