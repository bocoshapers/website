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
        <md-card>
          <md-toolbar color="primary">My Profile
            <button md-button (click)="editProfile()">edit profile</button>
          </md-toolbar>
          <div class="user__profile">

            <div class="user__info">
              <md-card>
                <md-card-title>My Account</md-card-title>
                <md-card-subtitle>{{user.first}} {{user.last}}</md-card-subtitle>
                <md-card-content>
                  {{user.bio}}
                </md-card-content>

                <!--<md-card-actions>-->
                <!--<button md-button (click)="editProfile()">edit profile</button>-->
                <!--</md-card-actions>-->
              </md-card>
            </div>

            <div class="profile__pic">
              <md-card>
                <img md-card-image [src]="user.imageFile"/>
                <md-card-footer>
                  <h4>Profile Pic</h4>
                </md-card-footer>
              </md-card>
            </div>
          </div>

        </md-card>

        <boco-modal [trigger]="editingProfile">
          <md-card>
            <div class="user__profile">

              <div class="user__info">
                <md-card>
                  <md-card-title>My Account</md-card-title>


                  <md-card-subtitle>
                    <md-input-container>
                      <input mdInput placeholder="First Name" [(ngModel)]="user.first" />
                    </md-input-container>


                    <md-input-container>
                      <input mdInput placeholder="Last Name" [(ngModel)]="user.last" />
                    </md-input-container>
                  </md-card-subtitle>
                  <md-card-content>
                    <md-input-container>
                      <textarea mdInput cols="100" rows="5" placeholder="Bio" [(ngModel)]="user.bio"></textarea>
                    </md-input-container>
                  </md-card-content>
                </md-card>
              </div>

              <div class="profile__pic">
                <md-card>
                  <img md-card-image [src]="user.imageFile"/>
                  <md-card-content>
                    <input id="profPic" type="file" (change)="onFileSelect($event)"/>
                    <h5>Upload new profile pic</h5>
                  </md-card-content>
                </md-card>
              </div>
            </div>

            <md-card-actions>
              <button md-button (click)="save(user)">save</button>
              <button md-button (click)="editingProfile = false">cancel</button>
            </md-card-actions>
          </md-card>
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
