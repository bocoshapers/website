import { Injectable } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';


export interface Shaper {
  first: string
  last: string
  imageFile: string
  bio: string
}

@Injectable()
export class TeamService {
  private $shapers: FirebaseListObservable<Shaper[]>;

  constructor(db: AngularFireDatabase) {
    this.$shapers = db.list('/shapers');
  }

  get shapers() {
    return this.$shapers;
  }

}
