RotTops.Level6 = function (game) {
	this.game = game;
};

RotTops.Level6.prototype = {

	preload: function() {
		drop61 = new RotTops.Drop(this.game);
		drop62 = new RotTops.Drop(this.game);
		drop63 = new RotTops.Drop(this.game);
	},

	create: function() {
		map = this.game.add.tilemap('map-level6');
		map.addTilesetImage('basic-tiles', 'tiles');
		map.setCollisionBetween(1, 20);
		layer6 = map.createLayer('Level6');
		layer6.resizeWorld();
		this.game.physics.p2.convertTilemap(map, layer6);

		tops.create(1100, 300);
		drop61.create(1150, 650);
		drop63.create(1000, 100);
		drop62.create(550, this.game.world.height-100);
		tops.sprite.checkWorldBounds = true;

		Level7 = new RotTops.Level7(this.game);
		Level7.preload();

	},

	update: function() {
		tops.update();
		drop61.update();
		drop62.update();
		if(!tops.sprite.inWorld){
			RotTops.score += 40;
			layer6.destroy();
			tops.kill();
            drop61.kill();
            drop62.kill();
            drop63.kill();
			RotTops.currentLevel = Level7;
			RotTops.levelName = 'Level7';
			this.game.state.start(RotTops.levelName);
		}
	}

};