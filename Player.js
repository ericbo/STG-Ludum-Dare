function Player () {
  this.x = 0;
  this.y = 0;
  this.prevX = this.x;
  this.prevY = this.y;
  this.speed = 2;
  this.isjumping = false;
  this.isOnGround = false;
  this.curVel = 0;
  this.maxVel = 10;
  this.velIncrement = 0.025;
  this.jumpVel = 2;
  this.platformID = null;

  this.model = {
    width: 32,
    height: 64,
    color: "#bd4d04"
  };

  this.Update = function () {
    // Check collisions with the platforms
    if (!this.isOnGround) {
      if (this.y + this.model.height >= canvasHeight) {
        this.isOnGround = true;
        this.y = canvasHeight - this.model.height;
        this.curVel = 0;
      } else {
        for (var platform in platforms) {
          // Check if player is inside one of the platforms
          if (this.y + this.model.height >= platforms[platform].y &&
          this.y + this.model.height < platforms[platform].y + platforms[platform].model.height && 
          this.x < platforms[platform].x + platforms[platform].model.width &&
          this.x + this.model.width > platforms[platform].x) {
            this.platformID = platform;
            this.isOnGround = true;
            this.y = platforms[this.platformID].y - this.model.height;
            this.curVel = 0;
          } else {
            this.curVel -= this.velIncrement;
      
            if (this.curVel > this.maxVel)
              this.curVel = this.maxVel;
      
            this.prevY = this.y;
            this.y -= this.curVel;
          }
          console.log(this.isOnGround);
        }
      }
    }
    
    // Check for key presses
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
