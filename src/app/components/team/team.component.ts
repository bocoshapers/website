import { Component, OnInit } from '@angular/core';
import { TeamService } from "./team.service";
import { Shaper } from "./team.data";
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
