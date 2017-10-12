import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';
import {Observable} from "rxjs";
import {UploadService} from "./upload.service";
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class UserService {
  constructor(
    private db: AngularFireDatabase,
    private uploadService: UploadService,
    private auth: AuthService) { }

  getCurrentUser() {
    return this.auth.getAuth
      .filter(auth => auth != null)
      .switchMap((auth) => this.getShaper(auth.uid));
  }

  getShaper(uuid: string) {
    return this.db.object(`/shapers/${uuid}`);
  }

  updateShaper(shaper) {
    return this.auth.getAuth
      .switchMap((auth) => this._updateShaper(auth.uid, shaper))
      .catch((err: any) => Observable.of(err));
  }

  private _updateShaper(uid, shaper) {
    return this.db.object(`/shapers/${uid}`).update(shaper);
  }


  uploadProfileImage(key: string, imageFile) {
    return this.uploadService.uploadImage(key, imageFile);
  }
}
