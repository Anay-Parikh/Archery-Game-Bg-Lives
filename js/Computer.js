class Computer {
  constructor(x, y, width, height) {
    var options = {
      isStatic: true
    };

    this.body = Bodies.rectangle(x, y, width, height, options);
     
    // #fc8077
    this.life1 = "#66ff91";
    this.life2 = "#66ff91";
    this.life3 = "#66ff91";

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
    text("Opponent", width-350, 40);

    // fill(this.life1);
    // rect(width-270, 50, 70, 30);
    // fill(this.life2);
    // rect(width-340, 50, 70, 30);
    fill(this.life1);

    rect(width-410, 50, 70, 30);
    pop();
  }
  lifeTwo() {
    push();
    textSize(20);
    fill("white");
    text("Opponent", width-350, 40);

    // fill(this.life1);
    // rect(width-270, 50, 70, 30);
    fill(this.life2);
    rect(width-340, 50, 70, 30);
    // fill(this.life3);
    // rect(width-410, 50, 70, 30);
    pop();
  }
  lifeThree() {
    push();
    textSize(20);
    fill("white");
    text("Opponent", width-350, 40);

    fill("#fc8077");
    if (computerHealth > 1) {
      fill(this.life3);
    }
    rect(width-270, 50, 70, 30);
    // fill(this.life2);
    // rect(width-340, 50, 70, 30);
    // fill(this.life3);
    // rect(width-410, 50, 70, 30);
    pop();
  }
}
