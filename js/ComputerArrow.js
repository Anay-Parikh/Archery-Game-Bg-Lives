class ComputerArrow {
    constructor(x, y, width, height) {
      
      var options = {
        restitution: 0.8,
        friction: 1.0,
        density: 1.0,
        isStatic: true
      };
      
      this.width = width;
      this.height = height;
      this.body = Bodies.rectangle(x, y, this.width, this.height, options);
      this.image = loadImage("./assets/arrow.png");
      this.otherImage = loadImage("./assets/traj.png")
      World.add(world, this.body);
      this.trajectory = [];

    }

    display() {
        var pos = this.body.position;

        push();
        translate(pos.x, pos.y);
        rotate(computerBow.body.angle + PI/2);
        imageMode(CENTER);
        image(this.image, 0, 0, this.width, this.height);
        pop();

        if (this.body.velocity.x < 0) {
          var positions = [pos.x, pos.y];
          this.trajectory.push(positions);
        }

        for (var i = 0; i < this.trajectory.length; i++) {
            image(this.otherImage, this.trajectory[i][0], this.trajectory[i][1], 7, 7);
        }
    }
    
    shoot() {
        var velocity = p5.Vector.fromAngle(computerBow.body.angle + PI/2);
        velocity.mult(38);
        Matter.Body.setStatic(this.body, false);
        Matter.Body.setVelocity(this.body, {x: velocity.x, y: velocity.y})
    }
  }
