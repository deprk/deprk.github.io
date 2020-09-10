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
    var height = context.canvas.height;
    var width = context.canvas.width;
    var sideEmptySpace = (document.documentElement.clientWidth - width) / 2

    var fline = document.getElementById("overlay1");
    var sline = document.getElementById("overlay2");
    var fbutton = document.getElementById("play");
    var sbutton = document.getElementById("credits");
    var links = document.getElementById("media");

    links.style.fontSize = width/45 + "px";
    links.style.top = height/1.1 + "px";
    links.style.left = width/1.2 + sideEmptySpace + "px";

    fline.style.fontSize = width/50 + "px";
    fline.style.top = height/4.5 + "px";
    fline.style.left = width/3 + sideEmptySpace + "px";

    sline.style.fontSize = width/15 + "px";
    sline.style.top = height/3.5 + "px";

    fbutton.style.fontSize = width/50 + "px";
    fbutton.style.top = height/2.1 + "px";

    sbutton.style.fontSize = width/50 + "px";
    sbutton.style.top = height/1.8 + "px";

}