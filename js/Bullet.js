function Bullet (x, y, direction) {
  this.x = x;
  this.y = y;
  this.prevX = x;
  this.prevY = y;
  this.direction = direction;
  this.speed = 15;

  this.model = {
    width: 10,
    height: 10,
    color: "#00ff73"
  };

  this.Update = function () {
    if (this.direction == DIRECTIONS.left) {
      this.prevX = this.x;
      this.x -= this.speed;
    } else if (this.direction == DIRECTIONS.right) {
      this.prevX = this.x;
      this.x += this.speed;
    }
  };

  this.Render = function () {
    ctx.fillStyle = this.model.color;
    ctx.fillRect(this.x - offset, this.y, this.model.width, this.model.height);
  };
}
