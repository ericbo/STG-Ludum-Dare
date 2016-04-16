function Player () {
  this.x = 350;
  this.y = 0;
  this.prevX = 0;
  this.prevY = 0;
  this.speed = 6;
  this.isjumping = false;
  this.isOnGround = false;
  this.curVel = 0;
  this.maxVel = 10;
  this.velIncrement = 0.5;
  this.jumpVel = 10;
  this.platformID = null;
  this.sprite;
  this.image = "img/HeroFull.png"
  this.start = new Date().getTime(); //Used for animations
  this.direction = true; //True - right, false - left
  this.moving = false;

  this.model = {
    width: 40,
    height: 80,
    color: "#bd4d04"
  };

  this.loadImages = function() {
    var tmpImage = new Image();
    tmpImage.src = this.image;
    this.sprite = tmpImage;
  }

  this.spriteCords = {
    walking: [[6,88],[62,88],[116,88],[172,88]],
    standing: [8, 6]
  };

  this.Update = function () {
    var keyPressed = false;

    // Check collisions with the platforms
    if (!this.isOnGround || this.curVel > 0) {
      for (var platform in platforms) {
        // Check if player is inside one of the platforms
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
      if (this.x > platforms[this.platformID].x + platforms[this.platformID].model.width - offset ||
      this.x + this.model.width < platforms[this.platformID].x - offset)
         this.isOnGround = false;
    }

    // Check for key presses
    if (KEYS.RIGHT in KeysDown)
      if (this.x + this.model.width < canvasWidth)
      {
        this.x += this.speed;
        this.direction = true;
        keyPressed = true;
      }

    if (KEYS.LEFT in KeysDown)
      if (this.x > 0)
      {
        this.x -= this.speed;
        this.direction = false;

        //Check if the sprite is moving both backwards and forwards. Essentially not moving.
        if(keyPressed)
          keyPressed = false;
        else
          keyPressed = true;
      }

    if (KEYS.SPACE in KeysDown || KEYS.UP in KeysDown)
      if (this.isOnGround) {
        this.curVel = this.jumpVel;
        this.y -= 1;
        this.prevY = this.y;
        this.isOnGround = false;
      }

      this.moving = keyPressed;
  };

  this.Render = function () {

    //Debug sprite
    //ctx.fillStyle = "#fff";
    //ctx.fillRect(this.x, this.y, this.model.width, this.model.height);

    //Draw here
    var frames = this.spriteCords.walking.length;
    var currentFrame = 0;
    var frameTime = 6 / frames;
    var elapsedTime = new Date().getTime() - this.start;

    currentFrame = Math.floor((elapsedTime / 40) / frames) % frames;
    ctx.draw
    if(this.direction)
      if(this.moving)
        if(this.isOnGround)
          ctx.drawImage(this.sprite, this.spriteCords.walking[currentFrame][0], this.spriteCords.walking[currentFrame][1], this.model.width, this.model.height, this.x, this.y, this.model.width, this.model.height);
        else
          ctx.drawImage(this.sprite, 228, 88, this.model.width, this.model.height, this.x, this.y, this.model.width, this.model.height);
      else
        ctx.drawImage(this.sprite, 8, 2, this.model.width, this.model.height, this.x, this.y, this.model.width, this.model.height);
    else {
      ctx.save()
      ctx.translate(canvasWidth, 0);
      ctx.scale(-1, 1);
      if(this.moving)
        if(this.isOnGround)
          ctx.drawImage(this.sprite, this.spriteCords.walking[currentFrame][0], this.spriteCords.walking[currentFrame][1], this.model.width, this.model.height, this.x - this.model.width, this.y, this.model.width, this.model.height);
        else
          ctx.drawImage(this.sprite, 228, 88, this.model.width, this.model.height, this.x - this.model.width, this.y, this.model.width, this.model.height);
      else
        ctx.drawImage(this.sprite, 8, 2, this.model.width, this.model.height, this.x - this.model.width, this.y, this.model.width, this.model.height);
      ctx.restore();
    }
    //Draw debug window
    ctx.fillStyle = "#48ff00";
    ctx.fillText("Current pos  (" + this.x + ", " + this.y + ")", 10, 10);
    ctx.fillText("Previous pos (" + this.prevX + ", " + this.prevY + ")", 10, 20);
    ctx.fillText("isOnGround - " + this.isOnGround, 10, 30);
    ctx.fillText("curVel - " + this.curVel, 10, 40);

  };
}
