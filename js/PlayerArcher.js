class PlayerArcher {
    constructor(x, y, width, height) {
        var options = {
            isStatic: true
        }
      
        this.body = Bodies.rectangle(x, y, width, height, options);
        this.width = width;
        this.height = height;
        this.image = loadImage("./assets/playerArcher.png");
        Matter.Body.setAngle(this.body, -PI/2);
      
        World.add(world, this.body);        
    }
    
    display() {
        var pos = this.body.position;
        
        if (keyIsDown(RIGHT_ARROW) && this.body.angle < -PI/3) {
            this.body.angle += 0.005;
        }
  
        if (keyIsDown(LEFT_ARROW) && this.body.angle > -2*PI/3) {
            this.body.angle -= 0.005 ;
        }
        
        push();
        translate(pos.x, pos.y);
        rotate(this.body.angle);
        imageMode(CENTER);
        image(this.image, 0, 0, this.width, this.height);
        pop();
    }

}