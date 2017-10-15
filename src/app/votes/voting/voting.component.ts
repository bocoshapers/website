import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../../services/user.service';
import {ITopic, VotesService} from '../votes.service';
import contains from 'ramda/src/contains';
import { Shaper } from '../../components/team/team.service';

@Component({
  selector: 'boco-voting',
  template: `
    <ng-container *ngIf="topic$ != null">
      <md-toolbar>
        <h1>{{topic$.name}}</h1>
        <span class="boco-spacer"></span>
      </md-toolbar>
      <div class="voting-stats">
        <div fxLayout="row" class="voters">
          <md-chip-list>
            <md-chip class="voter-chip --primary" *ngFor="let voter of topic$.voters">
              <img class="voter-img" [src]="voter.imageFile">
              <span class="voter-img__spacer"></span>
              {{voter.first}}
            </md-chip>
          </md-chip-list>
        </div>
        
        <div class="voting-results">
          <h1>yays {{yaysCount}}</h1>
          <h2>nays {{naysCount}}</h2>
        </div>
        
        
      </div>
      <md-card class="voting-card">
        <md-card-content>
          <p>{{topic$.description}}</p>
        </md-card-content>
        <div fxLayout="row" class="voting-card__actions">
          <button
            (click)="submitVote(true)"
            md-raised-button>
            Yay
          </button>
          <button
            (click)="submitVote(false)"
            md-raised-button
            color="warn">
            Nay
          </button>
        </div>
        <p *ngIf="yourVote != null">You voted: {{yourVote}}</p>
      </md-card>
      
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
      margin: 3rem;
    }
    
    .voting-stats {
      margin: 3em 0.5em;
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
    
    
    .voting-card__actions button {
      width: 50%;
    }
  `]
})
export class VotingComponent implements OnInit, OnDestroy {
  topic$: ITopic;
  voter$: Shaper;
  votes$;
  sub$;
  yaysCount: number = 0;
  naysCount: number = 0;
  yourVote: string;
  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private votesService: VotesService) { }

  ngOnInit() {
    const topic$ = this.route.params
      .switchMap((params: Params) => this.votesService.getTopic(params['id']))
      .switchMap((topic: ITopic) => {
        return this.userService.getCurrentUser()
          .map((user) => ({ user, topic }))
      })
      .map(({ user, topic }) => this._setupTopic(user, topic))
      .switchMap(({ user, topic }) => {
        return this.votesService.votes$.map(votes => ({ user, votes, topic }))
      })
      .map(({ user, votes, topic }) => this._tabulateResults(votes, user, topic));

    this.sub$ = topic$.subscribe();
  }

  ngOnDestroy() {
    const filteredVoters = this.votesService.removeVoterFromTopic(this.voter$, this.topic$.voters);
    const newTopic = Object.assign({}, this.topic$, { voters: filteredVoters });
    this.sub$.unsubscribe();
    this.votesService.updateTopic(this.topic$.$key, newTopic)
      .then(() => void 0);
  }

  submitVote(vote: boolean) {
    this.votesService.voteOnTopic(this.topic$.$key, this.voter$.id, vote);
  }

  private _setupTopic(user: Shaper, topic: ITopic) {
    this.topic$ = topic;
    const _user = Object.assign({}, user, { id: user.$key });
    this.voter$ = _user;
    const voters = topic.voters || [];
    const hasUser = contains(_user, voters);
    // to handle removing a user on tab close
    this.votesService.setupDisconnect(topic.$key, _user, voters);
    if (!hasUser) {
      const updateTopic = Object.assign({}, topic, { voters: [...voters, _user] });
      this.votesService.updateTopic(topic.$key, updateTopic)
        .then(topic => {
          return { topic, user: _user };
        })
    }
    return { user: _user, topic };
  }

  private _tabulateResults(vote, user, topic) {
    const votes = vote[topic.$key];
    if (votes == null) {
      return;
    }
    const result = Object.keys(votes).reduce(
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
    if (votes[user.id]) {
      this.yourVote = votes[user.id].vote ? 'Yay!' : 'Nay!';
    }
    this.yaysCount = result.yaysCount;
    this.naysCount = result.naysCount;
  }

}
