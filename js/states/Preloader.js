Preloader = function(game){
};

Preloader.prototype = {
  preload:function(){
    this.load.image('background','assets/images/background.jpg');
    this.load.image('player','assets/images/player.png');
    this.load.spritesheet('start-btn','assets/images/start-btn.png', 125, 41);
    this.load.spritesheet('retry-btn','assets/images/retry-btn.png', 125, 41);
    this.load.spritesheet('retry-btn','assets/images/instructions-btn.png', 188, 41);
    this.load.image('life','assets/images/life.png');
    this.load.image('nolife','assets/images/nolife.png');

    for (var i = 1; i <= 11; i++)
    {
      this.load.image('bullet' + i, 'assets/bullet' + i + '.png');
    }

  },
  create:function(){
    this.state.start('Menu');
  }
  };
