function StepProcessor(world) {
    this.__world = world;
    this.__blockConfig = new BlockConfig();
}

StepProcessor.prototype.nextStep = function(keyState) {
    var mainCharacter = this.__world.mainCharacter;

    if (keyState.left) {
        mainCharacter.x -= 0.25;
        this.__world.vision = "LEFT";
    }

    if (keyState.right) {
        mainCharacter.x += 0.25;
        this.__world.vision = "RIGHT";
    }

    if (keyState.forced.up) {
        mainCharacter.vy -= this.__world.jumpVy;
    }

    this.__handleCharacter(mainCharacter);
}

StepProcessor.prototype.__handleCharacter = function(character) {
    this.__repairLocation(character);

    character.vy += this.__world.g;
    character.vy = Math.max(-this.__world.maxVY, character.vy);
    character.vy = Math.min(this.__world.maxVY, character.vy);

    character.y += character.vy;

    if (this.__isDownCollision(character)) {
        character.y = Math.floor(character.y);
        character.vy = 0;
    }

};

StepProcessor.prototype.__repairLocation = function(character) {
    var map = this.__world.map;

    //console.log(character);

    character.x = Math.max(0, character.x);
    character.x = Math.min(map.width - character.width, character.x);

    character.y = Math.max(0, character.y);
    character.y = Math.min(map.height - character.height, character.y);

    //character.y = Math.max(0, character.y);
    //character.y = Math.min(map.height, character.y+character.height);

    //console.log(character);
}

StepProcessor.prototype.__isDownCollision = function(character) {
    var x,y, type;
    for (var i=0; i<=character.width; ++i) {
        x = Math.floor(character.x + i);
        y = Math.floor(character.y);
        type = this.__world.map.blocks[x][y];

        if (this.__blockConfig.blocks[type]=="SOLID") {
            return true;
        }
    }

    return false;
};
