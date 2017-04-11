import { Injectable } from '@angular/core';
import {AngularFire} from "angularfire2";
import {AuthService} from "./auth.service";
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';
import {Observable} from "rxjs";
import {UploadService} from "./upload.service";

@Injectable()
export class UserService {
  constructor(
    private af: AngularFire,
    private uploadService: UploadService,
    private auth: AuthService) { }

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


  uploadProfileImage(key: string, imageFile) {
    return this.uploadService.uploadImage(key, imageFile);
  }
}
