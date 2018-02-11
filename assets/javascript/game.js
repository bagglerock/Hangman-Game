//  ** MAIN VALUES **

//  HTML variables
var winsHTML = document.getElementById("wins");
var lossesHTML = document.getElementById("losses");
var remainingGuessesHTML = document.getElementById("remaining-guesses");
var lettersGuessedHTML = document.getElementById("letters-guessed");
var hiddenWordHTML = document.getElementById("hidden-word")
var messageHTML = document.getElementById("message");
var startButton = document.getElementById("start");

//  Arrays
var lettersGuessed = [];
/*var musicians = [
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
  "the script",
  "tool",
  "zac brown band",
  "van morrison",
  "the cars",
  "frank sinatra"
  <iframe src="" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>
];*/

var musicians = {
    "musician": [
        { "name" : "Dave Matthews Band" , "song" : "https://open.spotify.com/embed/track/2nklcPJ3YhYJfC2ibStXz9"},
        { "name" : "The Killers" , "song" : "https://open.spotify.com/track/0kYUrLVQOfx21xuXu7OGrT?si=4Gr9208mS1uhB8lNzEVFug"},
        { "name" : "Ed Sheeran" , "song" : "https://open.spotify.com/track/2dmOWlEHrP266Qgz6wnUrd?si=r7HKnQMORXqkFRcWYwm9DA"},
        { "name" : "Billy Joel" , "song" : "https://open.spotify.com/track/4850v7DuT7raVYAWc1ODPv?si=grLj6A0KSqePCanB5AOUkg"},
        { "name" : "Cream" , "song" : "https://open.spotify.com/track/6FRwDxXsvSasw0y2eDArsz?si=d2SfWGoMR1-qeiaqpOkmZA"},
        { "name" : "Styx" , "song" : "https://open.spotify.com/track/4hWUOIDHda9XOb1zDchftP?si=_5epsiX1Q5iiIDMbIZ3W5Q"},
        { "name" : "Boyce Avenue" , "song" : "https://open.spotify.com/track/6kABlbpq8D32qZvXbsUkiu?si=UrXMqbh6RmGdV_OCaCQrXw"},
        { "name" : "Third Eye Blind" , "song" : "https://open.spotify.com/track/4lqWT4pavryGVlMhn6khZq?si=_fEN7yfBTRSN72UEBANE5A"},
        { "name" : "Counting Crows" , "song" : "https://open.spotify.com/track/3GwIz1pLK6M2M0qp032McP?si=F-30pMf0TzWWJGxR-8wmDg"},
        { "name" : "Reel Big Fish" , "song" : "https://open.spotify.com/track/7qEm8Z4KFLdCMlv96KykVd?si=yEGRscMHTwGdNMTuvgZ0Hg"},
        { "name" : "The Script" , "song" : "https://open.spotify.com/track/7eD2qAkE1EAs9poZhpVD6o?si=jRQHZIhPQAO2Cgwo4bYh2Q"},
        { "name" : "Rollercoaster" , "song" : "https://open.spotify.com/track/5L95vS64rG1YMIFm1hLjyZ?si=3xLSvDTITCangdddRNn-6A"},
        { "name" : "Zac Brown Band" , "song" : "https://open.spotify.com/track/4iMIIUvmScLS65kg5sHBla?si=RdptRT7fS_2GciBaQFV1PA"},
        { "name" : "Van Morrison" , "song" : "https://open.spotify.com/track/3lh3iiiJeiBXHSZw6u0kh6?si=eVKC-kNARS6WAkHU23vREQ"},
        { "name" : "Dire Straits" , "song" : "https://open.spotify.com/track/57MflfPN3ObQQAQtPUp0WF?si=AT-PGym9TqG2hIjR72USeg"},
        { "name" : "Frank Sinatra" , "song" : "https://open.spotify.com/track/6lTTzSk1hRrxp4VMwXBp2l?si=UsTPdpPwRiio0zLtw_6xaw"}

    ]
}

//  Variables
var wins = 0;
var losses = 0;
var remainingGuesses;
var userGuess; //  The letter that was pressed as represented by the key
var word; //  The word that was selected
var hiddenWord; //  The word represented by "-"'s

//  ** SCRIPT **

//  If the spacebar was pressed, then execute the code inside
startButton.onclick = function(){
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
document.onkeyup = function(event){
    keyPress = event.key;
    console.log(keyPress); 
}

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
  hiddenWordDisplayed = hiddenWord.replace(new RegExp('  ', 'gi'), '&nbsp;&nbsp;&nbsp;');
  //  Re initiate the game variables
  remainingGuesses = 10;
  lettersGuessed = [];
  //  Update the HTML with the new data
  winsHTML.innerHTML = "Wins: " + wins;
  lossesHTML.innerHTML = "Losses: " + losses;
  remainingGuessesHTML.innerHTML = "Remaining Guesses: " + remainingGuesses;
  hiddenWordHTML.innerHTML = hiddenWordDisplayed;
  messageHTML.innerHTML = "Game Started. Press a letter to continue.";
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
  lettersGuessedHTML.innerHTML = "Letters Guessed: " + lettersGuessed;
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
    hiddenWordDisplayed = hiddenWord.replace(new RegExp('  ', 'gi'), '&nbsp;&nbsp;&nbsp;');
    hiddenWordHTML.innerHTML = hiddenWordDisplayed;
  }
}

//  Update the remaining guesses - updates remainingGuesses and updates the HTML
function decreaseRemainingGuesses() {
  remainingGuesses--;
  remainingGuessesHTML.innerHTML = "Remaining Guesses: " + remainingGuesses;
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
  messageHTML.innerHTML = "You Lose! Press 'new game'";
}

//  Show you win splash screen and hit any key to begin
function showYouWin() {
  wins++;
  winsHTML.innerHTML = "Wins: " + wins;
  messageHTML.innerHTML = "You Win! Congratulations!";
}
