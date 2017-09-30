function GameRenderer(sprites) {
    this.__sprites = sprites;
}

GameRenderer.__BLOCK_SIZE = 64;

GameRenderer.prototype.render = function(worldMap, view, context) {
    this.__renderBg(view, context);
    this.__renderBlocks(worldMap, view, context);
};

GameRenderer.prototype.__renderBg = function(view, context) {
    context.fillStyle = 'green';
    console.log(view);
    context.fillRect(0,0,view.width,view.height);
};

GameRenderer.prototype.__renderBlocks = function(worldMap, view, context) {
    var i,j, x, y;

    var i0 = Math.max(0, Math.floor(worldMap.x/GameRenderer.__BLOCK_SIZE));
    var i1 = Math.min(worldMap.width, Math.floor((worldMap.x+worldMap.width)/GameRenderer.__BLOCK_SIZE));

    var j0 = Math.max(0, Math.floor(worldMap.y/GameRenderer.__BLOCK_SIZE));
    var j1 = Math.min(worldMap.height, Math.floor((worldMap.y+worldMap.height)/GameRenderer.__BLOCK_SIZE));

    for (i=i0; i<i1; ++i) {
        for (j=j0; i<j1; ++j) {
            x = i*GameRenderer.__BLOCK_SIZE - view.x;
            y = j*GameRenderer.__BLOCK_SIZE - view.y;

            context.drawImage(this.__sprites.blocks[worldMap.blocks[i][j]], x, y);
        }
    }

    /*for (y=view.y; y<view.y+view.height; ++y) {
        for (x=view.x; x<view.x+view.width; ++x) {

        }
    }*/
};