import { Component, OnInit } from '@angular/core';
import { EventsService, SEvent, ITempEvent } from '../events.service';
import 'rxjs/add/operator/map';
import { UpdateEvent } from '../event-editor/event-editor.component';
import { FirebaseListObservable } from 'angularfire2/database';

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
    <mat-toolbar color="primary">
      <h3>Events Admin</h3>
    </mat-toolbar>
    <div>

      <div class="addEvent__button">
        <button
          mat-fab
          (click)="addTempEvent()"
          matTooltip="Add Event!"
          [matTooltipPosition]="'above'">
          <mat-icon>note_add</mat-icon>
        </button>
      </div>

      <boco-modal [trigger]="newEvent != null">
        <boco-event-editor
          (save)="onEventSave($event)"
          (cancel)="onEventCancel()"
          [event]="newEvent">
        </boco-event-editor>

        <button mat-button (click)="newEvent = null">cancel</button>
      </boco-modal>

      <mat-list>
        <h3 matSubheader><a [routerLink]="'/projects'" mat-button>Events page</a></h3>

        <mat-list-item *ngFor="let event of $events | async">
          <mat-icon mat-list-icon><a [routerLink]="['/projects', event.slug]">link</a></mat-icon>
          <h5 matLine>{{ event.name }}</h5>
          <h3 matLine>{{ event.when.date | date:'yMd' }} {{ event.when.from | time }} to {{ event.when.to | time }}</h3>
          <a [routerLink]="['/projects', event.$key, 'edit']" mat-button>
            <mat-icon>mode_edit</mat-icon>
          </a>
          <button mat-button color="warn" (click)="deleteEvent(event.$key)">
            <mat-icon>delete_forever</mat-icon>
          </button>
        </mat-list-item>
      </mat-list>
    </div>
  `
})
export class AdminEventsComponent implements OnInit {
  public newEvent: ITempEvent | null;
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
        Eventbrite: ''
      },
      when: {
        date: new Date(),
        from: new Date,
        to: new Date()
      },
      published: false
    };
  }

  onEventCancel() {
    this.newEvent = null;
  }

  onEventSave(update: ITempEvent | null): void {
    this._saveNewEvent(update);
  }

  deleteEvent($key) {
    this.eventsService.deleteEvent($key);
  }

  //TODO: add validation to ensure necessary data is present when attempting to save
  private _saveNewEvent(te: ITempEvent | null) {
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
