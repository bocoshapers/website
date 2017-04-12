import {Component, Input} from '@angular/core';
import {SEvent} from "../events.service";

@Component({
  selector: 'boco-event-detail',
  styles: [`
    .event__details {
      text-align: center;
    }
    
    
  `],
  template: `
    <ng-container *ngIf="shaperEvent">
      <ng-container *ngIf="!preview; else previewBlock">
        
        <md-card class="mat-card-flat">
          <img md-card-image [src]="photo">
        </md-card>

        <md-toolbar class="event__details" color="primary">
            <div class="boco-spacer">
              <h5><i>when: </i>{{eventDate}}</h5>
            </div>
            <div class="boco-spacer">
              <h5 class="boco-spacer"><i>where: </i>{{location}}</h5>
            </div>
        </md-toolbar>
        
        <md-card class="mat-card-flat">
          <md-card-content>
            <div *ngFor="let smLink of smLinkKeys">
              <a
                md-button
                target="_blank"
                rel="noopener noreferrer"
                [href]="smLinks[smLink]">{{smLink}}
                <md-icon>open_in_new</md-icon>
              </a>
            </div>
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
            <a [routerLink]="['/events', slug]" md-button color="primary">see more</a>
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

  get eventDate() {
    return this.shaperEvent.datetime;
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
