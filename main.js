/* MIT License
 * Copyright © 2020 Geering Up, Diversifying Talent in Quantum Computing, Haris Amiri
 * 
 * 
   
   Permission is hereby granted, free of charge, to any person obtaining a copy
   of this software and associated documentation files (the "Software"), to deal
   in the Software without restriction, including without limitation the rights
   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   copies of the Software, and to permit persons to whom the Software is
   furnished to do so, subject to the following conditions:

   The above copyright notice and this permission notice shall be included in all
   copies or substantial portions of the Software.

   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   SOFTWARE.

*/
//======================================================================================================================================================================================================================================================================================================================================================

/*
	This is a game designed to introduce key quantum mechanics concepts to younger age groups.
	By adopting the style of Flappy Bird, we introduce important vocabulary in the field of quantum computing.
	Players begin as 'Qubits' and are asked to navigate through the barriers. 
	They can move up by 'absorbing' energy, move down by 'emitting' energy, or 'tunnel' through the barrier.
	They can do each of these functions by using the arrow keys - note that when players 'tunnel', there is a 25% chance it will work.
	There is also an element of gravity in the system. While this is not technically accurate in terms of quantum computing (there are no concerns of gravity),
		it adds to the challenge of the game and thus was left in.

	Your task is to add/modify the code so that you accomplish ONE of these three things:

		1. Add functionality to the buttons. Instead of simply using the arrow keys, modify the code such that your Qubit can move by pressing the buttons with the mouse.
		2. Interacting Qubits. While playing, other Qubits will pop in and out of the canvas. While these Qubits interact with one another, they do not interact with the player's Qubit. 
		   Add this functionality and explain why you made them behave the way they do (i.e. if all qubits attract each other, repel each other, collide etc.)
		3. Changing the shape of the barriers. Currently, the barriers are rectangles. Alter the code so that they are semi-circles or ellipses instead, while maintaining a clean UI.

	
	In addition to one of the above tasks, please add one other element of your choice to the game. This can be as simple as changing the shape of the Qubit to as complicated as adding a new class of objects. 
	Please explain what you changed/added.

*/

//=====================================================================================================================================================================================================================================================================================================================================================

const gravity = 0.01;
const gameSpeed = 2;
const timeSync = 1000, timeDelay = 1000;
const E = 2;
const path = 80;
let bool = true;

let barrier;
let qubit;
let particle;
let gameRunning;
var score;

// added tunneled to keep track of successful tunneling attempts and decrease subsequent chance accordingly
// added id name for buttons
var tunneled;
const absorptionId = "absorption";
const emissionId = "emission";
const tunnelLId = "tunnel left";
const tunnelRId = "tunnel right";
const resetId = "reset";

// Declaring the setup() function. 
// When the program starts, the initial environment is defined - i.e. screen size, 
// loading any media (background image), and objects.

function setup() {
	let cvs = createCanvas(700,500);
	cvs.id("canvas");
	qubit = new Qubit();
	particle = new Particle();
	barrier = [];						// default states now declared in setup() to enable resetting the game
	barrier.push(new Barrier());
	score = 0;
	tunneled = 4;
	gameRunning = true;
	textAlign(CENTER,CENTER);

	// Creating 4 buttons. Clickable buttons now part of DOM, not canvas.
	// No longer need to constantly re-rendering in draw() -> improve performance
	// Also gives option to render buttons outside of canvas for better view of game window
	// this is equivalent to much shorter section of commented out code in index.html

	// Absorption Button
	let btn1 = document.createElement("button");   // Create a <button> element
	btn1.id = absorptionId;									// declare Id name
	btn1.innerHTML = "Absorption - UP Key";                 // Insert text
	btn1.classList.add("buttons", "up");					// add css class for position/style
	btn1.onclick = function() {qubit.absorption(E)};		// add onclick functionality
	document.body.appendChild(btn1);               			// Append <button> to <body>

	// Emission Button
	let btn2 = document.createElement("button");
	btn2.id = emissionId;
	btn2.innerHTML = "Emission - DOWN Key";
	btn2.classList.add("buttons", "down");
	btn2.onclick = function() {qubit.emission(E)};
	document.body.appendChild(btn2);

	// Tunneling Right Button
	let btn3 = document.createElement("button");
	btn3.id = tunnelRId;
	btn3.innerHTML = "Tunneling -->";
	btn3.classList.add("buttons", "right");
	btn3.onclick = function() {tunneling("right")};
	document.body.appendChild(btn3);

	// Tunneling Left Button
	let btn4 = document.createElement("button");
	btn4.id = tunnelLId;
	btn4.innerHTML = "<-- Tunneling";
	btn4.classList.add("buttons", "left");
	btn4.onclick = function() {tunneling("left")};
	document.body.appendChild(btn4);

	let resetBtn = document.getElementById(resetId);	// in case of setting up new game, should remove the Reset Button
	if (resetBtn !== null) {
		resetBtn.remove();
	}

}

