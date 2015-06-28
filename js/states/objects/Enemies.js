//Clases Grupo de enemigos
Enemies = {};

Enemies.Basic = function (game, player, bullets) {
  this.enemies = game.add.group();

  for (var i = 0; i < 6; i++) {
    this.enemies.add(new Enemy(game, 'enemy1', player, bullets, 1, i*40 + 20, 40));
  }
};

//Mover todos los enemigos hacia abajo
Enemies.Basic.prototype.update = function () {
  for (var i = 0; i < 6 ; i++) {
    this.enemies[i].update();
  }
};

//Crear mas tipos de enemigos
