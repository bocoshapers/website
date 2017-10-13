import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VotesService } from './votes.service';
import { VotesComponent } from './votes/votes.component';
import { VotesRoutes } from './votes.routes';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    VotesRoutes
  ],
  providers: [VotesService],
  declarations: [VotesComponent]
})
export class VotesModule { }
