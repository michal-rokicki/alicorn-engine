function Sprites() {
    this.blocks = {
        "1": document.getElementById("block-1-img"),
        "2": document.getElementById("block-2-img")
    };

    this.characters = {
        "main": {
            dx: 95,
            dy: 186,
            img: document.getElementById("character-main-img")
        }
    };
}
