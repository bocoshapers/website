
import { RouterModule, Routes } from '@angular/router';
import { VotesComponent } from './votes/votes.component';
import { UserGuardService } from '../services/user-guard.service';
import { NgModule } from '@angular/core';
import {VotingComponent} from './voting/voting.component';

const VOTES_ROUTES: Routes = [
  { path: '', component: VotesComponent, canActivate: [UserGuardService] },
  { path: ':id', component: VotingComponent, canActivate: [UserGuardService] }
];

@NgModule({
  imports: [RouterModule.forChild(VOTES_ROUTES)],
  exports: [RouterModule]
})
export class VotesRoutes { }
