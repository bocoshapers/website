

import './styles.css';
import {Shapers, Shaper} from "./data";


document.addEventListener('DOMContentLoaded', run);

function run(event: Event) {
  let shaperTeamDiv = <HTMLElement> document.getElementById('shaper__team');
  let shaperRows = createShaperRows(shuffle(Shapers));

  shaperRows.forEach((row) => {
    let currentRow = shaperTeamDiv.appendChild(createShaperRowDiv());
    row.forEach((shaper: Shaper) => {
      currentRow.appendChild(createShaperProfileDiv(shaper))
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

function createShaperProfileDiv(shaper: Shaper) {
  let div = document.createElement('div');
  div.className = 'shaper__profile';

  let {first, imageFile} = shaper;

  let h4 = document.createElement('h4');
  h4.textContent = first;

  let shaperPicDiv = document.createElement('div');
  let img = document.createElement('img');

  shaperPicDiv.className = 'shaper__pic';
  img.src = imageFile;
  shaperPicDiv.appendChild(img);

  for (let child of [shaperPicDiv, h4]) {
    div.appendChild(child);
  }

  return div;
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