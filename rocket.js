class Rocket {
  constructor(pos, dna){
    this.acceleration = createVector();
    this.velocity = createVector();
    this.position = pos;
    this.size = 2;
    this.dna = dna;
    this.finishTime = 0;
    this.recordDist = Infinity;

    this.fitness = 0;
    this.geneCounter = 0;
    this.hitObstacle = false;
    this.hitTarget = false;
  }

  calcFitness() {
    if (this.recordDist < 1) this.recordDist = 1;
    this.fitness = (1 / (this.finishTime * this.recordDist));
    this.fitness = pow(this.fitness, 4);

    if (this.hitObstacle) this.fitness *= 0.1; // lose 90% of fitness hitting an obstacle
    if (this.hitTarget) this.fitness *= 2; // twice the fitness for finishing
  }

  run(os) {
    if (!this.hitObstacle && !this.hitTarget) {
      this.applyForce(this.dna.genes[this.geneCounter]);
      this.geneCounter = (this.geneCounter + 1) % this.dna.genes.length;
      this.update();
      // If I hit an edge or an obstacle
      this.obstacles(os);
    }
    // Draw me!
    if (!this.hitObstacle) {
      this.display();
    }
  }

  checkTarget() {
    let d = dist(this.position.x, this.position.y, target.position.x, target.position.y);
    if (d < this.recordDist) this.recordDist = d;
    if (target.contains(this.position) && !this.hitTarget) {
        this.hitTarget = true;
      } else if (!this.hitTarget) {
        this.finishTime++;
      }
  }

  obstacles(os) {
  for (let i = 0; i < os.length; i++) {
    let obs = os[i];
    if (obs.contains(this.position)) {
      this.hitObstacle = true;
    }
  }
}

applyForce(f) {
  this.acceleration.add(f);
}


update() {
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.acceleration.mult(0);
  constrain(this.position.x, 0, width);
  constrain(this.position.y, 0, height);
}

  display(){
    //draw a triangle rotated in the direction of velocity
    var angle = this.velocity.heading() + PI / 2;

    //moves the shape to the location
    push();
    translate(this.position.x, this.position.y);
    rotate(angle);

    //color control
    fill(0);
    stroke(0);
    strokeWeight(1);

    //creates the shape
    beginShape();
    vertex(0, -this.size * 2);
    vertex(-this.size, this.size * 2);
    vertex(this.size, this.size * 2);
    endShape(CLOSE);

    pop();

  }

  getFitness() {
    return this.fitness;
  }

  getDNA() {
    return this.dna;
  }

  stopped() {
    return this.hitObstacle;
  }
}
