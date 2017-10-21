import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

export interface ILink {
  name: string;
  path: string[];
  icon: string;
}

@Component({
  selector: 'boco-root',
  template: `
    <mat-sidenav-container>
      <mat-sidenav #sidenav>
        <boco-sidenav
          *ngIf="currentUser != null"
          [currentUser]="currentUser"
          [linkData]="linkData"
          (onLogout)="logoutFromSidenav(sidenav)"
          (onClose)="sidenav.close()">
        </boco-sidenav>
      </mat-sidenav>
      <boco-nav
        *ngIf="currentUser != null"
        [linkData]="linkData"
        [currentUser]="currentUser"
        (onToggleSidenav)="sidenav.open()"
        (onLogout)="logout()">
      </boco-nav>
      <div class="sidenav-content md-boco-theme">
        <router-outlet></router-outlet>
      </div>
    </mat-sidenav-container>
  `,
  styles: [``]
})
export class AppComponent implements OnInit {
  currentUser: any;
  linkData: ILink[] = [
    { name: 'Home', path: ['/'], icon: 'home' },
    { name: 'Votes', path: ['/votes'], icon: 'thumbs_up_down' },
    { name: 'My Account', path: ['/users'], icon: 'settings' },
    { name: 'Projects Dashboard', path: ['/projects/admin'], icon: 'dashboard' },
    { name: 'Logout', path: ['auth/logout'], icon: 'power_settings_new' },
  ];

  constructor(public userService: UserService,
              public auth: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.userService.getCurrentUserAuthStream()
      .subscribe(currentUser => {
        this.currentUser = currentUser;
      });
  }

  logoutFromSidenav(sidenav) {
    sidenav.close();
    this.logout();
  }

  logout() {
    this.currentUser = null;
    this.auth.logout()
      .then(() => this.router.navigate(['/']));
  }
}
