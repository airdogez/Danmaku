Enemy = function(index,game, player, bullets, health, x, y, key){

    this.game = game;
    this.health = health;
    this.player = player;
    this.bullets = bullets;
    this.bulletSpeed = 200;
    this.fireRate = 5000;
    this.nextFire = 0;
    this.alive = true;

    this.enemy = game.add.sprite(x, y, key); 

    this.enemy.anchor.set(0.5);
    this.enemy.index = index;

    this.game.physics.enable(this.enemy, Phaser.Physics.ARCADE);
    this.enemy.body.immovable = false;
    this.enemy.body.collideWorldBounds = false;
    this.enemy.body.bounce.setTo(1, 1);

    this.enemy.angle = 90;

    this.game.physics.arcade.velocityFromRotation(this.enemy.rotation,100, this.enemy.body.velocity);


};

Enemy.prototype.fire = function (source) {

  if(this.alive){
  if (this.game.time.time < this.nextFire) { return; }

  var x = this.enemy.x;
  var y = this.enemy.y;

  this.bullets.getFirstExists(false).fire(x, y, 90, this.bulletSpeed, 0, 0);

  this.nextFire = this.game.time.time + this.fireRate;
  }

};

Enemy.prototype.update = function(){
};

Enemy.prototype._kill = function () {
  this.enemy.kill();
  this.alive = false;
};
