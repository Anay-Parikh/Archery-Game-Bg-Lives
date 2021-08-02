class ComputerArcher {
    constructor(x, y, width, height) {
        var options = {
            isStatic: true
        }
      
        this.body = Bodies.rectangle(x, y, width, height, options);
        this.width = width;
        this.height = height;
        this.image = loadImage("./assets/computerArcher.png");
        Matter.Body.setAngle(this.body, PI/2);
      
        World.add(world, this.body);        
    }
    display() {
        var pos = this.body.position;
        this.body.angle = -playerBow.body.angle;
    
        push();
        translate(pos.x, pos.y);
        rotate(this.body.angle);
        imageMode(CENTER);
        image(this.image, 0, 0, this.width, this.height);
        pop();
    }
}