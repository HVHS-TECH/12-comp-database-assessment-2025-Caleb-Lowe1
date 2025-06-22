//gem textures https://laredgames.itch.io/gems-coins-free
//map textures https://piiixl.itch.io/textures
//background image https://lil-cthulhu.itch.io/pixel-art-cave-background
/*******************************************************/
// P5.play: Cave run
// Extension tasks
// Written by 22026cl

/*******************************************************/

//Variables
var Player;
var score = 0;
var health = 3;
var canvasSize = {
	x: 1200,
	y: 600
}


let caveBg;


var restartButton;
var backButton;
var finish;
var userScore;
//enviroment
let sheetImg;
let rock, cobblestone, unclimableblock, lava, diamond, emerald, hotrock;
function preload() {
	fb_initialise();
	fb_detectloginchange();
	
	sheetImg = loadImage("Textures-16.png");
	buttonImg = loadImage("Restart.png");
	diamondImg = loadImage("spr_coin_azu.png")
	emeraldImg = loadImage("spr_coin_strip4.png")
	backImg = loadImage("back.png");
	finishImg = loadImage("finishline.png");
	caveBg1 = loadImage("grey_L1.png");
	caveBg2 = loadImage("grey_L2.png");
	caveBg3 = loadImage("grey_L3.png");
	caveBg4 = loadImage("grey_L4.png");
}
/*******************************************************/
// setup()
/*******************************************************/
function setup() {
	
	gameState = "play";
	console.log("setup: ");
	cnv = new Canvas(canvasSize.x, canvasSize.y, "pixelated x4")
	world.gravity.y = 10;

	finish = new Sprite(2002, 190);
	finish.spriteSheet = finishImg;
	finish.addAni({ w: 16, h: 16, row: 0, col: 0, });
	finish.collider = "none";
	finish.scale = 4;

	Player = new Sprite(30, 178.01034375, 10, 10, 'd');
	Player.color = 'blue';
	Player.stroke = 'black';
	Player.strokeWeight = 1;


	lava = new Group();
	lava.collider = "static";
	lava.spriteSheet = sheetImg;
	lava.addAni({ w: 16, h: 16, row: 9, col: 11 });
	lava.tile = 'l';

	hotrock = new Group();
	hotrock.collider = "static";
	hotrock.spriteSheet = sheetImg;
	hotrock.addAni({ w: 16, h: 16, row: 9, col: 0 });
	hotrock.tile = 'h';


	emerald = new Group();
	emerald.collider = "none";
	emerald.spriteSheet = emeraldImg;
	emerald.addAni({ w: 16, h: 16, row: 0, col: 0 });
	emerald.tile = 'e';

	diamond = new Group();
	diamond.collider = "none";
	diamond.spriteSheet = diamondImg;
	diamond.addAni({ w: 16, h: 16, row: 0, col: 0 });
	diamond.tile = 'd';

	rock = new Group();
	rock.collider = "static";
	rock.spriteSheet = sheetImg;
	rock.addAni({ w: 16, h: 16, row: 0, col: 7 });
	rock.tile = 'r';

	cobblestone = new Group();
	cobblestone.collider = "static";
	cobblestone.spriteSheet = sheetImg;
	cobblestone.addAni({ w: 16, h: 16, row: 30, col: 10 });
	cobblestone.tile = 'c';

	unclimableblock = new Group();
	unclimableblock.collider = "static";
	unclimableblock.spriteSheet = sheetImg;
	unclimableblock.addAni({ w: 16, h: 16, row: 1, col: 9 });
	unclimableblock.tile = 'w';
	unclimableblock.friction = 0;

	new Tiles([
		'rrrrrcrrrrrrrrrrrcrrrrrrrrrrcrrrrrrrrrrrrrrcccccrrrrrrrcrrrrrrcrrrrrrrrrrrrrrrrrcrrrrrrcrrrrrrrrrrrrrcrrrrrrrrrrcccrrrrrrrrrrrrrw',
		'w...............................................................................................................................w',
		'w...................................c....................................................c......................................w',
		'w...................................rr...................................................rr.....................................w',
		'w..........................rrcrrrcccrcr.........................................rrcrrrcccrcr....................................w',
		'w...................................rr.........e.........................................rr.....................................w',
		'w...................................c....................................................c......................................w',
		'w.......................e.......................................................................................................w',
		'w......................hrc.......................e..............................................................................w',
		'w........d........rr.........................r....................r............................................e................w',
		'w............................................r....................r....................................r........................w',
		'w...........cr...................d...........r....................c.............................................................w',
		'rrrrrcrrr.......................................................rrr..................d...........r..............................w',
		'rrrrrhrrrrr......d.....................................d........hcrr......d............................................d........w',
		'rcrccccrrrrrrrrhrrrrrrhhhrrrrrcr..rrrrhrrrrrrrrrcccllcccrrrchrcrrrrcrrrrrrrcrrrcrrr....rrrhhrrrcrrrrcrrcrrrrrrrrrrrrrrrrrrrrrrrrr',
		'rchhrrrrhrrrcrrrrcrrrrrrrrrrrrrw..wrrrhrrrrrrhrrrrrrrrrrrrrrrrrrrrrrhrr...........w....w',
		'rrcrrrrrrrrrrrrrrrrrcrhrrrrrrrrhllhrrrrrrhrhhrrccrrrrrhrrcrrrrrrcrrrrrr...........wllllw',
		'rrrrrrrrrcrrrrccrrrrrrrrcrrrrrrhhhhrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr...........wwwwww'
	],
		0, 0, //x,y
		16, 16, //w,h 

	)
}

