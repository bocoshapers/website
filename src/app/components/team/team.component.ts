import { Component, OnInit } from '@angular/core';
import {Shaper, TeamService} from "./team.service";
import 'rxjs/add/operator/map';

@Component({
  selector: 'boco-team',
  styles: [`
    .shaper__team {
      /*display: flex;*/
      /*flex-direction: column;*/
    }

    .shaper__row {
      padding: 1em 0;
      float: left;
      width: 50%;
    }

    @media only screen
    and (min-device-width: 320px)
    and (max-device-width: 480px)
    and (-webkit-min-device-pixel-ratio: 2) {
      .shaper__row {
        width: 100%;
        float: none;
      }
    }`],
  template: `
    <boco-modal [trigger]="selectedShaper != null" (click)="selectShaper(null)">
      <boco-shaper *ngIf="selectedShaper" [shaper]="selectedShaper" [detail]="true"></boco-shaper>
    </boco-modal>

    <div class="shaper__team">
      <div *ngFor="let member of shapers | async" class="shaper__row">
        <boco-shaper (click)="selectShaper(member)" [shaper]="member"></boco-shaper>
      </div>
    </div>
  `
})
export class TeamComponent implements OnInit {
  public shapers: any;
  public selectedShaper: Shaper;
  constructor(public teamService: TeamService) {
  }

  ngOnInit() {
    this.shapers = this.teamService.shapers;
  }

  selectShaper(member: Shaper) {
    this.selectedShaper = member;
  }

}
