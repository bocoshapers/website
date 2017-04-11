/**
 * Created by githop on 4/8/17.
 */

import {Injectable} from "@angular/core";
import * as firebase from 'firebase';

@Injectable()
export class UploadService {

  uploadImage($key, imageFile) {
    return firebase.storage().ref(`/assets/images/${$key}/${imageFile.name}`).put(imageFile);
  }
}
