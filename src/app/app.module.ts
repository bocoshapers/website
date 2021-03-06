import 'hammerjs';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FIREBASE_CONF, FIREBASE_DEV_CONFIG } from '../environments/firebase';

import { AppComponent } from './app.component';
import { TeamComponent } from './components/team/team.component';
import { TeamService } from './components/team/team.service';
import { UserModule } from './user/user.module';
import { AppRoutesModule } from './app.routes';
import { LandingComponent } from './components/landing/landing.component';
import { SharedModule } from './shared/shared.module';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { AuthModule } from './auth/auth.module';
import { NavComponent } from './components/nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EventModule } from './event/event.module';
import { UploadService } from './services/upload.service';
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { VotesModule } from './votes/votes.module';
import { SideNavComponent } from './components/side-nav/side-nav.component';

const FIREBASE_CONFIG = environment.production ? FIREBASE_CONF : FIREBASE_DEV_CONFIG;

@NgModule({
  declarations: [
    AppComponent,
    TeamComponent,
    LandingComponent,
    NavComponent,
    SideNavComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AppRoutesModule,
    AuthModule,
    UserModule,
    SharedModule,
    EventModule,
    VotesModule
  ],
  providers: [
    TeamService,
    AuthService,
    UploadService,
    UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
