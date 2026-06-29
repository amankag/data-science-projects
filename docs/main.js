/* ── NAV LOGO — 8 rotating data-analyst modes ── */
(function() {
  const el     = document.getElementById('navLogoDisplay');
  const cursor = document.getElementById('navCursor');

  const I  = s => `<span class="c-ind">${s}</span>`;
  const M  = s => `<span class="c-muted">${s}</span>`;
  const P  = s => `<span class="c-plain">${s}</span>`;
  const G  = s => `<span class="c-green">${s}</span>`;

  // Each mode is an array of { html, t } steps — t = ms to hold before next
  const MODES = [

    // MODE 0 — original: a+m+a+n · kag = amankag
    [
      { h: I('a'),                                                     t: 100 },
      { h: I('a')+M('+')+I('m'),                                      t: 120 },
      { h: I('a')+M('+')+I('m')+M('+')+I('a'),                        t: 120 },
      { h: I('a')+M('+')+I('m')+M('+')+I('a')+M('+')+I('n'),          t: 380 },
      { h: I('a')+M('+')+I('m')+M('+')+I('a')+M('+')+I('n')+M('·')+I('k')+I('a')+I('g'), t: 460 },
      { h: P('amankag'),                                               t: 0   },
    ],

    // MODE 1 — array notation: ['a','m','a','n'].join('') → amankag
    [
      { h: M('[')+'                              '+M(']'),             t: 80  },
      { h: M('[')+I('"a"')+M(']'),                                     t: 110 },
      { h: M('[')+I('"a"')+M(',')+I('"m"')+M(']'),                    t: 110 },
      { h: M('[')+I('"a"')+M(',')+I('"m"')+M(',')+I('"a"')+M(',')+I('"n"')+M(']'), t: 360 },
      { h: M('[')+I('"a"')+M(',')+I('"m"')+M(',')+I('"a"')+M(',')+I('"n"')+M(']')+M('.join("")'), t: 400 },
      { h: P('amankag'),                                               t: 0   },
    ],

    // MODE 2 — function call: f(aman) → kag → amankag
    [
      { h: I('f')+M('('),                                              t: 140 },
      { h: I('f')+M('(')+I('aman')+M(')'),                            t: 300 },
      { h: I('f')+M('(')+I('aman')+M(')')+M('+')+I('kag'),            t: 380 },
      { h: M('→  ')+I('amankag'),                                     t: 420 },
      { h: P('amankag'),                                               t: 0   },
    ],

    // MODE 3 — binary split: aman | kag → merge
    [
      { h: I('aman')+M(' | ')+I('kag'),                               t: 500 },
      { h: I('aman')+M('.merge(')+I('kag')+M(')'),                    t: 420 },
      { h: P('amankag'),                                               t: 0   },
    ],

    // MODE 4 — regex match style: /aman/+/kag/
    [
      { h: M('/')+I('aman')+M('/'),                                    t: 300 },
      { h: M('/')+I('aman')+M('/')+M('+')+M('/')+I('kag')+M('/'),     t: 360 },
      { h: M('match →  ')+I('amankag'),                               t: 400 },
      { h: P('amankag'),                                               t: 0   },
    ],

    // MODE 5 — variable assignment: let x = "aman"; x += "kag"
    [
      { h: M('let ')+I('x')+M(' = ')+I('"aman"'),                     t: 360 },
      { h: M('let ')+I('x')+M(' = ')+I('"aman"')+M('; ')+I('x')+M('+=')+I('"kag"'), t: 420 },
      { h: I('x')+M(' →  ')+P('amankag'),                             t: 420 },
      { h: P('amankag'),                                               t: 0   },
    ],

    // MODE 6 — statistical notation: μ(aman,kag)
    [
      { h: M('μ(')+I('aman'),                                          t: 280 },
      { h: M('μ(')+I('aman')+M(', ')+I('kag')+M(')'),                 t: 360 },
      { h: M('σ = 0  →  ')+I('amankag'),                              t: 400 },
      { h: P('amankag'),                                               t: 0   },
    ],

    // MODE 7 — pipeline: aman |> clean |> kag
    [
      { h: I('aman'),                                                  t: 200 },
      { h: I('aman')+M(' |> ')+I('clean'),                            t: 280 },
      { h: I('aman')+M(' |> ')+I('clean')+M(' |> ')+I('kag'),        t: 360 },
      { h: G('✓ ')+P('amankag'),                                      t: 420 },
      { h: P('amankag'),                                               t: 0   },
    ],

  ];

  let modeIdx  = 0;
  let running  = false;

  function set(h) { el.innerHTML = h; }

  async function runMode(mode) {
    if (running) return;
    running = true;
    cursor.style.display = 'inline';
    for (const step of mode) {
      set(step.h);
      if (step.t > 0) await new Promise(r => setTimeout(r, step.t));
    }
    set(P('amankag'));
    cursor.style.display = 'none';
    running = false;
  }

  // On load — play mode 0
  setTimeout(() => runMode(MODES[0]), 600);

  // Every 6 seconds — cycle through next mode automatically
  setInterval(() => {
    if (!running) {
      modeIdx = (modeIdx + 1) % MODES.length;
      runMode(MODES[modeIdx]);
    }
  }, 6000);

  // On hover — play the next mode immediately
  document.getElementById('navLogo').addEventListener('mouseenter', () => {
    if (running) return;
    modeIdx = (modeIdx + 1) % MODES.length;
    runMode(MODES[modeIdx]);
  });
})();

