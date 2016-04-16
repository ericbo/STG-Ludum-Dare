/*

platforms.push(new Platform(100,50,128,8));
platforms.push(new Platform(200,100,128,8));
platforms.push(new Platform(300,150,128,8));
platforms.push(new Platform(400,200,128,8));
platforms.push(new Platform(500,250,128,8));
platforms.push(new Platform(400,300,128,8));
platforms.push(new Platform(0,350,1200,10));

*/

function demoMap() {
  var images = ['img/Back.png', 'img/Mid.png','img/front.png'];
  var loadedImages = [];
  var width = mapWidth

  this.loadImages = function() {
    for (var image in images) {
      var tmpImage = new Image();
      tmpImage.src = images[image];
      loadedImages.push(tmpImage);
    }
  }

  //This needs a cleanup
  this.Render = function() {
    var veryFastOffset = offset / 5;
    var fastOffset = offset / 4;
    //var normalOffset = offset / 3;
    var slowOffset = offset / 2;

    var displayMultiplyer5 = Math.floor(veryFastOffset/canvasWidth);
    var displayMultiplyer4 = Math.floor(fastOffset/canvasWidth);
    //var displayMultiplyer3 = Math.floor(normalOffset/canvasWidth);
    var displayMultiplyer2 = Math.floor(slowOffset/canvasWidth);

    ctx.drawImage(loadedImages[0],canvasWidth * displayMultiplyer5 - veryFastOffset,0, canvasWidth, canvasHeight);
    ctx.drawImage(loadedImages[0],(canvasWidth * displayMultiplyer5 + canvasWidth) - veryFastOffset,0, canvasWidth, canvasHeight);

    ctx.drawImage(loadedImages[1],canvasWidth * displayMultiplyer4 - fastOffset,0, canvasWidth, canvasHeight);
    ctx.drawImage(loadedImages[1],(canvasWidth * displayMultiplyer4 + canvasWidth) - fastOffset,0, canvasWidth, canvasHeight);

    //ctx.drawImage(loadedImages[2],canvasWidth * displayMultiplyer3 - normalOffset,0, canvasWidth, canvasHeight);
    //ctx.drawImage(loadedImages[2],(canvasWidth * displayMultiplyer3 + canvasWidth) - normalOffset,0, canvasWidth, canvasHeight);

    ctx.drawImage(loadedImages[2],canvasWidth * displayMultiplyer2 - slowOffset,0, canvasWidth, canvasHeight);
    ctx.drawImage(loadedImages[2],(canvasWidth * displayMultiplyer2 + canvasWidth) - slowOffset,0, canvasWidth, canvasHeight);
  }
}
