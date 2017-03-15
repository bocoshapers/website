import { Injectable } from '@angular/core';
import {AngularFire} from "angularfire2";
import {Shaper} from "./team/team.data";
import {AuthService} from "./auth.service";

@Injectable()
export class UserService {
  constructor(private af: AngularFire, private auth: AuthService) {

  }

  getShaper(uuid: string) {
    return this.af.database.object(`/shapers/${uuid}`);
  }

  updateShaper(uuid: string, shaper: Shaper) {
    return this.af.database.object(`/shapers/${uuid}`).update(shaper);
  }
}
