Game = function(game){
  this.background = null;
  this.foreground = null;

  this.player = null;
  this.cursors = null;
  this.speed = 300;

  this.weapons = [];
  this.currentWeapon = 0;
  this.weaponName = null;

  this.enemies = [];
  this.enemyBullets = null;
  this.lives = null;
  this.life = 5;

  this.score = 0;
  this.highScore = 100000;

};

Game.prototype ={
  create:function(){
    this.background = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'background');
    this.background.autoScroll(0, -40);

    this.weapons.push(new Weapon.SingleBullet(game));
    this.weapons.push(new Weapon.FrontAndBack(game));
    this.weapons.push(new Weapon.ThreeWay(game));
    this.weapons.push(new Weapon.EightWay(game));
    this.weapons.push(new Weapon.ScatterShot(game));
    this.weapons.push(new Weapon.Beam(game));
    this.weapons.push(new Weapon.SplitShot(game));
    this.weapons.push(new Weapon.Pattern(game));
    this.weapons.push(new Weapon.Rockets(game));
    this.weapons.push(new Weapon.ScaleBullet(game));
    this.weapons.push(new Weapon.Combo1(game));
    this.weapons.push(new Weapon.Combo2(game));

    this.enemyBullets = new Weapon.SingleBullet(game);

    this.currentWeapon = 0;

    for (var i = 1; i < this.weapons.length; i++)
    {
      this.weapons[i].visible = false;
    }

    this.player = this.add.sprite(0, 0, 'player');
    this.player.inputEnabled = true;
    this.player.x = game.width/2;
    this.player.y = game.height - this.player.height - 20;

    var fontStyle = {font:'bold 24px Arial', fill:'#A00', stroke: "#333", strokeThickness: 5};

    this.lives = this.add.group();

    for (i = 0; i < 5; i++) {
      this.heart = this.add.sprite(0,0,'life');
      this.heart.x = 50+ 20*i + 5;
      this.heart.y = 35;
      this.heart.width = this.heart.height = 20;
      this.heart.anchor.setTo(0.5,0.5);
      this.lives.add(this.heart);
    }
    this.lives.fixedToCamera = true;

    this.physics.arcade.enable(this.player);

    this.player.body.collideWorldBounds = true;
    this.player.anchor.setTo(0.5,0.5);

    /*
     *this.foreground = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'foreground');
     *this.foreground.autoScroll(-60, 0);
     */

     //  Cursor keys to fly + space to fire
     this.cursors = this.input.keyboard.createCursorKeys();

     this.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);

     this.timerEnemies = this.game.time.create(false);
     this.timerEnemies.loop(2000,this.createEnemy,this);
     this.timerEnemies.start();

  },
  update:function(){
    this.player.body.velocity.set(0);
    for(var i = 0; i < this.enemies.length; i++){
      this.enemies[i].fire(game);
    }

    if(game.input.mousePointer.isDown){
      this.physics.arcade.moveToPointer(this.player, 600);
      if(Phaser.Rectangle.contains(this.player.body,game.input.x,game.input.y)){
        this.player.body.velocity.setTo(0,0);
      }
    } else{
      this.player.body.velocity.setTo(0,0);
    }

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

    if (game.input.activePointer.isDown)
    {
      this.weapons[this.currentWeapon].fire(this.player);
    }
    if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
      this.nextWeapon();
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
  },
  hitPlayer:function(player,bullet){
  },
  hitEnemy:function(enemy, bullet){
  },
  fire:function(){
  },
  loseHeart: function (player) {
  },
  createEnemy: function () {
    this.enemies.push(new Enemy.Basic(this, this.player, this.enemyBullets,3,game.width/2,10));
  },
  resetData: function () {
  }
};
