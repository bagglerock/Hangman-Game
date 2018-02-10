//  ** REDO with functions **

//  ** MAIN VALUES **

//  HTML variables
var pressKeyHTML = document.getElementById("press-key");
var winsHTML = document.getElementById("wins");
var remainingGuessesHTML = document.getElementById("remaining-guesses");
var userGuessesHTML = document.getElementById("letters-guessed");
var wordHTML = document.getElementById("word");

//  Arrays
var musicians = ['dave matthews Band', 'the killers', 'evanescense', 'adele', 'cream', 'styx', 'metallica', 'steve Aoki', 'counting Crows', 'reel big fish', 'the script'];
var lettersGuessed = [];

//  Score variables
var wins = 0;
var losses = 0;
var remainingGuesses = 10;

//  Other variables
var userGuess; //  The letter that was pressed as represented by the key
var word; //  The word that was selected
var hiddenWord = ""; //  The word represented by "-"'s
var gameOn = false;

//  ** SCRIPT **

//  If the spacebar was pressed, then execute the code inside
if (gameOn === false) {
    document.body.onkeyup = function(e){
        if(e.keyCode == 32){
            initialize();
        }
    }
}

document.onkeyup = function(event) {
    userGuess = event.key.toLowerCase();
    if (!hasBeenGuessed(userGuess)){
        addToLettersGuessed(userGuess);
        if (wordContains(userGuess)){
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
        console.log("Letter " + " has been guessed.  Please try again.")
        //write something to the screen to say that the letter had been guessed, please try again.
    }
    console.log();
    console.log();
    console.log();
}

//  ** FUNCTIONS **

//  Initialize Hangman
function initialize() {
    word = musicians[Math.floor(Math.random() * musicians.length)];
    for (var i = 0; i < word.length; i++) {
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
function addToLettersGuessed(userGuess) {
    lettersGuessed.push(userGuess);
}

//  Check to see userGuess is in word - Returns true or false
function wordContains(userGuess){
    if (word.indexOf(userGuess) > -1) {
        return true;
    } else {
        return false;
    }
}

//  Change the hiddenWord - Updates wordHTML
function updateHiddenWord(userGuess) {
    //  Split the hiddenWord into an array split by spaces
    hiddenWordArray = hiddenWord.split(" ");
    for(var i = 0; i < word.length; i++){
        if (userGuess === word[i]){
            //  In position i replace 1 array element and replace with userGuess
            hiddenWordArray.splice(i, 1, userGuess);
        }
    }
    //  Join the array and separate by spaces
    hiddenWord = hiddenWordArray.join(" ");
}

//  Update the remaining guesses - updates remainingGuesses
function decreaseRemainingGuesses() {
    remainingGuesses--;
}

//  Check if word is complete - Returns true or false
function wordIsComplete() {
    if(hiddenWord.indexOf("-") === -1){
        return true;
    } else {
        return false;
    }
}

//  Check if remainingGuesses === 0 - Return true or false
function isGameOver() {
    //  do something
}

//  Show you lose splash screen and hit any key to begin
function showYouLose() {
    losses++;
    console.log(losses);
    console.log("YOU GET NOTHING!!! YOU LOSE!!! GOOD DAY SIR!!!");
}

//  Show you win splash screen and hit any key to begin
function showYouWin(){
    wins++;
    console.log(wins);
    console.log("YOU A WINNER!!! HA HA HA!!! YOU A WINNER!!! HA HA HA!!!");
}
