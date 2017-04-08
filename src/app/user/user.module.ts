import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './user/user.component';
import { UserRoutesModule } from "./user.routes";
import { UserGuardService } from "./user-guard.service";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  imports: [
    UserRoutesModule,
    SharedModule,
    CommonModule,
    FormsModule
  ],
  providers: [UserGuardService],
  declarations: [
    UsersComponent,
    UserComponent
  ]
})
export class UserModule { }
