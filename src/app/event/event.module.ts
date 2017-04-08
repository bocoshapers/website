import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventComponent } from './event/event.component';
import { EventsComponent } from './events/events.component';
import {EventRoutes} from "./event.routes";
import { AdminEventsComponent } from './admin-events/admin-events.component';
import {SharedModule} from "../shared/shared.module";
import {EventsService} from "./events.service";
import { EventEditorComponent } from './event-editor/event-editor.component';
import {FormsModule} from "@angular/forms";

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
    EventEditorComponent
  ],
  providers: [
    EventsService
  ]
})
export class EventModule { }
