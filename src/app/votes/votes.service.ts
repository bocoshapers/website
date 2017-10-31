import { Injectable } from '@angular/core';
import { Shaper } from '../components/team/team.service';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {UserService} from '../services/user.service';
import {environment} from '../../environments/environment';

export interface ITopic {
  $key?: string;
  description: string;
  name: string;
  ownerId: string;
  anonymous: boolean;
  open: boolean;
  votedOn?: Date;
  votes?: IVote[];
  voters?: Shaper[];
}

export interface IVote {
  shaperId: string;
  topicId: string;
  vote: boolean;
}

export interface IVoteStore {
  [topicId: string]: {
    [voterId: string]: {
      shaperId: string;
      voterId: string;
      vote: boolean;
    }
  }
}

@Injectable()
export class VotesService {
  topics$: FirebaseListObservable<ITopic[]>;
  votes$: FirebaseObjectObservable<IVoteStore>;

  constructor(private db: AngularFireDatabase, private userService: UserService) {
    this.topics$ = db.list('/votes/topic');
    this.votes$ = db.object('/votes/vote');
  }

  addTopic(topic: Partial<ITopic> | ITopic) {
    return this.userService.getCurrentUser()
      .map((cs: any) => {
        topic.ownerId = cs.$key;
        return this.topics$.push(topic);
      });
  }

  getTopic(topicKey: string) {
    return this.db.object(`/votes/topic/${topicKey}`);
  }

  getVotersForTopic(topicKey) {
    return this.db.object(`votes/voters/${topicKey}`);
  }

  joinTopic(topicKey, voterKey, voter) {
    this.setupDisconnect(topicKey, voterKey);
    return this.db.object(`/votes/voters/${topicKey}/${voterKey}`)
      .set(voter);
  }

  leaveTopic(topicKey, voterKey) {
    const voter = this.db.object(`/votes/voters/${topicKey}/${voterKey}`);
    return voter.remove();
  }

  updateTopic(topicKey: string, topic) {
    return this.db.object(`/votes/topic/${topicKey}`).set(topic)
      .then(topic => topic);
  }

  setupDisconnect(topicKey: string, voterKey: string) {
    if (!environment.production) {
      return;
    }
    const ref = this.db.database.ref(`/votes/voters/${topicKey}/${voterKey}`);
    ref.onDisconnect().remove();
  }

  voteOnTopic(topicId: string, shaperId:string, vote: boolean) {
    const v = {
      shaperId,
      topicId,
      vote
    };
    return this.db.object(`/votes/vote/${topicId}/${shaperId}`).set(v);
  }
}
