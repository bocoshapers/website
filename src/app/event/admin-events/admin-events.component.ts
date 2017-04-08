import { Component, OnInit } from '@angular/core';
import {EventsService, SEvent, TempEvent} from "../events.service";
import {MdIconRegistry} from "@angular/material";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-admin-events',
  styles: [``],
  template: `
    <md-toolbar color="primary">
      <h3>Events Admin</h3>
    </md-toolbar>
    <div>

      <h5>Events</h5>
      
      <button md-fab (click)="addNewEvent()">Add Event</button>
      
      <boco-modal [trigger]="newEvent != null">
        <boco-event-editor [event]="newEvent"></boco-event-editor>
      </boco-modal>

      <md-list>
        <md-list-item *ngFor="let event of eventsService.events | async" >{{event.name}}</md-list-item>
      </md-list>
    </div>
  `
})
export class AdminEventsComponent implements OnInit {
  public newEvent: TempEvent;
  constructor(
    public eventsService: EventsService,
    private iconRegistry: MdIconRegistry,
    private sanitizer: DomSanitizer) {

  }

  ngOnInit() {
  }

  addNewEvent() {
    this.newEvent = {name: 'New Event'};
  }

}
