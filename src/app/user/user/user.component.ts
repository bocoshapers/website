import { Component, OnInit } from '@angular/core';
import {UserService} from "../../user.service";
import {Shaper} from "../../team/team.data";
import {ActivatedRoute, Params} from "@angular/router";
import 'rxjs/add/operator/switchMap';
import {AuthService} from "../../auth.service";

@Component({
  selector: 'boco-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public user: Shaper;
  constructor(
    public auth: AuthService,
    private userService: UserService,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.userService.getShaper(params['id']))
      .subscribe((shaper) => {
      console.log('huh', shaper);
      this.user = shaper
      });
  }

}
