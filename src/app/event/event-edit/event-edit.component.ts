import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {EventsService} from "../events.service";
// import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import {MdSnackBar} from "@angular/material";
import {BocoSnackbarComponent} from "../../shared/boco-snackbar/boco-snackbar.component";
import {UpdateEvent} from "../event-editor/event-editor.component";

@Component({
  selector: 'boco-event-edit',
  styles: [``],
  template: `
    <ng-container *ngIf="$editEvent">
      
      <boco-event-editor
        (save)="onEventSave($event)"
        (cancel)="onEventCancel()"
        [preview]="true"
        [event]="$editEvent">
      </boco-event-editor>
      
    </ng-container>
  `
})
export class EventEditComponent implements OnInit, OnDestroy {
  public $editEvent;
  private $sub;
  constructor(
    private bocoSnackbar: MdSnackBar,
    private eventsService: EventsService,
    private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.$sub = this.route.params
      .switchMap((params: Params) => this.eventsService.getEvent(params['slug']))
      .map(event => {this.$editEvent = event})
      .subscribe();
  }

  onEventSave(update) {
    this._afterEdit(update);
  }

  onEventCancel() {
  }

  ngOnDestroy() {
    this.$sub.unsubscribe();
  }

  private _afterEdit(update) {
    if (update.event.photo != null) {
      const isFile: any = update.event.photo;
      if (isFile instanceof File) {
        this._uploadEventPhoto(update.$key, isFile, update.event)
          .then(withImg => this._updateEvent(withImg));
      } else {
        this._updateEvent(update)
      }
    }
  }

  private _updateEvent(update: UpdateEvent) {
    this.eventsService.updateEvent(update)
      .then(snapshot => this.showSnackBar('Updates Saved!'))
      .catch(e => console.log('update error', e))
  }

  private _uploadEventPhoto(key, photoFile, event) {
    return this.eventsService.uploadEventPhoto(key, photoFile)
      .then(fileRef => {
        event.photo = fileRef.downloadURL;
        return { $key: key, event }
      })
      .catch(e => console.log('image upload error', e));
  }

  private showSnackBar(message) {
    console.log('snap', message);
    let snackBarRef = this.bocoSnackbar.openFromComponent(BocoSnackbarComponent, {
      duration: 3500
    });
    snackBarRef.instance.message = message;
  }
}
