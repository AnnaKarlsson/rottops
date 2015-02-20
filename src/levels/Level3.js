RotTops.Level3 = function (game) {
	this.game = game;
};

RotTops.Level3.prototype = {

	preload: function() {
		drop31 = new RotTops.Drop(this.game);
		drop32 = new RotTops.Drop(this.game);
	},

	create: function() {
		map = this.game.add.tilemap('map-level3');
        map.addTilesetImage('basic-tiles', 'tiles');
        map.setCollisionBetween(1, 20);
		layer3 = map.createLayer('Level3');
        layer3.resizeWorld();
        this.game.physics.p2.convertTilemap(map, layer3);

        tops.create(1000, 430);
        drop31.create(550, this.game.world.height-100);
        drop32.create(1000, 100);
        tops.sprite.checkWorldBounds = true;

        Level4 = new RotTops.Level4(this.game);
        Level4.preload();

        
	},

	update: function() {
		tops.update();
		drop31.update();
		if(!tops.sprite.inWorld){
			RotTops.score += 30;
        	layer3.destroy();
        	tops.kill();
            drop31.kill();
            drop32.kill();
        	RotTops.currentLevel = Level4;
        	RotTops.levelName = 'Level4';
        	this.game.state.start(RotTops.levelName);
		}
	}

};