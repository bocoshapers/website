import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Shaper } from '../team/team.service';
import { Observable } from 'rxjs/Observable';
import { ILink } from '../../app.component';

@Component({
  selector: 'boco-sidenav',
  template: `
    <mat-list (click)="onClose.emit()" *ngIf="currentUser">
      <mat-list-item *ngFor="let link of linkData">
        <mat-icon mat-list-icon>{{link.icon}}</mat-icon>
        <a *ngIf="link.name !== 'Logout'" mat-button mat-line [routerLink]="link.path">{{link.name}}</a>
        <a *ngIf="link.name === 'Logout'" mat-button mat-line (click)="onLogout.emit()">{{link.name}}</a>
      </mat-list-item>
    </mat-list>
  `,
  styles: []
})
export class SideNavComponent implements OnChanges {
  @Input() linkData: ILink[];
  @Input() currentUser: Observable<Shaper> | Shaper;
  @Output() onClose = new EventEmitter<void>();
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
