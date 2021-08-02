const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world, bg;
var canvas;
var player, playerBase, playerBow
var computer, computerBase, computerBow, computerArrow;
var arrows = [];
var compArrows = [];
var playerHealth = 3;
var computerHealth = 3;
var gameState = "play";

function preload() {
  bg = loadImage("./assets/archerybg.gif")
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  engine = Engine.create();
  world = engine.world;

  playerBase = new PlayerBase(300, random(450, height - 300), 180, 150);
  player = new Player(285, playerBase.body.position.y - 153, 50, 180);
 
  computerBase = new ComputerBase(
    width-300,
    random(450, height - 300),
    180,
    150
  );
  
  computer = new Computer(
    width - 280,
    computerBase.body.position.y - 153,
    50,
    180
  );

  computerBow = new ComputerArcher(width-330, computerBase.body.position.y-180, 100, 100);
  
  playerBow = new PlayerArcher(340, playerBase.body.position.y-180, 100, 100);
}

function draw() {
  background(180);

  Engine.update(engine);

  image(bg, 0, 0, width, height)

  if (gameState === "play") {
    // Title
    push();
    fill("white");
    textAlign("center");
    textSize(40);
    text("EPIC ARCHERY", width / 2, 100);
    pop();

    if (playerHealth === 3) {
      player.lifeOne();
      player.lifeTwo();
      player.lifeThree();
    }
    if (playerHealth === 2) {
      player.lifeTwo();
      player.lifeThree();
    }
    if (playerHealth === 1) {
      player.lifeThree();
    }

    if (computerHealth === 3) {
      computer.lifeOne();
      computer.lifeTwo();
      computer.lifeThree();
    }
    if (computerHealth === 2) {
      computer.lifeTwo();
      computer.lifeThree();
    }
    if (computerHealth === 1) {
      computer.lifeThree();
    }
    
    /*
    push();
    fill("#fc8077")
    textSize(20);
    if (playerHealth > 2) {
      fill("#66ff91");
    }
    text("Your Health: " + playerHealth, player.body.position.x - 20, player.body.position.y - 150);
    pop();

    push();
    fill("#fc8077")
    if (computerHealth > 2) {
      fill("#66ff91");
    }

    textSize(20);
    text("Opponent's Health: " + computerHealth, computer.body.position.x - 100, computer.body.position.y - 150);
    pop();
    */

    playerBase.display();
    player.display();
    
    computerBase.display();
    computer.display();
    
    playerBow.display();
    computerBow.display();

    for (var i = 0; i < arrows.length; i++) {
        playerShowArrows(arrows[i], i);
        if (arrows[i] != undefined) {
            var collision = Matter.SAT.collides(arrows[i].body, computer.body);
            var collision2 = Matter.SAT.collides(arrows[i].body, computerBase.body);
            var collision3 = Matter.SAT.collides(arrows[i].body, computerBow.body);
            if (collision.collided || collision2.collided || collision3.collided) {
                Matter.World.remove(world, arrows[i].body);
                arrows.splice(i, 1);
                i--;
                if (collision.collided) {
                  computerHealth -= 1;
                }
            }
        }
    }

    for (var i = 0; i < compArrows.length; i++) {
      compShowArrows(compArrows[i], i);
      if (compArrows[i] != undefined) {
        var collision4 = Matter.SAT.collides(compArrows[i].body, player.body);
        var collision5 = Matter.SAT.collides(compArrows[i].body, playerBase.body);
        var collision6 = Matter.SAT.collides(compArrows[i].body, playerBow.body);
        if (collision4.collided || collision5.collided || collision6.collided) {
            Matter.World.remove(world, compArrows[i].body);
            compArrows.splice(i, 1);
            i--;
            if (collision4.collided) {
              playerHealth -= 1;
            }
        }
      }
    }
     
    if (playerHealth === 0 || computerHealth === 0) {
      gameState = 'end'
    }
  } else {
    if (playerHealth < computerHealth) {
      background("black")
      textSize(50);
      textAlign(CENTER);
      fill("white");
      noStroke();
      text("Opponent Wins!", windowWidth/2, windowHeight/2);
      text("Press CTRL+R to restart", windowWidth/2, windowHeight/2 + 100);   
    } else if (playerHealth > computerHealth) {
      background("black")
      textSize(50);
      fill("white");
      noStroke();
      textAlign(CENTER);
      text("Player Wins!", windowWidth/2, windowHeight/2);      
      text("Press CTRL+R to restart", windowWidth/2, windowHeight/2 + 100);   
    } else {
      background("black")
      textSize(50);
      textAlign(CENTER);
      fill("white");
      noStroke();
      text("Tie Game! No one wins!", windowWidth/2, windowHeight/2);   
      text("Press CTRL+R to restart", windowWidth/2, windowHeight/2 + 100);   
    }
  }
}

function keyReleased() {
    if (keyCode === 32) {
        arrows[arrows.length-1].shoot();
    }
    if (keyCode === DOWN_ARROW) {
      compArrows[compArrows.length-1].shoot();
    }
}

function keyPressed() {
  if (keyCode === 32) {
      var playerArrow = new PlayerArrow(340, playerBase.body.position.y-180, 100, 10);
      arrows.push(playerArrow);
  }
  if (keyCode === DOWN_ARROW) {
      var computerArrow = new ComputerArrow(width-330, computerBase.body.position.y-180, 100, 10);
      compArrows.push(computerArrow);
    }
}

function playerShowArrows(arrow, i) {
    arrow.display();
    if (arrow.body.position.y >= height) {
        Matter.World.remove(world, arrow.body)
        arrows.splice(i, 1);        
    }
}

function compShowArrows(arrow, i) {
  arrow.display();
  if (arrow.body.position.y >= height) {
      Matter.World.remove(world, arrow.body)
      compArrows.splice(i, 1);        
  }
}