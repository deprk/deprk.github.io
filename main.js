// George Zhang
// 2020-06-22

var RightSprite         = new Image();
RightSprite.src         = "assets/FinnSpriteRight.png";
var LeftSprite          = new Image();
LeftSprite.src          = "assets/FinnSpriteLeft.png";
var background_image    = new Image();
background_image.src    = "assets/game-background.png";
var platform            = new Image();
platform.src            = "assets/platform.png";
var scroll              = new Image();
scroll.src              = "assets/scroll.png";
var directions          = new Image();
directions.src          = "assets/arrows.png";
var home                = new Image();
home.src                = "assets/home.png";
var flower              = new Image();
flower.src              = "assets/flower.png";
var enter              = new Image();
enter.src              = "assets/enter.png";

window.addEventListener("load", function() {
    "use strict";

    const AssetsManager= function() {
        this.tile_set_image = undefined;
    };

    AssetsManager.prototype = {
        constructor: Game.AssetsManager,

        loadTileSetImage:function(url, callback) {

            this.tile_set_image = new Image();
      
            this.tile_set_image.addEventListener("load", function(event) {
      
              callback();
      
            }, { once : true});
      
            this.tile_set_image.src = url;
      
        }
    };

    var keyDownUp = function(event) {
        controller.keyDownUp(event.type, event.keyCode);
    };

    var resize = function(event) {
        display.resize(document.documentElement.clientWidth, document.documentElement.clientHeight, game.world.height / game.world.width);
        display.render();
    };

    var render = function() {
        display.fill(background_image);
        display.drawObject(scroll,0,0,128,245,810,410,150,180);
        display.drawObject(scroll,256,0,128,245,1190,200,150,180);
        display.drawObject(home,0,0,376,244,1500,570,450,300);
        display.drawObject(flower,0,0,232,259,1825,740,50,50);
        display.showText("My Work",880,400,"rgb(29, 45, 128)","2.5vmin gameover");
        display.showText("Contact Me",1270,190,"rgb(34, 16, 74)","2.5vmin gameover");
        
        var frame = game.world.tile_set.frames[game.world.player.frame_value];

        if (game.world.player.direction_x > 0) {
            display.drawObject(RightSprite,
                frame.x, frame.y, frame.width, frame.height,
                game.world.player.x + Math.floor(game.world.player.width * 0.5 - frame.width * 0.5) + frame.offset_x,
                game.world.player.y + frame.offset_y, 
                frame.width * 6, 
                frame.height * 6);
        } else {
            display.drawObject(LeftSprite,
                frame.x, frame.y, frame.width, frame.height,
                game.world.player.x + Math.floor(game.world.player.width * 0.5 - frame.width * 0.5) + frame.offset_x,
                game.world.player.y + frame.offset_y, 
                frame.width * 6, 
                frame.height * 6);
        }

        display.drawObject(platform,60,0,330,140,700,550,350,110);
        display.drawObject(platform,100,140,100,50,1250,350,150,70);
        display.drawObject(platform,200,140,100,50,1100,350,150,70);

        if (!(game.world.player.hasMoved))  {
            display.buffer.globalAlpha = 0.9;
            display.drawObject(directions, 0, 0, 611, 461, game.world.player.x + 55, game.world.player.y - 40, 125,90);
            display.buffer.globalAlpha = 1; 
        }

        if (game.world.player.x > 700 && game.world.player.x < 1050 && game.world.player.y == 450) {
            //display.drawObject(enter,0,0,470,450,830,650,100,75);
            display.showText("Press ENTER to see some of my work.", game.world.width / 2, 1000,"black","3.75vmin pixelText");
        } else if (game.world.player.x > 1100 && game.world.player.x < 1500 && game.world.player.y == 250) {
            display.showText("Press ENTER to get in touch!", game.world.width / 2, 1000,"black","3.75vmin pixelText");
        } else if (game.world.player.x < 1300) {
            display.showText("Use the portals to navigate the website!", game.world.width / 2, 1000,"black","3.75vmin pixelText");
        } else if (game.world.player.x > 1300) {
            display.showText("Go home? (Press ENTER)", game.world.width / 2, 1000,"black","3.75vmin pixelText");
            //display.drawObject(enter)
        }

        
        

        display.render();
    };

    var update = function() {

        if (controller.left.active ) { game.world.player.moveLeft ();                                  }
        if (controller.right.active) { game.world.player.moveRight();                                  }
        if (controller.up.active   ) { game.world.player.jump();      controller.up.active = false;    }
        if (controller.enter.active) { game.world.player.navigate();  controller.enter.active = false; }
    
        game.update();
    
    };

    var controller          = new Controller();
    var display             = new Display(document.querySelector("canvas"));
    var game                = new Game();
    var engine              = new Engine(1000/30, render, update);

    display.buffer.canvas.height = game.world.height;
    display.buffer.canvas.width  = game.world.width;
    display.buffer.imageSmoothingEnabled = false;


    window.addEventListener("keydown", keyDownUp);
    window.addEventListener("keyup",   keyDownUp);
    window.addEventListener("resize",  resize);

    resize();
    engine.start();
});