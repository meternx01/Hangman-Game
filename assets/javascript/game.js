/* Variables to be used,
Arrays: 
Target words
Target Word
Current Board (chars)


Numbers:
guessesRemaining
wins

Functions:
Start Game
Pick Random Word
onButtonUp Crap
guess
ifCorrect
ifInCorrect
youWin
youFail
*/

var puzzleWord;
var puzzleBoard=[];
var guesses=[];
var incorrect;

//pickRandomWord returns an string of a chosen word : takes in a random number for seed randomness
function pickRandomWord(rand) 
{
	var possibleWords = ["HOUSTON", "DALLAS", "AUSTIN", "BROWNSVILLE", "LAREDO", "HUNTSVILLE"];
	var randNum = rand % possibleWords.length;
	return possibleWords[randNum];
}
function guessed(letter)
{
	for(var i = 0; i<guesses.length;i++)
	{
		if(guesses[i] === letter)
			return true;
	}
	return false;
}

function newGame()
{
	
	// grab a word
	puzzleWord = pickRandomWord(Date.now());
	// fill the board with blanks
	for (var i = 0; i < puzzleWord.length; i++) {
		puzzleBoard.push("-");
	}
	//reset the wrong tolarance to 0
	incorrect = 0;
	//display
	displayOutput("Begin");
}

function displayOutput(messageType)
{
	var outDiv = document.getElementById("output");
	outDiv.innerHTML = "";
	var newStuff;
	if(messageType == "Begin")
	{
		newStuff = document.createElement("h1");
		newStuff.innerHTML = "Game Started!"
		outDiv.appendChild(newStuff);
	}
	if(messageType == "Correct")
	{
		newStuff = document.createElement("h1");
		newStuff.innerHTML = "Correct!"
		outDiv.appendChild(newStuff);
	}
	if(messageType == "Incorrect")
	{
		newStuff = document.createElement("h1");
		newStuff.innerHTML = "That Letter is not in the Word!"
		outDiv.appendChild(newStuff);
	}
	
	newStuff = document.createElement("h2");
	newStuff.innerHTML = "Guess This Word"
	outDiv.appendChild(newStuff);
	newStuff = document.createElement("h2");
	newStuff.innerHTML = puzzleBoard.join("  ");
	outDiv.appendChild(newStuff);
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

document.onkeyup = function(event){
	console.log("Entered guess()");
	var guessLetter = event.key;
	// validate if a letter
	var guessLetter = guessLetter.toUpperCase();
	var letters = /^[A-Z]+$/;
	if (guessLetter.match(letters)) {
		// it's a letter - continue to check
		// if has been already guessed
		if(!guessed(guessLetter))
		{
			//check further
			if(puzzleWord.search(guessLetter)!== -1)	//if the guess is in the puzzle (at least 1 time)
			{
				for(var i=0;i<puzzleWord.length;i++)		//loop thru to find the places it matches
				{
					if(puzzleWord[i] === guessLetter)	//if thats the place
					{
						puzzleBoard[i]=guessLetter;		//update the puzzleBoard}
					}
					displayOutput("Correct");
				}
			}
			else
			{
				incorrect++;
				if(incorrect>=8)
					incorrect = incorrect;	//end game PLACEHOLDER FOR THE IF
				displayOutput("Incorrect");
			}
			guesses.push(guessLetter);	
			console.log(puzzleBoard + " " + guesses);
		}
		
	}
}