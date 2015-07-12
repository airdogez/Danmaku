Menu = function(game){
};

Menu.prototype ={
  create:function(){
    this.bg = this.add.tileSprite(0,0,game.width,game.height,'background');
    this.logo = this.add.sprite(0,0,'logo');
    this.instructions = this.add.button(0,0,'instructions-btn',this.instructionsBtn,this,1,0,2);
    this.start = this.add.button(0,0,'start-btn', this.startGame, this, 1,0,2);
    this.logo.anchor.setTo(0.5,0.5);
    this.logo.x = game.width/2;
    this.logo.y = game.height/2 - this.logo.height;
    this.instructions.x = game.width/2 + 120;
    this.instructions.y = this.game.height/2 + this.instructions.height;
    this.start.x = game.width/2 - 260;
    this.start.y = this.game.height/2 + this.start.height;
  },
  startGame:function(){
    this.state.start('Game',true, false);
  },
  instructionsBtn: function () {
    this.state.start('Instructions',true, false);
  }
};
