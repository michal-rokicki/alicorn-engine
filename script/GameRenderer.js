function GameRenderer(sprites) {
    this.__sprites = sprites;
}

GameRenderer.prototype.render = function(worldMap, view, context) {
    //console.log(worldMap);
    //console.log(view);
    //var x,y;

    /*for (y=view.y; y<view.y+view.height; ++y) {
        for (x=view.x; x<view.x+view.width; ++x) {

        }
    }*/

    this.__renderBg(view, context);
};

GameRenderer.prototype.__renderBg = function(view, context) {
    context.fillStyle = 'green';
    console.log(view);
    context.fillRect(0,0,view.width,view.height);
};