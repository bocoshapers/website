import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { Shaper } from './components/team/team.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'boco-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentUser: any;
  constructor(
    public userService: UserService,
    public auth: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.currentUser = this.userService.getCurrentUser();
  }

  logout() {
    this.auth.logout()
      .then(() => this.currentUser = null)
      .then(() => this.router.navigate(['/']));
  }
}
