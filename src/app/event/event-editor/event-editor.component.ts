import {Component, Input, OnInit} from '@angular/core';
import {SEvent, TempEvent} from "../events.service";

@Component({
  selector: 'boco-event-editor',
  styles: [``],
  template: `
    <div *ngIf="event">
      <md-toolbar color="accent">
        Edit {{event.name}}
      </md-toolbar>
      <md-card>
        <md-card-content>
          <form>
            <md-input-container>
              <input
                mdInput
                [(ngModel)]="event.name"
                name="eventName"
                placeholder="Event name">
            </md-input-container>

            <md-input-container>
              <input
                mdInput
                [(ngModel)]="event.slug"
                name="eventSlug"
                placeholder="Event Slug">
            </md-input-container>

            <md-input-container>
              <textarea
                mdInput
                [(ngModel)]="event.description"
                name="evetnDescription"
                placeholder="Event Description">
              </textarea>
            </md-input-container>
          </form>
        </md-card-content>
      </md-card>
    </div>
  `
})
export class EventEditorComponent implements OnInit {
  @Input() event: TempEvent;
  constructor() { }

  ngOnInit() {
  }

}