//if the player collects a diamond the diamond will disapear and the user will gain 100 score 
function playercollectsdiamond(d) {

	d.remove();
	score = score + 70;



}
//if player collects an emerald they will earn 120 score points and the emerald will disapear
function playercollectsemerald(e) {

	e.remove();
	score = score + 120;



}





/*******************************************************/
// draw()
/*******************************************************/
function draw() {

	if (gameState == "play") {
		runGame();

	}

	if (gameState == "win") {
		win();
	}
	if (gameState == "lose") {
		lose();
	};

}




/*******************************************************/
// Functions()
/*******************************************************/
function displayScore() {
	textSize(20);
	fill(500);

	text("Score: " + score, 0, 15);

}

function runGame() {



	clear();
	userScore = score;
	//different background layers
	background(caveBg1);
	background(caveBg2);
	background(caveBg3);
	background(caveBg4);
	healthbar();
	//makes the camera follow the player 
	camera.x = Player.x;
	camera.y = Player.y;
	Movement();
	displayScore();
	//makes the sure the player won't rotate 
	Player.rotationLock = true;






	//checking if the player has won
	if (Player.overlaps(finish)) {
		completedlevel();
	}


	//checking if the player has lost
	//Player.y >= 1300 is for just in case the player somehow managed to glitch through the map
	if (Player.y >= 1300 || (health <= 0)) {
		lostgame();
	}
	//if the player touches a hot material (hot rock or lava) then the player loses 1 health
	if (Player.collides(lava) || Player.collides(hotrock)) {
		Player.vel.y = -5; health = (health - 1);
	}

	//overlaps instead of collides because diamond has no collision so that the diamond can be collected without affecting the players movement
	if (diamond.overlaps(Player, playercollectsdiamond)) {

		playercollectsdiamond();

	}

//overlaps instead of collides because emerald has no collision so that the diamond can be collected without affecting the players movement
	if (emerald.overlaps(Player, playercollectsemerald)) {

		playercollectsemerald();

	}

}



function lose() {
	console.log("I LOST :(")
	//makes it so that you can press the buttons
	mouseInteractRestartButton();
	mouseInteractBackButton();
	
};
function lostgame() {
	
	fb_WriteScore(userScore);
	fb_sortedread();
	gameState = "lose";
	

	Player.remove();
	unclimableblock.removeAll();
	diamond.removeAll();
	cobblestone.removeAll();
	rock.removeAll();
	lava.removeAll();
	emerald.removeAll();
	hotrock.removeAll();
	//resets camera position
	camera.x = canvasSize.x / 2;
	camera.y = canvasSize.y / 2;
	background("red");
	textSize(20);
	textAlign(CENTER, CENTER);
	text("you lost!!", canvasSize.x / 2, 50);
	text("Score: " + score, canvasSize.x / 2, 100);


	Restart();


	Back();

};

function win() {
	console.log("WINNING")
	//makes it so that you can press the buttons
	mouseInteractRestartButton();
	mouseInteractBackButton();
};
function completedlevel() {
	gameState = "win";
	if (health == 3) {
		score = score + 200;
	}
	else if (health == 2) { score = score + 100; }
	else if (health == 1) { score = score + 50; }
	Player.remove();
	unclimableblock.removeAll();
	diamond.removeAll();
	emerald.removeAll();
	cobblestone.removeAll();
	rock.removeAll();
	lava.removeAll();
	hotrock.removeAll();
	//resets camera position
	camera.x = canvasSize.x / 2;
	camera.y = canvasSize.y / 2;
	background("yellow");
	fill(0)
	textSize(20);
	textAlign(CENTER, CENTER);
	text("YOU WON!!", canvasSize.x / 2, 50);
	text("Score: " + score, canvasSize.x / 2, 100);


	Restart();

	Back();


};




function mouseInteractRestartButton() {
	if (restartButton.mouse.hovering()) {
		restartButton.addAni({ w: 16, h: 16, row: 1, col: 0, });

	}

	else {
		restartButton.addAni({ w: 16, h: 16, row: 0, col: 0, });
	}
	if (restartButton.mouse.pressing()) {
		window.location.href = "Game.html";
	}
}

function Restart() {

	restartButton = new Sprite(canvasSize.x / 2 - (32), canvasSize.y / 2);
	restartButton.spriteSheet = buttonImg;
	restartButton.addAni({ w: 16, h: 16, row: 0, col: 0, });
	restartButton.collider = "static";
	restartButton.scale = 2;
};

function Back() {
	backButton = new Sprite(canvasSize.x / 2 + (32), canvasSize.y / 2);
	backButton.spriteSheet = backImg;
	backButton.addAni({ w: 16, h: 16, row: 1, col: 0, });
	backButton.collider = "static";
	backButton.scale = 2;
	console.log("back working")


}


function mouseInteractBackButton() {
	if (backButton.mouse.hovering()) {
		backButton.addAni({ w: 16, h: 16, row: 0, col: 0, });


	}



	else {
		backButton.addAni({ w: 16, h: 16, row: 1, col: 0, });
	}
	if (backButton.mouse.pressing()) {
		window.location.href = "gameindex.html";
	}
}

function healthbar() {
	fill(255);
	textSize(20);
	text("Health:", 10, 55);
	for (var i = 0; i < health; i++) {

		fill(255, 0, 0);
		noStroke();
		rect(90 + 30 * i, 40, 20, 20);


	}
}

/*******************************************************/
//  END OF APP
/*******************************************************/