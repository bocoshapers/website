import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {ActivatedRoute, Params} from "@angular/router";
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import {AuthService} from "../../services/auth.service";
import {Shaper} from "../../components/team/team.service";

@Component({
  selector: 'boco-user',
  styles: [`    
    .user__wrapper {
      padding: 1.5em;
    }

    .user__profile {
      display: flex;
      flex-direction: row;
    }

    .user__profile div {
      padding: 0.5em;
    }

    .user__info {
      flex: 2;
    }

    .profile__pic {
      flex: 1;
    }

    @media only screen
    and (min-device-width: 320px)
    and (max-device-width: 480px)
    and (-webkit-min-device-pixel-ratio: 2) {
      .user {
        margin: 0;
        padding: 0;
      }
    }
  `],
  template: `
    <div class="user">
      <div class="user__wrapper" *ngIf="user">
        <mat-card>
          <mat-toolbar color="primary">My Profile
            <button mat-button (click)="editProfile()">edit profile</button>
          </mat-toolbar>
          <div class="user__profile">

            <div class="user__info">
              <mat-card>
                <mat-card-title>My Account</mat-card-title>
                <mat-card-subtitle>{{user.first}} {{user.last}}</mat-card-subtitle>
                <mat-card-content>
                  {{user.bio}}
                </mat-card-content>

                <!--<mat-card-actions>-->
                <!--<button mat-button (click)="editProfile()">edit profile</button>-->
                <!--</mat-card-actions>-->
              </mat-card>
            </div>

            <div class="profile__pic">
              <mat-card>
                <img mat-card-image [src]="user.imageFile"/>
                <mat-card-footer>
                  <h4>Profile Pic</h4>
                </mat-card-footer>
              </mat-card>
            </div>
          </div>

        </mat-card>

        <boco-modal [trigger]="editingProfile">
          <mat-card>
            <div class="user__profile">

              <div class="user__info">
                <mat-card>
                  <mat-card-title>My Account</mat-card-title>


                  <mat-card-subtitle>
                    <mat-form-field>
                      <input matInput placeholder="First Name" [(ngModel)]="user.first" />
                    </mat-form-field>


                    <mat-form-field>
                      <input matInput placeholder="Last Name" [(ngModel)]="user.last" />
                    </mat-form-field>
                  </mat-card-subtitle>
                  <mat-card-content>
                    <mat-form-field>
                      <textarea matInput cols="100" rows="5" placeholder="Bio" [(ngModel)]="user.bio"></textarea>
                    </mat-form-field>
                  </mat-card-content>
                </mat-card>
              </div>

              <div class="profile__pic">
                <mat-card>
                  <img mat-card-image [src]="user.imageFile"/>
                  <mat-card-content>
                    <input id="profPic" type="file" (change)="onFileSelect($event)"/>
                    <h5>Upload new profile pic</h5>
                  </mat-card-content>
                </mat-card>
              </div>
            </div>

            <mat-card-actions>
              <button mat-button (click)="save(user)">save</button>
              <button mat-button (click)="editingProfile = false">cancel</button>
            </mat-card-actions>
          </mat-card>
        </boco-modal>
      </div>
    </div>
  `
})
export class UserComponent implements OnInit {
  public user: Shaper;
  public editingProfile: boolean = false;
  constructor(
    public auth: AuthService,
    private userService: UserService,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.userService.getShaper(params['id']))
      .map((shaper) => {
        this.user = shaper;
      })
      .subscribe();
  }

  onFileSelect(ev) {
    let filesList = ev.target.files;
    if (filesList.length === 1) {
      this._uploadProfilePic(filesList[0])
        .subscribe(() => {}, (err:any) => console.log('whoops', err));
    }
  }

  save(shaper) {
    this.userService.updateShaper(shaper)
      .map((shaper) => this.editingProfile = false)
      .subscribe();
  }

  editProfile() {
    this.editingProfile = !this.editingProfile;
  }

  private _uploadProfilePic(file) {
    return this.auth.getAuth
      .switchMap(auth => this.userService.uploadProfileImage(auth.uid, file))
      .switchMap(fileRef => {
        let shaper = Object.assign({}, this.user);
        shaper.imageFile = fileRef.downloadURL;
        return this.userService.updateShaper(shaper);
      });
  }

}
