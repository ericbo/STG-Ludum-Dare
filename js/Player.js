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

    //Display correct animiation sprite based on the heros position.
    if(this.direction)
      if(this.moving)
        if(this.isOnGround)
          this.DrawSprite(this.spriteState.walkingRight)
        else
          this.DrawSprite(this.spriteState.jumpRight)
      else
        this.DrawSprite(this.spriteState.idleRight);
    else {
      if(this.moving)
        if(this.isOnGround)
          this.DrawSprite(this.spriteState.walkingLeft);
        else
          this.DrawSprite(this.spriteState.jumpLeft);
      else
        this.DrawSprite(this.spriteState.idleLeft);
    }

    //Draw debug window
    ctx.fillStyle = "#48ff00";
    ctx.fillText("Current pos  (" + this.x + ", " + this.y + ")", 10, 10);
    ctx.fillText("Previous pos (" + this.prevX + ", " + this.prevY + ")", 10, 20);
    ctx.fillText("isOnGround - " + this.isOnGround, 10, 30);
    ctx.fillText("curVel - " + this.curVel, 10, 40);
  };

  /*
  * Draws an image to the canvas context.
  *
  * @param state - An integer representing they type of sprite to be drawn.
  *                 0) Idle, right
  *                 1) Idle, left
  *                 2) walk, right
  *                 3) Walk, left
  *                 4) Jump, right
  *                 6) Jump, left
  *                 7) Double jump, right
  *                 8) Double jump, left
  *                 9) Dash, right
  *                10) Dash, left
  *
  * @returns nothing
  */
  this.DrawSprite = function(state) {
    var elapsedTime = new Date().getTime() - this.start;
    var frames = 1;
    var currentFrame = 0;
    var flipOffset = 0; //Takes into account offset interfering with sprite location.

    //Fix sprite fliping when getting close to the left boundury.
    if(offset == 0 || offset == maxOffset) {
      var mid = canvasWidth / 2;
      var dis = mid - this.x;
      flipOffset = dis * 2;
    }

    //Idle right
    if(state == this.spriteState.idleRight) {
      frames = this.spriteCords.idle.length;
      currentFrame = Math.floor((elapsedTime / 40) / frames) % frames;

      ctx.drawImage(this.sprite, this.spriteCords.idle[currentFrame][0], this.spriteCords.idle[currentFrame][1], this.model.width, this.model.height, this.x, this.y, this.model.width, this.model.height);
      return;
    }

    //Idle left
    if(state == this.spriteState.idleLeft) {
      frames = this.spriteCords.idle.length;
      currentFrame = Math.floor((elapsedTime / 40) / frames) % frames;

      ctx.save()
      ctx.translate(canvasWidth, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(this.sprite, this.spriteCords.idle[currentFrame][0], this.spriteCords.idle[currentFrame][1], this.model.width, this.model.height, this.x - this.model.width + flipOffset, this.y, this.model.width, this.model.height);
      ctx.restore();
      return;
    }

    //Walking right
    if(state == this.spriteState.walkingRight) {
      frames = this.spriteCords.walking.length;
      currentFrame = Math.floor((elapsedTime / 40) / frames) % frames;

      ctx.drawImage(this.sprite, this.spriteCords.walking[currentFrame][0], this.spriteCords.walking[currentFrame][1], this.model.width, this.model.height, this.x, this.y, this.model.width, this.model.height);
      return;
    }

    //Walking left
    if(state == this.spriteState.walkingLeft) {
      frames = this.spriteCords.walking.length;
      currentFrame = Math.floor((elapsedTime / 40) / frames) % frames;

      ctx.save()
      ctx.translate(canvasWidth, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(this.sprite, this.spriteCords.walking[currentFrame][0], this.spriteCords.walking[currentFrame][1], this.model.width, this.model.height, this.x - this.model.width + flipOffset, this.y, this.model.width, this.model.height);
      ctx.restore();
      return;
    }

    //Jumping right
    if(state == this.spriteState.jumpRight) {
      frames = this.spriteCords.jumping.length;
      currentFrame = Math.floor((elapsedTime / 40) / frames) % frames;

      ctx.drawImage(this.sprite, this.spriteCords.jumping[currentFrame][0], this.spriteCords.jumping[currentFrame][1], this.model.width, this.model.height, this.x, this.y, this.model.width, this.model.height);
      return;
    }

    //Jumping left
    if(state == this.spriteState.jumpLeft) {
      frames = this.spriteCords.jumping.length;
      currentFrame = Math.floor((elapsedTime / 40) / frames) % frames;

      ctx.save()
      ctx.translate(canvasWidth, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(this.sprite, this.spriteCords.jumping[currentFrame][0], this.spriteCords.jumping[currentFrame][1], this.model.width, this.model.height, this.x - this.model.width + flipOffset, this.y, this.model.width, this.model.height);
      ctx.restore();
    }
  };

  this.spriteState = {
    idleRight : 0,
    idleLeft : 1,
    walkingRight : 2,
    walkingLeft : 3,
    jumpRight : 4,
    jumpLeft : 5
  };

  this.spriteCords = {
    walking: [[6,88],[62,88],[116,88],[172,88]],
    idle: [[8, 2]],
    jumping: [[228, 88]]
  };
}
