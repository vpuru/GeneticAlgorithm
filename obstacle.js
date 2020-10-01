class Obstacle {
  constructor(x, y, w, h) {
    this.position = createVector(x, y);
    this.w = w;
    this.h = h;
  }

  display(r, g, b) {
    stroke(0);
    if(b){fill(r, g, b);}else{
    fill(215, 25, 25);}
    strokeWeight(2);
    rectMode(CORNER);
    rect(this.position.x, this.position.y, this.w, this.h);
  }

  contains(spot) {
    if (spot.x > this.position.x && spot.x < this.position.x + this.w && spot.y > this.position.y && spot.y < this.position.y + this.h) {
      return true;
    } else {
      return false;
    }
  }

}
