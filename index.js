// Import stylesheets
import './style.css';
import { events } from './events.js';
import { classColors, characters } from './characters.js';

// Write Javascript code!
const calendar = document.getElementById('calendar');
const year = new Date().getUTCFullYear();
const month = (new Date().getUTCMonth() + 1).toString().padStart(2, 0);
const day = new Date().getUTCDate().toString().padStart(2, 0);
const weekday = new Date().getUTCDay();
const count = 7;
const offset = -1;
const today = new Date(`${year}-${month}-${day}T00:00`);

app.style.setProperty('--days', count);

let days = [];
for (let i = 0; i < count; i++) {
  let _d = new Date();
  _d.setTime(today.getTime());
  _d.setDate(today.getDate() + i + offset);
  days.push(_d);
}
const dayNames = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

days.forEach((d) => {
  let elem = document.createElement('div');
  elem.innerHTML = `
  <div class="date">${d.getDate()}</div>
  <div class="dayname">${dayNames[d.getDay()]}</div>
  `;
  elem.classList.add('day');
  elem.id = `day_${d.getTime()}`;
  headers.append(elem);
});

const highlightDate = (e, _bool) => {
  let column = parseInt(
    getComputedStyle(e.target.closest('.event-anchor')).gridColumn.split('/')[0]
  );
  let elem = document.querySelector(`.day:nth-child(${column})`);
  if (elem) {
    elem.classList.toggle('highlight', _bool);
  }
};

const applyDateHighlighting = (elem) => {
  console.log(elem.style.column);
  elem.addEventListener('mouseover', (e) => {
    highlightDate(e, true);
  });
  elem.addEventListener('mouseleave', (e) => {
    highlightDate(e, false);
  });
};

events.forEach((e) => {
  let elem = document.createElement('div');
  elem.classList.add('event-anchor');
  elem.id = `${e.id}`;
  let [h, m] = e.time.split(':');
  let dateId = new Date(`${e.date}T00:00`).getTime();
  let dayElem = document.querySelector(`#day_${dateId}`);
  if (!dayElem) {
    return;
  }
  let column = Array.from(dayElem.parentNode.children).indexOf(dayElem) + 1;
  elem.style.gridRow = `${h * 2 + m / 30} / span ${e.duration}`;
  elem.style.gridColumn = column;
  elem.style.zIndex = '2';
  elem.style.position = 'relative';
  elem.innerHTML = `
    <div class="event" style="border-top:15px solid;border-color: ${
      classColors[e.character.class]
    }">
      <div class="raid ${e.raid.toLowerCase()}">${e.raid} ${e.raidSize}</div>
      <div class="${e.character.class.toLowerCase()}">
        <span class="characterName">${e.character.name}</span>
      </div>
    </div>
  `;
  applyDateHighlighting(elem);
  // todo, if event goes past midnight, then create continued even in next day for the remaining time
  calendar.append(elem);
});
