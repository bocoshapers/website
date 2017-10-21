import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Shaper } from '../team/team.service';
import { ILink } from '../../app.component';

@Component({
  selector: 'boco-nav',
  template: `
    <div *ngIf="currentUser != null">
      <mat-toolbar color="accent">
        <mat-icon (click)="onToggleSidenav.emit()">menu</mat-icon>
        <img class="nav__profile" [src]="currentUser.imageFile"/>
        <span class="boco-spacer"></span>
        <div fxShow fxHide.gt-sm>
          <span *ngFor="let link of linkData">
            <a *ngIf="link.name !== 'Logout'" [routerLink]="link.path" mat-icon-button matTooltip="{{link.name}}">
              <mat-icon>{{link.icon}}</mat-icon>
            </a>
            <a *ngIf="link.name === 'Logout'" (click)="onLogout.emit()" mat-icon-button matTooltip="{{link.name}}">
              <mat-icon>{{link.icon}}</mat-icon>
            </a>
          </span>
        </div>
        <div fxHide fxShow.gt-sm>
          <span *ngFor="let link of linkData">
            <a *ngIf="link.name !== 'Login'" mat-button [routerLink]="link.path">{{link.name}}</a>
            <a *ngIf="link.name === 'Login'" mat-button (click)="onLogout.emit()">{{link.name}}</a>
          </span>
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
export class NavComponent implements OnChanges {
  @Input() currentUser: Shaper | null;
  @Input() linkData: ILink[];
  @Output() onToggleSidenav = new EventEmitter<void>();
  @Output() onLogout = new EventEmitter<void>();

  ngOnChanges(changes) {
    if (changes.currentUser && changes.currentUser.currentValue) {
      const currentUser = changes.currentUser.currentValue;
      if (currentUser && currentUser.$key) {
        this.linkData = this.linkData.map(link => {
          if (link.name === 'My Account') {
            link.path = ['/users', currentUser.$key];
          }
          return link;
        })
      }
    }
  }
}
