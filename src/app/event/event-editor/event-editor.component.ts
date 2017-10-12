import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  Pipe,
  PipeTransform
} from '@angular/core';
import { ITempEvent } from "../events.service";
import clone from 'ramda/src/clone';
import compose from 'ramda/src/compose';
import join from 'ramda/src/join';
import split from 'ramda/src/split';
import pickAll from 'ramda/src/pickAll';

export interface UpdateEvent {
  $key?: string
  event?: ITempEvent | null
}

@Pipe({name: 'slugify'})
export class SlugifyPipe implements PipeTransform {
  transform(value: string): string {
    return slugify(value);
  }
}

@Pipe({name: 'time'})
export class TimePipe implements PipeTransform {
  transform(time: string) {
    if (time != null) {
      let [hour, min] = time.split(':');
      let hourNum = parseInt(hour, 0);
      let period;
      switch (true) {
        case (hourNum > 12 && hourNum < 24):
          hourNum -= 12;
          period = 'pm';
          break;
        case (hourNum === 0):
          hourNum = 12;
          period = 'am';
          break;
        case (hourNum === 12):
          period = 'pm';
          break;
        default:
          period = 'am';
          break;
      }
      return `${hourNum}:${min} ${period}`;
    }
    return '';
  }
}

const toLower = (s:string) => s.toLowerCase();

export function slugify(str: string): string {
  if (str != null) {
    return compose(toLower, compose(join('-'), split(' ')))(str);
  }
  return '';
}

export function deSlugify(slug: string): string {
  if (slug !== null) {
    return compose(join(' '), split('-'))(slug);
  }
}

@Component({
  selector: 'boco-event-editor',
  styles: [`
    .non-md__form-group {
      display: flex;
      flex-direction: row;
      justify-content: center;
    }
    
    .non-md__form-group div {
      margin: 3px;
      padding: 3px;
    }
    
    .md__form--group {
      width: 100%;
    }
    
    .downscale {
      transform: scale(0.5) translate(0, -50%);
    }
    
    .invalidControl {
      color: red;
    }
  `],
  templateUrl: './event-editor.component.html'
})
export class EventEditorComponent implements OnChanges {
  public _event: ITempEvent | null;
  public slug: string = '';
  @Input() event: ITempEvent | null;
  @Input() preview: boolean = false;
  @Output() save = new EventEmitter<ITempEvent | UpdateEvent | null>();
  @Output() cancel = new EventEmitter();

  ngOnChanges() {
    this._setup();
  }

  handleFile(ev) {
    this._event.photo = ev.target.files[0];
  }

  onCancel() {
    this._reset();
    this.cancel.emit();
  }

  onSave(event): void {
    if (this.slug) {
      event.slug = slugify(this.slug);
    }
    event.description.trim();
    if (this.event.$key) {
      this.save.emit({$key: this.event.$key, event})
    } else {
      this.save.emit(event);
    }
  }

  private _setup() {
    if (this.event != null) {
      let src = this.event;
      if (src.slug) {
        this.slug = deSlugify(src.slug);
      }
      let keys = [
        'photo',
        'slug',
        'name',
        'description',
        'location',
        'when',
        'published',
        'smLinks'
      ];
      let validKeys = pickAll(keys);
      this._event = clone(validKeys(src));
    }
  }

  private _reset() {
    this._setup();
  }
}
