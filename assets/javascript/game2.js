//  ** REDO with functions **

//  ** Set the main values

//  HTML variables
var pressKeyHTML = document.getElementById("press-key");
var winsHTML = document.getElementById("wins");
var remainingGuessesHTML = document.getElementById("remaining-guesses");
var userGuessesHTML = document.getElementById("letters-guessed");
var wordHTML = document.getElementById("word");

//  Arrays
var musician = ['Dave Matthews Band', 'The Killers', 'Evanescense', 'Adele', 'Cream', 'Styx', 'Metallica', 'Steve Aoki', 'Counting Crows', 'Reel Big Fish'];
var lettersGuessed = [];

//  Score variables
var wins = 0;
var remainingGuesses = 10;

//  Other variables
var userGuess;
var word;
var key;
var hiddenWord = "";



//  ** Functions **

//  Initialize Hangman
function initialize() {
    //  set all number and make a new word from the array of words
}

//  Was the key used? - Returns true or false
function hasBeenGuessed(key) {
    // check to see if the key is in lettersGuessed[] array - return true or false
}

//  Add the key to the lettersGuessed - updates lettersGuessed[]
function addToLettersGuessed(key){
    //  add this new letter to the lettersGuessed array
}

//  Check to see userGuess is in word - Returns true or false
function wordContains(key){
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

function isGameOver(){
    //  do something
}

function showYouLose(){
    //  do something
}

function showYouWin(){
    //  do something
}






//  Check Key was used - Return true or false

//  TRUE - return message 

