
RotTops.Game = function (game) {
    this.game;		//	a reference to the currently running game
    this.add;		//	used to add sprites, text, groups, etc
    this.camera;	//	a reference to the game camera
    this.cache;		//	the game cache
    this.input;		//	the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
    this.load;		//	for preloading assets
    this.math;		//	lots of useful common math operations
    this.sound;		//	the sound manager - add a sound, play one, set-up markers, etc
    this.stage;		//	the game stage
    this.time;		//	the clock
    this.world;		//	the game world
    this.physics;	//	the physics manager

    this.pausedText;
    this.tops = null;
    RotTops.currentLevel;
    RotTops.currentLayer;
    RotTops.scoreText;
    RotTops.score;    
    RotTops.map;
    RotTops.levelName;
    RotTops.levelUp = false;
};

RotTops.Game.prototype = {

	create: function () {
        this.game.levelUpSound = this.game.add.audio('sound-levelUp');
        this.game.levelUpSound.play();
        this.physics.startSystem(Phaser.Physics.P2JS);
        this.physics.p2.setImpactEvents(true);
        this.physics.p2.restitution = 0.8;

        this.stage.backgroundColor = '#000000';
        RotTops.currentLevel.create();
        
        RotTops.scoreText = this.add.text(16, 16, "Score: "+RotTops.score, RotTops._fontStyle);
        this.pauseButton = this.add.button(this.world.width - 60, 10,'pauseButton', this.pauseGame, this);
        



	},

	update: function () {
        RotTops.currentLevel.update();
        if ( Tops.isDead ){
            if (RotTops.score > localStorage.getItem("highscore")) {
                localStorage.setItem("highscore", RotTops.score);
            }


            this.quitGame();
        }
	},

	quitGame: function (pointer) {
		this.state.start('MainMenu');

	},
    pauseGame: function(game, parent){
        this.game.paused = true;
        var pausedText = this.add.text(this.world.centerX, this.world.centerY, "GAME PAUSED!\nTap anywhere to continue", { 
            font: "60px Yanone Kaffeesatz", 
            fill: "#0080FF", 
            stroke: "#333", 
            strokeThickness: 5, 
            align: "center" });
        pausedText.anchor.set(0.5,0.5);
        this.input.onDown.add(function(){
            pausedText.destroy();
            this.game.paused = false;
        }, this);
    }
};