/* ── HERO FLIP WORD ── */
const flipWords = [
  'signal',
  'pattern',
  'anomaly',
  'truth',
  'answer',
  'insight',
  'story',
  'risk',
  'bias',
  'proof',
  'noise',
  'future',
];
const flipEl = document.getElementById('heroFlipWord');
let flipIdx  = 0;

function nextFlipWord() {
  flipEl.classList.remove('flip-in');
  flipEl.classList.add('flip-out');
  setTimeout(() => {
    flipIdx = (flipIdx + 1) % flipWords.length;
    flipEl.textContent = flipWords[flipIdx];
    flipEl.classList.remove('flip-out');
    flipEl.classList.add('flip-in');
  }, 380);
}
setTimeout(() => { setInterval(nextFlipWord, 2200); }, 2000);

/* ── SLIDE-TO-EMAIL + "WRITE TO AMAN" TYPING ── */
(function() {
  const pill   = document.getElementById('slidePill');
  const thumb  = document.getElementById('slideThumb');
  const label  = document.getElementById('cepLabel');
  const cursor = document.getElementById('cepCursor');
  if (!pill || !thumb) return;

  /* ── Typing animation ── */
  const steps = [
    { text: '',              delay: 900  },
    { text: 'H',             delay: 110  },
    { text: 'Hi',            delay: 100  },
    { text: 'Hi A',          delay: 90   },
    { text: 'Hi',            delay: 80   },
    { text: 'H',             delay: 80   },
    { text: '',              delay: 80   },
    { text: 'W',             delay: 130  },
    { text: 'Wr',            delay: 100  },
    { text: 'Wri',           delay: 90   },
    { text: 'Writ',          delay: 90   },
    { text: 'Write',         delay: 90   },
    { text: 'Write ',        delay: 80   },
    { text: 'Write t',       delay: 90   },
    { text: 'Write to',      delay: 90   },
    { text: 'Write to ',     delay: 80   },
    { text: 'Write to A',    delay: 100  },
    { text: 'Write to Am',   delay: 90   },
    { text: 'Write to Ama',  delay: 90   },
    { text: 'Write to Aman', delay: 2000 },
  ];
  let typingActive = false;

  async function runTyping() {
    if (typingActive) return;
    typingActive = true;
    if (cursor) cursor.style.display = 'inline';
    for (const step of steps) {
      if (label) label.textContent = step.text;
      await new Promise(r => setTimeout(r, step.delay));
    }
    if (cursor) cursor.style.display = 'none';
    typingActive = false;
  }

  /* ── Slide interaction — thumb LEFT, drag RIGHT ── */
  let startX   = 0;
  let currentX = 0;
  let dragging = false;
  const SNAP   = 0.72; // 72% of track = trigger

  function trackWidth() {
    /* available travel = pill width minus thumb width minus 6px padding each side */
    return pill.offsetWidth - thumb.offsetWidth - 12;
  }

  function moveThumb(x) {
    x = Math.max(0, Math.min(trackWidth(), x));
    currentX = x;
    thumb.style.left = (6 + x) + 'px';

    const progress = x / trackWidth(); // 0 → 1

    // Progressive blur: starts at blur(6px), clears completely by 80% progress
    const blurAmount = Math.max(0, 6 - (progress * 7.5));
    const emailOpacity = 0.5 + progress * 0.5;
    const emailEl = pill.querySelector('.slide-email');
    if (emailEl) {
      emailEl.style.filter = `blur(${blurAmount.toFixed(1)}px)`;
      emailEl.style.opacity = emailOpacity.toFixed(2);
    }

    // Fade out "Write to Aman" text as thumb moves right
    const bgText = pill.querySelector('.slide-bg-text');
    if (bgText) bgText.style.opacity = Math.max(0, 1 - progress * 2).toFixed(2);

    // Swap arrow → smiley at 50%, burst confetti
    const wasMid = pill.classList.contains('mid-slide');
    pill.classList.toggle('mid-slide', progress >= 0.5);
    pill.classList.toggle('completing', progress > 0.55);

    // Trigger confetti burst exactly when crossing 50%
    if (!wasMid && progress >= 0.5 && window.startSlideConfetti) {
      window.startSlideConfetti();
    }
  }

  function snapBack() {
    thumb.style.transition = 'left 0.4s cubic-bezier(0.23,1,0.32,1)';
    thumb.style.left = '6px';
    pill.classList.remove('completing');
    pill.classList.remove('mid-slide');
    if (window.stopSlideConfetti) window.stopSlideConfetti();
    // Reset blur and opacity on email
    const emailEl = pill.querySelector('.slide-email');
    if (emailEl) {
      emailEl.style.transition = 'filter 0.4s ease, opacity 0.4s ease';
      emailEl.style.filter = 'blur(6px)';
      emailEl.style.opacity = '0.5';
    }
    const bgText = pill.querySelector('.slide-bg-text');
    if (bgText) {
      bgText.style.transition = 'opacity 0.3s ease';
      bgText.style.opacity = '1';
    }
    setTimeout(() => {
      thumb.style.transition = 'none';
      if (emailEl) emailEl.style.transition = 'none';
      if (bgText) bgText.style.transition = 'none';
    }, 420);
  }

  function triggerEmail() {
    thumb.style.transition = 'left 0.22s ease';
    thumb.style.left = (pill.offsetWidth - thumb.offsetWidth - 6) + 'px';
    pill.classList.add('completing');
    setTimeout(() => {
      window.location.href = 'mailto:info.amankag@gmail.com';
    }, 260);
    setTimeout(() => snapBack(), 1400);
  }

  /* Mouse */
  thumb.addEventListener('mousedown', e => {
    dragging = true;
    startX = e.clientX;
    thumb.style.transition = 'none';
    e.preventDefault();
  });
  window.addEventListener('mousemove', e => {
    if (!dragging) return;
    moveThumb(e.clientX - startX);
  });
  window.addEventListener('mouseup', () => {
    if (!dragging) return;
    dragging = false;
    if (currentX / trackWidth() >= SNAP) triggerEmail();
    else snapBack();
  });

  /* Touch — prevent page scroll while dragging */
  thumb.addEventListener('touchstart', e => {
    dragging = true;
    startX = e.touches[0].clientX;
    thumb.style.transition = 'none';
    e.preventDefault(); /* stops scroll hijack */
  }, { passive: false });
  window.addEventListener('touchmove', e => {
    if (!dragging) return;
    moveThumb(e.touches[0].clientX - startX);
    e.preventDefault();
  }, { passive: false });
  window.addEventListener('touchend', () => {
    if (!dragging) return;
    dragging = false;
    if (currentX / trackWidth() >= SNAP) triggerEmail();
    else snapBack();
  });

  /* Trigger typing when section enters view */
  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { runTyping(); obs.disconnect(); }
  }, { threshold: 0.4 });
  obs.observe(pill);
})();
const closingWords = [
  'answer',
  'signal',
  'proof',
  'truth',
  'story',
  'model',
  'edge',
  'insight',
];
const closingFlipEl = document.getElementById('closingFlipWord');
let closingIdx      = 0;
let closingActive   = false;

