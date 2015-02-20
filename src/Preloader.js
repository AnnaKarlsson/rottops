
RotTops.Preloader = function (game) {
	this.background = null;
	this.preloadBar = null;
	this.ready = false;
};

RotTops.Preloader.prototype = {

	preload: function () {
		//	These are the assets we loaded in Boot.js
		//	A nice sparkly background and a loading progress bar
		this.background = this.add.sprite(0, 0, 'preloaderBackground');
		this.preloadBar = this.add.sprite(0, 0, 'preloaderBar');

		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.
		this.load.setPreloadSprite(this.preloadBar);

		this.load.image('titlepage', 'images/logo.png');
		// Buttons
		this.load.image('playButton', 'images/buttons/Button-Play.png');
		this.load.image('pauseButton', 'images/buttons/Button-Pause-small.png');
		this.load.image('restartButton', 'images/buttons/Button-Reload.png');

		// Sound & Audio
		this.load.audio('sound-flush', 'audio/flush.mp3');
		this.load.audio('sound-levelUp', 'audio/level-up.wav');
		this.load.audio('levelMusic', 'audio/Simplified-Rubber.mp3');

		//	Tilemaps
    	this.load.tilemap('map-level1', 'images/tilemaps/maps/level1.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('map-level2', 'images/tilemaps/maps/level2.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('map-level3', 'images/tilemaps/maps/level3.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('map-level4', 'images/tilemaps/maps/level4.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('map-level5', 'images/tilemaps/maps/level5.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('map-level6', 'images/tilemaps/maps/level6.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('map-level7', 'images/tilemaps/maps/level7.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.image('tiles', 'images/tilemaps/tiles/basic-tiles.png');

		//Objects		
		this.load.image('drop', 'images/objects/drop.png');
		tops = new Tops(this);
        tops.preload();

        RotTops._fontStyle = { 
            font: "35px Yanone Kaffeesatz", 
            fill: "#0080FF", 
            stroke: "#333", 
            strokeThickness: 5, 
            align: "center" };
        RotTops._menuStyle = { 
            font: "50px Yanone Kaffeesatz", 
            fill: "#FFFFFF", 
            stroke: "#333", 
            strokeThickness: 7, 
            align: "center" };
         RotTops._finishStyle = { 
            font: "50px Yanone Kaffeesatz", 
            fill: "#00FF00", 
            stroke: "#333", 
            strokeThickness: 7, 
            align: "center" };

		Level1 = new RotTops.Level1(this);
		Level1.preload();
	},

	create: function () {
		this.preloadBar.cropEnabled = false;
	},

	update: function () {
		if (this.cache.isSoundDecoded('levelMusic') && this.ready == false){
			this.ready = true;
			this.game.music = this.game.add.audio('levelMusic', 1, true);
			this.game.music.play('', 0, 1, true);
			this.state.start('MainMenu');
		}
	}

};
