import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './user/user.component';
import { UserRoutesModule } from "./user.routes";
import { SharedModule } from "../shared/shared.module";
import {UserGuardService} from "./user-guard.service";

@NgModule({
  imports: [
    UserRoutesModule,
    SharedModule,
    CommonModule
  ],
  providers: [UserGuardService],
  declarations: [UsersComponent, UserComponent]
})
export class UserModule { }
