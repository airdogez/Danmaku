var Powerup = {};

Powerup.Life = function (game,x,y) {
  Phaser.Sprite.call(this,game,x,y,'lifeup');

  this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;

  this.game.physics.arcade.enableBody(this);
  this.anchor.set(0.5);

  this.checkWorldBounds = true;
  this.outOfBoundsKill = true;
  this.exists = true;

  this.body.velocity.y = 300;

  return this;
};

Powerup.Life.prototype = Object.create(Phaser.Sprite.prototype);
Powerup.Life.prototype.constructor = Powerup.Life;

Powerup.Life.prototype.update = function () {

};

