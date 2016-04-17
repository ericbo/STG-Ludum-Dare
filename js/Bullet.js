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
      // Go through an enemy? Kill it!
      for(var i = 0; i < enemies.length; i++)
        if(this.x < enemies[i].x + enemies[i].model.width &&
           this.prevX >= enemies[i].x + enemies[i].model.width &&
           this.y > enemies[i].y &&
           this.y < enemies[i].y + enemies[i].model.height){
             enemies[i].die()
             //this.die()
             break;
         }
    } else if (this.direction == DIRECTIONS.right) {
      this.prevX = this.x;
      this.x += this.speed;

      // Go through an enemy? Kill it!
      for(var i = 0; i < enemies.length; i++)
        if(this.x >= enemies[i].x + enemies[i].model.width &&
           this.prevX < enemies[i].x + enemies[i].model.width &&
           this.y > enemies[i].y &&
           this.y < enemies[i].y + enemies[i].model.height){
             enemies[i].die()
             //this.die()
             break;
         }
    }
  };

  this.Render = function () {
    ctx.fillStyle = this.model.color;
    ctx.fillRect(this.x - offset, this.y, this.model.width, this.model.height);
  };

  // Remove bullet from stage
  // Must be reworks as it messes with the for loop in framework
  this.die = function(){
    for(var i = 0; i < bullets.length; i++)
      if(bullets[i] == this){
        bullets.splice(i, i+1);
        break;
    }
  }
}
