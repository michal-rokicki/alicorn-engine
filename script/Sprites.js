function Sprites() {
    this.blocks = {
        "1": document.getElementById("block-1-img"),
        "2": document.getElementById("block-2-img"),
        "3": document.getElementById("block-3-img"),
        "4": document.getElementById("block-4-img"),
        "a": document.getElementById("block-a-img"),
        "X": document.getElementById("block-X-img")
    };

    this.characters = {
        "main": {
            dx: 69,
            dy: 194,
            img: document.getElementById("character-main-img")
        }
    };
}
