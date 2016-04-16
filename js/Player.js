function Player () {
  this.x = 350;
  this.y = 0;
  this.prevX = 0;
  this.prevY = 0;
  this.speed = 2;
  this.isjumping = false;
  this.isOnGround = false;
  this.curVel = 0;
  this.maxVel = 10;
  this.velIncrement = 0.5;
  this.jumpVel = 10;
  this.platformID = null;
  this.colLeft = false;
  this.colRight = false;
  this.colTop = false;

  this.model = {
    width: 40,
    height: 80,
    color: "#bd4d04"
  };

  this.Update = function () {
    // Check collisions with the platforms while falling
    if (!this.isOnGround || this.curVel > 0) {
      for (var platform in platforms) {
        // Check if player is going through a platform
        if (platforms[platform].y >= this.prevY + this.model.height &&
        platforms[platform].y <= this.y + this.model.height &&
        this.x < platforms[platform].x + platforms[platform].model.width - offset &&
        this.x + this.model.width > platforms[platform].x - offset) {
          this.platformID = platform;
          this.isOnGround = true;
          this.y = platforms[this.platformID].y - this.model.height;
          this.curVel = 0;
        }
      }

      this.curVel -= this.velIncrement;

      if (this.curVel > this.maxVel)
        this.curVel = this.maxVel;
      if (this.curVel < -this.maxVel)
        this.curVel = -this.maxVel;
      this.prevY = this.y;
      this.y -= this.curVel;

    } else {
      // Check if the player is walking off the platform
      if (this.x > platforms[this.platformID].x + platforms[this.platformID].model.width - offset ||
      this.x + this.model.width < platforms[this.platformID].x - offset)
         this.isOnGround = false;
    }
    
    // Check if the player is colliding with solid platforms
    for (var platform in platforms) {
      // Check the left
      if (this.x < platforms[platform].x + platforms[platform].model.width - offset &&
      this.y < platforms[platform].y &&
      this.y + this.model.height > platforms[platform].y + platforms[platform].model.height &&
      platforms[platform].type == 0 &&
      (this.platformID != platform || !this.isOnGround))
        this.colLeft = true;
      // else
      //   this.colLeft = false;
    }

    // Check for key presses
    if (KEYS.RIGHT in KeysDown)
      if (this.x + this.model.width < canvasWidth) {
        this.x += this.speed;
        this.colLeft = false;
      }

    if (KEYS.LEFT in KeysDown && !this.colLeft)
      if (this.x > 0)
        this.x -= this.speed;

    if (KEYS.SPACE in KeysDown || KEYS.UP in KeysDown)
      if (this.isOnGround) {
        this.curVel = this.jumpVel;
        this.y -= 1;
        this.prevY = this.y;
        this.isOnGround = false;
      }
      
    if (KEYS.DOWN in KeysDown)
      if (this.isOnGround && platforms[this.platformID].type == 1) {
        this.y += 1;
        this.prevY = this.y;
        this.isOnGround = false;
      }

  };

  this.Render = function () {
    ctx.fillStyle = this.model.color;
    ctx.fillRect(this.x, this.y, this.model.width, this.model.height);

    ctx.fillStyle = "#48ff00";
    ctx.fillText("Current pos  (" + this.x + ", " + this.y + ")", 10, 20);
    ctx.fillText("Previous pos (" + this.prevX + ", " + this.prevY + ")", 10, 30);
    ctx.fillText("isOnGround - " + this.isOnGround, 10, 40);
    ctx.fillText("platfromID - " + this.platformID, 10, 50);
    ctx.fillText("curVel - " + this.curVel, 10, 60);

  };
}
