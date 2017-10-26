function WorldMap(json) {
    this.height = json.length;
    this.width = json[0].length;
    this.__blocks = [];

    for (i=0; i<json.length; ++i) {
        if (json[i].length!=this.width) {
            throw new Error("Invalid line: "+i);
        }
    }

    var x,y;
    for (x=0; x<this.width; ++x) {
        this.__blocks[x]=[];
        for (y=0; y<this.height; ++y) {
            this.__blocks[x][y] = json[y].charAt(x);
        }
    }
}

WorldMap.prototype.getBlock = function(x,y) {
    var res = this.__blocks[x];
    if (res===undefined) {
        return "FORBIDDEN";
    }
    res = res[y];
    if (res===undefined) {
        return "FORBIDDEN";
    }

    return res;
};

WorldMap.prototype.clearBlock = function(x,y) {
    this.__blocks[x][y] = " ";
};