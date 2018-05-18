// Game values

let min = 1,
	max = 10,
	winningNum = getRandomNum(min, max),
	guessesLeft = 3;


// UI elements

const 	game = document.getElementById('game'),
		minNum = document.querySelector('.min-num'),
		maxNum = document.querySelector('.max-num'),
		guessBtn = document.querySelector('#guess-btn'),
		guessInput = document.querySelector('#guess-input'),
		message = document.querySelector('.message');


// Assign UI min and max

minNum.textContent = min;
maxNum.textContent = max;



// Play again event listener (mousedown because click fires on btn)

game.addEventListener('mousedown', function(e) {
	if (e.target.className === 'play-again') {
		window.location.reload();
	}
});



// Listen for guess

guessBtn.addEventListener('click', function() {
	console.log(guessInput.value);
	let guess = parseInt(guessInput.value);

	// Validate input

	if (isNaN(guess) || guess < min || guess > max) {
		setMessage(`Please enter a number between ${min} and ${max}`, 'red');
	}

	// Check if won

	if (guess === winningNum) {
		// Game over - won
		gameOver(true, `Congratulations! ${winningNum} is correct! You win!`);
	} else {
		// Wrong number
		guessesLeft -= 1;

		if (guessesLeft === 0) {
			// Game over - lost
			// Disable input
			gameOver(false, `Game over, you lost. The correct number was ${winningNum}`);
		} else {
			// Game continues - answer is wrong
			guessInput.style.borderColor = 'red';
			guessInput.value = '';
			setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
		}
	}


});


// Set message function

function setMessage(msg, color) {
	message.textContent = msg;
	message.style.color = color;
}

// Game over function

function gameOver(won, msg) {
	let color;
	won === true ? color = 'green' : color = 'red';
	// Disable input
	guessInput.disabled = true;
	// Change border color
	guessInput.style.borderColor = color;
	// Set message text color
	message.style.color = color;
	// Set message
	setMessage(msg);

	// Play again?
	guessBtn.value = 'Play again';
	guessBtn.className += 'play-again';
}



// Get winning number

function getRandomNum(min, max) {
	return Math.floor(Math.random()*(max - min + 1) + min);
}