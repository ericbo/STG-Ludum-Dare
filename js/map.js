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
  var images = ['img/demoMap/skill-desc_0003_bg.png'];
  var loadedImages = [];
  var width = 1200

  this.loadImages = function() {
    for (var image in images) {
      var tmpImage = new Image();
      tmpImage.src = images[image];
      loadedImages.push(tmpImage);
    }
  }

  this.Render = function() {
    for (var image in loadedImages) {
      var img = loadedImages[image];
      ctx.drawImage(loadedImages[image],0,0, canvasWidth, canvasHeight);
    }
  }
}
