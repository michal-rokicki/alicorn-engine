function GameRenderer() {
}

GameRenderer.__BLOCK_SIZE = 64;

GameRenderer.prototype.render = function(world, view, context) {
    var worldMap = world.map;
    this.__renderBg(worldMap, view, context);
    this.__renderBlocks(worldMap, view, context);
    this.__renderCharacter(world.mainCharacter, view, context);
};

GameRenderer.prototype.__renderBg = function(worldMap, view, context) {
    context.fillStyle = 'green';
    context.fillRect(0,0,view.width,view.height);

    if (IMAGE_VFS.bg) {
        var w = worldMap.width * GameRenderer.__BLOCK_SIZE;
        var h = worldMap.height * GameRenderer.__BLOCK_SIZE;
        var sw = IMAGE_VFS.bg.naturalWidth;
        var sh = IMAGE_VFS.bg.naturalHeight;
        var scaleX = sw/w;
        var scaleY = sh/h;

        context.drawImage(IMAGE_VFS.bg, scaleX*view.x/2, scaleY*view.y/2, 2*scaleX*view.width, 2*scaleY*view.height,0,0,view.width,view.height);
    }
};

GameRenderer.prototype.__renderBlocks = function(worldMap, view, context) {
    var i,j, x, y;

    var i0 = Math.max(0, Math.floor(view.x/GameRenderer.__BLOCK_SIZE)-1);
    var i1 = Math.min(worldMap.width, Math.floor((view.x+view.width)/GameRenderer.__BLOCK_SIZE)+1);

    var j0 = Math.max(0, Math.floor(view.y/GameRenderer.__BLOCK_SIZE)-1);
    var j1 = Math.min(worldMap.height, Math.floor((view.y+view.height)/GameRenderer.__BLOCK_SIZE)+1);

    for (i=i0; i<i1; ++i) {
        for (j=j0; j<j1; ++j) {
            var blockId = worldMap.getBlock(i,j);
            var img = Sprites.getBlock(blockId);
            if (img) {
                x = i*GameRenderer.__BLOCK_SIZE - view.x;
                y = j*GameRenderer.__BLOCK_SIZE - view.y;

                context.drawImage(img, x, y);
            }
        }
    }
};

GameRenderer.prototype.__renderCharacter = function(character, view, context) {
    var img = Sprites.getCharacter(character.type);

    if (character.right) {
        context.drawImage(
            img,
            character.x*GameRenderer.__BLOCK_SIZE - view.x - character.dx,
            character.y*GameRenderer.__BLOCK_SIZE - view.y - character.dy);
    }
    else {
        var sw = img.naturalWidth;
        var sh = img.naturalHeight;

        this.__renderMirror(img,
            character.x*GameRenderer.__BLOCK_SIZE - view.x - (sw - character.dx - character.width*GameRenderer.__BLOCK_SIZE),
            character.y*GameRenderer.__BLOCK_SIZE - view.y - character.dy,
            sw,sh, context);
    }
};

GameRenderer.prototype.__renderMirror = function(img, x, y, sw, sh, context) {
    context.save();
    context.scale(-1,1);
    context.drawImage(img,-x,y,-sw,sh);
    context.restore();
};
