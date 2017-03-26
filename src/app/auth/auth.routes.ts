/**
 * Created by githop on 3/24/17.
 */


import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {AuthComponent} from "./auth/auth.component";


const authRoutes: Routes = [
  { path: '',  component: LoginComponent },
  { path: 'auth', component: AuthComponent, outlet: 'auth'},
  { path: 'user', loadChildren: 'app/auth/user/user.module#UserModule' }
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule]
})
export class AuthRoutes {}
