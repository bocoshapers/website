import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'boco-nav',
  template: `
    <md-toolbar color="accent" *ngIf="currentUser">
      <span class="nav__profile">
        <img [src]="currentUser.imageFile"/>
      </span>
      <span class="boco-spacer"></span>
      <span><a md-button [routerLink]="'/'">Home</a></span>
      <span><a md-button [routerLink]="['/users', currentUser.$key]">My Account</a></span>
      <span><a md-button [routerLink]="'/events/admin'">Events Dashboard</a></span>
      <span (click)="logout()"><a md-button>logout</a></span>
    </md-toolbar>
  `,
  styles: [
    `.nav__profile img {
      width: 25px;
      border-radius: 50%;
    }
    `
  ]
})
export class NavComponent implements OnInit {
  public currentUser;
  constructor(private userService: UserService,
              private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.userService.getCurrentUser().map((user) => {
      this.currentUser = user;
    })
      .subscribe();
  }

  logout() {
    this.auth.logout()
      .then(() => this.currentUser = null)
      .then(() => this.router.navigate(['/']));
  }

}