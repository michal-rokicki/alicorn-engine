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
}