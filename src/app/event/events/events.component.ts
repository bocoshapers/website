import { Component, OnInit } from '@angular/core';
import {EventsService, SEvent} from "../events.service";
import {Observable} from "rxjs";

@Component({
  selector: 'boco-events',
  styles: [`
    .events {
      margin: 3em;
      padding: 3em;
    }
  `],
  template: `
    <md-toolbar color="primary">
      <h5>Boulder Global Shaper Events</h5>
    </md-toolbar>
    <div>
      <div *ngFor="let event of $publishedEvents | async" class="events">
        
        <boco-event-detail
          [shaperEvent]="event"
          [preview]="true">
        </boco-event-detail>
        
      </div>
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
