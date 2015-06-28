Game = function(game){
  this.background = null;
  this.foreground = null;

  this.player = null;
  this.cursors = null;
  this.speed = 300;

  this.weapons = [];
  this.currentWeapon = 0;
  this.weaponName = null;

  this.enemies = null;
  this.lives = null;
  this.life = 5;

};

Game.prototype ={
  create:function(){
    this.background = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'background');
    this.background.autoScroll(0, -40);

    this.weapons.push(new Weapon.SingleBullet(this.game));
    this.weapons.push(new Weapon.FrontAndBack(this.game));
    this.weapons.push(new Weapon.ThreeWay(this.game));
    this.weapons.push(new Weapon.EightWay(this.game));
    this.weapons.push(new Weapon.ScatterShot(this.game));
    this.weapons.push(new Weapon.Beam(this.game));
    this.weapons.push(new Weapon.SplitShot(this.game));
    this.weapons.push(new Weapon.Pattern(this.game));
    this.weapons.push(new Weapon.Rockets(this.game));
    this.weapons.push(new Weapon.ScaleBullet(this.game));
    this.weapons.push(new Weapon.Combo1(this.game));
    this.weapons.push(new Weapon.Combo2(this.game));

    this.currentWeapon = 0;

    for (var i = 1; i < this.weapons.length; i++)
    {
      this.weapons[i].visible = false;
    }

    this.player = this.add.sprite(200, 32, 'player');

    var fontStyle = {font:'bold 24px Arial', fill:'#A00', stroke: "#333", strokeThickness: 5};

    this.lives = this.add.group();

    for (i = 0; i < 5; i++) {
      this.heart = this.add.sprite(0,0,'life');
      this.heart.x = 155 + 40*i;
      this.heart.y = 35;
      this.heart.width = this.heart.height = 30;
      this.heart.anchor.setTo(0.5,0.5);
      this.lives.add(this.heart);
    }
    this.lives.fixedToCamera = true;
    this.enemies = this.add.group();

    this.physics.arcade.enable(this.player);

    this.player.body.collideWorldBounds = true;

    /*
     *this.foreground = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'foreground');
     *this.foreground.autoScroll(-60, 0);
     */

     //  Cursor keys to fly + space to fire
     this.cursors = this.input.keyboard.createCursorKeys();

     this.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);

  },
  update:function(){
    this.player.body.velocity.set(0);
    this.generateEnemy();

    if (this.cursors.left.isDown)
    {
      this.player.body.velocity.x = -this.speed;
    }
    else if (this.cursors.right.isDown)
    {
      this.player.body.velocity.x = this.speed;
    }

    if (this.cursors.up.isDown)
    {
      this.player.body.velocity.y = -this.speed;
    }
    else if (this.cursors.down.isDown)
    {
      this.player.body.velocity.y = this.speed;
    }

    if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
    {
      this.weapons[this.currentWeapon].fire(this.player);
    }
  },
  nextWeapon: function () {

    //  Tidy-up the current weapon
    if (this.currentWeapon > 9)
    {
      this.weapons[this.currentWeapon].reset();
    }
    else
    {
      this.weapons[this.currentWeapon].visible = false;
      this.weapons[this.currentWeapon].callAll('reset', null, 0, 0);
      this.weapons[this.currentWeapon].setAll('exists', false);
    }

    //  Activate the new one
    this.currentWeapon++;

    if (this.currentWeapon === this.weapons.length)
    {
      this.currentWeapon = 0;
    }

    this.weapons[this.currentWeapon].visible = true;

    this.weaponName.text = this.weapons[this.currentWeapon].name;

  },
  hitPlayer:function(tank ,bullet){
  },
  hitEnemy:function(tank, bullet){
  },
  fire:function(){
  },
  loseHeart: function (player) {
  },
  generateEnemy: function () {
  },
  resetData: function () {
  }
};
