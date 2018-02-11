//  ** MAIN VALUES **

//  HTML variables
var winsHTML = document.getElementById("wins");
var lossesHTML = document.getElementById("losses");
var remainingGuessesHTML = document.getElementById("remaining-guesses");
var lettersGuessedHTML = document.getElementById("letters-guessed");
var wordHTML = document.getElementById("word");
var hiddenWordHTML = document.getElementById("hidden-word")
var messageHTML = document.getElementById("message");

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
  "counting crows",
  "reel big fish",
  "the script"
];

//  Variables
var wins = 0;
var losses = 0;
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
  //  Empty the hidden word and set it.  Does it by setting "- " for every letter and a space for the space 
  hiddenWord = "";
  for (var i = 0; i < word.length; i++) {
    if (word[i] !== " ") {
      hiddenWord = hiddenWord + "- ";
    } else {
      hiddenWord = hiddenWord + " ";
    }
  }
  //  Because HTML doesn't display double spacing I had to write this to accomodate the look on the page with this
  hiddenWordDisplayed = hiddenWord.replace(new RegExp('  ', 'gi'), '&nbsp;&nbsp;');
  //  Re initiate the game variables
  remainingGuesses = 10;
  lettersGuessed = [];
  //  Update the HTML with the new data
  winsHTML.innerHTML = wins;
  lossesHTML.innerHTML = losses;
  remainingGuessesHTML.innerHTML = remainingGuesses;
  wordHTML.innerHTML = word;
  hiddenWordHTML.innerHTML = hiddenWordDisplayed;
  lettersGuessedHTML.innerHTML = lettersGuessed;
  remainingGuessesHTML.innerHTML = remainingGuesses;
  messageHTML.innerHTML = "Game Started";
}

//  Was the key used? - Returns true or false
function hasBeenGuessed(userGuess) {
  for (var i = 0; i < lettersGuessed.length; i++) {
    if (userGuess === lettersGuessed[i]) {
        //  Returns true of the userGuess is in the array and updates data on the HTML
        messageHTML.innerHTML ="This letter has been guessed already.  Please try again.";
        return true;
    }
  }
}

//  Add the key to the lettersGuessed - updates lettersGuessed[]
function addToLettersGuessed(userGuess) {
  lettersGuessed.push(userGuess);
  //  adds the letter guessed into the array and updates data on the HTML
  lettersGuessedHTML.innerHTML = lettersGuessed;
}

//  Check to see userGuess is in word - Returns true if it is in the word and false if not.  Also updates the HTML with data
function wordContains(userGuess) {
  if (word.indexOf(userGuess) > -1) {
    messageHTML.innerHTML = "Good Job! This letter is in this word";
    return true;
  } else {
    return false;
  }
}

//  Change the hiddenWord - Updates the HTML
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
    //  Couldn't think of an alternative so I used the regular expression to replace all double spaces to display in the HTML page correctly.
    hiddenWordDisplayed = hiddenWord.replace(new RegExp('  ', 'gi'), '&nbsp;&nbsp;');
    hiddenWordHTML.innerHTML = hiddenWordDisplayed;
  }
}

//  Update the remaining guesses - updates remainingGuesses and updates the HTML
function decreaseRemainingGuesses() {
  remainingGuesses--;
  remainingGuessesHTML.innerHTML = remainingGuesses;
  messageHTML.innerHTML ="Sorry, that letter is not in the word. Please try again.";
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
  lossesHTML.innerHTML = losses;
  messageHTML.innerHTML = "You Lose!";
}

//  Show you win splash screen and hit any key to begin
function showYouWin() {
  wins++;
  winsHTML.innerHTML = wins;
  messageHTML.innerHTML = "You Win!";
}
