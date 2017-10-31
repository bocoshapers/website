import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../../services/user.service';
import {ITopic, VotesService} from '../votes.service';
import { Shaper } from '../../components/team/team.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'boco-voting',
  template: `
    <ng-container *ngIf="topic$ != null">
      <mat-toolbar>
        <h1>{{topic$.name}}</h1>
        <span class="boco-spacer"></span>
        <button
          mat-button
          (click)="closeVote()"
          *ngIf="canCloseVote">
          close vote
        </button>
        <p *ngIf="!topic$.open">voted on: {{topic$.votedOn | date}}</p>
      </mat-toolbar>
      <div class="voting-stats">
        <div fxLayout="row" fxLayoutAlign="center center" class="voters">
          <mat-chip-list *ngIf="voters$ != null && topic$.open">
            <mat-chip class="voter-chip --primary" *ngFor="let voter of voters$">
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
              <h4>{{yaysCount}}</h4>
            </div>
            <div>
              <mat-icon>thumb_down</mat-icon>
              <h4>{{naysCount}}</h4>
            </div>
          </div>
          <h4 *ngIf="!topic$.open">{{result}}</h4>
        </div>
        
      </div>
      <mat-card class="voting-card">
        <mat-card-content>
          <p>{{topic$.description}}</p>
        </mat-card-content>
        <div fxLayout="row" class="voting-card__actions">
          <button
            [disabled]="!topic$.open"
            (click)="submitVote(true)"
            mat-button
            color="primary">
              <mat-icon>thumb_up</mat-icon>
          </button>
          <button
            [disabled]="!topic$.open"
            (click)="submitVote(false)"
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
export class VotingComponent implements OnInit, OnDestroy {
  topic$: ITopic;
  voter$: Shaper;
  voters$: Shaper[];
  sub$;
  yaysCount: number = 0;
  naysCount: number = 0;
  yourVote: string;
  result: string;
  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private votesService: VotesService) {

  }

  get isTopicOwner() {
    return (this.topic$ != null && this.voter$ != null && this.topic$.ownerId === this.voter$.$key);
  }

  get canCloseVote() {
    return this.isTopicOwner && this.topic$.open
  }

  ngOnInit() {
    const topic$ = this.route.params
      .switchMap((params: Params) => this.votesService.getTopic(params['id']))
      .switchMap((topic: ITopic) => {
        return this.userService.getCurrentUser()
          .map((user) => ({ user, topic }))
      })
      .switchMap(({ user, topic }) => this._joinTopic(user, topic))
      .switchMap(({ user, topic }) => this._setupVoters(user, topic))
      .switchMap(({ user, topic }) => {
        return this.votesService.votes$.map(votes => ({ user, votes, topic }))
      })
      .map(({ user, votes, topic }) => this._tabulateResults(votes, user, topic));

    this.sub$ = topic$.subscribe();
  }

  ngOnDestroy() {
    this.votesService.leaveTopic(this.topic$.$key, this.voter$.$key);
    this.sub$.unsubscribe();
  }

  submitVote(vote: boolean) {
    this.votesService.voteOnTopic(this.topic$.$key, this.voter$.$key, vote);
  }

  closeVote() {
    if (this.isTopicOwner) {
      const newTopic = Object.assign(
        {},
        this.topic$,
        { open: false },
        { votedOn: Date.now() }
        ) as ITopic;
      this.votesService.updateTopic(this.topic$.$key, newTopic);
    }
  }

  private _joinTopic(user: Shaper, topic: ITopic) {
    this.topic$ = topic;
    if (!topic.open) {
      return Observable.of({ topic, user });
    }
    return this.votesService.joinTopic(topic.$key, user.$key, user)
      .then(() => ({ user, topic }))
      .catch(() => console.log('error joining topic'));
  }

  private _setupVoters(user: Shaper, topic: ITopic) {
    this.voter$ = user;

    if (!topic.open) {
      return Observable.of({ topic, user });
    }

    return this.votesService.getVotersForTopic(topic.$key).map(voters => {
      this.voters$ = Object.keys(voters).map(key => voters[key]);
      return { user, topic };
    });
  }

  private _tabulateResults(vote, user, topic) {
    const votes = vote[topic.$key];
    if (votes == null) {
      return;
    }
    const results = Object.keys(votes).reduce(
      (count, key) => {
        if (votes[key].vote) {
          count.yaysCount += 1;
        } else {
          count.naysCount += 1;
        }
        return count;
      },
      { yaysCount: 0, naysCount: 0 }
    );
    if (votes[user.$key]) {
      this.yourVote = votes[user.$key].vote ? 'Yes!' : 'No!';
    }
    const { yaysCount, naysCount } = results;
    let result = '';
    if (yaysCount > naysCount)  {
      result = 'The Yays have it!'
    } else if (yaysCount === naysCount) {
      result = `It's a tie!`;
    } else {
      result = 'the Nays have it!';
    }
    this.result = result;
    this.yaysCount = yaysCount;
    this.naysCount = naysCount;
  }

}
