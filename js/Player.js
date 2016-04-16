function Player () {
  this.x = 0;
  this.y = 0;
  this.speed = 2;
  this.isjumping = false;
  this.isOnGround = false;
  this.curVel = 0;
  this.maxVel = 10;
  this.velIncrement = 0.2;
  this.jumpVel = 5;

  this.model = {
    width: 40,
    height: 80,
    color: "#bd4d04"
  };

  this.Update = function () {
    if (this.y + this.model.height >= canvasHeight) {
      this.isOnGround = true;
      this.y = canvasHeight - this.model.height;
      this.curVel = 0;
    } else {
      this.curVel -= this.velIncrement;
      if (this.curVel > this.maxVel)
        this.curVel = this.maxVel;

      this.y -= this.curVel;
    }

    if (KEYS.RIGHT in KeysDown)
      if (this.x + this.model.width < canvasWidth)
        this.x += this.speed;

    if (KEYS.LEFT in KeysDown)
      if (this.x > 0)
        this.x -= this.speed;

    if (KEYS.SPACE in KeysDown || KEYS.UP in KeysDown)
      if (this.isOnGround) {
        this.curVel = this.jumpVel;
        this.y -= 1;
        this.isOnGround = false;
      }

  };

  this.Render = function () {
    ctx.fillStyle = this.model.color;
    ctx.fillRect(this.x, this.y, this.model.width, this.model.height);
  };
}
