var map = [
    "111111111111111111111111111111111111111111111111111111111",
    "1                                                      11",
    "1                                                      11",
    "1                                              1111    11",
    "1                                                      11",
    "1                                                      11",
    "1 XXXXXXXXXXXXXXXX                                     11",
    "1                           a                          11",
    "1                  XXXXXXXXXXX              X X        11",
    "1                                            X         11",
    "1                                           X  X       11",
    "1                                                      11",
    "1                                                      11",
    "1        X                     a                       11",
    "1                   12222222111111111                  11",
    "1     aaa                                              11",
    "1     aaa                                              11",
    "1     aaa              a                               11",
    "1     aaa              XXXXXXXXXXXXXXXXXXX             11",
    "1  X11X111X11                                          11",
    "1                                                      11",
    "1                  X111111X                            11",
    "1                                      111             11",
    "1                                                      11",
    "1                                                  111111",
    "1                                                      11",
    "                1111111                                11",
    "1XXXXXXXXX            11111111                         11",
    "1                      1       XXXXX                   11",
    "1   11111111111111     1           XXXXXXX             11",
    "1 11111111             1                               11",
    "1111111111             1                               11",
    "1111111111             1333333333333333333333333333333311",
    "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX1"
];

var conf = {
    g: 0.05,
    maxVY: 0.5,
    jumpVy: 0.5,
    mainCharacter: new Character("main", 3, 23, 2, 3, 95, 186),
    blocks: {
        "a": "COIN",
        "2": "KILLING",
        "3": "KILLING"
    }
};

GameStarter.setWorld(new World(new WorldMap(map), conf));