function nextClosingWord() {
  if (!closingFlipEl) return;
  closingFlipEl.classList.remove('flip-in');
  closingFlipEl.classList.add('flip-out');
  setTimeout(() => {
    closingIdx = (closingIdx + 1) % closingWords.length;
    closingFlipEl.textContent = closingWords[closingIdx];
    closingFlipEl.classList.remove('flip-out');
    closingFlipEl.classList.add('flip-in');
  }, 380);
}

const closingSection = document.querySelector('.closing-section');
if (closingSection) {
  const closingObs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !closingActive) {
      closingActive = true;
      setTimeout(() => { setInterval(nextClosingWord, 2800); }, 1200);
      closingObs.disconnect();
    }
  }, { threshold: 0.3 });
  closingObs.observe(closingSection);
}

/* ── NAV SCROLL ── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 50), { passive: true });

/* ── HERO TYPING ── */
const phrases = [
  'I turn messy data into decisions.',
  'I build models that catch what humans miss.',
  'I make patterns visible.',
  'I ask the right question before writing a line of code.',
  'I ship pipelines, not just notebooks.',
];
let pi = 0, ci = 0, deleting = false;
const typingEl = document.getElementById('typing-text');
function typeLoop() {
  const phrase = phrases[pi];
  if (!deleting) {
    ci++;
    typingEl.textContent = phrase.slice(0, ci);
    if (ci === phrase.length) { deleting = true; setTimeout(typeLoop, 2200); return; }
    setTimeout(typeLoop, 42);
  } else {
    ci--;
    typingEl.textContent = phrase.slice(0, ci);
    if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; setTimeout(typeLoop, 300); return; }
    setTimeout(typeLoop, 22);
  }
}
setTimeout(typeLoop, 1600);

