import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {LandingComponent} from "./components/landing/landing.component";
/**
 * Created by githop on 3/13/17.
 */

const APP_ROUTES = [
  { path: '', component: LandingComponent },
  { path: 'login', loadChildren: 'app/auth/auth.module#AuthModule' },
  { path: 'users', loadChildren: 'app/user/user.module#UserModule' },
  { path: 'events', loadChildren: 'app/event/event.module#EventModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutesModule {}
