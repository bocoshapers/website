import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Shaper } from '../team/team.service';

@Component({
  selector: 'boco-nav',
  template: `
    <div *ngIf="currentUser != null">
      <mat-toolbar color="accent">
        <mat-icon (click)="onToggleSidenav.emit()">menu</mat-icon>
        <img class="nav__profile" [src]="currentUser.imageFile"/>
        <span class="boco-spacer"></span>
        <div fxShow fxHide.gt-sm>
          <a routerLink="" mat-icon-button matTooltip="Home">
            <mat-icon>home</mat-icon>
          </a>
          <a routerLink="votes" mat-icon-button matTooltip="Votes">
            <mat-icon>thumbs_up_down</mat-icon>
          </a>
          <a mat-icon-button  [routerLink]="['/users', currentUser.$key]" matTooltip="My Account">
            <mat-icon>settings</mat-icon>
          </a>
          <a mat-icon-button routerLink="/projects/admin" matTooltip="Projects">
            <mat-icon>dashboard</mat-icon>
          </a>
          <a mat-icon-button matTooltip="Logout">
            <mat-icon (click)="onLogout.emit()">power_settings_new</mat-icon>
          </a>
        </div>
        <div fxHide fxShow.gt-sm>
          <span><a mat-button [routerLink]="'/'">Home</a></span>
          <span><a mat-button routerLink="votes">Votes</a></span>
          <span><a mat-button [routerLink]="['/users', currentUser.$key]">My Account</a></span>
          <span><a mat-button routerLink="/projects/admin">Projects Dashboard</a></span>
          <span (click)="onLogout.emit()"><a mat-button>logout</a></span>
        </div>
      </mat-toolbar>
    </div>
  `,
  styles: [
      `.nav__profile {
      width: 25px;
      border-radius: 50%;
    }
    `
  ]
})
export class NavComponent {
  @Output() onToggleSidenav = new EventEmitter<void>();
  @Output() onLogout = new EventEmitter<void>();
  @Input() currentUser: Shaper;
}
