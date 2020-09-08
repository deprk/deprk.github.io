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
    render:function(fade) {
        this.context.globalAlpha = fade;
        this.context.drawImage(this.buffer.canvas, 0, 0, this.buffer.canvas.width, this.buffer.canvas.height, 0, 0, this.context.canvas.width, this.context.canvas.height);
    },
};