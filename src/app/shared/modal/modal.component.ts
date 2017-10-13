import {Component, Input} from '@angular/core';

@Component({
  selector: 'boco-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() trigger: boolean;
}
