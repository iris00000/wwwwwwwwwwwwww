const NUM_PARTICLES = 1000;
let CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
CHARS += CHARS.toLowerCase() + '0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

let texts = [];
let circles = [];

function preload() {
  textFont('monospace');
}

function setup() {
  createCanvas(windowWidth, windowHeight); // 全屏画布
  background('#ffe5d9'); // 背景颜色

  // 初始化粒子
  for (let i = 0; i < NUM_PARTICLES; i++) {
    createParticle();
  }

  // 初始化圆
  for (let i = 0; i < 40; i++) {
    circles.push({
      x: random(width), // 随机 x 坐标
      y: random(height), // 随机 y 坐标
      size: random(30, 100), // 随机大小
      color: color(random(255), random(255), random(255), random(50, 150)), // 随机颜色和透明度
      speedX: random(-5, 5), // 增加水平速度范围
      speedY: random(-5, 5)  // 增加垂直速度范围
    });
  }
}

function createParticle() {
  const angle = random(TWO_PI);
  const radius = random(2000);

  let char = random(CHARS);
  if (isNaN(char)) {
    char = '413730192'; // 替换 NaN 为 413730192
  }

  const particle = {
    x: cos(angle) * radius,
    y: sin(angle) * radius,
    char: char,
    size: random(5, 20), // 初始化随机大小
    rotation: random(TWO_PI),
    color: color(random(255), random(255), random(255)) // 随机颜色
  };

  texts.push(particle);
  return particle;
}

function draw() {
  background('#ffe5d9'); // 每次重绘背景

  // 绘制圆（放在粒子之前）
  let sizeOffset = map(mouseX, 0, width, 10, 120);
  for (let circle of circles) {
    fill(circle.color);
    noStroke();
    ellipse(circle.x, circle.y, circle.size + sizeOffset);

    // 更新圆的位置
    circle.x += circle.speedX;
    circle.y += circle.speedY;

    // 碰到边界反弹
    if (circle.x < 0 || circle.x > width) {
      circle.speedX *= -1;
    }
    if (circle.y < 0 || circle.y > height) {
      circle.speedY *= -1;
    }
  }

  // 绘制粒子
  texts.sort((a, b) => a.dist - b.dist);

  for (let t of texts) {
    push();
    translate(t.x + width / 2, t.y + height / 2); // 调整粒子位置到画布中心
    rotate(t.rotation);
    fill(t.color); // 使用粒子的随机颜色
    noStroke();
    textSize(t.size);
    text(t.char, 0, 0);
    pop();

    if (abs(t.x) < 10 && abs(t.y) < 10) {
      const angle = random(TWO_PI);
      t.x = cos(angle) * 2000;
      t.y = sin(angle) * 2000;
      t.size = random(5, 30); // 重置为随机大小
      t.rotation = random(TWO_PI);
      t.color = color(random(255), random(255), random(255)); // 重置颜色
    } else {
      t.x *= 0.98;
      t.y *= 0.98;
      t.size = max(t.size - 0.1, 1); // 粒子大小逐渐减小，最小值为 1
      t.dist = dist(t.x, t.y, 0, 0);
      t.rotation += 0.02;
    }
  }

  // 显示自我介绍文字
  // textAlign(CENTER, CENTER);
  // textSize(50);
  // fill(0);
  // text('教科Ａ413730192黃詩婷', width / 2, height / 2);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 调整画布大小
}