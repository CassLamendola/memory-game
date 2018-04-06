// Store all images for cards

const imgs = [
'img/006-beaker.png',
'img/042-dna.png',
'img/019-microscope.png',
'img/020-atom.png',
'img/028-flask-2.png',
'img/029-test-tube-1.png',
'img/031-chemical-reaction.png',
'img/038-magnets.png',
'img/006-beaker.png',
'img/042-dna.png',
'img/019-microscope.png',
'img/020-atom.png',
'img/028-flask-2.png',
'img/029-test-tube-1.png',
'img/031-chemical-reaction.png',
'img/038-magnets.png'
];

const deck = document.querySelector(".deck");
const cards = document.querySelectorAll(".card");
const popUp = document.querySelector(".congrats");
const again = document.querySelector(".again");
const quit = document.querySelector(".quit");
const restart = document.querySelector(".fas.fa-redo-alt");
const time = document.querySelector(".time");
const moveTracker = document.querySelector(".moves");
let count = 0;
let card1, card2, card1Name, card2Name;
let matches = 0;
let moves = 0;
let copiedImgs = imgs.slice(0);
let minutes, seconds = 0;
// let shuffled;
let shuffledDeck;

/******************
** Shuffle cards **
******************/

function shuffleCards(unshuffled){
	let shuffled = []
	for (let i = unshuffled.length - 1; i >= 0; i--) {
		let index = [Math.floor(Math.random()*unshuffled.length)];
		let card = unshuffled.splice(index, 1);
		shuffled.push(card);
	}
	return shuffled;
}

/*****************
** Assign cards **
*****************/

function assignCards(shuffled){
	for (let i = cards.length - 1; i >= 0; i--) {
		cards[i].children.item(0).setAttribute("src", shuffled[i]);
	}
	return;
}

function startTimer(){
	console.log('start timer');
	minutes = 0;
	seconds = 0;
	// time.innerHTML = `${minutes} : ${seconds}`;
	window.setInterval(function(){
		time.innerHTML = `${minutes} : ${seconds}`;
		if(seconds >= 60){
			minutes ++;
			seconds = 0;
		}
		seconds ++;
	}, 1000)
	// debugger;
}

function newGame(){
	shuffledDeck = shuffleCards(copiedImgs);
	assignCards(shuffledDeck);
	startTimer();
	resetMoves();
	resetStars();
}

function resetCards(){

}

/****************
** Flip a card **
****************/

function flipCard(card){
	card.setAttribute("class", "card flipped");
	count ++;
	return card.firstChild.getAttribute("src");
}

function checkMatch(one, two){
	if (one === two) {
		card1.setAttribute("class", "card match flipped");
		card2.setAttribute("class", "card match flipped");
		count = 0;
		matches += 1;
		if (matches === 8){
				window.setTimeout(function(){
					popUp.setAttribute("class", "congrats winner");
				}, 750)
			}
		return;
	} else {
		card1.setAttribute("class", "card no-match flipped");
		card2.setAttribute("class", "card no-match flipped");
		count = 0;
		time = window.setTimeout(function(){
			card1.setAttribute("class", "card");
			card2.setAttribute("class", "card");
		}, 750);
		return;
	}
}

function flipOver(e){
	if (e.target.className != "card"){
		return;
	}
	window.clearTimeout(time);
	console.log("flip over card");
	console.log(e.target.className);
	console.log('count: ' + count);
	if (count >= 2) {
		card1.setAttribute("class", "card");
		card2.setAttribute("class", "card");
		count = 0;
		return;
	}
	
	if (count === 0){
		card1 = e.target;
		card1Name = flipCard(card1);
		// console.log(card1Name);
		return;
	}

	if (count === 1){
		card2 = e.target;
		card2Name = flipCard(card2);
		// console.log(card2Name);
		moves ++;
		checkMatch(card1Name, card2Name)
		moveTracker.innerHTML = `${moves}`;
		return;
	} 

	// e.target.setAttribute("class", "card flipped");
	// console.log(e.target.getAttribute("class"));
	// console.log(e.target);
}

function quitGame(){
	popUp.setAttribute("class", "congrats");
}

window.onload = newGame;
deck.addEventListener("click", flipOver);
again.addEventListener("click", newGame);
quit.addEventListener("click", quitGame);

restart.addEventListener("click", newGame);



