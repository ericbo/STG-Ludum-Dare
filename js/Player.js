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
  this.image = "img/HeroFull.png";
  this.start = new Date().getTime(); //Used for animations
  this.direction = true; //True - right, false - left
  this.moving = false;
  this.aimDirection = 0; //Default to none.
  this.colLeft = false;
  this.colRight = false;
  this.colTop = false;

  this.shooting = {
    maxTimer: 10,
    curTimer: 0,
    isShooting: false
  };

  this.dash = {
    maxCooldown: 50,
    curCooldown: 0,
    maxDash: 20,
    curDash: 0,
    isDashing: false,
    isReady: true
  };

  this.model = {
    width: 40,
    height: 80,
    color: "#bd4d04"
  };

  this.loadImages = function() {
    var tmpImage = new Image();
    tmpImage.src = this.image;
    this.sprite = tmpImage;
  };

  this.Update = function () {
    var keyPressed = false;
    var aimPressed = false;
    var dashPressed = false;

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
    // Move Right
    if (KEYS.D in KeysDown)
      if (this.x + this.model.width < canvasWidth)
      {
        this.x += this.speed;
        this.direction = true;
        keyPressed = true;
      }

    //Move Left
    if (KEYS.A in KeysDown)
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

    // Dashing
    if (KEYS.SPACE in KeysDown && this.dash.isReady)
      if (!dashPressed) {
        dashPressed = true;
        this.dash.isReady = false;
        this.dash.isDashing = true;
        this.dash.curCooldown = this.dash.maxCooldown;
        this.dash.curDash = this.dash.maxDash;
      }
    else
      dashPressed = false;

    if (this.dash.isDashing) {
      if (this.direction) {
        this.prevX = this.x;
        this.x += this.speed * 3;
      } else {
        this.prevX = this.x;
        this.x -= this.speed * 3;
      }
    }

    // Check if the player is colliding with solid platforms
    for (var platform in platforms) {
      // Check the left
      if (this.x < platforms[platform].x + platforms[platform].model.width  - offset &&
          this.x + this.model.width > platforms[platform].x + platforms[platform].model.width - offset &&
          this.y < platforms[platform].y &&
          this.y + this.model.height > platforms[platform].y + platforms[platform].model.height &&
          platforms[platform].type == 0 &&
          this.platformID != platform){
            this.x = platforms[platform].x + platforms[platform].model.width - offset;
            console.log("Player's left collision");
          }

      // Check the right
      else if (this.x + this.model.width > platforms[platform].x - offset &&
               this.x < platforms[platform].x + platforms[platform].model.width  - offset &&
               this.y < platforms[platform].y &&
               this.y + this.model.height > platforms[platform].y + platforms[platform].model.height &&
               platforms[platform].type == 0 &&
               this.platformID != platform){
                this.x = platforms[platform].x;
                  console.log("Platform x: " + platforms[platform].x);
                  console.log("Player x:   " + this.x);
                }

      else if(this.x < platforms[platform].x + platforms[platform].model.width - offset &&
          this.x + this.model.width > platforms[platform].x - offset &&
          this.y < platforms[platform].y + platforms[platform].model.height &&
          this.y + this.model.height > platforms[platform].y + platforms[platform].model.height &&
          this.prevY >= this.y &&
          platforms[platform].type == 0 &&
          this.platformID != platform){
            this.y = platforms[platform].y + platforms[platform].model.height;
            this.curVel = 0;
            console.log(this.y);
          }
    }

    //Move Up
    if (KEYS.W in KeysDown)
      if (this.isOnGround) {
        this.curVel = this.jumpVel;
        this.y -= 1;
        this.prevY = this.y;
        this.isOnGround = false;
      }
    // Shoot things
    if (KEYS.J in KeysDown) {
      this.shooting.isShooting = true;
      aimPressed = true;
    } else
      this.shooting.isShooting = false;

    if (this.shooting.isShooting) {
      if (this.shooting.curTimer <= 0) {
        this.shooting.curTimer = this.shooting.maxTimer;
        if (this.direction) {
          this.aimDirection = DIRECTIONS.right;
          bullets.push(new Bullet(this.x + offset, this.y + this.model.height / 2 - 10, DIRECTIONS.right));
        } else {
          this.aimDirection = DIRECTIONS.left;
          bullets.push(new Bullet(this.x + offset, this.y + this.model.height / 2 - 10, DIRECTIONS.left));
        }
      }
    }
    // Update the timers
    if (this.shooting.curTimer > 0)
      this.shooting.curTimer--;

    if (this.dash.curCooldown > 0)
      this.dash.curCooldown--;

    if (this.dash.curDash > 0)
      this.dash.curDash--;

    if (this.dash.curCooldown === 0)
      this.dash.isReady = true;

    if (this.dash.curDash === 0)
      this.dash.isDashing = false;

    if(!aimPressed)
      this.aimDirection = DIRECTIONS.none;

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
          if(this.aimDirection == DIRECTIONS.right)
            this.DrawSprite(this.spriteState.aimWalkingRight);
          else if (this.aimDirection == DIRECTIONS.left)
            this.DrawSprite(this.spriteState.aimWalkingLeft);
          else
            this.DrawSprite(this.spriteState.walkingRight);
        else
          if(this.aimDirection == DIRECTIONS.right)
            this.DrawSprite(this.spriteState.aimFallingRight);
          else if(this.aimDirection == DIRECTIONS.left)
            this.DrawSprite(this.spriteState.aimFallingLeft);
          else
            this.DrawSprite(this.spriteState.jumpRight);
      else
        if(this.aimDirection == DIRECTIONS.right)
          this.DrawSprite(this.spriteState.aimGroundRight);
        else if(this.aimDirection == DIRECTIONS.left)
          this.DrawSprite(this.spriteState.aimGroundLeft);
        else
          this.DrawSprite(this.spriteState.idleRight);
    else {
      if(this.moving)
        //If on ground and moving
        if(this.isOnGround)
          if(this.aimDirection == DIRECTIONS.right)
            this.DrawSprite(this.spriteState.aimWalkingRight);
          else if(this.aimDirection == DIRECTIONS.left)
            this.DrawSprite(this.spriteState.aimWalkingLeft);
          else
            this.DrawSprite(this.spriteState.walkingLeft);
        //If freefalling
        else
          if(this.aimDirection == DIRECTIONS.right)
            this.DrawSprite(this.spriteState.aimFallingRight);
          else if(this.aimDirection == DIRECTIONS.left)
            this.DrawSprite(this.spriteState.aimFallingLeft);
          else
            this.DrawSprite(this.spriteState.jumpLeft);
      else
        if(this.aimDirection == DIRECTIONS.right)
          this.DrawSprite(this.spriteState.aimGroundRight);
        else if(this.aimDirection == DIRECTIONS.left)
          this.DrawSprite(this.spriteState.aimGroundLeft);
        else
          this.DrawSprite(this.spriteState.idleLeft);
    }

    //Draw debug window
    ctx.fillStyle = "#48ff00";
    ctx.fillText("Current pos  (" + this.x + ", " + this.y + ")", 10, 10);
    ctx.fillText("Previous pos (" + this.prevX + ", " + this.prevY + ")", 10, 20);
    ctx.fillText("isOnGround - " + this.isOnGround, 10, 30);
    ctx.fillText("curVel - " + this.curVel, 10, 40);
    ctx.fillText("isDashing - " + this.dash.isDashing, 10, 50);
    ctx.fillText("Dash Cooldown - " + this.dash.curCooldown, 10, 60);
    ctx.fillText("Dash Timer - " + this.dash.curDash, 10, 70);

    if (KEYS.S in KeysDown)
      if (this.isOnGround && platforms[this.platformID].type == 1) {
        this.y += 1;
        this.prevY = this.y;
        this.isOnGround = false;
      }

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
      return;
    }

    //Aim right on ground
    if(state == this.spriteState.aimGroundRight) {
      frames = this.spriteCords.aimGround.length;
      currentFrame = Math.floor((elapsedTime / 40) / frames) % frames;

      ctx.drawImage(this.sprite, this.spriteCords.aimGround[currentFrame][0], this.spriteCords.aimGround[currentFrame][1], this.model.width, this.model.height, this.x, this.y, this.model.width, this.model.height);
      return;
    }

    //Aim left on ground
    if(state == this.spriteState.aimGroundLeft) {
      frames = this.spriteCords.aimGround.length;
      currentFrame = Math.floor((elapsedTime / 40) / frames) % frames;

      ctx.save()
      ctx.translate(canvasWidth, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(this.sprite, this.spriteCords.aimGround[currentFrame][0], this.spriteCords.aimGround[currentFrame][1], this.model.width, this.model.height, this.x - this.model.width + flipOffset, this.y, this.model.width, this.model.height);
      ctx.restore();
      return;
    }


    //Aim righ falling
    if(state == this.spriteState.aimFallingRight) {
      frames = this.spriteCords.aimFalling.length;
      currentFrame = Math.floor((elapsedTime / 40) / frames) % frames;

      ctx.drawImage(this.sprite, this.spriteCords.aimFalling[currentFrame][0], this.spriteCords.aimFalling[currentFrame][1], this.model.width, this.model.height, this.x, this.y, this.model.width, this.model.height);
      return;
    }

    //Aim left falling
    if(state == this.spriteState.aimFallingLeft) {
      frames = this.spriteCords.aimFalling.length;
      currentFrame = Math.floor((elapsedTime / 40) / frames) % frames;

      ctx.save()
      ctx.translate(canvasWidth, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(this.sprite, this.spriteCords.aimFalling[currentFrame][0], this.spriteCords.aimFalling[currentFrame][1], this.model.width, this.model.height, this.x - this.model.width + flipOffset, this.y, this.model.width, this.model.height);
      ctx.restore();
      return;
    }

    //Aim right running
    if(state == this.spriteState.aimWalkingRight) {
      frames = this.spriteCords.aimWalking.length;
      currentFrame = Math.floor((elapsedTime / 40) / frames) % frames;

      ctx.drawImage(this.sprite, this.spriteCords.aimWalking[currentFrame][0], this.spriteCords.aimWalking[currentFrame][1], this.model.width, this.model.height, this.x, this.y, this.model.width, this.model.height);
      return;
    }

    //Aim left running
    if(state == this.spriteState.aimWalkingLeft) {
      frames = this.spriteCords.aimWalking.length;
      currentFrame = Math.floor((elapsedTime / 40) / frames) % frames;

      ctx.save()
      ctx.translate(canvasWidth, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(this.sprite, this.spriteCords.aimWalking[currentFrame][0], this.spriteCords.aimWalking[currentFrame][1], this.model.width, this.model.height, this.x - this.model.width + flipOffset, this.y, this.model.width, this.model.height);
      ctx.restore();
      return;
    }
  };

  this.spriteState = {
    idleRight : 0,
    idleLeft : 1,
    walkingRight : 2,
    walkingLeft : 3,
    jumpRight : 4,
    jumpLeft : 5,
    aimGroundRight : 6,
    aimGroundLeft : 7,
    aimFallingRight : 8,
    aimFallingeft : 9,
    aimWalkingRight : 10,
    aimWalkingLeft : 11
  };

  this.spriteCords = {
    walking: [[6,88],[62,88],[116,88],[172,88]],
    idle: [[2, 2], [56, 2], [110, 2], [110, 2], [56, 2], [2, 2]],
    jumping: [[228, 88]],
    aimGround : [[228,172]],
    aimFalling : [[276,88]],
    aimWalking : [[6,172], [62,172], [116,172], [172,172]]
  };
}
