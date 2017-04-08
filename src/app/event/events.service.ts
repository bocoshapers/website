import { Injectable } from '@angular/core';
import {AngularFire, FirebaseListObservable} from "angularfire2";


export interface SEvent {
  $key?: string
  photo: string
  slug: string
  name: string
  description: string
  date: string
  published: boolean
}
export interface TempEvent {
  $key?: string
  photo?: string
  slug?: string
  name: string
  description?: string
  date?: string
  published?: boolean
}

@Injectable()
export class EventsService {
  private $events: FirebaseListObservable<SEvent[]>;
  constructor(private af: AngularFire) {
    this.$events = af.database.list('/events');
  }

  get events() {
    return this.$events;
  }

  addEvent(event: SEvent) {
    if (event !== null) {
      this.$events.push(event);
    }
  }

  updateEvent(event: SEvent) {
    this.$events.update(event.$key, event);
  }

  deleteEvent(key: string) {
    this.$events.remove(key);
  }

}
