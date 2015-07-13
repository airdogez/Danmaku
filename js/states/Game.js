Game = function(game){
  this.background = null;
  this.foreground = null;

  this.player = null;
  this.cursors = null;
  this.speed = 300;

  this.weapons = [];
  this.weapon = null;
  this.currentWeapon = 0;
  this.weaponName = null;

  this.enemies = [];
  this.enemyBullets = null;
  this.enemyBullets2 = null;
  this.lives = null;
  this.life = 5;

  this.powerups = null;

  this.score = 0;
  this.highScore = 100000;

  this.enemyCount = 20;

  this.level = 0;

  this.enemySprite = 'enemy';

};

Game.prototype ={
  create:function(){

    this.waitTimer = this.time.create(false);
    var fontStyleHeader = {
      font: 'bold 24px Arial',
      fill: '#A00',
      stroke: "#333",
      strokeThickness: 5
    };
    var fontStyleLevel = {
      font: 'bold 30px Arial',
      fill: 'white',
      stroke: 'red',
      strokeThickness: 12
    };
    var fontStyleText = {
      font: '20px Arial',
      fill: '#FFFFFF',
      stroke: "#333",
      strokeThickness: 5,
      wordWrap: true,
      wordWrapWidth: 700
    };

    this.background = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'background');
    this.background.autoScroll(0, -40);

    this.powerups = this.add.group();

    this.weapon = new Weapon.SingleBullet(game);

    this.enemyBullets = new Weapon.SingleBullet(game);

    this.enemySprite = 'enemy';

    this.currentWeapon = 0;

    for (var i = 1; i < this.weapons.length; i++)
    {
      this.weapons[i].visible = false;
    }

    this.player = this.add.sprite(0, 0, 'player');
    this.player.inputEnabled = true;
    this.player.x = game.width/2;
    this.player.y = game.height - this.player.height - 20;
    this.player.health = 5;

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

    this.waitTimerText = this.add.text(500, 75, 'Level: ' + this.level, fontStyleLevel);
    this.waitTimerText.fixedToCamera = true;
    this.waitTimerText.anchor.setTo(0.5, 0.5);

    this.scoreText = this.add.text(500, 35, 'Score:', fontStyleHeader);
    this.scoreText.anchor.setTo(0.5, 0.5);
    this.scoreText.fixedToCamera = true;

    this.scoreTotal = this.add.text(570, 35, this.score, fontStyleText);
    this.scoreTotal.anchor.setTo(0.5, 0.5);
    this.scoreTotal.fixedToCamera = true;

    this.timeText = this.add.text(800, 35, 'Time:', fontStyleHeader);
    this.timeText.fixedToCamera = true;
    this.timeText.anchor.setTo(0.5, 0.5);
    this.timerText = this.add.text(880, 35, '00:00', fontStyleText);
    this.timerText.fixedToCamera = true;
    this.timerText.anchor.setTo(0.5, 0.5);


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

     this.timerPowerups = this.game.time.create(false);
     this.timerPowerups.loop(10000,this.createPowerup,this);
     this.timerPowerups.start();

  },
  update:function(){
    if(this.gameOver) return;

    this.player.body.velocity.set(0);
    for(var i = 0; i < this.enemies.length; i++){
      if(this.enemies[i] === undefined ) return;
      this.enemies[i].fire();
      this.enemies[i].update();
      this.physics.arcade.overlap(this.player,this.enemies[i].enemy, this.hitPlayer, null, this);
      this.physics.arcade.overlap(this.weapon,this.enemies[i].enemy, this.hitEnemy,null,this);
    }
    this.physics.arcade.overlap(this.enemyBullets,this.player, this.hitPlayer,null,this);
    this.physics.arcade.overlap(this.powerups,this.player,this.hitPowerup,null,this);

    if(game.input.mousePointer.isDown){
      this.physics.arcade.moveToPointer(this.player, 1000);
    }

      this.weapon.fire(this.player);

    if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
      this.nextWeapon();
    }

  },
  nextWeapon: function () {

    console.log('Arma cambiada');
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
    this.loseHeart(player);
    if(this.player.health <= 0){
      this.gameOver = true;
      this.player.kill();
      this.player.isDead = true;
      this.state.start('GameOver',true,false);
      return;
    }
    bullet.kill();
  },
  hitEnemy:function(enemy, bullet){
    bullet.kill();
    this.enemies[enemy.index]._kill();
    this.score += 100;
    this.scoreTotal.text = this.score;
    this.enemyCount--;

    if( this.enemyCount === 0){
      this.levelStarted = false;
      this.playTime = false;
      this.startTimerCountdown();
      this.enemyCount = 20;
    }
  },
  hitPowerup: function (player,powerup) {
    if (this.player.health < 5){
      this.gainHeart(player);
    }
    powerup.kill();
  },
  startTimerCountdown: function () {
    this.waitTimer.add(this.totalSecondsWaitTimer * 1000, this.waitingTimerCountdown, this);
    this.waitTimer.onComplete.add(this.endedTimerCountdown,this);

    this.level++;
    this.waitTimerText.text =  'Level: ' + this.level;
    if( this.level  > 2) { 
      this.enemyBullets = new Weapon.Beam(game);
      this.enemySprite = 'enemy2';
     this.background.destroy();
      this.background = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'background2');
      this.background.autoScroll(0, -60);
		this.game.world.sendToBack(this.background);
      
      this.enemyCount = 30;
    }
    else if (this.level > 4) {
      this.enemySprite = 'enemy3';
      this.enemyBullets = new Weapon.ScaleBullet(game);
      this.enemyCount = 35;
      this.background.destroy()
      this.background = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'background3');
      this.background.autoScroll(0, -80);
      this.game.world.sendToBack(this.background);
      
    }
  },
  waitingTimerCountdown: function () {
    
  },
  endedTimerCountdown: function () {
    this.waitTimer.stop();
    this.playTime = true;
    this.waitTimerText.text = '\n' + 'Move or Shoot to start the level ' + this.level + '!';
  },
  gainHeart: function (player) {
    var position = player.health;
    if(position == 5) return;
    this.lives.getChildAt(position).loadTexture('life');
    player.health++;
  },
  loseHeart: function (player) {
    var position = player.health - 1;
    if (position < 0) return;
    this.lives.getChildAt(position).loadTexture('nolife');
    player.health--;
  },
  createEnemy: function () {
    var index = this.enemies.length;
    this.enemies.push(new Enemy(index, this, this.player, this.enemyBullets,3, game.world.randomX,10, this.enemySprite));
  },
  createPowerup: function () {
    this.powerups.add(new Powerup.Life(this,game.world.randomX,20));
  },
  resetData: function () {
    this.background = null;
    this.foreground = null;
    this.timerEnemies = null;

    //this.player = null;
    //  this.weapons = [];
    //  this.weapon = null;

    this.currentWeapon = 0;
    this.weaponName = null;

    this.enemies = [];
    this.enemyBullets = null;
    this.lives = null;
  }
};
