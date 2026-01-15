'use strict';

const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const btnStart = document.querySelector('.btn--start');
const btnAgain = document.getElementById('btn-again');
const currentEl0 = document.getElementById('current--0');
const currentEl1 = document.getElementById('current--1');
const playerEl0 = document.querySelector('.player--0');
const playerEl1 = document.querySelector('.player--1');
const mainEl = document.querySelector('.main');
const startScreenEl = document.getElementById('start-screen');
const gameEl = document.getElementById('game');
const rulesPanelEl = document.getElementById('rules-panel');
const winnerMessageEl = document.getElementById('winner-message');
const confettiContainer = document.getElementById('confetti-container');
const turnEl0 = document.getElementById('turn--0');
const turnEl1 = document.getElementById('turn--1');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;
let confettiTimerId = null;

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerEl0.classList.toggle('player--active');
  playerEl1.classList.toggle('player--active');
  turnEl0.classList.toggle('hidden');
  turnEl1.classList.toggle('hidden');
};

const clearConfetti = function () {
  if (confettiTimerId !== null) {
    clearTimeout(confettiTimerId);
    confettiTimerId = null;
  }
  confettiContainer.classList.add('hidden');
  confettiContainer.innerHTML = '';
};

const launchConfetti = function () {
  clearConfetti();
  confettiContainer.classList.remove('hidden');

  const colors = ['#f94144', '#f3722c', '#f8961e', '#90be6d', '#43aa8b', '#577590'];
  const pieces = 80;

  for (let i = 0; i < pieces; i++) {
    const piece = document.createElement('span');
    piece.classList.add('confetti-piece');
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.backgroundColor = colors[i % colors.length];
    piece.style.setProperty('--duration', `${2000 + Math.random() * 1500}ms`);
    piece.style.setProperty('--delay', `${Math.random() * 300}ms`);
    piece.style.setProperty('--drift', `${(Math.random() * 2 - 1) * 30}vw`);
    confettiContainer.appendChild(piece);
  }

  confettiTimerId = window.setTimeout(() => {
    clearConfetti();
  }, 3500);
};

const showWinner = function () {
  playing = false;
  diceEl.classList.add('hidden');
  mainEl.classList.add('is-gameover');
  winnerMessageEl.textContent = `Player ${activePlayer + 1} has won!`;
  winnerMessageEl.classList.remove('hidden');
  btnAgain.classList.remove('hidden');
  launchConfetti();
};

const initGame = function () {
  scores[0] = 0;
  scores[1] = 0;
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  currentEl0.textContent = 0;
  currentEl1.textContent = 0;

  playerEl0.classList.add('player--active');
  playerEl1.classList.remove('player--active');
  turnEl0.classList.remove('hidden');
  turnEl1.classList.add('hidden');

  diceEl.classList.add('hidden');

  document.getElementById('name--0').textContent = 'Player 1';
  document.getElementById('name--1').textContent = 'Player 2';

  winnerMessageEl.classList.add('hidden');
  btnAgain.classList.add('hidden');
  mainEl.classList.remove('is-gameover');
  clearConfetti();
  gameEl.classList.add('is-visible');
};

const startGame = function () {
  document.body.classList.remove('is-start');
  document.body.classList.add('in-game');
  mainEl.classList.add('is-started');
  startScreenEl.classList.add('start-exit');
  window.setTimeout(() => {
    startScreenEl.classList.add('hidden');
    gameEl.classList.remove('hidden');
    rulesPanelEl.classList.remove('hidden');
    btnNew.classList.remove('hidden');
    window.requestAnimationFrame(() => {
      gameEl.classList.add('is-visible');
    });
    initGame();
  }, 250);
};

const rollDice = function () {
  if (!playing) return;

  const dice = Math.floor(Math.random() * 6) + 1;
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;

  if (dice !== 1) {
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    switchPlayer();
  }
};

const holdScore = function () {
  if (!playing) return;

  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  if (scores[activePlayer] >= 100) {
    showWinner();
  } else {
    switchPlayer();
  }
};

btnRoll.addEventListener('click', rollDice);
btnHold.addEventListener('click', holdScore);
btnNew.addEventListener('click', initGame);
btnStart.addEventListener('click', startGame);
btnAgain.addEventListener('click', initGame);

document.body.classList.add('is-start');
