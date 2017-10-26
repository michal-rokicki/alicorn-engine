function StepProcessor(world) {
    this.__world = world;
    this.__blockConfig = new BlockConfig(world.conf);
}

StepProcessor.prototype.nextStep = function(keyState) {
    var mainCharacter = this.__world.mainCharacter;
    //mainCharacter.vx = 0;

    if (keyState.left) {
        //mainCharacter.x -= 0.25;
        mainCharacter.vx -= 0.05;
        mainCharacter.right = false;
        this.__world.vision = "LEFT";
    }

    if (keyState.right) {
        //mainCharacter.x += 0.25;
        mainCharacter.vx += 0.05;
        mainCharacter.right = true;
        this.__world.vision = "RIGHT";
    }

    if (!keyState.left && !keyState.right) {
        if (mainCharacter.vx>0) {
            mainCharacter.vx = Math.max(0, mainCharacter.vx-0.05);
        }
        if (mainCharacter.vx<0) {
            mainCharacter.vx = Math.min(0, mainCharacter.vx+0.05);
        }
    }

    if (keyState.forced.up) {
        mainCharacter.vy -= this.__world.jumpVy;
    }

    this.__handleCharacter(mainCharacter);
};

StepProcessor.prototype.__handleCharacter = function(character) {
    var oldX, oldY;
    //this.__repairLocation(character);

    character.vy += this.__world.g;
    character.vy = Math.max(-this.__world.maxVY, character.vy);
    character.vy = Math.min(this.__world.maxVY, character.vy);
    character.vx = Math.max(-this.__world.maxVY, character.vx);
    character.vx = Math.min(this.__world.maxVY, character.vx);

    character.y += character.vy;
    character.x += character.vx;

    /*if (this.__isVerticalCollision(character, character.y)) {
        character.y = Math.floor(character.y);
        character.vy = 0;
    }

    if (this.__isVerticalCollision(character, character.y-character.height)) {
        character.y = Math.floor(character.y+1);
        character.vy = 0;
    }

    if (this.__isHorizontalCollision(character, character.x)) {
        character.x = Math.floor(character.x)+1;
    }

    if (this.__isHorizontalCollision(character, character.x+character.width)) {
        character.x = Math.floor(character.x);
    }*/

    this.__handleCharacterCollisions(character);

    this.__collectCoins(character);
};

StepProcessor.prototype.__handleCharacterCollisions = function(character) {
    if (character.vy>0) {
        if (this.__isVerticalCollision(character, character.y)) {
            character.y = Math.floor(character.y) - 0.001;
            character.vy = 0;
        }
    }
    else if (character.vy<0) {
        if (this.__isVerticalCollision(character, character.y-character.height)) {
            character.y = Math.floor(character.y+1) + 0.001;
            character.vy = 0;
        }
    }

    if (character.vx>0) {
        if (this.__isHorizontalCollision(character, character.x+character.width)) {
            character.x = Math.floor(character.x) - 0.001;
            character.vx = 0;
        }
    }
    else if (character.vx<0) {
        if (this.__isHorizontalCollision(character, character.x)) {
            character.x = Math.floor(character.x+1) + 0.001;
            character.vx = 0;
        }
    }

    /*var down = this.__isVerticalCollision(character, character.y);
    var top = this.__isVerticalCollision(character, character.y-character.height);
    var left = this.__isHorizontalCollision(character, character.x);
    var right = this.__isHorizontalCollision(character, character.x+character.width);

    if (down) {
        character.y = Math.floor(character.y);
        character.vy = 0;
    }

    if (top) {
        character.y = Math.floor(character.y+1);
        character.vy = 0;
    }

    if (left) {
        character.x = Math.floor(character.x)+1;
    }

    if (right) {
        character.x = Math.floor(character.x);
    }*/
};

StepProcessor.prototype.__collectCoins = function(character) {
    var x,y, bId, i, j, type;
    for (i=0; i<=character.width; ++i) {
        for (j=0; j<=character.height; ++j) {
            x = Math.floor(character.x + i);
            y = Math.floor(character.y - j);
            bId = this.__world.map.getBlock(x,y);
            type = this.__blockConfig.getBehavior(bId);

            if (type=="COIN") {
                this.__world.map.clearBlock(x,y);
            }
            else if (type=="KILLING") {
                throw "Game Over!";
            }
        }
    }
};

/*StepProcessor.prototype.__repairLocation = function(character) {
    var map = this.__world.map;

    character.x = Math.max(0, character.x);
    character.x = Math.min(map.width - character.width, character.x);

    if (character.y<0) {
        character.y = 0;
        character.vy = 0;
    }
};*/

StepProcessor.prototype.__isVerticalCollision = function(character, y) {
    var x, type;
    y = Math.floor(y);

    for (var i=0; i<=character.width; ++i) {
        x = Math.floor(character.x + i);
        type = this.__world.map.getBlock(x,y);

        if (this.__blockConfig.getBehavior(type)=="SOLID") {
            return true;
        }
    }

    return false;
};

StepProcessor.prototype.__isHorizontalCollision = function(character, x) {
    var y, type;
    x = Math.floor(x);
    for (var i=1; i<=character.height; ++i) {
        y = Math.floor(character.y - i);
        type = this.__world.map.getBlock(x,y);

        if (this.__blockConfig.getBehavior(type)=="SOLID") {
            return true;
        }
    }

    return false;
};
