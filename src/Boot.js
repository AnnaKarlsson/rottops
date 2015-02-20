RotTops = {
    /* Here we've just got some global level vars that persist regardless of State swaps */
    music: null,
    highscore : 0,
    /* Your game can check RotTops.orientated in internal loops to know if 
    * it should pause or not */
    orientated: false

};

RotTops.Boot = function (game) {};

RotTops.Boot.prototype = {

    init: function () {

        this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = true;
        if (this.game.device.desktop)
        {
        
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.setMinMax(640, 360, 1280, 720);
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;
            this.game.scale.setScreenSize(true);
            this.game.scale.refresh();
        }
        else
        {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.setMinMax(512, 288, 1280, 720);
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.scale.forceOrientation(true, false);
            this.scale.setResizeCallback(this.gameResized, this);
            this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
            this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
            this.scale.setScreenSize(true);
            this.scale.refresh();

        }
    },

    preload: function () {
        this.load.image('preloaderBackground', 'images/preloadBG2.png');
        this.load.image('preloaderBar', 'images/preloadBar2.png');
    },
    create: function () {
        this.state.start('Preloader');
    },

    gameResized: function (width, height) {
        this.scale.refresh();
        //  This could be handy if you need to do any extra processing if the game resizes.
        //  swapping orientation on a device or resizing the browser window.
        //  if you use a ScaleMode of RESIZE and place it inside your main game state.
    },
    enterIncorrectOrientation: function () {
        RotTops.orientated = false;
        document.getElementById('orientation').style.display = 'block';
    },
    leaveIncorrectOrientation: function () {
        RotTops.orientated = true;
        document.getElementById('orientation').style.display = 'none';
        this.scale.setScreenSize(true);
        this.scale.refresh();
    }
};