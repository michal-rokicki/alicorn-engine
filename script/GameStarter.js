function GameStarter() {
}

GameStarter.setWorld = function(word) {
    GameStarter.__word = word;
};

GameStarter.onLoad = function(canvasId) {
    var canvas = $("#"+canvasId);

    var view = new GameView(0, 0, canvas.width, canvas.height)
    var sprites = new Sprites();
    var renderer = new GameRenderer(sprites);

    var ctx = canvas[0].getContext("2d");
    renderer.render(GameStarter.__word.map, view, ctx);

    alert('AAAAAAAA');
};