let randomNumber = Math.floor(Math.random() * 100 + 1);
console.log(randomNumber);

const submit = document.querySelector("form");
const inputBox = document.querySelector("#guessField");
const print = document.querySelector("#lowOrhi");
const guessCount = document.querySelector("#guessCount");
const previous = document.querySelector("#previousGuesses");
const startOver = document.querySelector("#center");

let previousGuesses = [];
let limit = 3;

const divValue = startOver.innerHTML;

let playGame = true;

if (playGame) {
	submit.addEventListener("submit", (e) => {
		e.preventDefault();

		const input = e.target[0].value;
		validateGuess(input);
	});
}

function validateGuess(value) {
	if (isNaN(value) || value < 1 || value > 100) {
		displayMessage("Enter a valid number to play!!!");
		setTimeout((ans) => {
			displayMessage("");
		}, 1000);
	} else {
		if (limit === 0) {
			newGame(false);
		} else {
			value = parseInt(value);
			checkGuess(value);
		}
	}
}

function checkGuess(value) {
	limit -= 1;
	previousGuesses.push(value);
	if (value === randomNumber) {
		newGame(true);
	} else if (value < randomNumber) {
		displayMessage("Ahhh...your value is smaller!!!");
	} else {
		displayMessage("Ahhh...your value is larger!!!");
	}

	previous.innerText = `Previous Guesses: ${previousGuesses}`;
	guessCount.innerText = `Total Guess Remaining: ${limit}`;
}

function displayMessage(result) {
	print.innerText = `${result}`;
	inputBox.value = "";
}

function newGame(bool) {
	inputBox.value = "";
	const show = document.createElement("h2");
	startOver.innerText = "";
	const button = document.createElement("div");
	button.id = "buttonCenter";
	button.innerHTML = `<div class="button">Start Again</div>`;
	if (!bool) {
		show.innerText = `Game Over. Random number was ${randomNumber}.`;
	} else {
		show.innerText = `Yayyy...you Won. Random number was ${randomNumber}.`;
	}

	startOver.appendChild(show);
	startOver.appendChild(button);

	playGame = false;
	inputBox.setAttribute("disabled", "");

	startNewGame();
}

function startNewGame() {
	const button = document.querySelector(".button");
	console.log(button);
	button.addEventListener("click", (e) => {
		randomNumber = Math.floor(Math.random() * 100 + 1);
		console.log(randomNumber);
		startOver.innerHTML = divValue;
		previousGuesses = [];
		limit = 3;
		playGame = true;

		inputBox.removeAttribute("disabled");
	});
}

/*


submit.addEventListener("submit", (e) => {
	e.preventDefault();
	if (limit > 0) {
		if (e.target[0].value >= 1 && e.target[0].value <= 100) {
			const input = parseInt(e.target[0].value);
			let show = "";
			if (input === randomNumber) {
				show = "Yayyy...you Won!!!";
			} else if (input > randomNumber) {
				show = "Ahhh...your value is larger!!!";
			} else {
				show = "Ahhh...your value is smaller!!!";
			}

			print.innerHTML = show;
			limit -= 1;
			previousGuesses.push(input);
			previous.innerHTML = `Previous Guesses: ${previousGuesses}`;
			guessCount.innerHTML = `Total Guess Remaining: ${limit}`;
		} else {
			print.innerHTML = `Enter a valid number to play!!!`;
			previous.innerHTML = `Previous Guesses: ${previousGuesses}`;
			guessCount.innerHTML = `Total Guess Remaining: ${limit}`;
		}
	} else {
		print.innerHTML = `Turns Exceeded!!! Please Refresh The Page!`;
		previous.innerHTML = "";
		guessCount.innerHTML = "";
	}
	e.target[0].value = "";
});


*/
