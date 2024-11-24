/** @type {HTMLCanvasElement} */

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = (canvas.width = 500);
const CANVAS_HEIGHT = (canvas.height = 700);
const enemyTypes = [
  {
    src: "enemy1.png",
    frames: 6,
    width: 293,
    height: 155,
  },
  {
    src: "enemy2.png",
    frames: 6,
    width: 266,
    height: 188,
  },
  {
    src: "enemy3.png",
    frames: 6,
    width: 218,
    height: 177,
  },
  {
    src: "enemy4.png",
    frames: 9,
    width: 213,
    height: 213,
  },
];

const numberOfEnemies = 50;
const enemiesArray = [];

let gameFrame = 0;

class Enemy {
  constructor(src, spriteWidth, spriteHeight) {
    this.image = new Image();
    this.image.src = src;

    this.speed = Math.random() * 4 + 1;
    this.spriteWidth = spriteWidth;
    this.spriteHeight = spriteHeight;
    this.width = this.spriteWidth / 3;
    this.height = this.spriteHeight / 3;

    this.x = Math.random() * (canvas.width - this.width);
    this.y = Math.random() * (canvas.height - this.height);
    this.newX = Math.random() * (canvas.width - this.width);
    this.newY = Math.random() * (canvas.height - this.height);
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);
    this.interval = Math.floor(Math.random() * 200 + 50);
  }
  update() {
    if (gameFrame % this.interval === 0) {
      this.newX = Math.random() * (canvas.width - this.width);
      this.newY = Math.random() * (canvas.height - this.height);
    }
    let dx = this.x - this.newX;
    let dy = this.y - this.newY;
    this.x -= dx / 70;
    this.y -= dy / 70;
    //this.angle += this.angleSpeed;
    if (this.x + this.width < 0) this.x = canvas.width;
    // animate sprites
    if (gameFrame % this.flapSpeed === 0) {
      this.frame = this.frame > 4 ? 0 : this.frame + 1;
      //TODO change 4
    }
  }
  draw() {
    //ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
  updateSrcWidthHeight(src, width, height) {
    this.image.src = src;
    this.spriteWidth = width;
    this.spriteHeight = height;
    this.width = this.spriteWidth / 3;
    this.height = this.spriteHeight / 3;
  }
}

//Code to allow for enemy change
let enemyState = "enemy2";
const dropdownEnemy = document.getElementById("enemy");
dropdownEnemy.addEventListener("change", function (e) {
  enemyState = e.target.value;

  enemiesArray.forEach((enemy) => {
    enemy.updateSrcWidthHeight(
      enemyTypes[enemyMapping[enemyState]].src,
      enemyTypes[enemyMapping[enemyState]].width,
      enemyTypes[enemyMapping[enemyState]].height
    );
  });
});
const enemyMapping = {
  enemy1: 0,
  enemy2: 1,
  enemy3: 2,
  enemy4: 3,
};

for (let i = 0; i < numberOfEnemies; i++) {
  enemiesArray.push(
    new Enemy(
      enemyTypes[enemyMapping[enemyState]].src,
      enemyTypes[enemyMapping[enemyState]].width,
      enemyTypes[enemyMapping[enemyState]].height
    )
  );
}
//End of code to allow for enemy Change
//Code to allow for animation change
let animationState = "erratic";
const dropdownAnimation = document.getElementById("animations");
dropdownAnimation.addEventListener("change", function (e) {
  playerState = e.target.value;
});

//Erratic
// this.x += Math.random() * 5 - 2.5;
// this.y += Math.random() * 5 - 2.5;

//Left to right, up and down
// this.x -= this.speed;
// this.y += this.curve * Math.sin(this.angle);
// this.angle += this.angleSpeed;

//Swarm
// this.x =
//   (canvas.width / 3) * Math.sin((this.angle * Math.PI) / 120) +
//   (canvas.width / 2 - this.width / 2);
// this.y =
//   (canvas.height / 3) * Math.cos((this.angle * Math.PI) / 370) +
//   (canvas.height / 2 - this.height / 2);
// this.angle += this.angleSpeed;

// this.angle = Math.random() * 2;
// this.angleSpeed = Math.random() * 2 + 0.5;
// this.curve = Math.random() * 150 + 50;

//End of code to allow for animation change

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  enemiesArray.forEach((enemy) => {
    enemy.update();
    enemy.draw();
  });
  gameFrame++;
  requestAnimationFrame(animate);
}
animate();

// TODO Failed attempt at fetching from local JSON
// fetch("./enemyInfo.json")
//   .then((res) => res.json())
//   .then((data) => console.log(data));

// function saveEnemyData(data) {
//   enemyData.push(data);
// }
// console.log(enemyData);

//   enemiesArray.length = 0;
//   for (let i = 0; i < numberOfEnemies; i++) {
//     enemiesArray.push(
//       new Enemy(
//         enemyTypes[enemyMapping[enemyState]].src,
//         enemyTypes[enemyMapping[enemyState]].width,
//         enemyTypes[enemyMapping[enemyState]].height
//       )
//     );
//   }
//Also works, but the below method replaces sprites in place rather than making new ones.
