RotTops.Level1 = function (game) {
	this.game = game;
};

RotTops.Level1.prototype = {

	preload: function() {
		drop1 = new RotTops.Drop(this.game);
		drop2 = new RotTops.Drop(this.game);
	},

	create: function() {
		this.life = 3;
		map = this.game.add.tilemap('map-level1');
        map.addTilesetImage('basic-tiles', 'tiles');
        map.setCollisionBetween(1, 20);
		layer1 = map.createLayer('Level1');
		// When colliding with specific tile
		//map.setTileIndexCallback(255, this.awesomeEvent, this);
        layer1.resizeWorld();
        this.game.physics.p2.convertTilemap(map, layer1);

        tops.create(110, this.game.world.height-130);

        drop1.create(300, this.game.world.height-130);
        drop2.create(100,200);
        tops.sprite.checkWorldBounds = true;

        Level2 = new RotTops.Level2(this.game);
		Level2.preload();

	},

	update: function() {
		tops.update();
		drop1.update();
		drop2.update();
		if(!tops.sprite.inWorld){
			RotTops.score += 20;
			layer1.destroy();
			drop1.kill();
			drop2.kill();
			tops.kill();
        	RotTops.currentLevel = Level2;
        	RotTops.levelName = 'Level2';
        	this.game.state.start(RotTops.levelName);
		}
	}

};