/* ══════════════════════════════════════════
   STACKED CARDS — definitive fix
   Key insight: progress runs 0 → SCROLL_PER_CARD*(N+1)
   Card i exits during segment i → i+1
   After segment N all cards are gone, section releases
══════════════════════════════════════════ */
const PCARDS   = ['pc0','pc1','pc2'].map(id => document.getElementById(id));
const pinOuter = document.getElementById('cards-pin-outer');
const cdots    = document.querySelectorAll('.cdot');
const cardsHint   = document.getElementById('cards-hint');
const cardsTopbar = document.getElementById('cards-topbar');
const cdotsWrap   = document.getElementById('cdots');
const PN = PCARDS.length;
const SPE = window.innerHeight;          // scroll px per card exit
const PEEK = 24;
const LIFT = window.innerHeight * 0.9;  // how far up card travels when exiting

// Total height = 1 vh to enter + N exits + 0.3 exit buffer
const TOTAL_H = SPE + SPE * PN + SPE * 0.3;
pinOuter.style.height = TOTAL_H + 'px';

// Initial stack — cards staggered behind each other
PCARDS.forEach((c, i) => {
  c.style.position  = 'absolute';
  c.style.top       = '50%';
  c.style.left      = '50%';
  c.style.transform = `translate(-50%, calc(-50% + ${i * PEEK}px)) scale(${1 - i * 0.02})`;
  c.style.transition = 'none';
  c.style.opacity   = i === 0 ? '1' : String(1 - i * 0.1);
});

