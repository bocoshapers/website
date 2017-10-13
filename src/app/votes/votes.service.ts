import { Injectable } from '@angular/core';
import { Shaper } from '../components/team/team.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { UserService } from '../services/user.service';

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

@Injectable()
export class VotesService {
  topics$: FirebaseListObservable<ITopic[]>;
  constructor(private db: AngularFireDatabase) {
    this.topics$ = db.list('/votes');
  }

  addTopic(topic: Partial<ITopic> | ITopic) {
    return this.topics$.push(topic);
  }
}
