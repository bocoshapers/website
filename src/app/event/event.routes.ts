/**
 * Created by githop on 4/7/17.
 */

import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {EventComponent} from "./event/event.component";
import {EventsComponent} from "./events/events.component";
import {AdminEventsComponent} from "./admin-events/admin-events.component";
import {EventEditComponent} from "./event-edit/event-edit.component";
import {UserGuardService} from "../services/user-guard.service";

const EVENT_ROUTES: Routes = [
  { path: '', component: EventsComponent },
  { path: 'admin', component: AdminEventsComponent, canActivate: [UserGuardService] },
  { path: ':slug', component: EventComponent },
  { path: ':slug/edit', component: EventEditComponent, canActivate: [UserGuardService] }

];

@NgModule({
  imports: [RouterModule.forChild(EVENT_ROUTES)],
  exports: [RouterModule]
})
export class EventRoutes { }
