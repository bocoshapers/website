/**
 * Created by githop on 3/14/17.
 */

import {NgModule} from "@angular/core";
import {LoginComponent} from "../auth/login/login.component";
import {RouterModule, Routes} from "@angular/router";

const SHARED_ROUTES: Routes = [
  { path: '', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forChild(SHARED_ROUTES)],
  exports: [RouterModule]
})
export class SharedRoutes { }
