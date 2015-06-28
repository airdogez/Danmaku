//Coleccion con todas las clases de enemigos
var Enemy = {};

//Enemigo basico, se mueve en linea recta.
Enemy.Basic = function(game, player, bullets, health, x, y){

    this.game = game;
    this.health = health;
    this.player = player;
    this.bullets = bullets;
    this.bulletSpeed = 100;
    this.fireRate = 500;
    this.nextFire = 0;
    this.alive = true;

    this.enemy = game.add.sprite(x, y, 'enemy', 'enemy');

    this.enemy.anchor.set(0.5);

    this.game.physics.enable(this.enemy, Phaser.Physics.ARCADE);
    this.enemy.body.immovable = false;
    this.enemy.body.collideWorldBounds = false;
    this.enemy.body.bounce.setTo(1, 1);

    this.enemy.angle = 90;

    this.game.physics.arcade.velocityFromRotation(this.enemy.rotation,100, this.enemy.body.velocity);

};
Enemy.Basic.prototype = Object.create(Phaser.Group.prototype);
Enemy.Basic.prototype.constructor = Enemy.Basic;

Enemy.Basic.prototype.fire = function (source) {

  if (this.game.time.time < this.nextFire) { return; }

  var x = source.x + 10;
  var y = source.y + 10;

  this.getFirstExists(false).fire(x, y, -90, this.bulletSpeed, 0, 0);

  this.nextFire = this.game.time.time + this.fireRate;

};

Enemy.Basic.prototype.update = function(){
  y++;
};

//Enemigo que se mueve en Seno
//Enemigo que se mueve en Coseno
//enemigo que se mueve de un borde a otro
//etc...
