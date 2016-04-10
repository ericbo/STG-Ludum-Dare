function Player () {
  this.x = 0;
  this.y = 0;
  this.speed = 2;

  this.model = {
    width: 32,
    height: 32,
    color: "#bd4d04"
  };

  this.Update = function () {

  };

  this.Render = function () {
    ctx.fillStyle = this.model.color;
    ctx.fillRect(this.x, this.y, this.model.width, this.model.height);
  };
}
