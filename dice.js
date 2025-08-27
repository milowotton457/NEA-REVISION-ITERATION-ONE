class Dice {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.value = 1;
  }

  roll() {
    this.value = floor(random(1, 7));
    return this.value;
  }

  draw() {
    // Draw the dice face
    fill(255);
    stroke(0);
    rect(this.x, this.y, this.size, this.size, 10);

    // Draw the dots
    fill(0);
    let dotSize = this.size / 5;
    let center = this.size / 2;
    let quarter = this.size / 4;
    let threeQuarters = this.size * 3 / 4;

    if (this.value === 1 || this.value === 3 || this.value === 5) {
      ellipse(this.x + center, this.y + center, dotSize, dotSize); // Center dot
    }
    if (this.value >= 2) {
      ellipse(this.x + quarter, this.y + quarter, dotSize, dotSize); // Top-left
      ellipse(this.x + threeQuarters, this.y + threeQuarters, dotSize, dotSize); // Bottom-right
    }
    if (this.value >= 4) {
      ellipse(this.x + threeQuarters, this.y + quarter, dotSize, dotSize); // Top-right
      ellipse(this.x + quarter, this.y + threeQuarters, dotSize, dotSize); // Bottom-left
    }
    if (this.value === 6) {
      ellipse(this.x + quarter, this.y + center, dotSize, dotSize); // Middle-left
      ellipse(this.x + threeQuarters, this.y + center, dotSize, dotSize); // Middle-right
    }
  }
}
