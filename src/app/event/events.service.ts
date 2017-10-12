import { Injectable } from '@angular/core';
import {UpdateEvent} from "./event-editor/event-editor.component";
import {UploadService} from "../services/upload.service";
import 'rxjs/add/operator/map';
import filter from 'ramda/src/filter'
import head from 'ramda/src/head';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

export interface SEvent {
  $key?: string
  photo: string
  slug: string
  name: string
  description: string
  date: string;
  when?: { date: Date, from: Date, to: Date }
  location: string
  published: boolean
  smLinks: SocialMediaLink
}

export interface ITempEvent {
  $key?: string
  photo?: string
  slug?: string
  name?: string
  description?: string
  when?: { date: Date, from: Date, to: Date }
  location?: string
  published?: boolean
  smLinks?: SocialMediaLink
}

export interface SocialMediaLink {
  facebook: string
  twitter: string
  Eventbrite: string
}

@Injectable()
export class EventsService {
  private $events: FirebaseListObservable<SEvent[]>;
  constructor(private db: AngularFireDatabase, private uploadService: UploadService) {
    this.$events = db.list('/events');
  }

  get events() {
    return this.$events;
  }

  getEvent($key) {
    return this.$events
      .map((events) => head(filter(e => e.$key === $key, events)));
  }

  getEventBySlug(slug: string) {
    return this.$events
      .map(events => head(filter(e => e.slug = slug, events)));
  }


  publishedEvents() {
    return this.$events
      .map(events => filter(e => e.published === true, events));
  }

  addEvent(event: ITempEvent | null) {
    if (event !== null) {
     return this.$events.push(event);
    }
  }

  updateEvent(update: UpdateEvent) {
    if (update !== null) {
      return this.events.update(update.$key, update.event);
    }
  }

  uploadEventPhoto(key, photoFile) {
    return this.uploadService.uploadImage(key, photoFile);
  }

  deleteEvent(key: string) {
    this.$events.remove(key);
  }

}
