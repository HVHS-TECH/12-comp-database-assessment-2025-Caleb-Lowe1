//imports
import { fb_initialise, fb_authenticate, fb_detectloginchange, fb_logout, fb_WriteRec, fb_ReadRec, fb_UpdateRec, fb_sortedread }
    from '../fb_io.mjs';


//variables
const canvasWidth = 500;
const canvasHeight = 500;
const MOVEMENTSPEED = 6;
var Player;
var coin;
var specialCoin; // Track the special coin
var specialCoinTime = 10000; // Time to spawn special coin (10 seconds after game starts)
var gameState = "play";
var score = 0;
const COINSIZE = 10;
const COIN_TIMEOUT = 3000;
const PLAYERSIZE = 20;
const SPECIALCOINSIZE = 15; // Special coin size
const SPECIALCOINTIME = 1000; // Special coin lifetime in milliseconds
/*******************************************************/
// setup()
/*******************************************************/
function setup() {
    score = 0;
    console.log("setup: ");
    cnv = new Canvas(canvasWidth, canvasHeight, "Pixelated x4");
    Player = new Sprite(100, 100, PLAYERSIZE, PLAYERSIZE, 'd');
    Player.color = 'orange';
    Player.rotationSpeed = 0;
    coinGroup = new Group();
    coinGroup.add(createCoin());

    // Create special coin after 10 seconds
    setTimeout(() => {
        specialCoin = createSpecialCoin();
    }, specialCoinTime);
}

function playerHitCoin(coin, Player) {
    // Delete the regular coin which was hit
    coin.remove();
    score++;
   
    Player.rotationSpeed = 0;
    Player.rotation = 0;
}

function playerHitSpecialCoin(specialCoin, Player) {
    // Special coin hit gives 1000 score
    specialCoin.remove();
    score += 100;
    specialCoin = null; // After being hit, remove the special coin permanently
}

/*******************************************************/
// draw()
/*******************************************************/

function draw() {
    if (gameState == "play") {
        runGame();
    }
    else if (gameState == "lose") {
        loseGame();
    }
}

function runGame() {
    background('gray');
    
    // Spawn new coins occasionally
    if (random(0, 500) < 4) {
        coinGroup.add(createCoin());
    }
    
    movePlayer();
    for (var i = 0; i < coinGroup.length; i++) {
        let coin = coinGroup[i];

        if (checkCoinTime(coin)) {
            coinGroup.remove(coin);
            gameState = "lose";
        }
    }
    
    coinGroup.collides(Player, playerHitCoin);

    // If there's a special coin, check collision and timing
    if (specialCoin) {
        if (millis() - specialCoin.spawnTime < SPECIALCOINTIME) {
            if (Player.collides(specialCoin)) {
                playerHitSpecialCoin(specialCoin, Player);
            }
        } else {
            // Remove special coin after 300 milliseconds if not hit
            specialCoin.remove();
            specialCoin = null; // After disappearing, special coin is gone for good
        }
    }

    displayScore();
}

function loseGame() {
    background('red');
    Player.remove();
    coinGroup.remove();
    textSize(50);
    text("You lose ", 10, 100);
    textSize(70);
    text("Score: " + score, 10, 200);
    console.log("Help");
}

function createCoin() {
    coin = new Sprite(random(0, canvasWidth), random(0, canvasHeight), COINSIZE, 'd');
    coin.color = 'yellow';
    coin.spawntime = millis();  // Set the spawn time when the coin is created
    return coin;
}

function createSpecialCoin() {
    // Create a special coin that appears after 10 seconds
    let specialCoin = new Sprite(random(0, canvasWidth), random(0, canvasHeight), SPECIALCOINSIZE, 'd');
    specialCoin.color = 'orange';
    specialCoin.spawnTime = millis(); // Store the time when the special coin is created
    return specialCoin;
}

function displayScore() {
    textSize(30);
    text("Score: " + score, 0, 25);
}

function checkCoinTime(_coin) {
    // Check if the coin has been around too long
    if (_coin.spawntime + COIN_TIMEOUT < millis()) {
        _coin.remove();  // Remove the coin that has been around for too long
        return true;
    }
    return false;
}

function movePlayer() {
    if (kb.pressing('a')) {
        Player.vel.x = -MOVEMENTSPEED;
    } else if (kb.pressing('d')) {
        Player.vel.x = MOVEMENTSPEED;
    } else {
        Player.vel.x = 0;
    }

    if (kb.pressing('w')) {
        Player.vel.y = -MOVEMENTSPEED;
    } else if (kb.pressing('s')) {
        Player.vel.y = MOVEMENTSPEED;
    } else {
        Player.vel.y = 0;
    }
}