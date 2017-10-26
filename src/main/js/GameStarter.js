function GameStarter() {
}

GameStarter.__KEY_STATE = {
    left:false,
    right:false,
    up:false,
    down:false,
    forced: {}
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
                case 87:
                case 38:
                    GameStarter.__KEY_STATE.up = true;
                    GameStarter.__KEY_STATE.forced.up = true;
                    break;
                case 83:
                case 40:
                    GameStarter.__KEY_STATE.down = true;
                    GameStarter.__KEY_STATE.forced.down = true;
                    break;
                case 65:
                case 37:
                    GameStarter.__KEY_STATE.left = true;
                    GameStarter.__KEY_STATE.forced.left = true;
                    break;
                case 68:
                case 39:
                    GameStarter.__KEY_STATE.right = true;
                    GameStarter.__KEY_STATE.forced.right = true;
                    break;
            }
    });

    $("body").keyup(
        function( event ) {
            switch (event.which) {
                case 87:
                case 38:
                    GameStarter.__KEY_STATE.up = false;
                    break;
                case 83:
                case 40:
                    GameStarter.__KEY_STATE.down = false;
                    break;
                case 65:
                case 37:
                    GameStarter.__KEY_STATE.left = false;
                    break;
                case 68:
                case 39:
                    GameStarter.__KEY_STATE.right = false;
                    break;
            }
    });
};

GameStarter.__nextGameStep = function() {
    var gameOver = false;

    try {
        GameStarter.__stepProcessor.nextStep(GameStarter.__KEY_STATE);
    }
    catch (err) {
        if (err==="Game Over!") {
            gameOver = true;
            $("#GameOverDiv").show();
        }
        else {
            console.log(err);
        }
    }

    GameStarter.__gamePanel.redraw();
    GameStarter.__KEY_STATE.forced = {};

    if (!gameOver) {
        setTimeout(() => GameStarter.__nextGameStep(), 50);
    }
};