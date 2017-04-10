import { Component, OnInit } from '@angular/core';
import {EventsService, SEvent} from "../events.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-events',
  styles: [``],
  template: `
    <md-toolbar>
      <h5>Events</h5>
    </md-toolbar>
    <div>
      <md-card *ngFor="let event of $publishedEvents | async">
        <md-card-title>
          <h5>{{event.name}}</h5>
          
          <a [routerLink]="['/events', event.slug]">go to event page</a>
        </md-card-title>
      </md-card>
    </div>
  `
})
export class EventsComponent implements OnInit {
  public $publishedEvents: Observable<SEvent[]>;
  constructor(public eventsService: EventsService) { }

  ngOnInit() {
    this.$publishedEvents = this.eventsService.publishedEvents();
  }



}
