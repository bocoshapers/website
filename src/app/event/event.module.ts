import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventComponent } from './event/event.component';
import { EventsComponent } from './events/events.component';
import {EventRoutes} from "./event.routes";
import { AdminEventsComponent } from './admin-events/admin-events.component';
import {SharedModule} from "../shared/shared.module";
import {EventsService} from "./events.service";
import {EventEditorComponent, SlugifyPipe, TimePipe} from './event-editor/event-editor.component';
import {FormsModule} from "@angular/forms";
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EventEditComponent } from './event-edit/event-edit.component';

@NgModule({
  imports: [
    CommonModule,
    EventRoutes,
    SharedModule,
    FormsModule
  ],
  declarations: [
    EventComponent,
    EventsComponent,
    AdminEventsComponent,
    EventEditorComponent,
    SlugifyPipe,
    EventDetailComponent,
    EventEditComponent,
    TimePipe
  ],
  providers: [
    EventsService
  ]
})
export class EventModule { }