function updateCards() {
  const outerTop = pinOuter.getBoundingClientRect().top + window.scrollY;
  const scrolled = window.scrollY - outerTop;

  // Section active window: from entry to all cards fully gone
  const sectionEnd = SPE * PN + SPE * 0.2;
  const isActive   = scrolled >= 0 && scrolled <= sectionEnd;

  cardsTopbar.classList.toggle('visible', isActive);
  cdotsWrap.classList.toggle('visible',   isActive);
  cardsHint.classList.toggle('visible',   isActive);

  if (!isActive) {
    // Hard-reset: all invisible when out of section
    PCARDS.forEach(c => { c.style.opacity = '0'; c.style.zIndex = '1'; });
    return;
  }

  // scrolled clamped to useful range
  const progress = Math.max(0, Math.min(SPE * PN, scrolled));

  PCARDS.forEach((c, i) => {
    // Card i exits during progress range [i*SPE, (i+1)*SPE]
    const exitStart = i * SPE;
    const exitEnd   = (i + 1) * SPE;
    let ty, sc, op, zi;

    if (progress < exitStart) {
      // Card not yet reached — sitting in the stack below
      const stackPos = i - Math.floor(progress / SPE);
      ty = stackPos * PEEK;
      sc = 1 - stackPos * 0.02;
      op = stackPos === 0 ? 1 : Math.max(0.6, 1 - stackPos * 0.12);
      zi = PN - stackPos + 2;
    } else if (progress >= exitStart && progress < exitEnd) {
      // Card is currently exiting
      const t = (progress - exitStart) / SPE; // 0→1
      ty = -t * LIFT;
      sc = 1 - t * 0.04;
      // Fade out in last 25% of exit
      op = t < 0.75 ? 1 : 1 - ((t - 0.75) / 0.25);
      zi = PN + 10;
    } else {
      // Card has fully exited — park it above, invisible
      ty = -LIFT;
      sc = 0.96;
      op = 0;
      zi = i + 1;
    }

    c.style.transform = `translate(-50%, calc(-50% + ${ty}px)) scale(${Math.max(0.86, Math.min(1, sc))})`;
    c.style.opacity   = String(Math.max(0, Math.min(1, op)));
    c.style.zIndex    = String(zi);
  });

  // Progress dots — show current visible card
  const visibleCard = Math.min(PN - 1, Math.floor(progress / SPE));
  cdots.forEach((d, i) => d.classList.toggle('active', i === visibleCard));

  // Hint text
  const cardNum = Math.min(PN, visibleCard + 1);
  if (progress >= SPE * (PN - 1) + SPE * 0.6) {
    cardsHint.textContent = '✓ all projects — keep scrolling';
  } else {
    cardsHint.textContent = `↓ scroll · ${cardNum} of ${PN}`;
  }
}

window.addEventListener('scroll', updateCards, { passive: true });
updateCards();

/* ── IMAGE STRIP DRAG ── */
document.querySelectorAll('.pcard-strip').forEach(strip => {
  let down = false, sx, sl;
  strip.addEventListener('mousedown', e => { down = true; sx = e.pageX; sl = strip.scrollLeft; e.preventDefault(); });
  window.addEventListener('mouseup',  () => { down = false; });
  window.addEventListener('mousemove', e => {
    if (!down) return;
    strip.scrollLeft = sl - (e.pageX - sx);
  });
  strip.addEventListener('touchstart', e => { sx = e.touches[0].pageX; sl = strip.scrollLeft; }, { passive: true });
  strip.addEventListener('touchmove',  e => { strip.scrollLeft = sl - (e.touches[0].pageX - sx); }, { passive: true });
});

/* ── FLIP CARD TAP ── */
document.querySelectorAll('.fcard').forEach(c => {
  c.addEventListener('click', () => {
    c.classList.toggle('tapped');
    setTimeout(() => c.classList.remove('tapped'), 2000);
  });
});

/* ══════════════════════════════════════════
   ORBITAL SKILLS — 6 cards, bigger
══════════════════════════════════════════ */
const OCARDS = [
  { bg:'linear-gradient(140deg,#131a38,#0b1230)', icon:'🤖', name:'Machine\nLearning',    cat:'Supervised · Ensemble',    skill:'ML',           project:'Diabetes\nRisk Study',    result:'91.2% accuracy\nRandom Forest + DNN\n30k patients',       link:'https://github.com/amankag/data-science-projects/tree/main/Diabetes-Elderlies-Analysis',                   tilt:12 },
  { bg:'linear-gradient(140deg,#0e2218,#071410)', icon:'🧠', name:'Deep\nLearning',        cat:'Keras · Tuner',            skill:'Deep Learning', project:'Injury\nPrediction',      result:'96% accuracy\nDual-input Keras\n374 athletes',            link:'https://github.com/amankag/data-science-projects/tree/main/Sleep-Injury-Prediction-Model',                   tilt:-10 },
  { bg:'linear-gradient(140deg,#1a1028,#0e0818)', icon:'🗄️', name:'SQL &\nPandas',         cat:'Data Analysis',            skill:'Analytics',    project:'NYC Flights\n2013',       result:'336k rows · 17 queries\nSQL + Pandas verified',           link:'https://github.com/amankag/data-science-projects/tree/main/Nyc-Flight-Sql-Analysis',                   tilt:14 },
  { bg:'linear-gradient(140deg,#1e1600,#120d00)', icon:'☁️', name:'Data\nEngineering',     cat:'AWS S3 · Athena',          skill:'Engineering',  project:'Manufacturing\nDashboard',result:'231k units · AWS S3\nAthena · Power BI',                  link:'https://amankag.github.io/manufacturing-quality-dashboard/Website/', tilt:-14 },
  { bg:'linear-gradient(140deg,#0a1a2a,#051020)', icon:'📊', name:'Power BI\n& Stats',     cat:'DAX · Six Sigma · SPC',   skill:'BI & Stats',   project:'Quality\nDashboard',      result:'Live Power BI\nSix Sigma metrics\nSPC control charts',    link:'https://github.com/amankag/manufacturing-quality-dashboard', tilt:10  },
  { bg:'linear-gradient(140deg,#1a100a,#0e0805)', icon:'🌐', name:'Web\nDevelopment',      cat:'HTML · CSS · JS',         skill:'Web Dev',      project:'This\nWebsite',           result:'Built from scratch\nHTML · CSS · JS\nGitHub Pages',       link:'https://github.com/amankag/data-science-projects/tree/main',                                         tilt:-12 },
];

