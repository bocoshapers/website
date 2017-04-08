import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {UsersComponent} from "./users/users.component";
import {UserComponent} from "./user/user.component";
import {UserGuardService} from "./user-guard.service";
/**
 * Created by githop on 3/13/17.
 */

const USER_ROUTES: Routes = [
  {
    path: '',
    canActivate: [UserGuardService],
    children: [
      { path: '', component: UsersComponent },
      { path: 'users/:id', component: UserComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(USER_ROUTES)],
  exports: [RouterModule]
})
export class UserRoutesModule {}

