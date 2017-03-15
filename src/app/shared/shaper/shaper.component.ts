import {Component, Input} from '@angular/core';
import {Shaper} from "../../team/team.data";

@Component({
  selector: 'boco-shaper',
  templateUrl: 'shaper.component.html',
  styleUrls: ['shaper.component.css']
})
export class ShaperComponent {
  @Input() shaper: Shaper;
  @Input() detail?: boolean;
}
