const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
const player = {
  x: 5,
  y: 5,
  dx: 1,
  dy: 0,
  color: 'blue',
  trail: [],
  territory: []
};

function drawBlock(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw territory
  for (let t of player.territory) {
    drawBlock(t.x, t.y, '#88f');
  }

  // Draw trail
  for (let t of player.trail) {
    drawBlock(t.x, t.y, '#44f');
  }

  // Draw player
  drawBlock(player.x, player.y, player.color);
}

function update() {
  player.x += player.dx;
  player.y += player.dy;

  // Store current path as trail
  player.trail.push({ x: player.x, y: player.y });

  // Check if back to territory to close trail
  if (player.territory.some(t => t.x === player.x && t.y === player.y)) {
    player.territory.push(...player.trail);
    player.trail = [];
  }
}

function gameLoop() {
  update();
  draw();
}

document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowUp':
      player.dx = 0;
      player.dy = -1;
      break;
    case 'ArrowDown':
      player.dx = 0;
      player.dy = 1;
      break;
    case 'ArrowLeft':
      player.dx = -1;
      player.dy = 0;
      break;
    case 'ArrowRight':
      player.dx = 1;
      player.dy = 0;
      break;
  }
});

setInterval(gameLoop, 150);
