import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AngularFireModule, AuthProviders, AuthMethods } from "angularfire2";
import { FIREBASE_CONF } from "../environments/firebase";

import { AppComponent } from './app.component';
import { TeamComponent } from './components/team/team.component';
import { TeamService } from "./components/team/team.service";
import { UserModule } from "./user/user.module";
import { AppRoutesModule } from "./app.routes";
import { LandingComponent } from './components/landing/landing.component';
import { SharedModule } from "./shared/shared.module";
import { AuthService } from "./services/auth.service";
import { UserService } from "./services/user.service";
import { AuthModule } from "./auth/auth.module";
import { NavComponent } from './components/nav/nav.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {EventModule} from "./event/event.module";
import {UploadService} from "./services/upload.service";

const firebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};

@NgModule({
  declarations: [
    AppComponent,
    TeamComponent,
    LandingComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    AngularFireModule.initializeApp(FIREBASE_CONF, firebaseAuthConfig),
    AppRoutesModule,
    AuthModule,
    UserModule,
    SharedModule,
    EventModule
  ],
  providers: [
    TeamService,
    AuthService,
    UploadService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
