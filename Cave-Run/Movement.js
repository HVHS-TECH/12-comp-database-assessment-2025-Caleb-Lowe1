const MOVEMENTSPEED = 2.4;
const JUMPSPEED = 4;
function Movement() {
    //sprinting code    
    if (kb.pressing('a') && kb.pressing('shift')) {
        Player.vel.x = -MOVEMENTSPEED - 1;

    }
    //walking code
    else if (kb.pressing('a')) {
        Player.vel.x = -MOVEMENTSPEED + 0.5;
    }
    //sprinting code   
    if (kb.pressing('d') && kb.pressing('shift')) {
        Player.vel.x = MOVEMENTSPEED + 1;

    }
    //walking code
    else if (kb.pressing('d')) {
        Player.vel.x = MOVEMENTSPEED - 0.5;

    }



    //jump code, checks if the user is colliding with the ground and if true then and the user is pressing down on 'w' then it will allow the player to jump 
    if (kb.presses('w') && Player.colliding(rock) || kb.presses('w') && Player.colliding(cobblestone)) {
        Player.vel.y = -(JUMPSPEED);

    }


}

