//  ** REDO with functions **

//  ** MAIN VALUES **

//  HTML variables
var pressKeyHTML = document.getElementById("press-key");
var winsHTML = document.getElementById("wins");
var remainingGuessesHTML = document.getElementById("remaining-guesses");
var userGuessesHTML = document.getElementById("letters-guessed");
var wordHTML = document.getElementById("word");

//  Arrays
var musicians = ['Dave Matthews Band', 'The Killers', 'Evanescense', 'Adele', 'Cream', 'Styx', 'Metallica', 'Steve Aoki', 'Counting Crows', 'Reel Big Fish', 'The Script'];
var lettersGuessed = [];

//  Score variables
var wins = 0;
var losses = 0;
var remainingGuesses = 10;

//  Other variables
var userGuess; //  The letter that was pressed as represented by the key
var word; //  The word that was selected
var hiddenWord = ""; //  The word represented by "-"'s

//  ** SCRIPT **

initialize();

document.onkeyup = function(event) {
    userGuess = event.key.toLowerCase();
    if (!hasBeenGuessed(userGuess)){
        addToLettersGuessed(userGuess);
        console.log(lettersGuessed);
    } else {
        console.log("Letter " + " has been guessed.  Please try again.")
    }
}

//  ** FUNCTIONS **

//  Initialize Hangman
function initialize() {
    word = musicians[Math.floor(Math.random() * musicians.length)];
    for (var i = 0; i < word.length; i++){
        if (word[i] !== " ") {
            hiddenWord = hiddenWord + "- ";
        } else {
            hiddenWord = hiddenWord + " ";
        }
    }
}

//  Was the key used? - Returns true or false
function hasBeenGuessed(userGuess) {
    for (var i = 0; i < lettersGuessed.length; i++) {
        if (userGuess === lettersGuessed[i]) {
            return true;
        }
    }
}

//  Add the key to the lettersGuessed - updates lettersGuessed[]
function addToLettersGuessed(userGuess){
    lettersGuessed.push(userGuess);
}

//  Check to see userGuess is in word - Returns true or false
function wordContains(userGuess){
    //  do something
}

//  Change the hiddenWord - Updates wordHTML
function updateHiddenWord(key){
    //do something
}

//  Update the remaining guesses - updates remainingGuesses
function decreaseRemainingGuesses() {
    //  do something
}

//  Check if word is complete - Returns true or false
function wordIsComplete(word) {
    //  do something
}

//  Check if remainingGuesses === 0 - Return true or false
function isGameOver(){
    //  do something
}

//  Show you lose splash screen and hit any key to begin
function showYouLose(){
    losses++;
    //  do something
}

//  Show you win splash screen and hit any key to begin
function showYouWin(){
    wins++;
    //  do something
}
