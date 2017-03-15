import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AngularFireModule, AuthProviders, AuthMethods } from "angularfire2";
import { FIREBASE_CONF } from "../environments/firebase";

import { AppComponent } from './app.component';
import { TeamComponent } from './team/team.component';
import { TeamService } from "./team/team.service";
import { ModalComponent } from './modal/modal.component';
import { UserModule } from "./user/user.module";
import { AppRoutesModule } from "./app.routes";
import { LandingComponent } from './landing/landing.component';
import { SharedModule } from "./shared/shared.module";
import {AuthService} from "./auth.service";
import {UserService} from "./user.service";



const firebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};

@NgModule({
  declarations: [
    AppComponent,
    TeamComponent,
    ModalComponent,
    LandingComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireModule.initializeApp(FIREBASE_CONF, firebaseAuthConfig),
    AppRoutesModule,
    UserModule,
    SharedModule,
  ],
  providers: [
    TeamService,
    AuthService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }