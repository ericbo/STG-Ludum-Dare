function Billy (x, y) {
  this.x = x;
  this.y = y;
  this.direction = true; //True - right, false - left
  this.start = new Date().getTime();
  this.speed = 5;

  this.model = {
    width: 37,
    height: 52
  };

  this.Update = function() {
    if(this.x != player.x + offset) {
      if(this.x > player.x + offset)
      {
        if(this.x - (player.x + offset) >= this.speed)
          this.x -= this.speed;
        else
          this.x = player.x + offset;
        this.direction = false;
      }
      else
      {
        if((player.x + offset) - this.x >= this.speed)
          this.x += this.speed;
        else
          this.x = player.x + offset;
        this.direction = true;
      }
    }
  }

  this.Render = function() {
    var elapsedTime = new Date().getTime() - this.start;
    var frames = this.spriteCords.length;
    var currentFrame = Math.floor((elapsedTime / 20) / frames) % frames;
    var mid = canvasWidth / 2;
    var dis = mid - this.x;
    var flipOffset = dis + mid;

    if(this.direction)
      ctx.drawImage(LOADED_IMAGES[2], this.spriteCords[currentFrame][0], this.spriteCords[currentFrame][1], this.model.width, this.model.height, this.x - offset, this.y, this.model.width, this.model.height);
    else
      {
        ctx.save()
        ctx.translate(canvasWidth, 0);
        ctx.scale(-1, 1);
        //if(offset == 0 || offset == maxOffset)
          ctx.drawImage(LOADED_IMAGES[2], this.spriteCords[currentFrame][0], this.spriteCords[currentFrame][1], this.model.width, this.model.height, this.x + dis * 2 + offset - this.model.width, this.y, this.model.width, this.model.height);
        //else
          //ctx.drawImage(LOADED_IMAGES[2], this.spriteCords[currentFrame][0], this.spriteCords[currentFrame][1], this.model.width, this.model.height, this.model.x + dis , this.y, this.model.width, this.model.height);
        ctx.restore();
      }
  }

  this.spriteCords = [[0,0],[37,0],[74,0],[74,0],[37,0],[0,0]];
}
