// George Zhang
// 2020-06-24

const Game = function() {
    this.world = new Game.World();

    this.update = function() {
        this.world.update();
    };

};

Game.prototype = {
    constructor: Game,
};

Game.World = function(friction = 0.85, gravity = 6) {
    this.tile_set = new Game.TileSet(8,16);

    this.friction = friction;
    this.gravity = gravity;

    this.player = new Game.Player(100,100);

    this.height   = 1080;
    this.width    = 1920;
};

Game.World.prototype = {
    constructor: Game.World,

    update:function() {
        this.player.updatePosition(this.gravity, this.friction);
        this.player.updateAnimation();
        this.collideObject(this.player);
    },

    collideObject:function(object) {
        if (object.x < -132) { object.x = 1800; }
        else if (object.x + object.width > this.width) { object.x = -132 }
        if (object.y < 0) { object.y = 0; object.velocity_y = 0; object.oldpos = 0; }
        else if (object.y + object.height > this.height - 275) { object.jumping = false; object.y = this.height - object.height - 275; object.velocity_y = 0; }

        if (object.x > 575 && object.x < 900 && object.y >= 450 && object.y_old <= 450) {
            object.y = 450; 
            object.velocity_y = 0;
            object.jumping = false;
        }
        if (object.x > 975 && object.x < 1300 && object.y >= 250 && object.y_old <= 250) {
            object.y = 250; 
            object.velocity_y = 0;
            object.jumping = false;
        }
        if (object.x > 1425 && object.x < 1775 && object.y >= 420 && object.y_old <= 420) {
            object.y = 420; 
            object.velocity_y = 0;
            object.jumping = false;
        }
    }
};

Game.Player = function(x,y) {
    Game.Animator.call(this, Game.Player.prototype.frame_sets["idle-left"], 10);

    this.jumping = true;
    this.hasMoved = false;
    this.direction_x = 1;
    this.velocity_x = 0;
    this.velocity_y = 0;
    this.x          = 250;
    this.y          = 725;
    this.y_old      = 200;
    this.height     = 80;
    this.width      = 80;

};

Game.Player.prototype = {

    constructor: Game.Player,

    frame_sets: {
        "idle-right" : [0,1,2,3,4,5,6,7,8],
        "move-right" : [9,10,11,12,13,14],
        "jump-right" : [15],
        "idle-left" : [16,17,18,19,20,21,22,23,24],
        "move-left" : [25,26,27,28,29,30],
        "jump-left" : [31]
    },

    jump: function() {

        if (!this.jumping) {
          this.jumping     = true;
          this.velocity_y -= 100;
    
        }
    
    },
    
    moveLeft: function() {

    this.direction_x = -1;
    this.velocity_x -= 2;
    },

    moveRight: function(frame_set) {

    this.direction_x = 1;
    this.velocity_x += 2;

    },

    navigate: function() {
        if (this.x > 700 && this.x < 1050 && this.y == 450) {
            window.location.href="About.html";
        } else if (this.x > 1100 && this.x < 1500 && this.y == 250) {
            window.location.href="Contact.html";
        } else if (this.x > 1300) {
            window.location.href="Home.html";
        }
    },

    updateAnimation:function() {

        if (this.jumping) {
    
          if (this.direction_x < 0) this.changeFrameSet(this.frame_sets["jump-left"]);
          else this.changeFrameSet(this.frame_sets["jump-right"]);
    
        } else if (this.direction_x < 0) {
    
          if (this.velocity_x < -0.1) this.changeFrameSet(this.frame_sets["move-left"], 5);
          else this.changeFrameSet(this.frame_sets["idle-left"]);
    
        } else if (this.direction_x > 0) {
    
          if (this.velocity_x > 0.1) this.changeFrameSet(this.frame_sets["move-right"], 5);
          else this.changeFrameSet(this.frame_sets["idle-right"]);
    
        }
    
        this.animate();
    
      },

    updatePosition:function(gravity, friction) {
        this.y_old = this.y;
        this.velocity_y += gravity;
        this.x    += this.velocity_x;
        this.y    += this.velocity_y;
    
        this.velocity_x *= friction;
        this.velocity_y *= friction;

        if (this.x > 450) {
            this.hasMoved = true;
        }
    }
};

Game.Animator = function(frame_set, delay) {

    this.count       = 0;
    this.delay       = (delay >= 1) ? delay : 1;
    this.frame_set   = frame_set;
    this.frame_index = 0;
    this.frame_value = frame_set[0];
  
};

Game.Animator.prototype = {
  
    constructor:Game.Animator,
  
    animate:function() {
  
        this.count ++;
    
        while(this.count > this.delay) {
    
            this.count -= this.delay;
    
            this.frame_index = (this.frame_index < this.frame_set.length - 1) ? this.frame_index + 1 : 0;
    
            this.frame_value = this.frame_set[this.frame_index];
    
        }
  
    },
  
    changeFrameSet(frame_set, delay = 10, frame_index = 0) {
  
        if (this.frame_set === frame_set) { return; }
    
        this.count       = 0;
        this.delay       = delay;
        this.frame_set   = frame_set;
        this.frame_index = frame_index;
        this.frame_value = frame_set[frame_index];
  
    }
  
};

Object.assign(Game.Player.prototype, Game.Animator.prototype);
Game.Player.prototype.constructor = Game.Player;

Game.TileSet = function(columns, tile_size) {
    this.columns    = columns;
    this.tile_size  = tile_size;
  
    let f = Game.TileSet.Frame;
  
    this.frames = [new f(0, 0, 32, 32, 0, -2),new f(32, 0, 32, 32, 0, -2),new f(64, 0, 32, 32, 0, -2),new f(96, 0, 32, 32, 0, -2),new f(128, 0, 32, 32, 0, -2),new f(160, 0, 32, 32, 0, -2),new f(192, 0, 32, 32, 0, -2),new f(224, 0, 32, 32, 0, -2),new f(256, 0, 32, 32, 0, -2),
                   new f(288, 0, 32, 32, 0, -2),new f(320, 0, 32, 32, 0, -2),new f(352, 0, 32, 32, 0, -2),new f(384, 0, 32, 32, 0, -2),new f(416, 0, 32, 32, 0, -2),new f(448, 0, 32, 32, 0, -2),
                   new f(480, 0, 32, 32, 0, -2),
                   new f(864, 0, 32, 32, 0, -2),new f(832, 0, 32, 32, 0, -2),new f(800, 0, 32, 32, 0, -2),new f(768, 0, 32, 32, 0, -2),new f(736, 0, 32, 32, 0, -2),new f(704, 0, 32, 32, 0, -2),new f(672, 0, 32, 32, 0, -2),new f(640, 0, 32, 32, 0, -2),new f(608, 0, 32, 32, 0, -2),
                   new f(576, 0, 32, 32, 0, -2),new f(544, 0, 32, 32, 0, -2),new f(512, 0, 32, 32, 0, -2),new f(480, 0, 32, 32, 0, -2),new f(448, 0, 32, 32, 0, -2),new f(416, 0, 32, 32, 0, -2),
                   new f(384, 0, 32, 32, 0, -2)];
}

Game.TileSet.Frame = function(x, y, width, height, offset_x, offset_y) {
    this.x        = x;
    this.y        = y;
    this.width    = width;
    this.height   = height;
    this.offset_x = offset_x;
    this.offset_y = offset_y;

};

Game.TileSet.Frame.prototype = { constructor: Game.TileSet.Frame };
