var background = new Image();
background.src = "home-assets/background.png"

var buffer = document.createElement("canvas").getContext("2d");
var canvas = document.querySelector("canvas");
var context = canvas.getContext("2d");

var imgWidth = 0;

var mainLoop = function() {
    var height = document.documentElement.clientHeight;
    var width = document.documentElement.clientWidth;
    var height_width_ratio = 1080/1920;

    var scrollSpeed = 1;

    if (height / width > height_width_ratio) {
    
        context.canvas.height = width * height_width_ratio;
        context.canvas.width  = width;
    
    } else {
    
        context.canvas.height = height;
        context.canvas.width  = Math.round(height / height_width_ratio);
    
    }

    imgWidth -= scrollSpeed;
    if (imgWidth == -context.canvas.width) imgWidth = 0;
    context.drawImage(background, imgWidth, 0, context.canvas.width, context.canvas.height);
    context.drawImage(background, imgWidth + context.canvas.width, 0, context.canvas.width, context.canvas.height);

    menuScreen();

    window.requestAnimationFrame(mainLoop);
    
}

window.addEventListener("load", mainLoop);

function menuScreen() {
    var fline = document.getElementById("overlay1");
    var sline = document.getElementById("overlay2");
    var fbutton = document.getElementById("play");
    var sbutton = document.getElementById("credits");

    fline.style.fontSize = context.canvas.width/50 + "px";
    fline.style.top = context.canvas.height/4.5 + "px";

    sline.style.fontSize = context.canvas.width/15 + "px";
    sline.style.top = context.canvas.height/3.5 + "px";

    fbutton.style.fontSize = context.canvas.width/50 + "px";
    fbutton.style.top = context.canvas.height/2.1 + "px";

    sbutton.style.fontSize = context.canvas.width/50 + "px";
    sbutton.style.top = context.canvas.height/1.8 + "px";

}