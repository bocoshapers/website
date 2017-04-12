import { Component, OnInit } from '@angular/core';
import {EventsService, SEvent, TempEvent} from "../events.service";
import {FirebaseListObservable} from "angularfire2";
import 'rxjs/add/operator/map';
import {UpdateEvent} from "../event-editor/event-editor.component";

@Component({
  selector: 'boco-admin-events',
  styles: [`    
    .addEvent__button {
      position: fixed;
      bottom: 3em;
      right: 3em;
    }
  `],
  template: `
    <md-toolbar color="primary">
      <h3>Events Admin</h3>
    </md-toolbar>
    <div>
      
      <div class="addEvent__button">
        <button
          md-fab
          (click)="addTempEvent()"
          md-tooltip="Add Event!"
          [mdTooltipPosition]="'above'">
          <md-icon>note_add</md-icon>
        </button> 
      </div>
      
      <boco-modal [trigger]="newEvent != null">
        <boco-event-editor
          (save)="onEventSave($event)"
          (cancel)="onEventCancel()"
          [event]="newEvent">
        </boco-event-editor>

        <button md-button (click)="newEvent = null">cancel</button>
      </boco-modal>

      <md-list>
        <h3 md-subheader><a [routerLink]="'/events'" md-button>Events page</a></h3>

        <md-list-item *ngFor="let event of $events | async" >
          <md-icon md-list-icon><a [routerLink]="['/events', event.slug]">link</a></md-icon>
          <h5 md-line>{{event.name}}</h5>
          <h3 md-line>{{event.datetime }}</h3>
          <a [routerLink]="['/events', event.$key, 'edit']" md-button><md-icon>mode_edit</md-icon></a>
          <button md-button color="warn" (click)="deleteEvent(event.$key)"><md-icon>delete_forever</md-icon></button>
        </md-list-item>
      </md-list>
    </div>
  `
})
export class AdminEventsComponent implements OnInit {
  public newEvent: TempEvent;
  public editEvent: SEvent;
  public $events: FirebaseListObservable<SEvent[]>;
  constructor(private eventsService: EventsService) {
  }

  ngOnInit() {
    this.$events = this.eventsService.events;
  }

  addTempEvent(): void {
    this.newEvent = {
      smLinks: {
        facebook: '',
        twitter: '',
        eventBrite: ''
      },
      published: false
    };
  }

  onEventCancel() {
    this.newEvent = null;
  }

  onEventSave(update: TempEvent): void {
    this._saveNewEvent(update);
  }

  deleteEvent($key) {
    this.eventsService.deleteEvent($key);
  }

  //TODO: add validation to ensure necessary data is present when attempting to save
  private _saveNewEvent(te: TempEvent) {
    this.eventsService.addEvent(te)
      .then(snapShot => snapShot.key)
      .then(key => this._uploadEventPhoto(key, te.photo, te))
      .then(event => this._updateEvent(event))
      .then(key => this.newEvent = null)
  }

  private _updateEvent(update: UpdateEvent) {
    this.eventsService.updateEvent(update)
      .then(se => {
        this.editEvent = null;
      })
      .catch(e => console.log('update error', e))
  }

  private _uploadEventPhoto(key, photoFile, event) {
    return this.eventsService.uploadEventPhoto(key, photoFile)
      .then(fileRef => {
        event.photo = fileRef.downloadURL;
        return { $key: key, event }
      })
      .catch(e => console.log('image upload error', e));
  }
}
