PlayState = {}
PlayState.preload = function() {
  this.game.load.image('background', 'img/background.png');
  this.game.load.json('level:1', 'data/level01');
  this.game.load.image('ground', 'img/ground.png');
    this.game.load.image('grass:8x1', 'img/grass_8x1.png');
    this.game.load.image('grass:6x1', 'img/grass_6x1.png');
    this.game.load.image('grass:4x1', 'img/grass_4x1.png');
    this.game.load.image('grass:2x1', 'img/grass_2x1.png');
    this.game.load.image('grass:1x1', 'img/grass_1x1.png');
};
PlayState.create = function() {
  this.loadLevel(this.game.cache.getJSON('level:1'));
  this.game.add.image(0, 0, 'background');
};
PlayState._loadLevel = function (data) {
  data.platforms.forEach(this._spawnPlatform, this);
};
PlayState._spawnPlatform = function (platform) {
  this.game.add.sprite(platform.x, platform.y, platform.image);
};
window.onLoad = function() {
  let game = new Phaser.Game(960, 600, Phaser.AUTO, 'game');
  game.state.add('play', PlayState);
  game.state.start('play');
};