const orbitStage      = document.getElementById('orbitStage');
const orbitFill       = document.getElementById('orbitFill');
const orbitScrollHint = document.getElementById('orbitScrollHint');
const orbitSection    = document.getElementById('orbitSection');
const orbitCenterText = document.getElementById('orbitCenterText');
const orbitDecoRing   = document.getElementById('orbitDecoRing');

// Bigger cards
const CARD_W = 172, CARD_H = 158;
// Stage is set to 580px via CSS — half = 290
const STAGE_HALF = 290;
const ORBIT_R    = STAGE_HALF - CARD_W / 2 - 12; // = 192

let oAngle = 0, oAutoRaf = null, oScrollDriving = false;

OCARDS.forEach((c, i) => {
  const w = document.createElement('div');
  w.className = 'ocard';
  w.style.width  = CARD_W + 'px';
  w.style.height = CARD_H + 'px';

  const inner = document.createElement('div');
  inner.className = 'ocard-inner';

  const front = document.createElement('div');
  front.className = 'ocard-front';
  front.style.background = c.bg;
  front.innerHTML = `<div class="of-icon">${c.icon}</div><div class="of-name">${c.name.replace('\n','<br>')}</div><div class="of-cat">${c.cat}</div>`;

  const back = document.createElement('div');
  back.className = 'ocard-back';
  back.innerHTML = `<div class="ob-skill">${c.skill}</div><div class="ob-project">${c.project.replace('\n','<br>')}</div><div class="ob-result">${c.result.replace(/\n/g,'<br>')}</div><a class="ob-link" href="${c.link}" target="_blank">Open ↗</a>`;

  inner.appendChild(front);
  inner.appendChild(back);
  w.appendChild(inner);
  orbitStage.appendChild(w);

  w.addEventListener('click', () => {
    const was = w.classList.contains('tapped');
    orbitStage.querySelectorAll('.ocard').forEach(el => el.classList.remove('tapped'));
    if (!was) w.classList.add('tapped');
  });
});

const oCardEls = Array.from(orbitStage.querySelectorAll('.ocard'));

function placeOrbitCards(angle) {
  oCardEls.forEach((el, i) => {
    const base  = (i / oCardEls.length) * 360 - 90;
    const total = base + angle;
    const rad   = (total * Math.PI) / 180;
    const cx    = STAGE_HALF + Math.cos(rad) * ORBIT_R;
    const cy    = STAGE_HALF + Math.sin(rad) * ORBIT_R;
    const depth = Math.sin(rad);
    const scale = 0.84 + (depth + 1) * 0.09; // 0.84 → 1.02
    const zi    = Math.round((depth + 1) * 12) + 3;
    const rotZ  = OCARDS[i].tilt * 0.1 * Math.cos(rad);
    el.style.left      = (cx - CARD_W / 2) + 'px';
    el.style.top       = (cy - CARD_H / 2) + 'px';
    el.style.transform = `scale(${scale}) rotate(${rotZ}deg)`;
    el.style.zIndex    = String(zi);
    el.style.opacity   = String(0.72 + (depth + 1) * 0.14);
  });
}

setTimeout(() => {
  orbitCenterText.classList.add('hidden');
  orbitDecoRing.classList.add('hidden');
}, 1500);

