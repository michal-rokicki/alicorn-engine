function StepProcessor(world) {
    this.__world = world;
}

StepProcessor.prototype.nextStep = function(keyState) {
    var mainCharacter = this.__world.mainCharacter;

    if (keyState.left) {
        mainCharacter.x -= 0.1;
    }

    if (keyState.right) {
        mainCharacter.x += 0.1;
    }

    mainCharacter.vy -= this.__world.g;
    mainCharacter.vy = Math.max(-this.__world.maxVY, mainCharacter.vy);
    mainCharacter.vy = Math.min(this.__world.maxVY, mainCharacter.vy);

    mainCharacter.y += mainCharacter.vy;

    
}