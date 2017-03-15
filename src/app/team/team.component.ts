import { Component, OnInit } from '@angular/core';
import { TeamService } from "./team.service";
import {Shaper, shuffle} from "./team.data";
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';

@Component({
  selector: 'boco-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
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
