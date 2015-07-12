game = new Phaser.Game('100%', '100%', Phaser.AUTO);
game.state.add('Boost', Boost);
game.state.add('Preloader', Preloader);
game.state.add('Menu', Menu);
game.state.add('Instructions', Instructions);
game.state.add('GameOver', GameOver);
game.state.add('Game', Game);
game.state.start('Boost');
