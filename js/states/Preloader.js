Preloader = function(game){
};

Preloader.prototype = {
  preload:function(){
    this.load.image('background','assets/images/background.jpg');
    this.load.image('background2','assets/images/background2.png');
    this.load.image('background3','assets/images/background3.png');
    this.load.image('player','assets/images/player.png');
    this.load.spritesheet('start-btn','assets/images/start-btn.png', 125, 41);
    this.load.spritesheet('retry-btn','assets/images/retry-btn.png', 125, 41);
    this.load.spritesheet('instructions-btn','assets/images/instructions-btn.png', 188, 41);
    this.load.image('life','assets/images/life.png');
    this.load.image('nolife','assets/images/nolife.png');
    this.load.image('logo','assets/images/logo.png');
    this.load.image('enemy','assets/images/enemy.png');
    this.load.image('enemy2','assets/images/enemy2.png');
    this.load.image('enemy3','assets/images/enemy3.png');
    this.load.image('lifeup','assets/images/lifeup.png');

    for (var i = 1; i <= 11; i++)
    {
      this.load.image('bullet' + i, 'assets/images/bullet' + i + '.png');
    }

  },
  create:function(){
    this.state.start('Menu');
  }
  };
