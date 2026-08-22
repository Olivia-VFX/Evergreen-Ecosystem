const keyPositions = {
  'C':  { left: '12.8%', width: '10.6%', top: '21%', height: '79%' },
  'D':  { left: '23.4%', width: '10.6%', top: '21%', height: '79%' },
  'E':  { left: '34.1%', width: '10.6%', top: '21%', height: '79%' },
  'F':  { left: '44.8%', width: '10.6%', top: '21%', height: '79%' },
  'G':  { left: '55.4%', width: '10.6%', top: '21%', height: '79%' },
  'A':  { left: '66.1%', width: '10.6%', top: '21%', height: '79%' },
  'B':  { left: '76.8%', width: '10.6%', top: '21%', height: '79%' },

  'C#': { left: '20.6%', width: '7%',   top: '16%', height: '42%' },
  'D#': { left: '32.5%', width: '6%',   top: '16%', height: '42%' },
  'F#': { left: '51.9%', width: '7.4%', top: '16%', height: '42%' },
  'G#': { left: '65.4%', width: '6.6%', top: '16%', height: '42%' },
  'A#': { left: '76.2%', width: '6.3%', top: '16%', height: '42%' },
};

for (const [note, pos] of Object.entries(keyPositions)) {
  const hitbox = document.createElement('div');
  hitbox.classList.add('hitbox', note.includes('#') ? 'black-key' : 'white-key');
  hitbox.dataset.note = note;
  hitbox.style.left = pos.left;
  hitbox.style.top = pos.top;
  hitbox.style.width = pos.width;
  hitbox.style.height = pos.height;
  document.querySelector('.piano-container').appendChild(hitbox);
}
