import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from "./login/login.component";
import { AuthRoutes } from "./auth.routes";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    AuthRoutes,
    SharedModule
  ],
  declarations: [
    LoginComponent
  ]
})
export class AuthModule { }
