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
  votes?: IVote[];
  voters?: Shaper[];
}

export interface IVote {
  shaperId: string;
  topicId: string;
  vote: boolean;
}

interface IVotesStore {
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
  votes$: FirebaseObjectObservable<IVotesStore>;

  constructor(private db: AngularFireDatabase, private userService: UserService) {
    this.topics$ = db.list('/votes/topic');
    this.votes$ = db.object('/votes/vote');
  }

  addTopic(topic: Partial<ITopic> | ITopic) {
    return this.userService.getCurrentUser()
      .map((cs: any) => {
        const copy = Object.assign({}, cs, { id: cs.$key });
        topic.voters = [copy];
        topic.ownerId = copy.id;
        return this.topics$.push(topic);
      });
  }

  getTopic(topicKey: string) {
    return this.db.object(`/votes/topic/${topicKey}`);
  }

  updateTopic(topicKey: string, topic) {
    return this.db.object(`/votes/topic/${topicKey}`).set(topic)
      .then(topic => topic);
  }

  setupDisconnect(topicKey: string, voterRm: Shaper, voters: Shaper[]) {
    if (!environment.production) {
      return;
    }
    const ref = this.db.database.ref(`/votes/topic/${topicKey}/voters`);
    const filteredVoters = this.removeVoterFromTopic(voterRm, voters);
    ref.onDisconnect().set(filteredVoters);
  }

  removeVoterFromTopic(voterRm: Shaper, voters: Shaper[]) {
    return voters.filter(v => v.id != voterRm.id);
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
