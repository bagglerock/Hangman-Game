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

//  Lost Variables
var userGuess; //  The letter that was pressed as represented by the key
var word; //  The word that was selected
var hiddenWord; //  The word represented by "-"'s

//  Objects
var hangman = {
  wins: 0,
  losses: 0,
  remainingGuesses: 10,
  word: "",
  hiddenWord: "",
  hasBeenGuessed: function(userGuess) {
    for (var i = 0; i < lettersGuessed.length; i++) {
      if (userGuess === lettersGuessed[i]) {
        //  Returns true of the userGuess is in the array and updates data on the HTML
        messageHTML.innerHTML =
          "<h3>This letter has been guessed already.  Please try again.</h3>";
        return true;
      }
    }
  },
  addToLettersGuessed: function (userGuess) {
    lettersGuessed.push(userGuess);
    //  adds the letter guessed into the array and updates data on the HTML
    lettersGuessedHTML.innerHTML = "Letters Guessed: " + lettersGuessed;
  },
  wordContains: function (userGuess) {
    if (word.indexOf(userGuess) > -1) {
      messageHTML.innerHTML = "<h3>Good Job! This letter is in this word</h3>";
      return true;
    } else {
      return false;
    }
  },
  updateHiddenWord : function (userGuess) {
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
  },
  decreaseRemainingGuesses : function () {
    remainingGuesses--;
    remainingGuessesHTML.innerHTML = "Remaining Guesses: " + remainingGuesses;
    messageHTML.innerHTML =
      "<h3>Sorry, that letter is not in the word. Please try again.<h5>";
  },
  wordIsComplete : function () {
    if (hiddenWord.indexOf("-") === -1) {
      return true;
    } else {
      return false;
    }
  }
};

//  Script
