import {Component, OnDestroy, OnInit} from '@angular/core';
import {EventsService, SEvent} from "../events.service";
import {ActivatedRoute, Params} from "@angular/router";
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";

@Component({
  selector: 'boco-event',
  styles: [`
    .event {
      margin: 2em 0;
    }
  `],
  template: `
    <div class="event" fxLayout="row" fxLayoutAlign="center">
      <div fxFlex="80" *ngIf="$shaperEvent">
        <boco-event-detail [shaperEvent]="$shaperEvent"></boco-event-detail>
      </div>
    </div>
  `
})
export class EventComponent implements OnInit, OnDestroy {
  public $shaperEvent: Observable<SEvent[]>;
  private $sub;
  constructor(
    private route: ActivatedRoute,
    private eventsService: EventsService) { }

  ngOnInit() {
    this.$sub = this.route.params
      .switchMap((params: Params) => this.eventsService.getEventBySlug(params['slug']))
      .map((event) => this.$shaperEvent = event)
      .subscribe();
  }

  ngOnDestroy() {
    this.$sub.unsubscribe();
  }
}
