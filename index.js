// Import stylesheets
import './style.css';
import { events } from './events.js';

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
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

days.forEach((d) => {
  let elem = document.createElement('div');
  elem.innerHTML = `
  <div class="date">${d.getDate()}</div>
  <div class="dayname">${dayNames[d.getDay()]}</div>
  `;
  elem.classList.add('day');
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

document.querySelectorAll('.event').forEach((elem) => {
  console.log(elem.style.column);
  elem.addEventListener('mouseover', (e) => {
    highlightDate(e, true);
  });
  elem.addEventListener('mouseleave', (e) => {
    highlightDate(e, false);
  });
});

events.forEach((e) => {
  let elem = document.createElement('div');
  elem.classList.add('event-anchor');
  elem.id = `${e.id}`;
  let [h, m] = e.time.split(':');
  elem.style.gridRow = `${h * 2 + m / 30} / span ${e.duration}`;
  elem.style.gridColumn = '4';
  elem.style.zIndex = '2';
  elem.style.position = 'relative';
  elem.innerHTML = `
    <div class="event">
      <div class="raid">${e.raid} ${e.raidSize}</div>
      <div class="${e.class.toLowerCase()}">
        <span class="characterName">${e.name}</span>
      </div>
    </div>
  `;
  calendar.append(elem);
});
