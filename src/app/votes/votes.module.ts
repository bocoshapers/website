import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VotesService } from './votes.service';
import { VotesComponent } from './votes/votes.component';
import { VotesRoutes } from './votes.routes';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { VotingComponent } from './voting/voting.component';
import { VotingDetailComponent } from './voting-detail/voting-detail.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    VotesRoutes
  ],
  providers: [VotesService],
  declarations: [VotesComponent, VotingComponent, VotingDetailComponent]
})
export class VotesModule { }
