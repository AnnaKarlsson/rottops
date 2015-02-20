RotTops.Level7 = function (game) {
	this.game = game;
};

RotTops.Level7.prototype = {

	preload: function() {
		drop71 = new RotTops.Drop(this.game);
	},

	create: function() {
		map = this.game.add.tilemap('map-level7');
		map.addTilesetImage('basic-tiles', 'tiles');
		map.setCollisionBetween(1, 20);
		layer7 = map.createLayer('Level7');
		layer7.resizeWorld();
		this.game.physics.p2.convertTilemap(map, layer7);

		tops.create(120, 120);
		drop71.create(500, 300);
		tops.sprite.checkWorldBounds = true;

	},

	update: function() {
		tops.update();
		if(!tops.sprite.inWorld){
			RotTops.score += 40;
			layer7.destroy();
			tops.kill();
			drop71.kill();
			this.finishGame();
		}
	},

	finishGame: function(game, parent){
        this.game.paused = true;
        var finishText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "WINNER!!!\nTap anywhere to turn the other way.", { 
            font: "60px Yanone Kaffeesatz", 
            fill: "#0080FF", 
            stroke: "#333", 
            strokeThickness: 5, 
            align: "center" });
        finishText.anchor.set(0.5,0.5);
        this.game.input.onDown.add(function(){
            finishText.destroy();
            Tops.isRotateClock = false;
            this.game.paused = false;
            RotTops.currentLevel = Level1;
			RotTops.levelName = 'Level1';
			this.game.state.start(RotTops.levelName);
        }, this);
    },

};