import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import 'rxjs/add/operator/map';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
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
      .then(() => this.router.navigate(['/']));
  }

}
