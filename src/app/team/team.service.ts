import { Injectable } from '@angular/core';
import { Shaper } from './team.data';
import {AngularFire, FirebaseListObservable} from "angularfire2";

@Injectable()
export class TeamService {
  private $shapers: FirebaseListObservable<Shaper[]>;

  constructor(af: AngularFire) {
    this.$shapers = af.database.list('/shapers');
  }

  get shapers() {
    return this.$shapers;
  }

}
