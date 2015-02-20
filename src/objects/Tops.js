Tops = function(game) {
	this.game = game;
	this.sprite = null;
	this.cursors = null;
    up = false;
    down = false;
    left = false;
    right = false;
    this.joystick;
    Tops.isDead = false;
    Tops.life;
    this.speed = 7;
    Tops.rotateSpeed = 20;
    Tops.isRotateClock = true;
};

Tops.prototype = {
	preload: function () {
		this.game.load.image('tops', 'images/objects/tops-130.png');
		this.game.load.audio('crash', 'audio/crash_metal.mp3');
        this.game.load.audio('collect', 'audio/collect.wav');
        Tops.setX = 0;
        Tops.setY = 0;

	},
	create: function (x, y) {
        this.game.crashSound = this.game.add.audio('crash');
        this.game.collectSound = this.game.add.audio('collect');
		this.sprite = this.game.add.sprite(x, y, 'tops');
        this.sprite.anchor.set(0.5,0.5);
        
        //  Enable if for physics. This creates a default rectangular body.
        this.game.physics.p2.enable(this.sprite);
        this.game.camera.follow(this.sprite);
        this.sprite.body.onBeginContact.add(this.hit, this);
        switch (Tops.life){
            case 3:
                this.sprite.body.sprite.alpha = 1;
                break;
            case 2:
                this.sprite.body.sprite.alpha = 0.55;
                break;
            case 1:
                this.sprite.body.sprite.alpha = 0.10;
                break;
        }

        this.cursors = this.game.input.keyboard.createCursorKeys();

        this.joystick = new VirtualJoystick({
            mouseSupport    : true,
            limitStickTravel: true,
            stickRadius : 70
        });




	},
	update: function () {
		this.rotateTops();
        this.sprite.body.setZeroVelocity();

        if (this.cursors.left.isDown){
            this.sprite.body.moveLeft(400);
        }else if (this.cursors.right.isDown){
            this.sprite.body.moveRight(400);
        }if (this.cursors.up.isDown){
            this.sprite.body.moveUp(400);
        }else if (this.cursors.down.isDown){
            this.sprite.body.moveDown(400);
        }

        if(this.joystick.right() ){
            this.sprite.body.moveRight(Math.abs(this.joystick.deltaX())*this.speed);    
        }
        if( this.joystick.left() ){
            this.sprite.body.moveLeft(Math.abs(this.joystick.deltaX())*this.speed);     
        }
        if( this.joystick.up() ){
            this.sprite.body.moveUp(Math.abs(this.joystick.deltaY())*this.speed);      
        }
        if( this.joystick.down() ){
            this.sprite.body.moveDown(Math.abs(this.joystick.deltaY())*this.speed);
        }

	},
	hit: function(body, shapeA, shapeB, equation) {
        if (body.sprite == null){
            // Tops has collide with pipe.
            this.game.crashSound.play();
            Tops.life--;
            if(Tops.life < 1){
                Tops.isDead = true;
            }else{
                this.sprite.body.sprite.alpha -= 0.45;
            }
        }
        else {
            //Tops collecting drop
            body.sprite.kill();
            this.game.collectSound.play();
            RotTops.score += 10;
            RotTops.scoreText.setText("Score: "+RotTops.score);
            if(this.sprite.body.sprite.alpha < 1){
                Tops.life ++;
                this.sprite.body.sprite.alpha += 0.45;
            }
        }
        
    },
    collectDrop: function(player, dishdrop) {
        dishdrop.kill();
        player.sprite.alpha += 0.4;
    },
    rotateTops: function(){
        if (!Tops.isRotateClock) {
            this.sprite.body.rotateLeft(Tops.rotateSpeed);
        }else{
            this.sprite.body.rotateRight(Tops.rotateSpeed);
        }
        
    },
    kill: function(){
        if(this.sprite.alive){
            this.sprite.kill();
        }
    }
};