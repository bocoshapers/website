

import './styles.css';
import {Shapers, Shaper} from "./data";
import {ShaperProfile} from "./shaper-profile";


document.addEventListener('DOMContentLoaded', run);

function run(event: Event) {
  let shaperTeamDiv = <HTMLElement> document.getElementById('shaper__team');
  let shaperRows = createShaperRows(shuffle(Shapers));

  shaperRows.forEach((row) => {
    let currentRow = shaperTeamDiv.appendChild(createShaperRowDiv());
    row.forEach((shaper: Shaper) => {
      let Profile = new ShaperProfile(shaper);
      currentRow.appendChild(Profile.createProfileDiv());
    });
  });
}

function createShaperRows(shapersArr: Shaper[]) {
  let shaperRows = [];
  while (shapersArr.length) {
    shaperRows.push([shapersArr.pop(), shapersArr.pop()]);
  }
  return shaperRows;
}

function createShaperRowDiv() {
  let shaperRow = document.createElement('div');
  shaperRow.className = 'shaper__row';
  return shaperRow;
}


function shuffle<T>(array: T[]) {
  let currentIndex = array.length,
      temporaryValue,
      randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}