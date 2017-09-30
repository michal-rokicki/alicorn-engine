function WorldMap(json) {
    this.height = json.length;
    this.width = json[0].length;
    this.blocks = [];

    for (i=0; i<json.length; ++i) {
        if (json[i].length!=this.width) {
            throw new Error("Invalid line: "+i);
        }
    }

    var x,y;
    for (x=0; x<this.width; ++x) {
        this.blocks[x]=[]
        for (y=0; y<this.height; ++y) {
            this.blocks[x][y] = json[y].charAt(x);
        }
    }
}