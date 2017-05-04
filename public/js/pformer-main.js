PlayState = {}
PlayState.preload = function() {
  this.game.load.image('background', 'img/background.png')
  this.game.load.json('level:1', 'data/level01')
}
PlayState.create = function() {
  tthis.loadLevel(this.game.cache.getJSON('level:1'))
}
PlayState._loadLevel = function (datd) {
  console.log(data)
}
window.onLoad = function() {
  let game = newPhaser.Game(960, 600, Phaser.AUTO, 'game')
  game.state.add('play', PlayState)
  game.state.start('play')
}
