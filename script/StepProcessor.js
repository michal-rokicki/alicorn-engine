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

    mainCharacter.vy += this.__world.g;
    mainCharacter.vy = Math.max(-this.__world.maxVY, mainCharacter.vy);
    mainCharacter.vy = Math.min(this.__world.maxVY, mainCharacter.vy);

    console.log(mainCharacter.y);

    mainCharacter.y += mainCharacter.vy;

    if (this.__isDownCollision(mainCharacter)) {
        mainCharacter.y = Math.floor(mainCharacter.y);
    }
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
}