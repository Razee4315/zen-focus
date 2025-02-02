// web/p5.sketch.js

// Use a global variable attached to window so that script.js can update it.
window.currentTheme = "particle";

let particles = [];
let stars = [];
let bubbles = [];
let raindrops = [];
let waveOffset = 0;

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("bg-canvas");
  frameRate(60);
  initTheme();
}

function initTheme() {
  // Reinitialize arrays or variables based on the current theme.
  if (window.currentTheme === "particle") {
    particles = [];
    for (let i = 0; i < 150; i++) {
      particles.push(new Particle());
    }
  } else if (window.currentTheme === "waves") {
    waveOffset = 0;
  } else if (window.currentTheme === "bubbles") {
    bubbles = [];
    for (let i = 0; i < 50; i++) {
      bubbles.push(new Bubble());
    }
  } else if (window.currentTheme === "stars") {
    stars = [];
    for (let i = 0; i < 200; i++) {
      stars.push(new Star());
    }
  } else if (window.currentTheme === "rain") {
    raindrops = [];
    for (let i = 0; i < 100; i++) {
      raindrops.push(new Raindrop());
    }
  }
}

function draw() {
  // Draw a translucent dark overlay for a smooth ambient effect
  background(20, 20, 20, 50);
  
  if (window.currentTheme === "particle") {
    drawParticles();
  } else if (window.currentTheme === "waves") {
    drawWaves();
  } else if (window.currentTheme === "bubbles") {
    drawBubbles();
  } else if (window.currentTheme === "stars") {
    drawStars();
  } else if (window.currentTheme === "rain") {
    drawRain();
  }
}

// --- Animation Drawing Functions ---

function drawParticles() {
  for (let p of particles) {
    p.update();
    p.show();
  }
  // Draw connecting lines between particles
  stroke(67, 160, 71, 80);
  strokeWeight(1);
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      let d = dist(particles[i].pos.x, particles[i].pos.y, particles[j].pos.x, particles[j].pos.y);
      if (d < 120) {
        line(particles[i].pos.x, particles[i].pos.y, particles[j].pos.x, particles[j].pos.y);
      }
    }
  }
}

function drawWaves() {
  noStroke();
  fill(67, 160, 71, 100);
  beginShape();
  let yOffset = height / 2;
  for (let x = 0; x <= width; x += 10) {
    let y = yOffset + sin((x + waveOffset) * 0.02) * 50;
    vertex(x, y);
  }
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
  waveOffset += 2;
}

function drawBubbles() {
  for (let b of bubbles) {
    b.update();
    b.show();
  }
}

function drawStars() {
  for (let s of stars) {
    s.update();
    s.show();
  }
}

function drawRain() {
  for (let r of raindrops) {
    r.update();
    r.show();
  }
}

// --- Classes for each Theme ---

// Particle class for "particle" theme
class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(random(-1, 1), random(-1, 1));
    this.size = random(3, 6);
  }
  update() {
    let mouse = createVector(mouseX, mouseY);
    let dir = p5.Vector.sub(mouse, this.pos);
    let d = dir.mag();
    if (d < 150) {
      dir.normalize();
      this.vel.add(dir.mult(0.05));
    }
    this.pos.add(this.vel);
    this.vel.mult(0.98);
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.y > height) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = height;
  }
  show() {
    noStroke();
    fill(67, 160, 71, 200);
    ellipse(this.pos.x, this.pos.y, this.size);
  }
}

// Bubble class for "bubbles" theme
class Bubble {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(20, 50);
    this.speed = random(0.5, 2);
  }
  update() {
    this.y -= this.speed;
    if (this.y < -this.size) {
      this.y = height + this.size;
      this.x = random(width);
    }
  }
  show() {
    noStroke();
    fill(255, 255, 255, 150);
    ellipse(this.x, this.y, this.size);
  }
}

// Star class for "stars" theme
class Star {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(1, 3);
    this.speed = random(0.2, 1);
  }
  update() {
    this.y += this.speed;
    if (this.y > height) {
      this.y = 0;
      this.x = random(width);
    }
  }
  show() {
    noStroke();
    fill(255, 255, 255, 200);
    ellipse(this.x, this.y, this.size);
  }
}

// Raindrop class for "rain" theme
class Raindrop {
  constructor() {
    this.x = random(width);
    this.y = random(-100, 0);
    this.length = random(10, 20);
    this.speed = random(4, 10);
  }
  update() {
    this.y += this.speed;
    if (this.y > height) {
      this.y = random(-100, 0);
      this.x = random(width);
    }
  }
  show() {
    stroke(100, 150, 255, 200);
    strokeWeight(2);
    line(this.x, this.y, this.x, this.y + this.length);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  initTheme();
}
