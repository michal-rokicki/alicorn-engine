function GamePanel(canvas, world) {
    this.__word = world;
    this.__canvas = canvas;
    this.__view = new GameView(0, 0, canvas.width(), canvas.height())
    this.__renderer = new GameRenderer(new Sprites());

    //canvas.
}

GamePanel.prototype.redraw = function() {
    var ctx = this.__canvas[0].getContext("2d");

    this.__view.center(this.__word.mainCharacter.x*64,this.__word.mainCharacter.y*64);

    this.__renderer.render(this.__word, this.__view, ctx);
};

