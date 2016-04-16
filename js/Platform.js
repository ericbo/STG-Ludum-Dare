// -- Platform types -- //
//
//  0 - Solid
//  1 - Fall through/jump through (transparent)
function Platform(x,y,width,height,type) {
  this.x = x;
  this.y = y;
  this.length = 0;
  this.model = {
    width: width,
    height: height,
    color: "#bd4d04"
  };
  
  if (type === undefined) {
    this.type = 1;
  } else {
    this.type = type;
    if (type === 0)
      this.model.color = "#10f";
  }

  this.Render = function () {
    ctx.fillStyle = this.model.color;
    ctx.fillRect(this.x - offset, this.y, this.model.width, this.model.height);
  };
}
