class Player {
  constructor(x, y, width, height) {
    var options = {
      isStatic: true
    };

    this.life1 = "#66ff91";
    this.life2 = "#66ff91";
    this.life3 = "#66ff91";

    this.body = Bodies.rectangle(x, y, width, height, options);

    this.width = width;
    this.height = height;
    this.image = loadImage("./assets/player.png");

    World.add(world, this.body);

  }

 
  display() {
    var pos = this.body.position;
    var angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    imageMode(CENTER);
    image(this.image, 0, 0, this.width, this.height);
    pop();
  }

  lifeOne() {
    push();
    textSize(20);
    fill("white");
    text("Player", 260, 40);

    // fill(this.life1);
    // rect(180, 50, 70, 30);
    // fill(this.life2);
    // rect(250, 50, 70, 30);
    fill(this.life3);
    rect(320, 50, 70, 30);
    pop();
  }

  lifeTwo() {
    push();
    textSize(20);
    fill("white");
    text("Player", 260, 40);

    // fill(this.life1);
    // rect(180, 50, 70, 30);
    fill(this.life2);
    rect(250, 50, 70, 30);
    // fill(this.life3);
    // rect(320, 50, 70, 30);
    pop();
  }

  lifeThree() {
    push();
    textSize(20);
    fill("white");
    text("Player", 260, 40);

    fill("#fc8077");

    if (playerHealth > 1) {
      fill(this.life1);
    }
    rect(180, 50, 70, 30);
    // fill(this.life2);
    // rect(250, 50, 70, 30);
    // fill(this.life3);
    // rect(320, 50, 70, 30);
    pop();
  }


}
