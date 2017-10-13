import { Component, OnDestroy, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';
import { ITopic, VotesService } from '../votes.service';

@Component({
  selector: 'boco-votes',
  template: `    
    <div class="boco-votes">
      <div class="add-topic">
        <button md-button (click)="createTempTopic()">add Topic for vote</button>
        
        <boco-modal [trigger]="tempTopic != null">
          <ng-container *ngIf="tempTopic != null">
            <md-toolbar color="primary">
              {{tempTopic?.name}}
              <span class="boco-spacer"></span>
              <md-slide-toggle
                [color]="'warn'"
                (change)="tempTopic.anonymous = !tempTopic.anonymous"
                [checked]="tempTopic.anonymous">
                Anonymous vote
              </md-slide-toggle>
            </md-toolbar>
            <md-card>
              <md-card-title>

                <md-input-container>
                  <input
                    required
                    mdInput
                    name="topicName"
                    placeholder="Topic name"
                    [(ngModel)]="tempTopic.name">
                </md-input-container>
              </md-card-title>

              <md-card-content>
                <md-input-container>
                <textarea
                  mdInput
                  required
                  name="topicDesc"
                  placeholder="Topic Description"
                  [(ngModel)]="tempTopic.description">
                </textarea>
                </md-input-container>
              </md-card-content>

              <md-card-actions>
                <button md-button color="warn" (click)="tempTopic = null;">cancel</button>
                <button md-button (click)="saveTempTopic(tempTopic)">save</button>
              </md-card-actions>
            </md-card>
          </ng-container>
        </boco-modal>
      </div>
      
      <div class="past-topics">
        <md-list>
          <h3 md-subheader>Previous Votes</h3>
          <md-list-item *ngFor="let topic of topics$ | async">
            <h5 md-line>{{ topic.name }}</h5>
            <button md-button>vote</button>
          </md-list-item>
        </md-list>
      </div>
    </div>
  `,
  styles: []
})
export class VotesComponent implements OnInit, OnDestroy {
  topics$: FirebaseListObservable<ITopic[]>;
  tempTopic: Partial<ITopic>;
  constructor(private votesService: VotesService) {}

  ngOnInit() {
    this.topics$ = this.votesService.topics$;
  }

  ngOnDestroy() {
    console.log('DESTROY!!!');
  }

  createTempTopic() {
    this.tempTopic = {
      name: '',
      description: '',
      anonymous: false
    };
  }

  saveTempTopic(topic: Partial<ITopic>) {
    this.votesService.addTopic(topic)
      .then(() => this.tempTopic = null);
  }



}
