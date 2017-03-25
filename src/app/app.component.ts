import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/map';
import {UserService} from "./auth/user.service";
import {AuthService} from "./auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'boco-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{ }
