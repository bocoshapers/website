import { Injectable } from '@angular/core';
import {AngularFire, FirebaseListObservable} from "angularfire2";
import {UpdateEvent} from "./event-editor/event-editor.component";
import {UploadService} from "../services/upload.service";
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

export interface SEvent {
  $key?: string
  photo: string
  slug: string
  name: string
  description: string
  datetime: Date
  location: string
  published: boolean
  smLinks: SocialMediaLink
}
export interface TempEvent {
  $key?: string
  photo?: string
  slug?: string
  name?: string
  description?: string
  datetime?: Date
  location?: string
  published?: boolean
  smLinks?: SocialMediaLink
}

export interface SocialMediaLink {
  facebook: string
  twitter: string
  eventBrite: string
}

@Injectable()
export class EventsService {
  private $events: FirebaseListObservable<SEvent[]>;
  constructor(private af: AngularFire, private uploadService: UploadService) {
    this.$events = af.database.list('/events');
  }

  get events() {
    return this.$events;
  }

  getEvent($key) {
    return this.$events
      .map((events) => events.filter(e => e.$key === $key));
  }

  getEventBySlug(slug: string) {
    return this.af.database.list('/events', {
      query: {
        orderByChild: 'slug',
        equalTo: slug,
        limitToFirst: 1
      }
    });
  }

  publishedEvents() {
    return this.af.database.list('/events', {
      query: {
        orderByChild: 'published',
        equalTo: true
      }
    });
  }

  addEvent(event: TempEvent) {
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
