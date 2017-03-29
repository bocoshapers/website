import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/map';
import {UserService} from "./services/user.service";
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'boco-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{ }
