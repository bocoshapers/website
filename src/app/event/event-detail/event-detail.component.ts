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
        
        <md-card class="mat-card-flat">
          <md-card-header color="accent">
            <div md-card-avatar class="boco-logo"></div>
            <md-card-title>{{ name }}</md-card-title>
            <md-card-subtitle>{{location}} {{ day | date }} {{ from | time }} to {{ to | time }}</md-card-subtitle>
          </md-card-header>
          
          <img md-card-image [src]="photo">
        </md-card>
        
        <div class="primary-bg" fxLayoutAlign="row" fxLayoutAlign="space-around center" fxLayoutWrap fxLayoutGap="2px">
          <div class="smLink" *ngFor="let smLink of smLinkKeys">
            <a
              md-raised-button
              target="_blank"
              rel="noopener noreferrer"
              [href]="smLinks[smLink]">{{smLink}}
              <md-icon>open_in_new</md-icon>
            </a>
          </div>
        </div>
        
        <md-card class="mat-card-flat">
          <md-card-content>
            <span [innerHtml]="description"></span>
          </md-card-content>
        </md-card>
      </ng-container>
      
      <ng-template #previewBlock>
        
        <md-card>
          <md-card-header>
            <md-card-title><h2>{{name}}</h2></md-card-title>
          </md-card-header>
          <img md-card-image [src]="photo">
          <md-card-actions>
            <a [routerLink]="['/projects', slug]" md-button color="primary">see more</a>
          </md-card-actions>
        </md-card>
        
      </ng-template>

    </ng-container>
  `
})
export class EventDetailComponent {

  @Input() shaperEvent: SEvent;
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
