// Based on a tutorial at https://www.programmersought.com/article/9398568721/

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var x =document.documentElement.clientWidth;
var y =document.documentElement.clientHeight;
canvas.height = y;
canvas.width = x - x/40;

var img = new Image();
img.src = "assets/star.png";
var num = x*y / 20000;
var arrStar = [];
document.body.style.backgroundColor = "black";

function Star() {
    this.x;
    this.y;
    this.start;
    this.xsp;
    this.ysp;
}

Star.prototype.init = function(){
    this.x=Math.floor(Math.random() * x);
    this.y=Math.floor(Math.random() * y);
    this.start=Math.floor(Math.random() * 6);
    this.xsp = Math.random() * 0.65-0.25;
    this.ysp = Math.random() * 0.65-0.25;
}

Star.prototype.draw = function() {
    this.start++;
    if(this.start>6){
        this.start = 0;
    }
    this.x += this.xsp;
    this.y += this.ysp;
    if(this.x>x||this.y>y||this.x<0||this.y<0) {
        this.init();
    }
    ctx.drawImage(img,this.start*7 + 5,0,7,26,this.x,this.y,x/200,x/100);
}

function drawRect() {
    ctx.fillRect(0,0,x,y);
}

function loop() {
    drawRect();
    draw();
}
function draw() {
    for (var j = 0; j < num; j++) {
        arrStar[j].draw();
    }
}

function init() {
    for (var i = 0; i < num; i++) {
        arrStar[i] = new Star();
        arrStar[i].init();
    }
}

window.onload = function() {
    init();
    setInterval(loop, 100);
}