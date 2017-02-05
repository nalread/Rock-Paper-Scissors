var newGameBtn = document.getElementById('js-newGameButton');

newGameBtn.addEventListener('click', newGame);

var pickRock = document.getElementById('js-playerPick_rock'),
	pickPaper = document.getElementById('js-playerPick_paper'),
	pickScissors = document.getElementById('js-playerPick_scissors');

pickRock.addEventListener('click', function() { playerPick('Kamień') });
pickPaper.addEventListener('click', function() { playerPick('Papier') });
pickScissors.addEventListener('click', function() { playerPick('Nożyce') });

var gameState = 'notStarted', //started //ended
	player = {
		name: '',
		score: 0
	},
	computer = {
		score: 0
	}

var newGameBtn = document.getElementById('js-newGameButton'),
	newGameElem = document.getElementById('js-newGameElement'),
	pickElem = document.getElementById('js-playerPickElement'),
	resultsElem = document.getElementById('js-resultsTableElement');

function setGameElements() {
	switch (gameState) {
		case 'started':
			newGameElem.style.display = 'none';
			pickElem.style.display = 'block';
			resultsElem.style.display = 'block';
			break;
		case 'ended':
			newGameBtn.innerText = 'Jeszcze raz?';
		case 'notStarted':
		default:
			newGameElem.style.display = 'block';
			pickElem.style.display = 'none';
			resultsElem.style.display = 'none';
			break;
	}
}

setGameElements();

var playerPointsElem = document.getElementById('js-playerPoints'),
	playerNameElem = document.getElementById('js-playerName'),
	computerPointsElem = document.getElementById('js-computerPoints');

function newGame() {
	player.name = prompt("Graczu, wpisz swoje imię", 'Imię gracza');
	if (player.name) {
		player.score = computer.score = 0;
		gameState = 'started';
		setGameElements();

		playerNameElem.innerHTML = player.name + " wybrał/-a:";
		setGamePoints();
	}
}

function playerPick(playerPick) {
	console.log(playerPick);
}

function getComputerPick() {
	var possiblePicks = ['Kamień', 'Papier', 'Nożyce'];
	return possiblePicks[Math.floor(Math.random()*3)];
}

var playerPickElem = document.getElementById('js-playerPick'),
	computerPickElem = document.getElementById('js-computerPick'),
	playerResultElem = document.getElementById('js-playerResult'),
	computerResultElem = document.getElementById('js-computerResult');

function playerPick(playerPick) {
	var computerPick = getComputerPick();

	playerPickElem.innerHTML = playerPick;
	computerPickElem.innerHTML = computerPick;
}

function checkRoundWinner(playerPick, computerPick) {
	playerResultElem.innerHTML = computerResultElem.innerHTML = '';

	var winnerIs = 'player';

		if (playerPick == computerPick) {
			winnerIs = 'noone;'
		} else if (
			(computerPick == 'Kamień' && playerPick == 'Nożyce')
		||
			(computerPick == 'Nożyce' && playerPick == 'Papier')
		||
			(computerPick == 'Papier' && playerPick == 'Kamień') ) {

			winnerIs = 'computer';
		}

		if (winnerIs == 'player') {
			playerResultElem.innerHTML = "Wygrana!";
			player.score++;
		} else if (winnerIs == 'computer') {
			computerResultElem.innerHTML = "Wygrana!";
			computer.score++;
		}
	setGamePoints();
	checkGameWinner();
}

function playerPick(playerPick) {
	var computerPick = getComputerPick();

	playerPickElem.innerHTML = playerPick;
	computerPickElem.innerHTML = computerPick;

	checkRoundWinner(playerPick, computerPick);
}

function setGamePoints() {
	playerPointsElem.innerHTML = player.score;
	computerPointsElem.innerText = computer.score;
}

function checkGameWinner() {
	if (player.score >= 10) {
		endGame('player');
	} else if (computer.score >= 10) {
		endGame('computer');
	}
}

function endGame(winner) {
	if (winner == "player") {
		alert("Wygrał/-a " + player.name + "!")
	} else if (winner == "computer") {
		alert("Wygrał komputer!")
	}
	gameState = 'ended';
	setGameElements();
}

