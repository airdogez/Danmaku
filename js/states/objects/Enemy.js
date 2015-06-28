//Clase Enemigo
//Recibe el contexto, Tipo de enemigo (Sprite), referencia al jugador
//Tipo de balas (Grupo), vida, pos x e y
Enemy = function(game, type, player, bullets, health, x, y){

    this.game = game;
    this.health = health;
    this.player = player;
    this.bullets = bullets;
    this.fireRate = 500;
    this.nextFire = 0;
    this.alive = true;

    this.enemy = game.add.sprite(x, y, 'enemy', 'enemy');

    this.enemy.anchor.set(0.5);

    this.game.physics.enable(this.enemy, Phaser.Physics.ARCADE);
    this.enemy.body.immovable = false;
    this.enemy.body.collideWorldBounds = true;
    this.enemy.body.bounce.setTo(1, 1);

    this.enemy.angle = 90;

    this.game.physics.arcade.velocityFromRotation(this.enemy.rotation,100, this.enemy.body.velocity);

};

Enemy.prototype._kill = function(){
    this.enemy.kill();
    this.alive = false;
};

Enemy.prototype.update = function(){
    if(!this.player.is_dead && this.alive){
            if(this.game.time.now > this.nextFire && 
                this.bullets.countDead()>0){
                this.nextFire = this.game.time.now + this.fireRate;
                var bullet = this.bullets.getFirstDead();
                bullet.reset(this.enemy.x, this.enemy.y);
                bullet.rotation = this.game.physics.arcade.moveToObject(bullet, this.player, 500);
            }
    }

};
