function Character(type, x, y, width, height, dx, dy) {
    this.type = type;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.width = width;
    this.height = height;
    this.vy = 0;
    this.vx = 0;
    this.right = true;
}

