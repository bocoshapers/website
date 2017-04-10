import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  Pipe,
  PipeTransform
} from '@angular/core';
import {TempEvent} from "../events.service";
import clone from 'ramda/src/clone';
import compose from 'ramda/src/compose';
import join from 'ramda/src/join';
import split from 'ramda/src/split';

export interface UpdateEvent {
  $key?: string
  event?: TempEvent
}

@Pipe({name: 'slugify'})
export class SlugifyPipe implements PipeTransform {
  transform(value: string): string {
    return slugify(value);
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
  template: `
    <div *ngIf="_event">
      <md-toolbar color="primary">
        <h5>{{event?.$key ? 'Edit' : 'Add'}} {{_event.name}}</h5>
        <span class="boco-spacer"></span>
        <md-slide-toggle
          [color]="'warn'"
          (change)="_event.published = !_event.published"
          [checked]="_event.published">
          Published
        </md-slide-toggle>
      </md-toolbar>
      <div fxLayout="row">
        <div fxFlex="{{preview ? '66' : '100'}}">
          <form #eventForm="ngForm" (ngSubmit)="onSave(_event)">
            <md-card>
              <md-card-content>
                
                <div>
                  <div class="non-md__form-group">
                    <div>
                      <label for="eventImg">{{event?.key ? 'Replace' : 'Upload'}} Image</label>
                      <input
                        id="eventImg"
                        type="file"
                        name="eventPhoto"
                        (change)="handleFile($event)">
                      
                      <div *ngIf="_event.photo == null" class="invalidControl">
                        <small>Photo is required</small>
                      </div>
                    </div>

                    <div>
                      <label for="eventDate">Date / Time</label>
                      <input
                        id="eventDate"
                        required
                        [(ngModel)]="_event.datetime"
                        name="eventDate"
                        #dateTime="ngModel"
                        placeholder="Event Date"
                        type="datetime-local">
                      
                      <div *ngIf="dateTime.errors" class="invalidControl">
                        <small>Date / Time is required</small>
                      </div>
                    </div>
                  </div>
                </div>

                <div fxLayout="column" class="md__form--group">
                  
                  <md-input-container>
                    <input
                      required
                      mdInput
                      [(ngModel)]="_event.name"
                      name="eventName"
                      #name="ngModel"
                      placeholder="Event name">
                    
                    <md-hint
                      *ngIf="name.errors" 
                      class="invalidControl"
                      align="start">Name is required
                    </md-hint>
                  </md-input-container>

                  <md-input-container>
                    <input
                      required
                      mdInput
                      [(ngModel)]="slug"
                      name="eventSlug"
                      #slugErr="ngModel"
                      placeholder="Event Slug">
                    
                    <md-hint *ngIf="!slugErr.errors">
                      {{slug | slugify}}
                    </md-hint>
                    
                    <md-hint
                      *ngIf="slugErr.errors" 
                      class="invalidControl"
                      align="start">
                      Path slug is required
                    </md-hint>
                  </md-input-container>
                  
                  <md-input-container>
                    <input
                      mdInput
                      required
                      [(ngModel)]="_event.location"
                      placeholder="Event Location"
                      #location="ngModel"
                      name="eventLocation">

                    <md-hint
                      *ngIf="location.errors" 
                      class="invalidControl"
                      align="start">
                      Location is required
                    </md-hint>
                  </md-input-container>

                  <md-input-container>
                    <input
                      mdInput
                      required
                      [(ngModel)]="_event.smLinks.facebook"
                      placeholder="Facebook link"
                      name="smLinkFacebook"
                      #fbUrl="ngModel"
                      type="url">

                    <md-hint
                      *ngIf="fbUrl.errors" 
                      class="invalidControl"
                      align="start">
                      Facebook url is required.
                    </md-hint>

                  </md-input-container>

                  <md-input-container>
                    <input
                      required
                      mdInput
                      [(ngModel)]="_event.smLinks.twitter"
                      placeholder="twitter link"
                      name="smLinkTwitter"
                      #twitterUrl="ngModel"
                      type="url">

                    <md-hint
                      *ngIf="twitterUrl.errors" 
                      class="invalidControl"
                      align="start">
                      twitter url is required.
                    </md-hint>

                  </md-input-container>

                  <md-input-container>
                    <input
                      required
                      mdInput
                      [(ngModel)]="_event.smLinks.eventBrite"
                      placeholder="EventBrite link"
                      name="smLinkEventBrite"
                      #ebUrl="ngModel"
                      type="url">

                    <md-hint
                      *ngIf="ebUrl.errors" 
                      class="invalidControl"
                      align="start">
                      EventBrite is required.
                    </md-hint>

                  </md-input-container>

                  <md-input-container>
                      <textarea
                        mdInput
                        required
                        [(ngModel)]="_event.description"
                        name="evetnDescription"
                        #description="ngModel"
                        placeholder="Event Description">
                      </textarea>

                    <md-hint
                      *ngIf="description.errors" 
                      class="invalidControl"
                      align="start">
                      Description is required
                    </md-hint>
                  </md-input-container>
                </div>
              </md-card-content>
              <md-card-actions>
                <button type="submit" md-button
                        [disabled]="!eventForm.form.valid || !_event?.photo">save event</button>
                <ng-container *ngIf="preview">
                  <button md-button (click)="onCancel()">cancel</button>
                  <a md-button [routerLink]="'/events/admin'">back</a>
                </ng-container>
              </md-card-actions>
            </md-card>
          </form>
        </div>

        <div fxFlex="33" *ngIf="preview">
          <div class="downscale">
            <boco-event-detail [shaperEvent]="_event"></boco-event-detail>
          </div>
        </div>
      </div>
    </div>
  `
})
export class EventEditorComponent implements OnChanges {
  public _event: TempEvent;
  public slug: string = '';
  @Input() event: TempEvent;
  @Input() preview: boolean = false;
  @Output() save = new EventEmitter<TempEvent | UpdateEvent>();
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
      this._event = clone(src);
    }
  }

  private _reset() {
    this._setup();
  }
}
