//  Global Variables
var winsHTML = document.getElementById("wins");
var lossesHTML = document.getElementById("losses");
var remainingGuessesHTML = document.getElementById("remaining-guesses");
var lettersGuessedHTML = document.getElementById("letters-guessed");
var hiddenWordHTML = document.getElementById("hidden-word");
var messageHTML = document.getElementById("message");
var embedHTML = document.getElementById("embed");
var startButton = document.getElementById("start");
var resetButton = document.getElementById("reset-button");
var userGuess; //  The letter that was pressed as represented by the key
var spacer = "&nbsp;&nbsp;&nbsp;";
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


//  Objects
var hangman = {
  wins: 0,
  losses: 0,
  remainingGuesses: 10,
  lettersGuessed : [],
  word: "",
  hiddenWord: "",
  hiddenWordDisplayed : "",
  songLink : "",
  initialize : function () {
    //  Generate a random number
    var randomNumber = Math.floor(Math.random() * musicians.length);
    //  Set the word & a link to the song for embed
    this.word = musicians[randomNumber].name.toLowerCase();
    this.songLink = musicians[randomNumber].link;
    //  Empty the hidden word and set it.  Does it by setting "- " for every letter and a space for the space
    this.hiddenWord = "";
    for (var i = 0; i < this.word.length; i++) {
      if (this.word[i] !== " ") {
        this.hiddenWord = this.hiddenWord + "- ";
      } else {
        this.hiddenWord = this.hiddenWord + " ";
      }
    }
    //  Because HTML doesn't display double spacing I had to write this to accomodate the look on the page with this
    this.hiddenWordDisplayed = this.hiddenWord.replace(
      new RegExp("  ", "gi"), spacer);
    //  Re initiate the game variables
    this.remainingGuesses = 10;
    this.lettersGuessed = [];
    //  Update the HTML with the new data
    winsHTML.innerHTML = "Wins: " + this.wins;
    lossesHTML.innerHTML = "Losses: " + this.losses;
    remainingGuessesHTML.innerHTML = "Remaining Guesses: " + this.remainingGuesses;
    hiddenWordHTML.innerHTML = this.hiddenWordDisplayed;
    lettersGuessedHTML.innerHTML = "Letters Guessed: ";
    messageHTML.textContent = "Game Started. Press a letter to continue.";
  },
  hasBeenGuessed : function (userGuess) {
    for (var i = 0; i < this.lettersGuessed.length; i++) {
      if (userGuess === this.lettersGuessed[i]) {
        //  Returns true of the userGuess is in the array and updates data on the HTML
        messageHTML.textContent =
          "This letter has been guessed already.  Please try again.";
        return true;
      }
    }
  },
  addToLettersGuessed : function (userGuess) {
    this.lettersGuessed.push(userGuess);
    //  adds the letter guessed into the array and updates data on the HTML
    lettersGuessedHTML.innerHTML = "Letters Guessed: " + this.lettersGuessed;
  },
  wordContains : function (userGuess) {
    if (this.word.indexOf(userGuess) > -1) {
      messageHTML.innerHTML = "Good Job! This letter is in this word";
      return true;
    } else {
      return false;
    }
  },
  updateHiddenWord : function (userGuess) {
    if (userGuess !== " ") {
      //  Split the hiddenWord into an array split by spaces
      var hiddenWordArray = this.hiddenWord.split(" ");
      for (var i = 0; i < this.word.length; i++) {
        if (userGuess === this.word[i]) {
          //  In position i replace 1 array element and replace with userGuess
          hiddenWordArray.splice(i, 1, userGuess);
        }
      }
      //  Join the array and separate by spaces
      this.hiddenWord = hiddenWordArray.join(" ");
      //  Couldn't think of an alternative so I used the regular expression to replace all double spaces to display in the HTML page correctly.
      this.hiddenWordDisplayed = this.hiddenWord.replace(
        new RegExp("  ", "gi"), spacer);
      hiddenWordHTML.innerHTML = this.hiddenWordDisplayed;
    }
  },
  decreaseRemainingGuesses : function () {
    this.remainingGuesses--;
    remainingGuessesHTML.innerHTML = "Remaining Guesses: " + this.remainingGuesses;
    messageHTML.textContent =
      "Sorry, that letter is not in the word. Please try again.";
  },
  wordIsComplete : function () {
    if (this.hiddenWord.indexOf("-") === -1) {
      return true;
    } else {
      return false;
    }
  },
  isGameOver : function () {
    if (this.remainingGuesses === 0 || this.wordIsComplete()) {
      return true;
    } else {
      return false;
    }
  },
  showYouLose : function () {
    this.losses++;
    lossesHTML.innerHTML = "Losses: " + this.losses;
    messageHTML.textContent = "You Lose! Press \"new game\"";
  },
  showYouWin : function () {
    this.wins++;
    winsHTML.innerHTML = "Wins: " + this.wins;
    messageHTML.textContent = "You Win! Congratulations!";
    embedHTML.innerHTML = "<iframe src='" + this.songLink + "' width='300' height='390' frameborder='1' allowtransparency='true'></iframe>";
  }
};

//  Script
startButton.onclick = function() {
    hangman.initialize();
    startButton.innerHTML = "new game";
};

document.onkeyup = function(event) {
    //  If the key stroke is between a-z then do stuff
    if (event.keyCode >= 65 && event.keyCode <= 90 && hangman.isGameOver() !== true) {
      //  toLowerCase might not be necessary anymore but leaving it anyway
      userGuess = event.key.toLowerCase();
      if (!hangman.hasBeenGuessed(userGuess)) {
        hangman.addToLettersGuessed(userGuess);
        if (hangman.wordContains(userGuess)) {
            hangman.updateHiddenWord(userGuess);
          if (hangman.wordIsComplete()) {
            hangman.showYouWin();
          }
        } else {
            hangman.decreaseRemainingGuesses();
          if (hangman.isGameOver()) {
            hangman.showYouLose();
          }
        }
      }
    }
  };

