//  Grab the DOM elements and store them into variables
var pressKeyHTML = document.getElementById("press-key");
var winsHTML = document.getElementById("wins");
var remainingGuessesHTML = document.getElementById("remaining-guesses");
var userGuessesHTML = document.getElementById("letters-guessed");
var wordHTML = document.getElementById("word");

//  Array of word choices
var words = ["blah", "shoop", "noopie", "lalalala"];

//  Variables for Wins, Guesses, and Letters Guessed tryAgain
var wins = 0;
var remainingGuesses = 10;
var userGuesses = [];

winsHTML.textContent = wins;
remainingGuessesHTML.textContent = remainingGuesses;
userGuessesHTML.textContent = userGuesses;

//  Check to see if the space bar is pressed to start

//  Choose a word to start off with  ** Beginning **
var word = words[Math.floor(Math.random() * words.length)];
//  Show the word as dashes
hiddenWord = "";
for (var i = 0; i < word.length; i++){
    hiddenWord = hiddenWord + "- ";
}
wordHTML.textContent = hiddenWord;
console.log(word);

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
    userGuessesHTML.textContent = userGuesses;
    //  Check to see if userGuess is in the word and switch the - to the userGuess
    if(word.indexOf(userGuess) > -1){
        //  Go through each letter of the word and change the - to the userGuess
        for(var i = 0; i < word.length; i++){
            if (userGuess === word[i]){
                //  Split the hiddenWord into an array split by spaces
                hiddenWordArray = hiddenWord.split(" ");
                //  In position i replace 1 array element and replace with userGuess
                hiddenWordArray.splice(i, 1, userGuess);
                //  Join the array and separate by spaces
                hiddenWord = hiddenWordArray.join(" ");
            }
        }
        wordHTML.textContent = hiddenWord;
        //  Check to see if the word is complete
        if(word.indexOf("-") === -1){
            //Change the screen to you win!!!
        }
    //  If the userGuess is wrong then decrease the remaining guesses by one and update the remaining guesses in HTML
    } else {
        remainingGuesses--;
        remainingGuessesHTML.textContent = remainingGuesses;
        if (remainingGuesses === 0){
            //game over
        }
    }
    
  } else {
      console.log("The letter " + userGuess + " was already used. Please try again.")
  }

}
