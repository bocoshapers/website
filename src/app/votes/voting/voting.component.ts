import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../../services/user.service';
import {ITopic, VotesService} from '../votes.service';
import { Shaper } from '../../components/team/team.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

@Component({
  selector: 'boco-voting',
  template: `
    <boco-voting-detail
      [topic]="topic"
      [topicMeta]="topicMeta"
      [voters]="voters"
      [shaper]="voter$"
      (onCloseVote)="closeVote()"
      (onSubmitVote)="submitVote($event)">
    </boco-voting-detail>
  `
})
export class VotingComponent implements OnInit, OnDestroy {
  topic: ITopic;
  voter$: Shaper;
  voters: Shaper[];
  votes: any;
  sub$;
  topicMeta: { yesCount: number, noCount: number, yourVote: string, result: string } = {
    yesCount: 0,
    noCount: 0,
    yourVote: '',
    result: ''
  };
  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private votesService: VotesService) {

  }

  get isTopicOwner() {
    return (this.topic != null && this.voter$ != null && this.topic.ownerId === this.voter$.$key);
  }

  ngOnInit() {
    const topic$ = this.route.params
      .switchMap((params: Params) => this.votesService.getTopic(params['id']))
      .switchMap((topic: ITopic) => {
        return this.userService.getCurrentUser().map((user: Shaper) => {
          return { user, topic }
        })
    })
      .switchMap(({ user, topic }) => this._handleResults(user, topic));
    this.sub$ = topic$.subscribe();
  }

  private _handleResults(user, topic) {
    this.topic = topic;
    this.voter$ = user;
    if (!topic.open) {
      return Observable.of(this._tabulateResults(topic.votes, user));
    } else {
      return this._joinTopic(user, topic)
        .switchMap(({user, topic}) => {
          return this._setupVoters(user, topic)
            .switchMap(({ user, topic }) => {
              return this.votesService.votes$.map(votes => {
                return { user, votes: votes[topic.$key] };
              })
            })
            .map(({ user, votes }) => this._tabulateResults(votes, user));
        })
    }
  }

  ngOnDestroy() {
    this.votesService.leaveTopic(this.topic.$key, this.voter$.$key);
    this.sub$.unsubscribe();
  }

  submitVote(vote: boolean) {
    this.votesService.voteOnTopic(this.topic.$key, this.voter$.$key, vote);
  }

  closeVote() {
    if (this.isTopicOwner) {
      const newTopic = Object.assign(
        {},
        this.topic,
        { open: false },
        { votedOn: Date.now() },
        { votes: this.votes }
        ) as ITopic;
      this.votesService.updateTopic(this.topic.$key, newTopic);
    }
  }

  private _joinTopic(user: Shaper, topic: ITopic) {
    const promise = this.votesService.joinTopic(topic.$key, user.$key, user)
      .then(() => ({ user, topic }));
    return Observable.fromPromise(promise as any);
  }

  private _setupVoters(user: Shaper, topic: ITopic) {
    return this.votesService.getVotersForTopic(topic.$key).map(voters => {
      this.voters = Object.keys(voters).map(key => voters[key]);
      return { user, topic };
    });
  }

  private _tabulateResults(topicVotes, user) {
    if (topicVotes == null) {
      return;
    }
    this.votes = topicVotes;
    const results = Object.keys(topicVotes).reduce(
      (count, key) => {
        if (topicVotes[key].vote) {
          count.yaysCount += 1;
        } else {
          count.naysCount += 1;
        }
        return count;
      },
      { yaysCount: 0, naysCount: 0 }
    );
    if (topicVotes[user.$key]) {
      this.topicMeta.yourVote = topicVotes[user.$key].vote ? 'Yes!' : 'No!';
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
    this.topicMeta.result = result;
    this.topicMeta.yesCount = yaysCount;
    this.topicMeta.noCount = naysCount;
  }

}
