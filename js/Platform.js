function Platform(x,y,width,height) {
  this.x = x;
  this.y = y;
  this.length = 0;
  this.width = 0;
  this.color = "#bd4d04";
  this.offset = 0;

  this.model = {
    width: width,
    height: height,
    color: "#bd4d04"
  };

  this.Render = function () {
    ctx.fillStyle = this.model.color;
    ctx.fillRect(this.x - this.offset, this.y, this.model.width, this.model.height);
  };
}
