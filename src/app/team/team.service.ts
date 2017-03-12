import { Injectable } from '@angular/core';
import {Shapers, Shaper, shuffle} from './team.data';
@Injectable()
export class TeamService {
  private _shapers: Shaper[][] = [];
  constructor() {
    shuffle(Shapers);
    while (Shapers.length) {
      this._shapers.push([Shapers.pop(), Shapers.pop()])
    }
  }

  get shapers() {
    return this._shapers;
  }

}
