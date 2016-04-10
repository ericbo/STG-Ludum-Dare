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
