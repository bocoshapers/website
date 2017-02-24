import {Shaper} from "./data";
/**
 * Created by githop on 2/24/17.
 */

interface Profile extends Shaper {
  profileBack: HTMLElement;
  profileFront: HTMLElement;
}

export class ShaperProfile implements Profile{
  first:string;
  last: string;
  bio: string;
  imageFile: string;
  profileBack: HTMLElement;
  profileFront: HTMLElement;

  constructor(shaper: Shaper) {
    Object.keys(shaper).forEach(key => {
      this[key] = shaper[key];
    });
  }

  toggleCard(ev: Event) {
    this.profileBack.classList.toggle('hide__elm');
    this.profileFront.classList.toggle('hide__elm');
  }

  getProfileElm() {
    let template = `
          <div class="shaper__profile">
            <div class="profile__front" id="profile__front">
              <div class="shaper__pic">
                <img src="${this.imageFile}"/>
              </div>
              <h4>${this.first} ${this.last}</h4>
            </div>

            <div class="profile__back" id="profile__back">
            <h1>${this.first} ${this.last}</h1>
              <div class="shaper__pic">
                <img src="${this.imageFile}"/>
              </div>
              <div class="shaper__bio"><p>${this.bio}</p></div>
            </div>
          </div>`;

    let parent = document.createElement('div');
    parent.innerHTML = template;
    var nodeList = Array.prototype.slice.call(parent.childNodes[0].childNodes);

    for (let node of nodeList) {
      if (node.nodeName === 'DIV') {
        console.log('hey now!', node.classList);
      }
    }
    return parent;
  }

  createProfileDiv() {
    let div = document.createElement('div');
    div.className = 'shaper__profile';

    let {first, last, imageFile, bio} = this;

    //card front
    let front = document.createElement('div');
    front.className = 'profile__front';
    let h4 = document.createElement('h4');
    h4.textContent = first;

    let shaperPicDiv = document.createElement('div');
    let img = document.createElement('img');

    shaperPicDiv.className = 'shaper__pic';
    img.src = imageFile;
    shaperPicDiv.appendChild(img);

    for (let child of [shaperPicDiv, h4]) {
      front.appendChild(child);
    }
    // card back
    let back = document.createElement('div');
    back.classList.add('profile__back', 'hide__elm');

    let h1 = document.createElement('h2');
    h1.textContent= `${first} ${last}`;

    let bioDiv = document.createElement('div');
    bioDiv.className = 'shaper__bio';

    let bioP = document.createElement('p');
    bioP.innerText = bio;
    bioDiv.appendChild(bioP);

    let backPic = shaperPicDiv.cloneNode(true);

    for (let child of [h1, backPic, bioDiv]) {
      back.appendChild(child);
    }

    for (let content of [front, back]) {
      div.appendChild(content);
    }

    this.profileFront = front;
    this.profileBack = back;
    console.log('hmm', this.profileBack);
    this._attachListener(div, 'click', this.toggleCard.bind(this));
    return div;
  }

  private _attachListener(elm: HTMLElement, event:string, handler:any) {
    elm.addEventListener(event, handler);
  }

}