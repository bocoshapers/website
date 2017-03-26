import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {UserService} from "../../user.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import 'rxjs/add/operator/switchMap';
import {AuthService} from "../../auth.service";
import {Shaper} from "../../../team/team.data";

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
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.router.navigate([{ outlets: { auth: ['auth'] }}]);
    this.route.params
      .switchMap((params: Params) => this.userService.getShaper(params['id']))
      .subscribe((shaper) => {
        this.user = shaper;
      });
  }

  onFileSelect(ev) {
    let filesList = ev.target.files;
    if (filesList.length === 1) {
      this._uploadProfilePic(filesList[0]);
    }
  }

  save(shaper) {
    this.userService.updateShaper(shaper)
      .subscribe((shaper) => this.editingProfile = false);
  }

  editProfile() {
    this.editingProfile = !this.editingProfile;
  }

  private _uploadProfilePic(file) {
    this.auth.getAuth
      .switchMap(auth => this.userService.uploadProfileImage(auth.uid, file))
      .switchMap(fileRef => {
        let shaper = Object.assign({}, this.user);
        shaper.imageFile = fileRef.downloadURL;
        return this.userService.updateShaper(shaper);
      })
      .subscribe((success) => console.log('shaper', success, 'updated'));
  }

}
