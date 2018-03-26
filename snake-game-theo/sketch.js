var blockSize = 30;
var snake;
var food;
var cols = 50;
var rows = 30;

function scaleToGrid(n) {
  return n * blockSize;
}

function randomX() {
  return scaleToGrid(floor(random(cols)));
}

function randomY() {
  return scaleToGrid(floor(random(rows)));
}

function setup() {
  createCanvas(cols * blockSize, rows * blockSize);
  food = new Food();
  snake = new Snake();
  frameRate(8);
}

function draw() {
  background(150);
  snake.render();
  food.render();

  if (snakeEatsFood()) {
    snake.digestFood();
    food = new Food();
  }
}

function snakeEatsFood() {
  var distanceApart = dist(snake.x, snake.y, food.x, food.y);
  return distanceApart < blockSize;
}

function Food() {
  this.x = randomX();
  this.y = randomY();

  this.render = function() {
    fill(255, 0, 0);
    noStroke();
    rect(this.x, this.y, blockSize, blockSize);
  };
}

function Snake() {
  this.x = randomX();
  this.y = randomY();
  this.xspeed = 0;
  this.yspeed = 0;
  this.length = 0;
  this.tail = [];

  this.render = function() {
    this.updateLocation();
  
    fill(0);
    for (var i = 0; i < this.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, blockSize, blockSize);
    }
    rect(this.x, this.y, blockSize, blockSize);
    
  };

  this.updateLocation = function() {
    var dx = this.xspeed * blockSize;
    var dy = this.yspeed * blockSize;

    for (var i = this.length; i > 0; i--) {
      this.tail[i] = this.tail[i-1];
    }
    this.tail[0] = createVector(this.x, this.y);

    this.x = this.x + dx;
    this.y = this.y + dy;
    
    this.x = constrain(this.x, 0, width - blockSize);
    this.y = constrain(this.y, 0, height - blockSize);
  };

  this.digestFood = function() {
    console.log("YUM!");
    this.length++;
  };

  this.up = function() {
    this.yspeed = -1;
    this.xspeed = 0;
  };

  this.down = function() {
    this.yspeed = 1;
    this.xspeed = 0;
  };

  this.left = function() {
    this.yspeed = 0;
    this.xspeed = -1;
  };

  this.right = function() {
    this.yspeed = 0;
    this.xspeed = 1;
  };
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    snake.up();
  } else if (keyCode === DOWN_ARROW) {
    snake.down();
  } else if (keyCode === LEFT_ARROW) {
    snake.left();
  } else if (keyCode === RIGHT_ARROW) {
    snake.right();
  }
}
