import { Component, OnDestroy, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';
import { ITopic, VotesService } from '../votes.service';

@Component({
  selector: 'boco-votes',
  template: `    
    <div class="boco-votes">
      <div class="add-topic">
        <button mat-button (click)="createTempTopic()">add Topic for vote</button>
        
        <boco-modal [trigger]="tempTopic != null">
          <ng-container *ngIf="tempTopic != null">
            <mat-toolbar color="primary">
              {{tempTopic?.name}}
              <span class="boco-spacer"></span>
              <mat-slide-toggle
                [color]="'warn'"
                (change)="tempTopic.anonymous = !tempTopic.anonymous"
                [checked]="tempTopic.anonymous">
                Anonymous vote
              </mat-slide-toggle>
            </mat-toolbar>
            <mat-card>
              <mat-card-title>

                <mat-form-field>
                  <input
                    required
                    matInput
                    name="topicName"
                    placeholder="Topic name"
                    [(ngModel)]="tempTopic.name">
                </mat-form-field>
              </mat-card-title>

              <mat-card-content>
                <mat-form-field>
                <textarea
                  matInput
                  required
                  name="topicDesc"
                  placeholder="Topic Description"
                  [(ngModel)]="tempTopic.description">
                </textarea>
                </mat-form-field>
              </mat-card-content>

              <mat-card-actions>
                <button mat-button color="warn" (click)="tempTopic = null;">cancel</button>
                <button mat-button (click)="saveTempTopic(tempTopic)">save</button>
              </mat-card-actions>
            </mat-card>
          </ng-container>
        </boco-modal>
      </div>
      
      <div class="past-topics">
        <mat-list>
          <h3 matSubheader>Previous Votes</h3>
          <mat-list-item *ngFor="let topic of topics$ | async">
            <h5 matLine>{{ topic.name }}</h5>
            <a mat-button [routerLink]="['/votes', topic.$key]">Vote</a>
          </mat-list-item>
        </mat-list>
      </div>
    </div>
  `,
  styles: []
})
export class VotesComponent implements OnInit {
  topics$: FirebaseListObservable<ITopic[]>;
  tempTopic: Partial<ITopic>;
  constructor(private votesService: VotesService) {}

  ngOnInit() {
    this.topics$ = this.votesService.topics$;
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
      .subscribe(() => this.tempTopic = null);
  }



}
