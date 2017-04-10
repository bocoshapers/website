import { Injectable } from '@angular/core';
import {AngularFire, FirebaseListObservable} from "angularfire2";

export interface Shaper {
  first: string
  last: string
  imageFile: string
  bio: string
}

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
