// George Zhang
// 2020-06-24

const Controller = function() {

    this.left  = new Controller.ButtonInput();
    this.right = new Controller.ButtonInput();
    this.up    = new Controller.ButtonInput();
    this.enter = new Controller.ButtonInput();
  
    this.keyDownUp = function(type, key_code) {
  
      var down = (type == "keydown") ? true : false;
  
      switch(key_code) {
  
        case 37: this.left.getInput(down);  break;
        case 38: this.up.getInput(down);    break;
        case 39: this.right.getInput(down); break;
        case 13: 
          this.enter.getInput(down);
          this.enter.down = false;
          
  
      }
  
    };
  
  };
  
  Controller.prototype = {
  
    constructor : Controller
  
  };
  
  Controller.ButtonInput = function() {
  
    this.active = this.down = false;
  
  };
  
  Controller.ButtonInput.prototype = {
  
    constructor : Controller.ButtonInput,
  
    getInput : function(down) {
  
      if (this.down != down) this.active = down;
      this.down = down;
  
    }
  
  };