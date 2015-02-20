RotTops.Drop = function(game) {
	this.game = game;
	this.sprite = null;
	movement = 0;
	Dropmovement = 0;
};

RotTops.Drop.prototype = {

	create: function (x, y) {
		this.sprite = this.game.add.sprite(x, y, 'drop');
		this.sprite.anchor.set(0.5,0.5);
		this.game.physics.p2.enable(this.sprite);
	},
	update: function () {
		this.sprite.body.setZeroVelocity();

		/*
		Dropmovement ++;

        if(Dropmovement%20 == 1){
	        switch(movement){
		        case 0:
		            this.sprite.body.moveLeft(50);
		            movement = 2;
		        case 1:
		        	this.sprite.body.moveRight(50);
		        	movement = 3;
		        case 2:
		            this.sprite.body.moveUp(200);
		            movement = 1;
		        case 3:
		            this.sprite.body.moveDown(200);
			        movement = 0;
		    }
	    }*/
    },
    kill: function () {
    	if(this.sprite.alive){
    		this.sprite.kill();
    	}
    }
};