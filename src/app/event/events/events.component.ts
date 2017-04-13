import { Component, OnInit } from '@angular/core';
import { EventsService, SEvent } from "../events.service";
import { Observable } from "rxjs";

@Component({
  selector: 'boco-events',
  styles: [`
    .events {
      margin: 2em 0;
    }
  `],
  template: `
    <md-toolbar color="primary">
      <h5>Boulder Global Shaper Events</h5>
    </md-toolbar>
    <div fxLayout="row" fxLayoutAlign="center">
      <div fxFlex="95" fxFlex.gt-md="66" *ngFor="let event of $publishedEvents | async" class="events">
        
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
