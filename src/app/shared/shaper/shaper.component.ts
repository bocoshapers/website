import {Component, Input} from '@angular/core';
import {Shaper} from "../../components/team/team.service";

@Component({
  selector: 'boco-shaper',
  styles: [`
    .shaper__profile {
      /*width: 49%;*/
      /*border: 1px solid #777;*/
    }

    .shaper__pic {
      /*width: 300px;*/
      /*height: 200px;*/
    }

    .shaper__pic img {
      width: 165px;
      height: 165px;
      object-fit: contain;
      background: rgb(0, 94, 153);
    }

    .shaper__detail h4 {
      margin: 0;
      margin-top: 0.5em;
      display: inline-block;
    }

    .shaper__detail .shaper__pic {
      width: 100%;
      height: 13em;
      background-size: contain;
      background-position: center 0;
      background-repeat: no-repeat;
    }

    .shaper__detail .shaper__pic img {
      /*object-fit: unset;*/
    }

    .shaper__bio {
      font-size: 2.4vh;
    }
  `],
  template: `
    <div class="shaper__profile">

      <div *ngIf="!detail">
        <div class="shaper__pic">
          <img [src]="shaper.imageFile"/>
        </div>
        <h4>{{shaper.first}}</h4>
      </div>

      <div *ngIf="detail === true" class="shaper__detail">
        <div class="shaper__pic" [ngStyle]="{'background-image': 'url('+shaper.imageFile+')'}">
        </div>
        <h4>{{shaper.first}} {{shaper.last}}</h4>
        <div class="shaper__bio">
          <p>{{shaper.bio}}</p>
        </div>
      </div>

    </div>
  `
})
export class ShaperComponent {
  @Input() shaper: Shaper | null;
  @Input() detail?: boolean;
}
