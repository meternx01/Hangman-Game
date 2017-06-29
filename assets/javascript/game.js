/*
Hangman Javascript 6/29/2017
by Jason McKinney

Script to play a basic Hangman game with a list of possible words
*/

//GLOBAL VARIABLES******************************************************
var puzzleWord;	// string of the word
var puzzleBoard = []; // representation of the puzzle
var guesses = [];	// list of all guesses
var incorrect;	// number of incorrect guesses

//pickRandomWord returns an string of a chosen word : takes in a random number for seed randomness
function pickRandomWord(rand) {
	var possibleWords = ["HOUSTON", "DALLAS", "AUSTIN", "BROWNSVILLE", "LAREDO", "HUNTSVILLE"];
	var randNum = rand % possibleWords.length;
	return possibleWords[randNum];
}

// guessed returns true IF the letter passed to it is in the guesses array
function guessed(letter) {
	for (var i = 0; i < guesses.length; i++) {
		if (guesses[i] === letter)
			return true;
	}
	return false;
}

// newGame starts a new round
function newGame() {

	// grab a word
	puzzleWord = pickRandomWord(Date.now());
	// reset the board
	puzzleBoard = [];
	guesses =[];
	// fill the board with blanks
	for (var i = 0; i < puzzleWord.length; i++) {
		puzzleBoard.push("_");
	}
	//reset the wrong tolarance to 0
	incorrect = 0;
	//display
	displayOutput("Begin");
}

// displayOutput is the only function that writes HTML to the page
// the argument is a string for Begin (Start a new game) Correct (Letter is in the puzzle)
// or Incorrect (Letter is not in puzzle)
// http://cdn-9chat-fun.9cache.com/media/photo/amZaklpA3_480w_v1.jpg
function displayOutput(messageType) {
	// get the ID from the HTML
	var outDiv = document.getElementById("output");
	// Clear old text
	outDiv.innerHTML = "";
	var newStuff;	// define newStuff as the elements to be created in the outDiv <div>
	// New Game Message
	if (messageType == "Begin") {
		newStuff = document.createElement("h1");
		newStuff.innerHTML = "Game Started!"
		outDiv.appendChild(newStuff);
	}
	// Correct Response
	if (messageType == "Correct") {
		newStuff = document.createElement("h1");
		newStuff.innerHTML = "Correct!"
		outDiv.appendChild(newStuff);
	}
	// Incorrect Response
	if (messageType == "Incorrect") {
		newStuff = document.createElement("h1");
		newStuff.innerHTML = "That Letter is not in the City!"
		outDiv.appendChild(newStuff);
	}

	// Below written regardless in all circumstances******
	newStuff = document.createElement("h2");
	newStuff.innerHTML = "Guess This City"	// Just a string
	outDiv.appendChild(newStuff);
	newStuff = document.createElement("h2");
	newStuff.innerHTML = puzzleBoard.join("  ");	// the puzzleBoard without the commas
	outDiv.appendChild(newStuff);
	newStuff = document.createElement("h3");
	newStuff.innerHTML = "Guesses remaining: " + (8 - incorrect);	// Remaining Guesses
	outDiv.appendChild(newStuff);
	
	// On the new game the guesses array is empty, so no need to dispay it
	if (guesses.length != 0) {
		newStuff = document.createElement("h3");
		newStuff.innerHTML = guesses.join("  ");
		outDiv.appendChild(newStuff);
	}
}

/*function guess(event)
{
	console.log("Entered guess()");
	var guessLetter = event.key;
	// validate if a letter
	var firstLetter = guessLetter.toUpperCase();
	if (firstLetter.toLowerCase() != firstLetter) {
		// it's a letter - continue to check
		// if has been already guessed
		if(!guessed(guessLetter))
		{
			//check further
			if(puzzleWord.search(guessLetter)!== -1)	//if the guess is in the puzzle (at least 1 time)
			{
				for(var i;i<puzzleWord.length;i++)		//loop thru to find the places it matches
				{
					if(puzzleWord[i] === guessLetter)	//if found
						puzzleBoard[i]=guessLetter;		//update the puzzleBoard
				}
			}
			else
			{
				incorrect++;
				if(incorrect>=8)
					incorrect = incorrect;	//end game PLACEHOLDER FOR THE IF
			}
		}
		
	}
}*/

// hsa Blanks returns true IF it is not solved (has blanks in it)
function hasBlanks(blank) {
	return blank == "_";
}

// Capture of the letter as pressed, and the validation of if it's correct
document.onkeyup = function (event) {
	// extract the letter pressed
	var guessLetter = event.key;
	// validate if a letter
	var guessLetter = guessLetter.toUpperCase();	//force it to Upper case
	var letters = /^[A-Z]+$/;
	if (guessLetter.match(letters)) {	// it's a letter - continue to check
		// if has been already guessed
		if (!guessed(guessLetter)) {
			//check further
			if (puzzleWord.search(guessLetter) !== -1) //if the guess is in the puzzle (at least 1 time)
			{
				for (var i = 0; i < puzzleWord.length; i++) //loop thru to find the places it matches
				{
					if (puzzleWord[i] === guessLetter) //if thats the place
					{
						puzzleBoard[i] = guessLetter; //update the puzzleBoard
					}
					displayOutput("Correct");	// Write to HTML
				}
			} else {	// if not in the puzzle
				incorrect++;	// Incriment the counter
				if (incorrect < 8) {	// Have you run out of guesses
					displayOutput("Incorrect");	// Write to HTML
					guesses.push(guessLetter);	// Place the letter into the guessed list
				} else {	// Game over condition
					alert("You need to look at a map of Texas....");
					startGame();	// Restart the game
				}

			}
			// check if game is complete - Win
			if (!puzzleBoard.some(hasBlanks)) { 	// If the board does NOT have blanks remaining
				setTimeout(function(){alert("You Won The Internets!")},500);
				startGame();
			}

		}

	}
}