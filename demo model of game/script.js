const cards = document.querySelectorAll('.memory-card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchedCards = 0; // Track the number of matched cards
let timer; // Variable to store the timer
let timeLeft = 30; // Set the timer to 30 seconds
let timerStarted = false; // Track if the timer has started

document.querySelectorAll('.memory-card').forEach(card => {
  card.classList.remove('flip'); // Ensure no card is flipped on load
});

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  // Start the timer on the first card click
  if (!timerStarted) {
    timerStarted = true;
    startTimer();
  }

  this.classList.toggle('flip');
  if (!hasFlippedCard) {
    // First click
    hasFlippedCard = true;
    firstCard = this;
  } else {
    // Second click
    hasFlippedCard = false;
    secondCard = this;
    checkForMatch();
  }
}

function checkForMatch() {
  // Check if the two flipped cards match
  if (firstCard.dataset.framework === secondCard.dataset.framework) {
    disableCards();
    matchedCards += 2; // Increment matched cards count
    if (matchedCards === cards.length) {
      setTimeout(showWinPopup, 500); // Show popup when all cards are matched
    }
  } else {
    unflipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 400);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function showWinPopup() {
  clearInterval(timer); // Stop the timer
  const popup = document.createElement('div');
  popup.classList.add('popup');
  popup.innerHTML = `
    <div class="popup-content">
      <h2>Congratulations! You Won!</h2>
      <button id="play-again">Play Again</button>
    </div>
  `;
  document.body.appendChild(popup);

  // Restart the game when "Play Again" is clicked
  document.getElementById('play-again').addEventListener('click', () => {
    popup.remove();
    restartGame();
  });
}

function showLosePopup() {
  clearInterval(timer); // Stop the timer
  const popup = document.createElement('div');
  popup.classList.add('popup');
  popup.innerHTML = `
    <div class="popup-content">
      <h2>Time's up! You Lost!</h2>
      <button id="try-again">Play Again</button>
    </div>
  `;
  document.body.appendChild(popup);

  document.getElementById('try-again').addEventListener('click', () => {
    popup.remove();
    restartGame();
  });
}

function restartGame() {
  matchedCards = 0;
  timeLeft = 30; // Reset the timer to 30 seconds
  timerStarted = false; // Reset the timerStarted flag
  clearInterval(timer); // Clear the previous timer
  const timerElement = document.getElementById('timer');
  if (timerElement) timerElement.textContent = `Time Left: ${timeLeft}s`; // Reset timer display
  cards.forEach(card => {
    card.classList.remove('flip');
    card.addEventListener('click', flipCard);
  });
  shuffle();
}

function startTimer() {
  const timerElement = document.getElementById('timer') || createTimerElement();
  timerElement.textContent = `Time Left: ${timeLeft}s`;

  timer = setInterval(() => {
    timeLeft--;
    timerElement.textContent = `Time Left: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      showLosePopup(); // Show a popup when the timer runs out
    }
  }, 1000);
}

function createTimerElement() {
  const timerElement = document.createElement('div');
  timerElement.id = 'timer';
  document.body.appendChild(timerElement);
  return timerElement;
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 16); // Adjusted for 16 cards
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));
