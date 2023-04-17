// Import stylesheets
import './style.css';

// Write Javascript code!
const calendar = document.getElementById('calendar');
const year = new Date().getUTCFullYear();
const month = (new Date().getUTCMonth() + 1).toString().padStart(2, 0);
const day = new Date().getUTCDate().toString().padStart(2, 0);
const weekday = new Date().getUTCDay();
const count = 7;
const offset = -1;
const today = new Date(`${year}-${month}-${day}T00:00`);

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
calendar.style.setProperty('--days', count);

days.forEach((d) => {
  let elem = document.createElement('div');
  elem.innerHTML = `
  <div class="date">${d.getDate()}</div>
  <div class="dayname">${dayNames[d.getDay()]}</div>
  `;
  elem.classList.add('day');
  calendar.append(elem);
});

const highlightDate = (e, _bool) => {
  let column = parseInt(
    getComputedStyle(e.target.closest('.event')).gridRow.split('/')[0]
  );
  let elem = document.querySelector(`.day:nth-child(${column - 1})`);
  if (elem) {
    elem.classList.toggle('highlight', _bool);
  }
};
const undoHighlightDate = (e) => {
  let column = getComputedStyle(e.target).gridRow.split('/')[0];
  let elem = document.querySelector(`.day:nth-child(${column - 1})`);
  elem.classList.remove('highlight');
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
