const Display = function(canvas) {

    this.buffer  = document.createElement("canvas").getContext("2d"),
    this.context = canvas.getContext("2d");

    this.drawObject = function(image, source_x, source_y, img_width, img_height, destination_x, destination_y, width, height) {

        this.buffer.drawImage(image, source_x, source_y, img_width, img_height, Math.round(destination_x), Math.round(destination_y), width, height);
    
    };
    
    this.resize = function(width, height, height_width_ratio) {
    
        if (height / width > height_width_ratio) {
    
            this.context.canvas.height = width * height_width_ratio;
            this.context.canvas.width  = width;
    
        } else {
    
            this.context.canvas.height = height;
            this.context.canvas.width  = height / height_width_ratio;
    
        }
    
        this.context.imageSmoothingEnabled = false;
    
    };
/*
    this.roundRect = function (x, y, width, height, radius) {
        if (width < 2 * radius) radius = width / 2;
        if (height < 2 * radius) radius = height / 2;
        this.buffer.beginPath();
        this.buffer.moveTo(x + radius, y);
        this.buffer.arcTo(x + width, y, x + width, y + height, radius);
        this.buffer.arcTo(x + width, y + height, x, y + height, radius);
        this.buffer.arcTo(x, y + height, x, y, radius);
        this.buffer.arcTo(x, y, x + width, y, radius);
        this.buffer.closePath();
        this.buffer.fillStyle = "rgba(85, 95, 140,0.3)";
        this.buffer.strokeStyle = "rgb(209, 141, 170)"
        this.buffer.lineWidth = 5;
        this.buffer.fill();
        this.buffer.stroke();
    };
    */

    this.fill = function(image) { 
        this.buffer.drawImage(image,0,0);
    };

    this.showText = function(text,xpos,ypos,color,fontstyle) {
        this.buffer.fillStyle = color;
        this.buffer.font = fontstyle;
        this.buffer.textAlign = "center";
        this.buffer.fillText(text,xpos,ypos);
    }
    
};

Display.prototype = {
    constructor: Display,
    render:function() { 
        this.context.drawImage(this.buffer.canvas, 0, 0, this.buffer.canvas.width, this.buffer.canvas.height, 0, 0, this.context.canvas.width, this.context.canvas.height);
    },
};