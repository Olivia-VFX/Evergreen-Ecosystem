// note info

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

const notePlacement = {
  'C': 0,
  'D': 2,
  'E': 4,
  'F': 6,
  'G': 7,
  'A': 9,
  'B': 11,
  'C#': 1,
  'D#': 3,
  'F#': 5,
  'G#': 8,
  'A#': 10,
};

// spirit stuff

const spiritParts = {
  'open': 'images/naturesprite_open.png',
  'closed': 'images/naturesprite_closed.png',
  'speechBox': 'images/speech_box.png',
};

// chord info and explanations

const chordExplanations = {
  major: 'sounds bright and happy, like sunshine on a warm spring day',
  minor: 'sounds a little sad and soft, like when you lose something you love',
  diminished: 'sounds tense and mysterious, like something is about to happen',
  augmented: 'sounds strange and dreamlike, like a weird dream',
};

const chordTypeInfo = {
  major: {
    formula: 'The root note (the lowest note/note furthest to the left on the keyboard), then you move 4 half-steps to the right to the 3rd note, and then another 3 half-steps to the 5th',
    builtinExplanation: 'This chord sounds bright and happy, like sunshine on a warm day',
    userDefinition:'',
  },
  minor: {
    formula: 'The root note (the lowest note which is furthest to the left on the keyboard), then you more 3 half-steps to the right to the 3rd, and then another 4 half-steps to the 5th',
    builtinExplanation: 'This chord sounds sad and soft, like when you lose something you love',
    userDefinition: '',
  },
  diminished: {
    formula: 'The root note (the lowest note on the keyboard - the one furthest to the left), then you move 3 half-steps to the right to the 3rd and then another 3 half-steps to the 5th',
    builtinExplanation: 'This chord sounds tense and mysterious, like something is about to happen',
    userDefinition: '',
  },
  augmented: {
    formula: 'The root note (the note on the keyboard which is furthest to the left - the lowest note), then you move 4 half-steps to the right to the 3rd, and then another 4 half-steps to the 5th',
    builtinExplanation: 'This chord sounds strange and dreamlike, like a weird dream',
    userDefinition: '',
  },
};

const discoveredChords = {
  major: [],
  minor: [],
  diminished: [],
  augmented: [],
};

// set up stuff

const activeTimeouts = {};
const slotPositions = ['15%', '45%', '75%'];
let growingTulips = [];

const preloadedSounds = {};
for (const [note, path] of Object.entries(noteSounds)) {
  preloadedSounds[note] = new Audio(path);
  preloadedSounds[note].load();
}

// set up piano

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

// journal set up - and saves across visits

function saveJournal() {
  localStorage.setItem('discoveredChords', JSON.stringify(discoveredChords));
  localStorage.setItem('chordTypeInfo', JSON.stringify(chordTypeInfo));
}

function loadJournal() {
  const savedChords = localStorage.getItem('discoveredChords');
  const savedInfo = localStorage.getItem('chordTypeInfo');
  if (savedChords) Object.assign(discoveredChords, JSON.parse(savedChords));
  if (savedInfo) Object.assign(chordTypeInfo, JSON.parse(savedInfo));
}
loadJournal();

// when key pressed, flower grows

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

  if (growingTulips.length === 3) {
    const quality = chordNature(growingTulips);
    const root = getRootNote(growingTulips);
    if (quality) onChordComplete(root, quality);
}
}

// clear button

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

// order garden for chord id

function orderGarden(growingTulips) {
  if (growingTulips.length !== 3)
  {
    return null;
  }
  return [...growingTulips].sort(
    (a, b) => notePlacement[a.note] - notePlacement[b.note]
  );
};

// chord nature

function chordNature(growingTulips) {
  const sorted = orderGarden(growingTulips);
  if (!sorted) return null;

  const [root, mid, top] = sorted.map(t => notePlacement[t.note]);

  const third = (mid - root + 12) % 12;
  const fifth = (top - root + 12) % 12;

  if (third === 4 && fifth === 7) return 'major';
  if (third === 3 && fifth === 7) return 'minor';
  if (third === 3 && fifth === 6) return 'diminished';
  if (third === 4 && fifth === 8) return 'augmented';
  return null;
};

// get root note for chord id

function getRootNote(growingTulips) {
  const sorted = orderGarden(growingTulips);
  if (!sorted) return null;
  return sorted[0].note;
}

// if chord is id'd then explanation 

function onChordComplete(root, quality) {
  const sprite = document.querySelector('.chord-sprite');
  const speechContainer = document.querySelector('.speech-container');
  const spriteImg = document.querySelector('.sprite-art');
  const bubbleImg = document.querySelector('.chord-speech-bubble');
  const bubbleText = document.querySelector('.chord-speech-text');

  spriteImg.src = spiritParts.open;
  bubbleImg.src = spiritParts.speechBox;

  const chordName = `${root} ${quality.charAt(0).toUpperCase() + quality.slice(1)}`;
  bubbleText.textContent = `${chordName} - ${chordExplanations[quality]}`;

  clearTimeout(sprite.hideTimer);
  sprite.classList.remove('sprite-hidden');
  sprite.classList.add('sprite-appear');
  speechContainer.classList.remove('sprite-hidden');
  speechContainer.classList.add('sprite-appear');

  sprite.hideTimer = setTimeout(() => {
    spriteImg.src = spiritParts.closed;
    sprite.classList.remove('sprite-appear');
    sprite.classList.add('sprite-hidden');
    speechContainer.classList.remove('sprite-appear');
    speechContainer.classList.add('sprite-hidden');
  }, 15000);

  const notes = growingTulips.map(t => t.note);
  const alreadyLogged = discoveredChords[quality].some(
    entry => entry.root === root && JSON.stringify(entry.notes.sort()) === JSON.stringify([...notes].sort())
    );
  if (!alreadyLogged) {
    discoveredChords[quality].push({root, notes});
    saveJournal();
  }
}

// journal

document.querySelector('.journal-panel').addEventListener('click', (e) => {
  const panel = documehnt.querySelector('.journal-panel');
  if (!panel.classList.contains('journal-open')) {
    panel.classList.add('journal-open');
  }
});

document.querySelector('.journal-close').addEventListener('click', (e) => {
  e.stopPropagation();
  document.querySelector('.journal-panel').classList.remove('journal-open');
});

function openJournal() {
  const container = document.querySelector('.journal-sections');
  container.innerHTML = '';

  for (const [type, info] of Object.entries(chordTypeInfo)) {
    const section = document.createElement('div');
    section.classList.add('journal-section');

    const found = discoveredChords[type];
    const chordList = found.length
    ? found.map(f => `${f.root} ${type} (${f.notes.join(', ')}`).join('<br>')
      : '<em> Not discovered yet </em>';

    section.innerHTML = `
    <h3>${type.charAt(0).toUpperCase() + type.slice(1)}</h3>
    <p class="journal-formula">${info.formula}</p>
    <p class="journal-found">${chordList}</p>
    <textarea class="journal-user-def" data-type="${type}" placeholder="Write your own definition!">${info.userDefinition}</textarea>
    `;
    container.appendChild(section);
  }

  container.querySelectorAll('.journal-user-def').forEach(area => {
    area.addEventListener('input', (e) => {
      const type = e.target.dataset.type;
      chordTypeInfo[type].userDefinition = e.target.value;
      saveJournal();
    });
  });

  document.querySelector('.journal-panel').classList.remove('journal-hidden');
}

