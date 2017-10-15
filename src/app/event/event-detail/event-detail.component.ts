import {Component, Input} from '@angular/core';
import {SEvent} from "../events.service";

@Component({
  selector: 'boco-event-detail',
  styles: [`
    .event__details {
      text-align: center;
    }
    
    .smLink {
      padding: 1.3em 0;
    }
    
    .boco-logo {  
      background: url('assets/images/boco-logo.png');
      background-size: cover;
    }
    
  `],
  template: `
    <ng-container *ngIf="shaperEvent">
      <ng-container *ngIf="!preview; else previewBlock">
        
        <mat-card class="mat-card-flat">
          <mat-card-header color="accent">
            <div mat-card-avatar class="boco-logo"></div>
            <mat-card-title>{{ name }}</mat-card-title>
            <mat-card-subtitle>{{location}} {{ day | date }} {{ from | time }} to {{ to | time }}</mat-card-subtitle>
          </mat-card-header>
          
          <img mat-card-image [src]="photo">
        </mat-card>
        
        <div class="primary-bg" fxLayoutAlign="row" fxLayoutAlign="space-around center" fxLayoutWrap fxLayoutGap="2px">
          <div class="smLink" *ngFor="let smLink of smLinkKeys">
            <a
              mat-raised-button
              target="_blank"
              rel="noopener noreferrer"
              [href]="smLinks[smLink]">{{smLink}}
              <mat-icon>open_in_new</mat-icon>
            </a>
          </div>
        </div>
        
        <mat-card class="mat-card-flat">
          <mat-card-content>
            <span [innerHtml]="description"></span>
          </mat-card-content>
        </mat-card>
      </ng-container>
      
      <ng-template #previewBlock>
        
        <mat-card>
          <mat-card-header>
            <mat-card-title><h2>{{name}}</h2></mat-card-title>
          </mat-card-header>
          <img mat-card-image [src]="photo">
          <mat-card-actions>
            <a [routerLink]="['/projects', slug]" mat-button color="primary">see more</a>
          </mat-card-actions>
        </mat-card>
        
      </ng-template>

    </ng-container>
  `
})
export class EventDetailComponent {

  @Input() shaperEvent: SEvent | null;
  @Input() preview: boolean = false;

  get name() {
    return this.shaperEvent.name;
  }

  get slug() {
    return this.shaperEvent.slug;
  }

  get photo() {
    return this.shaperEvent.photo;
  }

  get day() {
    return this.shaperEvent.when.date;
  }

  get from() {
    return this.shaperEvent.when.from;
  }

  get to() {
    return this.shaperEvent.when.to;
  }

  get location() {
    return this.shaperEvent.location;
  }

  get description() {
    return this.shaperEvent.description;
  }

  get smLinks() {
    return this.shaperEvent.smLinks;
  }

  get smLinkKeys() {
    return Object.keys(this.shaperEvent.smLinks);
  }

}
