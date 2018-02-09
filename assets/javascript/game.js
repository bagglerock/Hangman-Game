//  Grab the DOM elements and store them into variables
var pressKeyHTML = document.getElementById("press-key");
var winsHTML = document.getElementById("wins");
var remainingGuessesHTML = document.getElementById("remaining-guesses");
var lettersGuessedHTML = document.getElementById("letters-guessed");
var word = document.getElementById("word");

//  Array of word choices
var words = ["blah", "shoop", "noopie", "lalalala"];

//  Variables for Wins, Guesses, and Letters Guessed tryAgain
var wins = 0;
var remainingGuesses = 10;
var userGuesses = [];
var tryAgain = false;

//  Check to see if the space bar is pressed to start

//  Choose a word to start off with  ** Beginning **

//  Listen for key press and store it as a variable userGuess
document.onkeyup = function(event) {
  var userGuess = event.key.toLowerCase();
  console.log("The key that was pressed was " + userGuess);

  //Check to see if userGuess is in the lettersGuessed array
  for (var i = 0; i < userGuesses.length; i++) {
    if (userGuess === userGuesses[i]) {
        tryAgain = true;
    } else {
        tryAgain = false;
    }
  }
  if(!tryAgain){
    userGuesses.push(userGuess);
    console.log("The letter " + userGuess + " was NOT used yet.");
    console.log(userGuesses);
  } else {
      console.log("The letter " + userGuess + " was already used.")
  }


      //
      //
      //lettersGuessedHTML.textContent = lettersGuessed.toString();
}


//If userGuess is not in the lettersGuessed array then check to see if userGuess exists in the word,  update the word and check to see if word is complete

//If the userGuess does not exist in the word then subtract from remainingGuesses

//Check to see if remainingGuesses !== 0

//If remainingGuesses === 0 then end game with game over splash to hit spacebar

//If word is complete then make splash screen to hit space bar
