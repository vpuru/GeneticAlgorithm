class DNA {
  constructor(newgenes) {
    // The maximum strength of the forces
    this.maxforce = 0.25;

    // The genetic sequence
    if (newgenes) {
      this.genes = newgenes;
    } else {
      this.genes = [];
      // Constructor (makes a DNA of random PVectors)
      for (let i = 0; i < lifetime; i++) {
        this.genes[i] = p5.Vector.random2D();
        this.genes[i].setMag(this.maxforce);
      }
    }
  }

  // CROSSOVER
  // Creates new DNA sequence from two (this & and a partner)
  crossover(partner) {
    let child = new Array(this.genes.length);
    // Pick a midpoint
    let crossover = int(random(this.genes.length));
    // Take "half" from one and "half" from the other
    for (let i = 0; i < this.genes.length; i++) {
      if (i > crossover) child[i] = this.genes[i];
      else child[i] = partner.genes[i];
    }
    let newgenes = new DNA(child);
    return newgenes;
  }

  // Based on a mutation probability, picks a new random Vector
  mutate(m) {
    for (let i = 0; i < this.genes.length; i++) {
      if (random(1) < m) {
        this.genes[i] = p5.Vector.random2D();
        this.genes[i].setMag(0.1);
      }
    }
  }
}
