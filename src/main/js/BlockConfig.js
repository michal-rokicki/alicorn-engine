function BlockConfig(conf) {
    this.__blocks = conf.blocks;
}

BlockConfig.prototype.getBehavior = function(blockId) {
    if (blockId=="FORBIDDEN") {
        return "SOLID";
    }
    else if (this.__blocks[blockId]!==undefined) {
        return this.__blocks[blockId];
    }
    else if (IMAGE_VFS.block[blockId]===undefined) {
        return "TRANSPARENT"
    }
    else {
        return "SOLID";
    }
};