function oStartAuto() {
  cancelAnimationFrame(oAutoRaf);
  oAutoRaf = requestAnimationFrame(function loop() {
    if (oScrollDriving) return;
    oAngle = (oAngle + 0.18) % 360;
    placeOrbitCards(oAngle);
    oAutoRaf = requestAnimationFrame(loop);
  });
}
oStartAuto();

const O_DELAY = 150, O_RANGE = 1200;
function onOrbitScroll() {
  const top      = orbitSection.getBoundingClientRect().top + window.scrollY;
  const scrolled = window.scrollY - top;
  if (scrolled < O_DELAY) {
    if (oScrollDriving) { oScrollDriving = false; oStartAuto(); }
    orbitScrollHint.style.opacity = '1';
    return;
  }
  if (!oScrollDriving) { oScrollDriving = true; cancelAnimationFrame(oAutoRaf); }
  const t = Math.min(1, (scrolled - O_DELAY) / O_RANGE);
  oAngle = t * 360;
  orbitFill.style.width         = (t * 100) + '%';
  orbitScrollHint.style.opacity = t < 0.08 ? '1' : '0';
  placeOrbitCards(oAngle);
}
window.addEventListener('scroll', onOrbitScroll, { passive: true });
window.addEventListener('resize', () => placeOrbitCards(oAngle));
placeOrbitCards(0);

/* ── ANIMATED QUOTE — triggers on scroll into view ── */
const quoteWrap = document.getElementById('aboutQuote');
if (quoteWrap) {
  const quoteObs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      quoteWrap.classList.add('visible');
      setTimeout(() => quoteWrap.classList.add('playing'), 200);
      quoteObs.disconnect();
    }
  }, { threshold: 0.4 });
  quoteObs.observe(quoteWrap);
}

/* ── REVEAL ── */
const revealEls = document.querySelectorAll('.reveal');
const ro = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); ro.unobserve(e.target); }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => ro.observe(el));

/* ── CELEBRATION CONFETTI ENGINE ── */
(function() {
  const canvas = document.getElementById('slideConfetti');
  if (!canvas) return;
  const ctx    = canvas.getContext('2d');
  const COLORS = ['#5B4FE8','#C8F135','#3FB950','#F7C59F','#FF6B6B','#ffffff','#7B8FF5','#ffd700','#ff9ff3'];
  let parts    = [];
  let raf      = null;
  let live     = false;

  function resize() {
    canvas.width  = canvas.offsetWidth  || 520;
    canvas.height = canvas.offsetHeight || 110;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  function burst() {
    const cx = canvas.width / 2;
    const cy = canvas.height + 4; // start just below bottom edge
    for (let i = 0; i < 44; i++) {
      const ang   = Math.PI + Math.random() * Math.PI; // upward arc
      const spd   = 2 + Math.random() * 4;
      const isStr = Math.random() > 0.45;
      parts.push({
        x: cx + (Math.random() - 0.5) * 80,
        y: cy,
        vx: Math.cos(ang) * spd,
        vy: Math.sin(ang) * spd,
        w:  isStr ? 2 + Math.random() * 3 : 4 + Math.random() * 4,
        h:  isStr ? 6 + Math.random() * 6 : 4 + Math.random() * 4,
        col: COLORS[Math.floor(Math.random() * COLORS.length)],
        alpha: 1,
        rot: Math.random() * Math.PI * 2,
        rv:  (Math.random() - 0.5) * 0.2,
        g:   0.055 + Math.random() * 0.045,
      });
    }
  }

  function frame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    parts.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      p.vy += p.g; p.vx *= 0.992;
      p.rot += p.rv;
      p.alpha -= 0.013;
      if (p.alpha <= 0) return;
      ctx.save();
      ctx.globalAlpha = Math.max(0, p.alpha);
      ctx.fillStyle   = p.col;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    parts = parts.filter(p => p.alpha > 0);
    if (parts.length) { raf = requestAnimationFrame(frame); }
    else { live = false; canvas.classList.remove('active'); }
  }

  window.startSlideConfetti = function() {
    canvas.classList.add('active');
    burst();
    if (!live) { live = true; raf = requestAnimationFrame(frame); }
  };

  window.stopSlideConfetti = function() {
    parts = [];
    canvas.classList.remove('active');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cancelAnimationFrame(raf);
    live = false;
  };
})();
