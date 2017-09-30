function StepProcessor(world) {
    this.__world = world;
    this.__blockConfig = new BlockConfig();
}

StepProcessor.prototype.nextStep = function(keyState) {
    var mainCharacter = this.__world.mainCharacter;

    if (keyState.left) {
        mainCharacter.x -= 0.1;
    }

    if (keyState.right) {
        mainCharacter.x += 0.1;
    }

    this.__handleCharacter(mainCharacter);
}

StepProcessor.prototype.__handleCharacter = function(character) {
    character.vy += this.__world.g;
    character.vy = Math.max(-this.__world.maxVY, character.vy);
    character.vy = Math.min(this.__world.maxVY, character.vy);

    console.log(character.y);

    character.y += character.vy;

    if (this.__isDownCollision(character)) {
        character.y = Math.floor(character.y);
    }
};

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