function GameRenderer(sprites) {
    this.__sprites = sprites;
}

GameRenderer.prototype.render = function(worldMap, view, context) {
    console.log(worldMap);
    console.log(view);
};