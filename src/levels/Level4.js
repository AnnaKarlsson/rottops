RotTops.Level4 = function (game) {
	this.game = game;
};

RotTops.Level4.prototype = {

	preload: function() {
		drop41 = new RotTops.Drop(this.game);
		drop42 = new RotTops.Drop(this.game);
	},

	create: function() {
		map = this.game.add.tilemap('map-level4');
        map.addTilesetImage('basic-tiles', 'tiles');
        map.setCollisionBetween(1, 20);
		layer4 = map.createLayer('Level4');
        layer4.resizeWorld();
        this.game.physics.p2.convertTilemap(map, layer4);

        tops.create(120, 310);
        drop41.create(this.game.world.centerX, this.game.world.centerY);
        drop42.create(1130, 600);
        tops.sprite.checkWorldBounds = true;

        Level5 = new RotTops.Level5(this.game);
        Level5.preload();

        
	},

	update: function() {
		tops.update();
		drop41.update();
		if(!tops.sprite.inWorld){
			RotTops.score += 30;
        	layer4.destroy();
        	tops.kill();
            drop41.kill();
            drop42.kill();
        	RotTops.currentLevel = Level5;
        	RotTops.levelName = 'Level5';
        	this.game.state.start(RotTops.levelName);
		}
	}

};