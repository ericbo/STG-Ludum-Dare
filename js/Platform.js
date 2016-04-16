// -- Platform types -- //
//
//  0 - Solid
//  1 - Fall through/jump through (transparent)
function Platform(x,y,width,height,type = 0) {
  this.x = x;
  this.y = y;
  this.length = 0;
  this.type = type;

  this.model = {
    width: width,
    height: height
  };

  this.Render = function () {
    if(this.type == 1)
      ctx.drawImage(this.LOADED_IMAGES[1], this.x, this.y, this.model.width, this.model.height);
    else
      ctx.drawImage(this.LOADED_IMAGES[0], this.x, this.y, this.model.width, this.model.height);
  };
}
