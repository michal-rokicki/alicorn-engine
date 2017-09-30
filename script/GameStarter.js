function GameStarter() {
}

GameStarter.setWorld = function(word) {
    GameStarter.__word = word;
};

GameStarter.onLoad = function(canvasId) {
    GameStarter.__gamePanel = new GamePanel($("#"+canvasId), GameStarter.__word);

    GameStarter.nextGameStep();

    //timeout()
    /*var canvas = $("#"+canvasId);

    var view = new GameView(0, 0, canvas.width(), canvas.height())
    var sprites = new Sprites();
    var renderer = new GameRenderer(sprites);

    var ctx = canvas[0].getContext("2d");
    renderer.render(GameStarter.__word, view, ctx);*/
};

GameStarter.nextGameStep = function() {
    console.log(Math.random());

    GameStarter.__gamePanel.redraw();
    setTimeout(() => GameStarter.nextGameStep(), 50);
};