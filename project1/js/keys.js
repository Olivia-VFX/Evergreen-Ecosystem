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

const pressedImages = {
  'C': 'images/C-pressed.png',
  'D': 'images/D-pressed.png',
  'E': 'images/E-pressed.png',
  'F': 'images/F-pressed.png',
  'G': 'images/G-pressed.png',
  'A': 'images/A-pressed.png',
  'B': 'images/B-pressed.png',
  'C#': 'images/Cs_Db-pressed.png',
  'D#': 'images/Ds_Eb-pressed.png',
  'F#': 'images/Fs_Gb-pressed.png',
  'G#': 'images/Gs_Ab-pressed.png',
  'A#': 'images/As_Bb-pressed.png',
};

const activeTimeouts = {};

for (const [note, pos] of Object.entries(keyPositions)) {
  const hitbox = document.createElement('div');
  hitbox.classList.add('hitbox', note.includes('#') ? 'black-key' : 'white-key');
  hitbox.dataset.note = note;
  hitbox.style.left = pos.left;
  hitbox.style.top = pos.top;
  hitbox.style.width = pos.width;
  hitbox.style.height = pos.height;
  hitbox.addEventListener('mousedown', () => pressKey(note, pos));
  document.querySelector('.piano-container').appendChild(hitbox);
}

function pressKey(note, pos) {
  if (activeTimeouts[note]) {
    clearTimeout(activeTimeouts[note].timerId);
    activeTimeouts[note].overlay.remove();
  }

  const overlay = document.createElement('img');
  overlay.src = pressedImages[note];
  overlay.classList.add('key-pressed-overlay');
  
  document.querySelector('.piano-container').appendChild(overlay);

  const timerId = setTimeout(() => {
    overlay.remove();
    delete activeTimeouts[note];
  }, 500);

  activeTimeouts[note] = { timerId, overlay };

  const flower = document.querySelector(`.flower[data-note="${note}"]`);
  if (flower) flower.classList.add('blooming');
}
