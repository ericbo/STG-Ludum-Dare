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
  var images = ['img/demoMap/skill-desc_0003_bg.png', 'img/demoMap/skill-desc_0002_far-buildings.png','img/demoMap/skill-desc_0001_buildings.png', 'img/demoMap/skill-desc_0000_foreground.png'];
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
    var slowOffset = offset / 4;
    var displayMultiplyer = Math.floor(slowOffset/canvasWidth);

    for (var image in loadedImages) {
      var img = loadedImages[image];
      ctx.drawImage(loadedImages[image],canvasWidth * displayMultiplyer - slowOffset,0, canvasWidth, canvasHeight);
      ctx.drawImage(loadedImages[image],(canvasWidth * displayMultiplyer + canvasWidth) - slowOffset,0, canvasWidth, canvasHeight);
    }
  }
}
