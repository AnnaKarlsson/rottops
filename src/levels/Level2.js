RotTops.Level2 = function (game) {
	this.game = game;
};

RotTops.Level2.prototype = {

	preload: function() {
		drop21 = new RotTops.Drop(this.game);
		drop22 = new RotTops.Drop(this.game);
	},

	create: function() {
	map = this.game.add.tilemap('map-level2');
        map.addTilesetImage('basic-tiles', 'tiles');
        map.setCollisionBetween(1, 20);
	layer2 = map.createLayer('Level2');
        layer2.resizeWorld();
        this.game.physics.p2.convertTilemap(map, layer2);

        tops.create(1100, 160);
        drop21.create(300, this.game.world.height-130);
        drop22.create(1160,630);
        tops.sprite.checkWorldBounds = true;

        Level3 = new RotTops.Level3(this.game);
        Level3.preload();

        
	},

	update: function() {
		tops.update();
		drop21.update();
		drop22.update();
		if(!tops.sprite.inWorld){
            RotTops.score += 20;
            layer2.destroy();
            tops.kill();
            drop21.kill();
            drop22.kill();
            RotTops.currentLevel = Level3;
            RotTops.levelName = 'Level3';
            this.game.state.start(RotTops.levelName);
		}
	}

};