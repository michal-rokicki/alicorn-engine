function GameStarter() {
}

GameStarter.__KEY_STATE = {
    left:false,
    right:false,
    up:false,
    down:false
};

GameStarter.setWorld = function(word) {
    GameStarter.__word = word;
};

GameStarter.onLoad = function(canvasId) {
    var canvas = $("#"+canvasId);

    GameStarter.__stepProcessor = new StepProcessor(GameStarter.__word);
    GameStarter.__gamePanel = new GamePanel(canvas, GameStarter.__word);
    GameStarter.__initKeys(canvas);
    GameStarter.__nextGameStep();

};

GameStarter.__initKeys = function(canvas) {
    $("body").keydown(
        function( event ) {
            switch (event.which) {
                case 38:
                    GameStarter.__KEY_STATE.up = true;
                    break;
                case 40:
                    GameStarter.__KEY_STATE.down = true;
                    break;
                case 37:
                    GameStarter.__KEY_STATE.left = true;
                    break;
                case 39:
                    GameStarter.__KEY_STATE.right = true;
                    break;
            }
    });

    $("body").keyup(
            function( event ) {
                switch (event.which) {
                    case 38:
                        GameStarter.__KEY_STATE.up = false;
                        break;
                    case 40:
                        GameStarter.__KEY_STATE.down = false;
                        break;
                    case 37:
                        GameStarter.__KEY_STATE.left = false;
                        break;
                    case 39:
                        GameStarter.__KEY_STATE.right = false;
                        break;
                }
    });
};

GameStarter.__nextGameStep = function() {
    //console.log(Math.random());
    GameStarter.__stepProcessor.nextStep(GameStarter.__KEY_STATE);
    GameStarter.__gamePanel.redraw();
    setTimeout(() => GameStarter.__nextGameStep(), 50);
};