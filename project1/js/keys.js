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

const noteSounds = {
  'C': 'sounds/C.mp3',
  'D': 'sounds/D.mp3',
  'E': 'sounds/E.mp3',
  'F': 'sounds/F.mp3',
  'G': 'sounds/G.mp3',
  'A': 'sounds/A.mp3',
  'B': 'sounds/B.mp3',
  'C#': 'sounds/Cs_Db.mp3',
  'D#': 'sounds/Ds_Eb.mp3',
  'F#': 'sounds/Fs_Gb.mp3',
  'G#': 'sounds/Gs_Ab.mp3',
  'A#': 'sounds/Bb_As.mp3',
};

const tulipImages = {
  'C': 'images/C-tulip.png',
  'D': 'images/D-tulip.png',
  'E': 'images/E-tulip.png',
  'F': 'images/F-tulip.png',
  'G': 'images/G-tulip.png',
  'A': 'images/A-tulip.png',
  'B': 'images/B-tulip.png',
  'C#': 'images/Cs-Db-tulips.png',
  'D#': 'images/Ds-Eb-tulip.png',
  'F#': 'images/Fs-Gb-tulip.png',
  'G#': 'images/Gs-Ab-tulip.png',
  'A#': 'images/As-Bb-tulip.png',
};

const activeTimeouts = {};
const slotPositions = ['15%', '45%', '75%'];
let growingTulips = [];

const preloadedSounds = {};
for (const [note, path] of Object.entries(noteSounds)) {
  preloadedSounds[note] = new Audio(path);
  preloadedSounds[note].load();
}

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

document.querySelector('.clear-garden-btn').addEventListener('click', clearGarden);

function pressKey(note, pos) {
  if (activeTimeouts[note]) {
    clearTimeout(activeTimeouts[note].timerId);
    activeTimeouts[note].overlay.remove();
  }

  const sound = preloadedSounds[note].cloneNode();
  sound.play();

  const overlay = document.createElement('img');
  overlay.src = pressedImages[note];
  overlay.classList.add('key-pressed-overlay');
  
  document.querySelector('.piano-container').appendChild(overlay);

  const timerId = setTimeout(() => {
    overlay.remove();
    delete activeTimeouts[note];
  }, 500);

  activeTimeouts[note] = { timerId, overlay };

  growTulip(note);
}

function growTulip(note) {
  if (growingTulips.length >= 3) {
    return;
  }

  const tulip = document.createElement('img');
  tulip.src = tulipImages[note];
  tulip.classList.add('tulip', 'growing');
  document.querySelector('.garden-area').appendChild(tulip);

  const slotIndex = growingTulips.length;
  tulip.style.left = slotPositions[slotIndex];

  growingTulips.push({ note, element: tulip });
}

function clearGarden() {
  growingTulips.forEach(entry => {
    entry.element.classList.remove('growing');
    entry.element.classList.add('wilting');
  });

  setTimeout(() => {
    growingTulips.forEach(entry => entry.element.remove());
    growingTulips = [];
  }, 800);
}
