
RotTops.MainMenu = function (game) {
	this.music = null;
	this.playButton = null;
};

RotTops.MainMenu.prototype = {

	create: function () {

		this.add.sprite(0, 0, 'titlepage');

		this.playButton = this.add.button(this.world.centerX-200, this.world.centerY, 'playButton', this.startGame, this);
		this.playButton.anchor.set(0.5,0.5);

		if (localStorage.getItem("highscore") != null && RotTops.score !== undefined) {
			finishText = this.add.text(this.world.centerX, this.world.centerY-200, "Highscore: " + localStorage.getItem("highscore") + "\n Your score: "+ RotTops.score, RotTops._menuStyle);
			finishText.anchor.set(0.5,0.5);

		};
		if (RotTops.levelName != null) {
			this.restartButton = this.add.button(this.world.centerX+200, this.world.centerY, 'restartButton', this.startNewGame, this);
			this.restartButton.anchor.set(0.5,0.5);
			restartText = this.add.text(this.world.centerX+200, this.world.centerY+200, "Restart", RotTops._menuStyle);
			restartText.anchor.set(0.5,0.5);

			levelText = this.add.text(this.world.centerX-200, this.world.centerY+200, "Current level: " + RotTops.levelName, RotTops._menuStyle);
			levelText.anchor.set(0.5,0.5);
		};


	},

	update: function () {},

	startGame: function (pointer) {
		this.gofull(document.documentElement);
		if(Tops.isDead){
			Tops.isDead = false;
		}else{
			this.startNewGame();
		}
		RotTops.score = 0;
		Tops.life = 3;
		flushSound = this.add.audio('sound-flush');
		flushSound.play();
		this.state.start(RotTops.levelName);

	},

	startNewGame: function (pointer) {
		this.gofull(document.documentElement);
		Tops.rotateSpeed = 20;
		RotTops.score = 0;
		Tops.life = 3;
		if(Tops.isDead){
			Tops.isDead = false;
		}
		RotTops.currentLevel = Level1;
		RotTops.levelName = 'Level1';
		flushSound = this.add.audio('sound-flush');
		flushSound.play();
		this.state.start(RotTops.levelName);

	},
    gofull: function(element) {
        if(element.requestFullscreen) {
            element.requestFullscreen();
    	} else if(element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if(element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if(element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    }
};
