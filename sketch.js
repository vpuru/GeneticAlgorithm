let lifetime; // How long should each generation live
let population; // Population
let lifecycle; // Timer for cycle of generation
let recordtime; // Fastest time to target
let target; // Target position
let obstacles = []; //an array list to keep track of all the obstacles!
let newObstacle = null;


function setup() {
  createCanvas(1280, 720);

  lifecycle = 0;
  lifetime = 500;
  recordtime = lifetime;

  target = new Obstacle(width - 20, height/2, 24, 24);

  population = new Population(0.01, 500);

  // Borders to prevent escape
  obstacles.push(new Obstacle(0, -100, width, 100));
  obstacles.push(new Obstacle(-50, 0, 50, height));
  obstacles.push(new Obstacle(width, 0, 50, height));
  obstacles.push(new Obstacle(width, height + 20, -width, -20));

  // Additional Obstacle if wanted
  // obstacles.push(new Obstacle(width/2, height/2 + 150, 75, -height / 2 + 100));
  }


function draw() {
  background(220);
  target.display(50,205,50);

  if (lifecycle < lifetime) {
    population.live(obstacles);
    if ((population.targetReached()) && (lifecycle < recordtime)) {
      recordtime = lifecycle;
    }
    lifecycle++;
    // Otherwise a new generation
  } else {
    lifecycle = 0;
    population.calcFitness();
    population.selection();
    population.reproduction();
  }

  // Draw the obstacles
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].display();
  }

  // Display some info
  fill(0);
  noStroke();
  text("Generation #: " + population.getGenerations(), 10, 18);
  text("Cycles left: " + (lifetime - lifecycle), 10, 36);
  text("Record cycles: " + recordtime, 10, 54);
  }

  function mousePressed() {
  newObstacle = new Obstacle(mouseX, mouseY, 0, 0);
  }

  function mouseDragged() {
  newObstacle.w = mouseX - newObstacle.position.x;
  newObstacle.h = mouseY - newObstacle.position.y;
  }

  function mouseReleased() {
  obstacles.push(newObstacle);
  newObstacle = null;}
