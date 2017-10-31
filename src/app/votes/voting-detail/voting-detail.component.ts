import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ITopic} from '../votes.service';
import {Shaper} from '../../components/team/team.service';

@Component({
  selector: 'boco-voting-detail',
  template: `
    <ng-container *ngIf="topic != null">
      <mat-toolbar>
        <h1>{{topic.name}}</h1>
        <span class="boco-spacer"></span>
        <button
          mat-button
          (click)="onCloseVote.emit()"
          *ngIf="canCloseVote">
          close vote
        </button>
        <p *ngIf="!topic.open">voted on: {{topic.votedOn | date}}</p>
      </mat-toolbar>
      <div class="voting-stats">
        <div fxLayout="row" fxLayoutAlign="center center" class="voters">
          <mat-chip-list *ngIf="voters != null && topic.open">
            <mat-chip class="voter-chip --primary" *ngFor="let voter of voters">
              <img class="voter-img" [src]="voter.imageFile">
              <span class="voter-img__spacer"></span>
              {{voter.first}}
            </mat-chip>
          </mat-chip-list>
        </div>

        <div class="voting-results">
          <div fxLayout="row" fxLayoutAlign="space-around center">
            <div>
              <mat-icon>thumb_up</mat-icon>
              <h4>{{yesCount}}</h4>
            </div>
            <div>
              <mat-icon>thumb_down</mat-icon>
              <h4>{{noCount}}</h4>
            </div>
          </div>
          <h4 *ngIf="!topic.open">{{result}}</h4>
        </div>

      </div>
      <mat-card class="voting-card">
        <mat-card-content>
          <p>{{topic.description}}</p>
        </mat-card-content>
        <div fxLayout="row" class="voting-card__actions">
          <button
            [disabled]="!topic.open"
            (click)="onSubmitVote.emit(true)"
            mat-button
            color="primary">
            <mat-icon>thumb_up</mat-icon>
          </button>
          <button
            [disabled]="!topic.open"
            (click)="onSubmitVote.emit(false)"
            mat-button
            color="warn">
            <mat-icon>thumb_down</mat-icon>
          </button>
        </div>
        <p *ngIf="yourVote != null">You voted: 🎉 {{yourVote}} 🎉</p>
      </mat-card>

    </ng-container>
  `,
  styles: [`
    .voter-img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      position: absolute;
      top: 0.5px;
      left: 0;
    }
    .voter-img__spacer {
      margin-right: 20px;
    }
    .voting-card {
      text-align: center;
      margin: 0 auto;
      width: 80%;
    }

    .voting-stats {
      margin: 0.5em 0.5em;
    }

    .voter-chip {
      position: relative;
    }

    .--accent {
      background-color: #ffc107 !important;
    }

    .--primary {
      color: white !important;
      background-color: #005ea4 !important;;
    }

    .voting-results {
      text-align: center;
    }

    .voting-card__actions button {
      width: 50%;
    }

    /* Larger than mobile screen */
    @media (min-width: 40.0rem) {
      .voting-card {
        width: 40%;
      }
    }

    /* Larger than tablet screen */
    @media (min-width: 80.0rem) {
      .voting-card {
        width: 33%;
      }
    }

    /* Larger than desktop screen */
    @media (min-width: 120.0rem) {
      .voting-card {
        width: 25%;
      }
    }
  `]
})
export class VotingDetailComponent {
  @Input() topic: ITopic | null;
  @Input() topicMeta: any;
  @Input() voters: any;
  @Input() shaper: Shaper | null;
  @Output() onCloseVote = new EventEmitter<void>();
  @Output() onSubmitVote = new EventEmitter<boolean>();

  get yesCount() {
    return this.topicMeta.yesCount;
  }

  get noCount() {
    return this.topicMeta.noCount;
  }

  get yourVote() {
    if (this.topicMeta.yourVote.length > 0) {
      return this.topicMeta.yourVote;
    }
  }

  get result() {
    return this.topicMeta.result;
  }

  get isTopicOwner() {
    return (this.topic != null && this.shaper != null && this.topic.ownerId === this.shaper.$key);
  }

  get canCloseVote() {
    return this.isTopicOwner && this.topic.open
  }
}
