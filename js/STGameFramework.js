//========================================================//
//
//
//
//========================================================//

// Game canvas variables
var canvas,
    ctx,
    canvasWidth,
    canvasHeight;

// Multi-browser support
RequestAnimationFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.msRequestAnimationFrame;

// Keyboard Events
var KeysDown = {};

addEventListener("keydown", function (e) {
    KeysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
    delete KeysDown[e.keyCode];
}, false);

// Keyboard keys
var KEYS = {
    BACKSPACE: 8,
    TAB: 9,
    RETURN: 13,
    SHIFT: 16,
    CONTROL: 17,
    ALT: 18,
    ESCAPE: 27,
    SPACE: 32,
    UP: 38,
    LEFT: 37,
    RIGHT: 39,
    DOWN: 40,
    K0: 48,
    K1: 49,
    K2: 50,
    K3: 51,
    K4: 52,
    K5: 53,
    K6: 54,
    K7: 55,
    K8: 56,
    K9: 57,
    A: 65,
    B: 66,
    C: 67,
    D: 68,
    E: 69,
    F: 70,
    G: 71,
    H: 72,
    I: 73,
    J: 74,
    K: 75,
    L: 76,
    M: 77,
    N: 78,
    O: 79,
    P: 80,
    Q: 81,
    R: 82,
    S: 83,
    T: 84,
    U: 85,
    V: 86,
    W: 87,
    X: 88,
    Y: 89,
    Z: 90,
    F1: 112,
    F2: 113,
    F3: 114,
    F4: 115,
    F5: 116,
    F6: 117,
    F7: 118,
    F8: 119,
    F9: 120,
    F10: 121,
    F11: 122,
    F12: 123,
    /*
                    -- Inconsisten Keys --
        These keys aren't consistent through all browser
    */
    MINUS: 189,
    EQUAL: 197
};

// Temporary crap
var player = new Player();

function FramworkInit (CanvasWidth, CanvasHeight) {
    // This function will be called when the game object is created
    canvas = document.createElement("Canvas");
    document.body.appendChild(canvas);
    ctx = canvas.getContext("2d");
    ctx.canvas.id = "gameCanvas";

    if (CanvasWidth === undefined)
        canvasWidth = 300;
    else
        canvasWidth = CanvasWidth;

    if (CanvasHeight === undefined)
        canvasHeight = 300;
    else
        canvasHeight = CanvasHeight;

    SetCanvasSize(canvasWidth, canvasHeight);

    Main();
}

function Update () {
    // This function will be called every frame
    // Add code beneath

    player.Update();

}

function Render () {
    // This function will be called every frame
    // Refresh the screen
    RefreshCanvas(/* Color */);

    // Add code beneath
    player.Render();
}

// Sets the width and height of the canvas
function SetCanvasSize (Width, Height) {
    this.canvasWidth = Width;
    this.canvasHeight = Height;
    ctx.canvas.width = Width;
    ctx.canvas.height = Height;
}

// Refreshes the canvas to a color [needs a color string]
function RefreshCanvas (color) {
    if (color === undefined)
        ctx.fillStyle = "#000";
    else
        ctx.fillStyle = color;

    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
}

function Main() {
    Update();
    Render();
    RequestAnimationFrame(Main);
}
