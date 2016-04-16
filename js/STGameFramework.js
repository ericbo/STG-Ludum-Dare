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

//Camera offset (panning)
var offset = 0;
var maxOffset = 0;
var mapWidth = 1200;

addEventListener("keydown", function (e) {
    KeysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
    delete KeysDown[e.keyCode];
}, false);

/**********************************************************************
*           GAME GLOBAL VARIABLES
**********************************************************************/
var player = new Player();
var platforms = [];
platforms.push(new Platform(100,50,128,8));
platforms.push(new Platform(200,100,128,8));
platforms.push(new Platform(300,150,128,8));
platforms.push(new Platform(400,200,128,8));
platforms.push(new Platform(500,250,128,8));
platforms.push(new Platform(400,300,128,8));
platforms.push(new Platform(0,350,640,10));

/*
* This function initializes the game engine and the canvas.
* If the parameters aren't specified, the canvas size will
* be set to 300 by default. Once the engine is initialized,
* it calls the Main method, launching the game.
*
* @param  CanvasWidth   This is the desired width of the canvas
* @param  CanvasHeight  This is the desired height of the canvas
*/
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

    maxOffset = mapWidth - canvasWidth; //Used for camear panning.

    SetCanvasSize(canvasWidth, canvasHeight);

    Main();
}

/*
* This function will be called every frame and
* is used to update variables of various objects.
*/
function Update () {
    // This function will be called every frame
    // Add code beneath

    player.Update();

    //Camear panning.
    var canvasMidWidth = canvasWidth / 2;
    var playerDistance = player.x - canvasMidWidth;

    if(playerDistance > 0) {
      if(offset + playerDistance >= maxOffset) {
        offset = maxOffset;
      } else {
        offset += playerDistance;
        player.x = canvasMidWidth;
      }
    } else if (offset != 0) {
      if (offset + playerDistance <= 0) {
        offset = 0;
      } else {
        offset += playerDistance;
        player.x = canvasMidWidth;
      }
    }

}

/*
* This function will be called every frame and
* is used to render various things from objects.
*/
function Render () {
    // This function will be called every frame
    // Refresh the screen
    RefreshCanvas(/* Color */);

    // Add code beneath
    player.Render();

    for (var platform in platforms) {
      platforms[platform].offset = offset;
      platforms[platform].Render();
    }
}

/*
* This function sets the width and height of the canvas
*
* @param  Width   This is the desired width of the canvas
* @param  Height  This is the desired height of the canvas
*/
function SetCanvasSize (Width, Height) {
    this.canvasWidth = Width;
    this.canvasHeight = Height;
    ctx.canvas.width = Width;
    ctx.canvas.height = Height;
}

/*
* This function sets the backgroung color of the canvas.
* The color is set to #000 by default.
*
* @param  color   This is the desired backgroung color of the canvas
*/
function RefreshCanvas (color) {
    if (color === undefined)
        ctx.fillStyle = "#000";
    else
        ctx.fillStyle = color;

    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
}

/*
* This function will be called every frame and
* is the base of the engine. It calls the Update
* and Render methods in order 60 times a second.
*/
function Main() {
    Update();
    Render();
    RequestAnimationFrame(Main);
}
