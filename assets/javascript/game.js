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


//  Check to see if the space bar is pressed to start

//  Choose a word to start off with  ** Beginning **

//  Listen for key press and store it as a variable userGuess
document.onkeyup = function(event) {
  var userGuess = event.key.toLowerCase();
  console.log("The key that was pressed was " + userGuess);

  //  Check to see if userGuess is in the lettersGuessed array using a tryAgain boolean expression
  var tryAgain = false;
  for (var i = 0; i < userGuesses.length; i++) {
    if (userGuess === userGuesses[i]) {
        tryAgain = true;
    }
  }
  //  If tryAgain is not true then, add the userGuess to the userGuesses array and check to see if userGuess is in the word
  if(!tryAgain){
    userGuesses.push(userGuess);
    //  Check to see if userGuess is in the word and switch the - to the userGuess
    if(word.indexOf(userGuess) > -1){
        //find the indexes of the word and change the character at those indexes, maybe do a wheel of fortune kind of thing and do a for loop
        if(word.indexOf("-") === -1){
            //Change the screen to you win!!!
        }
    } else {
        remainingGuesses--;
        if (remainingGuesses === 0){
            //game over
        }
    }

    //  If the userGuess is not in the word
    
  } else {
      console.log("The letter " + userGuess + " was already used. Please try again.")
  }

}