function draw(){
	
	background(125,125,255);
	
	// Setting the Game Over Screen
	if (!gameRunning){
		textSize(50);
		fill(255);
		text("Game Over\n Final Score: " + score,width/2,height/2);

		let btn1 = document.getElementById(absorptionId);				// remove the 4 clickable buttons
		let btn2 = document.getElementById(emissionId);
		let btn3 = document.getElementById(tunnelLId);
		let btn4 = document.getElementById(tunnelRId);
		if (btn1 !== null && btn2 !== null && btn3 !== null && btn4 !== null) {
			btn1.remove();
			btn2.remove();
			btn3.remove();
			btn4.remove();
		}
		if (document.getElementById(resetId) === null) {				// if Reset button not yet on screen, add to DOM
			let resetBtn = document.createElement("button");
			resetBtn.id = resetId;
			resetBtn.innerHTML = "Restart";
			resetBtn.classList.add("reset");
			resetBtn.onclick = function () {reset()};
			document.body.appendChild(resetBtn);
		}
		return;
	}
	
	// Display score in background

	fill(255,20);
	textSize(50);
	text(score, width/2, height/10);
	
	qubit.update();
	particle.update();
	
	// Creating new barriers

	if (barrier[barrier.length-1].xPos < height) {
		barrier.push(new Barrier()); }

	for (let i=0;i<barrier.length;i++){
		thisBarrier = barrier[i]; 
		thisBarrier.render();
	}

	// Right button clickable event
	newWait()
	
}

//================================ FUNCTIONS OUTSIDE OF DRAW LOOP ============================

// reset canvas and state
function reset() {
	const canvas = document.getElementById("canvas");
	const context = canvas.getContext('2d');
	context.clearRect(0, 0, canvas.width, canvas.height);
	setup();
}

// default 25% chance, every time you tunnel, the probability of making the next tunneling decrease in a decaying fashion (1/x)
function tunneling(dir) {
	var num = int(random(0, tunneled));
	if (num === 0) {
		if (dir === "left") {
			qubit.tunnel(-path);
		} else {
			qubit.tunnel(path);
		}
		tunneled++;
	}

}

function keyPressed(){
	
	if (keyCode === UP_ARROW){
		
		qubit.absorption(E);
		
	}
	
	else if (keyCode === DOWN_ARROW){
		
		qubit.emission(E);
		
	}
	
	else if (keyCode === RIGHT_ARROW){
		tunneling("right");
	}
	
	else if (keyCode === LEFT_ARROW) {
		tunneling("left");
	}	
}

//================================ PARTICLE CLASS ADDITIONS ============================

function newWait() {
	if (frameCount % 100 === 0){
		addNewParticle();
	}
}

//---------------------------------------------------
	
function addNewParticle() {
		particle.mass.push(random(0.003, 0.03));
		particle.positionX.push(random(-700, 700));
		particle.positionY.push(random(-500, 500));
		particle.velocityX.push(0);
		particle.velocityY.push(0);
	}
//================================ ========================== ============================

