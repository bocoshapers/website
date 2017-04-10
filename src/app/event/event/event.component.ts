import { Component, OnInit } from '@angular/core';
import {EventsService, SEvent} from "../events.service";
import {ActivatedRoute, Params} from "@angular/router";
import {FirebaseListObservable} from "angularfire2";
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

@Component({
  selector: 'boco-event',
  styles: [`
    .event {
      margin: 2em 4em;
      background-color: grey;
    }
    
  `],
  template: `
    <div class="event">
      <div class="event__section" *ngFor="let se of $shaperEvent | async">
        <boco-event-detail [shaperEvent]="se"></boco-event-detail>
      </div>
    </div>
  `
})
export class EventComponent implements OnInit {
  public $shaperEvent: FirebaseListObservable<SEvent[]>;
  constructor(
    private route: ActivatedRoute,
    private eventsService: EventsService) { }

  ngOnInit() {
    this.route.params
      .map((params: Params) => {
        this.$shaperEvent = this.eventsService.getEventBySlug(params['slug']);
      })
      .subscribe();
  }

}
