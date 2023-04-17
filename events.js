import { characters } from './characters.js';

export const events = [];

events.push({
  id: '_' + crypto.randomUUID(),
  character: characters.Nalliah,
  raid: 'Ulduar',
  raidSize: 10,
  date: '2023-04-18',
  time: '20:00',
  duration: 5,
});
events.push({
  id: '_' + crypto.randomUUID(),
  character: characters.Nalliah,
  raid: 'Ulduar',
  raidSize: 10,
  date: '2023-04-19',
  time: '13:00',
  duration: 5,
});
