import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {ActivatedRoute, Params} from "@angular/router";
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import {AuthService} from "../../services/auth.service";
import {Shaper} from "../../components/team/team.data";

@Component({
  selector: 'boco-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
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
