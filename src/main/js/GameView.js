function GameView(x, y, width, height, mapWidth, mapHeight) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.mapWidth = mapWidth;
    this.mapHeight = mapHeight;
}

GameView.prototype.center = function(x,y) {
    this.x = Math.min(this.mapWidth - this.width, Math.max(0, x - this.width/2));
    this.y = Math.min(this.mapHeight - this.height, Math.max(0, y - this.height/2));
};
