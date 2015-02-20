RotTops.Level5 = function (game) {
	this.game = game;
};

RotTops.Level5.prototype = {

	preload: function() {
		drop51 = new RotTops.Drop(this.game);
	},

	create: function() {
		map = this.game.add.tilemap('map-level5');
        map.addTilesetImage('basic-tiles', 'tiles');
        map.setCollisionBetween(1, 20);
		layer5 = map.createLayer('Level5');
        layer5.resizeWorld();
        this.game.physics.p2.convertTilemap(map, layer5);

        tops.create(200, 600);
        drop51.create(1150, this.game.world.centerY);
        tops.sprite.checkWorldBounds = true;

        Level6 = new RotTops.Level6(this.game);
        Level6.preload();

        
	},

	update: function() {
		tops.update();
		drop51.update();
		if(!tops.sprite.inWorld){
			RotTops.score += 40;
			layer5.destroy();
			tops.kill();
            drop51.kill();
        	RotTops.currentLevel = Level6;
        	RotTops.levelName = 'Level6';
        	this.game.state.start(RotTops.levelName);
		}
	}

};