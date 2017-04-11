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
          <md-toolbar-row>
            <div class="boco-spacer">
              <h5><i>when: </i>{{eventDate | date:'medium'}}</h5>
            </div>
            <div class="boco-spacer">
              <h5 class="boco-spacer"><i>where: </i>{{location}}</h5>
            </div>
          </md-toolbar-row>

          <md-toolbar-row>
            <div *ngFor="let smLink of smLinkKeys" class="boco-spacer">
              <a
                md-button
                target="_blank"
                rel="noopener noreferrer"
                [href]="smLinks[smLink]">{{smLink}}<md-icon>open_in_new</md-icon></a>
            </div>
          </md-toolbar-row>

        </md-toolbar>

        <md-card class="mat-card-flat">
          <md-card-content>
            <span [innerHtml]="description"></span>
          </md-card-content>
        </md-card>
      </ng-container>
      
      <ng-template #previewBlock>

        <md-toolbar color="accent">
          <md-toolbar-row>
            <h3>{{name}}</h3>
          </md-toolbar-row>
          <md-toolbar-row>
            <div class="boco-spacer">
              <h5><i>when: </i>{{ eventDate | date:'short' }}</h5>
            </div>
            <div class="boco-spacer">
              <h5 class="boco-spacer"><i>where: </i>{{location}}</h5>
            </div>
          </md-toolbar-row>
        </md-toolbar>
        
        <md-card>
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
