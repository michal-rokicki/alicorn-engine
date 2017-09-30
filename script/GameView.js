function GameView(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

GameView.prototype.center = function(x,y) {
    this.x = x - this.width/2;
    this.y = y - this.height/2;
};