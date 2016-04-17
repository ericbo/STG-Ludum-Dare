// -- Platform types -- //
//
//  0 - Solid
//  1 - Fall through/jump through (transparent)
function Platform(x,y,width,type = 1) {
  this.x = x;
  this.y = y;
  this.length = 0;
  this.type = type;

  this.model = {
    width: width,
    height: 15
  };

  this.Render = function () {
    if(this.type == 1)
      ctx.drawImage(LOADED_IMAGES[1], this.x - offset, this.y, this.model.width, this.model.height);
    else
      ctx.drawImage(LOADED_IMAGES[0], this.x - offset, this.y, this.model.width, this.model.height);
  };
}
