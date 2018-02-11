//  ** MAIN VALUES **

//  HTML variables
var winsHTML = document.getElementById("wins");
var lossesHTML = document.getElementById("losses");
var remainingGuessesHTML = document.getElementById("remaining-guesses");
var lettersGuessedHTML = document.getElementById("letters-guessed");
var hiddenWordHTML = document.getElementById("hidden-word");
var messageHTML = document.getElementById("message");
var embedHTML = document.getElementById("embed");
var startButton = document.getElementById("start");

//  Arrays
var lettersGuessed = [];
var musicians = [
  {
    name: "Dave Matthews Band",
    link: "https://open.spotify.com/embed/track/2nklcPJ3YhYJfC2ibStXz9"
  },
  {
    name: "The Killers",
    link: "https://open.spotify.com/embed/track/0kYUrLVQOfx21xuXu7OGrT"
  },
  {
    name: "Ed Sheeran",
    link: "https://open.spotify.com/embed/track/2dmOWlEHrP266Qgz6wnUrd"
  },
  {
    name: "Billy Joel",
    link: "https://open.spotify.com/embed/track/4850v7DuT7raVYAWc1ODPv"
  },
  {
    name: "Cream",
    link: "https://open.spotify.com/embed/track/6FRwDxXsvSasw0y2eDArsz"
  },
  {
    name: "Styx",
    link: "https://open.spotify.com/embed/track/4hWUOIDHda9XOb1zDchftP"
  },
  {
    name: "Boyce Avenue",
    link: "https://open.spotify.com/embed/track/6kABlbpq8D32qZvXbsUkiu"
  },
  {
    name: "Third Eye Blind",
    link: "https://open.spotify.com/embed/track/4lqWT4pavryGVlMhn6khZq"
  },
  {
    name: "Counting Crows",
    link: "https://open.spotify.com/embed/track/3GwIz1pLK6M2M0qp032McP"
  },
  {
    name: "Reel Big Fish",
    link: "https://open.spotify.com/embed/track/7qEm8Z4KFLdCMlv96KykVd"
  },
  {
    name: "The Script",
    link: "https://open.spotify.com/embed/track/7eD2qAkE1EAs9poZhpVD6o"
  },
  {
    name: "Bleachers",
    link: "https://open.spotify.com/embed/track/5L95vS64rG1YMIFm1hLjyZ"
  },
  {
    name: "Zac Brown Band",
    link: "https://open.spotify.com/embed/track/4iMIIUvmScLS65kg5sHBla"
  },
  {
    name: "Van Morrison",
    link: "https://open.spotify.com/embed/track/3lh3iiiJeiBXHSZw6u0kh6"
  },
  {
    name: "Dire Straits",
    link: "https://open.spotify.com/embed/track/57MflfPN3ObQQAQtPUp0WF"
  },
  {
    name: "Frank Sinatra",
    link: "https://open.spotify.com/embed/track/6lTTzSk1hRrxp4VMwXBp2l"
  }
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
startButton.onclick = function() {
  initialize();
  startButton.innerHTML = "new game";
};

document.onkeyup = function(event) {
  //  If the key stroke is between a-z then do stuff
  if (event.keyCode >= 65 && event.keyCode <= 90 && isGameOver() !== true) {
    //  toLowerCase might not be necessary anymore but leaving it anyway
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
  //  Generate some random number
  var randomNumber = Math.floor(Math.random() * musicians.length)
  //  Set the word & a link to the song for embed
  word = musicians[randomNumber].name.toLowerCase();
  songLink = musicians[randomNumber].link;
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
  hiddenWordDisplayed = hiddenWord.replace(
    new RegExp("  ", "gi"),
    "&nbsp;&nbsp;&nbsp;"
  );
  //  Re initiate the game variables
  remainingGuesses = 10;
  lettersGuessed = [];
  //  Update the HTML with the new data
  winsHTML.innerHTML = "Wins: " + wins;
  lossesHTML.innerHTML = "Losses: " + losses;
  remainingGuessesHTML.innerHTML = "Remaining Guesses: " + remainingGuesses;
  hiddenWordHTML.innerHTML = hiddenWordDisplayed;
  lettersGuessedHTML.innerHTML = "Letters Guessed: ";
  messageHTML.innerHTML = "<h3>Game Started. Press a letter to continue.</h3>";
  embedHTML.innerHTML = "<iframe src='" + songLink + "' width='300' height='380' frameborder='1' allowtransparency='true'></iframe>";
  console.log(songLink);
}

//  Was the key used? - Returns true or false
function hasBeenGuessed(userGuess) {
  for (var i = 0; i < lettersGuessed.length; i++) {
    if (userGuess === lettersGuessed[i]) {
      //  Returns true of the userGuess is in the array and updates data on the HTML
      messageHTML.innerHTML =
        "<h3>This letter has been guessed already.  Please try again.</h3>";
      return true;
    }
  }
}

//  Add the key to the lettersGuessed - updates lettersGuessed[]
function addToLettersGuessed(userGuess) {
  lettersGuessed.push(userGuess);
  //  adds the letter guessed into the array and updates data on the HTML
  lettersGuessedHTML.innerHTML = "Letters Guessed: " + lettersGuessed;
}

//  Check to see userGuess is in word - Returns true if it is in the word and false if not.  Also updates the HTML with data
function wordContains(userGuess) {
  if (word.indexOf(userGuess) > -1) {
    messageHTML.innerHTML = "<h3>Good Job! This letter is in this word</h3>";
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
    hiddenWordDisplayed = hiddenWord.replace(
      new RegExp("  ", "gi"),
      "&nbsp;&nbsp;&nbsp;"
    );
    hiddenWordHTML.innerHTML = hiddenWordDisplayed;
  }
}

//  Update the remaining guesses - updates remainingGuesses and updates the HTML
function decreaseRemainingGuesses() {
  remainingGuesses--;
  remainingGuessesHTML.innerHTML = "Remaining Guesses: " + remainingGuesses;
  messageHTML.innerHTML =
    "<h3>Sorry, that letter is not in the word. Please try again.<h5>";
}

//  Check if word is complete - Returns true or false
function wordIsComplete() {
  if (hiddenWord.indexOf("-") === -1) {
    return true;
  } else {
    return false;
  }
}

//  Check if remainingGuesses === 0 and wordIsComplete - Return true or false
function isGameOver() {
  if (remainingGuesses === 0 || wordIsComplete()) {
    return true;
  } else {
    return false;
  }
}

//  Show you lose splash screen and hit any key to begin
function showYouLose() {
  losses++;
  lossesHTML.innerHTML = "Losses: " + losses;
  messageHTML.innerHTML = "<h3>You Lose! Press 'new game'</h3>";
}

//  Show you win splash screen and hit any key to begin
function showYouWin() {
  wins++;
  winsHTML.innerHTML = "Wins: " + wins;
  messageHTML.innerHTML = "<h3>You Win! Congratulations!</h3>";
}
