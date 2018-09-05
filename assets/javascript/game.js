// Word List
var wordList = [
  "shortstop",
  "dugout",
  "umpire",
  "bullpen",
  "infield",
  "outfield",
  "catcher",
  "pitcher",
  "double",
  "tripple",
  "slider"
];

// Game Variables
var lettersGuessed = [];
var guessWord = [];
var tries = 10;
var wins = 0;
var currentWordList;
var remainingGuesses = 0;
var gameStart = false;
var gameDone = false;
var winSound = new Audio("assets/sounds/win.mp3");
var lossSound = new Audio("assets/sounds/loss.mp3");

// Reset Game
function resetGame() {
  remainingGuesses = tries;
  gameStart = false;
  currentWordList = Math.floor(Math.random() * wordList.length);
  lettersGuessed = [];
  guessWord = [];
  document.getElementById("hangmanMan").src = "";
  for (var i = 0; i < wordList[currentWordList].length; i++) {
    guessWord.push("_");
  }
  document.getElementById("tryAgain").style.cssText = "display: none";
  document.getElementById("gameOverImage").style.cssText = "display: none";
  document.getElementById("winImage").style.cssText = "display: none";
  updateDisplay();
}

// Update Display
function updateDisplay() {
  document.getElementById("totalWins").innerText = wins;
  document.getElementById("currentWord").innerText = "";
  for (var i = 0; i < guessWord.length; i++) {
    document.getElementById("currentWord").innerText += guessWord[i];
  }
  document.getElementById("remainingGuesses").innerText = remainingGuesses;
  document.getElementById("lettersGuessed").innerText = lettersGuessed;
  if (remainingGuesses <= 0) {
    document.getElementById("gameOverImage").style.cssText = "display: block";
    document.getElementById("tryAgain").style.cssText = "display: block";
    lossSound.play();
    gameDone = true;
  }
}

// Update Hangman Image
function updateHangman() {
  document.getElementById("hangmanMan").src =
    "assets/images/" + (tries - remainingGuesses) + ".png";
}
document.onkeydown = function(e) {
  if (gameDone) {
    resetGame();
    gameDone = false;
  } else {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
      guessMade(e.key.toLowerCase());
    }
  }
};
function guessMade(letter) {
  if (remainingGuesses > 0) {
    if (!gameStart) {
      gameStart = true;
    }
    if (lettersGuessed.indexOf(letter) === -1) {
      lettersGuessed.push(letter);
      checkGuess(letter);
    }
  }
  updateDisplay();
  checkWin();
}

// Word Function
function checkGuess(letter) {
  var position = [];
  for (var i = 0; i < wordList[currentWordList].length; i++) {
    if (wordList[currentWordList][i] === letter) {
      position.push(i);
    }
  }
  if (position.length <= 0) {
    remainingGuesses--;
    updateHangman();
  } else {
    for (var i = 0; i < position.length; i++) {
      guessWord[position[i]] = letter;
    }
  }
}

// Check Win
function checkWin() {
  if (guessWord.indexOf("_") === -1) {
    document.getElementById("winImage").style.cssText = "display: block";
    document.getElementById("tryAgain").style.cssText = "display: block";
    wins++;
    winSound.play();
    gameDone = true;
  }
}
