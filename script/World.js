function World(map, conf) {
    this.map = map;
    this.g = conf.g;
    this.maxVY = conf.maxVY;
    this.jumpVy = conf.jumpVy;
    this.mainCharacter = conf.mainCharacter;
    this.vision = "LEFT";
}