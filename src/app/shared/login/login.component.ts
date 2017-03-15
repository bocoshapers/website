import { Component, OnInit } from '@angular/core';

import {Router} from "@angular/router";
import {AuthService} from "../../auth.service";

@Component({
  selector: 'boco-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit{
  email: string = '';
  password: string = '';
  constructor(
    private auth: AuthService,
    private router: Router) {
  }

  ngOnInit() {
    console.log('login init');
    this.auth.getAuth()
      .subscribe((auth) => {
        if (auth != null) {
          this.router.navigate(['/users', auth.uid]);
        }
      })
  }

  login() {
    this.auth.login(this.email, this.password)
      .then((auth) => {
      this.router.navigate(['/users', auth.uid]);
      });
  }



}
