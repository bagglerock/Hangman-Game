//  ** REDO with functions **

//  ** MAIN VALUES **

//  HTML variables
var pressKeyHTML = document.getElementById("press-key");
var winsHTML = document.getElementById("wins");
var lossesHTML = document.getElementById("losses");
var remainingGuessesHTML = document.getElementById("remaining-guesses");
var userGuessesHTML = document.getElementById("letters-guessed");
var wordHTML = document.getElementById("word");

//  Arrays
var lettersGuessed = [];
var musicians = [
  "dave matthews band",
  "the killers",
  "evanescense",
  "adele",
  "cream",
  "styx",
  "metallica",
  "steve aoki",
  "counting Crows",
  "reel big fish",
  "the script"
];

//  Variables
var wins;
var losses;
var remainingGuesses;
var userGuess; //  The letter that was pressed as represented by the key
var word; //  The word that was selected
var hiddenWord; //  The word represented by "-"'s

//  ** SCRIPT **

//  If the spacebar was pressed, then execute the code inside
document.body.onkeyup = function(event) {
  if (event.keyCode == 32) {
    initialize();
  }
};

document.onkeyup = function(event) {
  if (event.keyCode >= 65 && event.keyCode <= 90) {
    userGuess = event.key.toLowerCase();
    if (!hasBeenGuessed(userGuess)) {
      addToLettersGuessed(userGuess);
      if (wordContains(userGuess)) {
        updateHiddenWord(userGuess);
        if (wordIsComplete()) {
          showYouWin();
        }
      } else {
        decreaseRemainingGuesses();
        if (remainingGuesses === 0) {
          showYouLose();
        }
      }
    } else {
    }
  }
};

//  ** FUNCTIONS **

//  Initialize Hangman
function initialize() {
  //  Set the word
  word = musicians[Math.floor(Math.random() * musicians.length)];
  //  Empty the hidden word and set it
  hiddenWord = "";
  for (var i = 0; i < word.length; i++) {
    if (word[i] !== " ") {
      hiddenWord = hiddenWord + "- ";
    } else {
      hiddenWord = hiddenWord + " &nbsp;&nbsp; ";
    }
  }
  remainingGuesses = 10;
  lettersGuessed = [];
  document.getElementById("word").innerHTML = word;
  document.getElementById("hidden-word").innerHTML = hiddenWord;
  document.getElementById("letters-guessed").innerHTML = lettersGuessed;
  document.getElementById("remaining-guesses").innerHTML = remainingGuesses;
  document.getElementById("message").innerHTML = "Game Started";
}

//  Was the key used? - Returns true or false
function hasBeenGuessed(userGuess) {
  for (var i = 0; i < lettersGuessed.length; i++) {
    if (userGuess === lettersGuessed[i]) {
        document.getElementById("message").innerHTML ="This letter has been guessed already.  Please try again.";
        return true;
    }
  }
}

//  Add the key to the lettersGuessed - updates lettersGuessed[]
function addToLettersGuessed(userGuess) {
  lettersGuessed.push(userGuess);
  document.getElementById("letters-guessed").innerHTML = lettersGuessed;
}

//  Check to see userGuess is in word - Returns true or false
function wordContains(userGuess) {
  if (word.indexOf(userGuess) > -1) {
    document.getElementById("message").innerHTML = "Good Job! This letter is in this word";
    return true;
  } else {
    return false;
  }
}

//  Change the hiddenWord - Updates wordHTML
function updateHiddenWord(userGuess) {
  if (userGuess !== " ") {
    //  Split the hiddenWord into an array split by spaces
    hiddenWordArray = hiddenWord.split(" ");
    for (var i = 0; i < word.length; i++) {
      if (userGuess === word[i]) {
        //  In position i replace 1 array element and replace with userGuess
        hiddenWordArray.splice(i, 1, userGuess);
      }
    }
    //  Join the array and separate by spaces
    hiddenWord = hiddenWordArray.join(" ");
    document.getElementById("hidden-word").innerHTML = hiddenWord;
  }
}

//  Update the remaining guesses - updates remainingGuesses
function decreaseRemainingGuesses() {
  remainingGuesses--;
  document.getElementById("remaining-guesses").innerHTML = remainingGuesses;
  document.getElementById("message").innerHTML ="Sorry, that letter is not in the word. Please try again.";
}

//  Check if word is complete - Returns true or false
function wordIsComplete() {
  if (hiddenWord.indexOf("-") === -1) {
    return true;
  } else {
    return false;
  }
}

//  Check if remainingGuesses === 0 - Return true or false
function isGameOver() {
  if (remainingGuesses === 0 || wordIsComplete()) {
    return true;
  } else {
    return false;
  }

  //  do something
}

//  Show you lose splash screen and hit any key to begin
function showYouLose() {
  losses++;
  document.getElementById("message").innerHTML = "You Lose!";
}

//  Show you win splash screen and hit any key to begin
function showYouWin() {
  wins++;
  document.getElementById("message").innerHTML = "You Win!";
}
