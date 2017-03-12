import {Component, OnInit, trigger, state, style, transition, animate} from '@angular/core';
import {TeamService} from "./team.service";
import {Shaper} from "./team.data";

@Component({
  selector: 'boco-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css'],
  // animations: [
  //   trigger('flyInOut', [
  //     state('in', style({opacity: 1, transform: 'translateY(0)'})),
  //     transition('void => *', [
  //       style({
  //         opacity: 0,
  //         transform: 'translateY(-100%)'
  //       }),
  //       animate('0.2s ease-in')
  //     ]),
  //     transition('* => void', [
  //       animate('0.2s 10 ease-out', style({
  //         opacity: 0,
  //         transform: 'translateY(100%)'
  //       }))
  //     ])
  //   ])
  // ]
})
export class TeamComponent implements OnInit {
  public shapers: Shaper[][];
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
