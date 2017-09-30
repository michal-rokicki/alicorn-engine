function GameStarter() {
}

GameStarter.setWorld = function(word) {
    GameStarter.__word = word;
};

GameStarter.onLoad = function(canvasId) {
    GameStarter.__gamePanel = new GamePanel($("#"+canvasId), GameStarter.__word);
    GameStarter.nextGameStep();
};

GameStarter.nextGameStep = function() {
    console.log(Math.random());

    GameStarter.__gamePanel.redraw();
    setTimeout(() => GameStarter.nextGameStep(), 50);
};