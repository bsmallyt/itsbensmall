let square = 25;
let rectXSize = square;
let rectYSize = square;
let rectX = rectXSize / 2;
let rectY = rectYSize / 2;
var blockX = 25 - rectX;
var blockY = 25 - rectY;
var isClicked = false;

var mouseX = 0;
var mouseY = 0;

class particle {
  constructor(pos_x, pos_y, vel_x, vel_y, size_x, size_y) {
    this.pos_x = pos_x;
    this.pos_y = pos_y;
    this.vel_x = vel_x;
    this.vel_y = vel_y;
    this.size_x = size_x;
    this.size_y = size_y;
    this.mass = (size_x * size_y) / 2.5;
  }
  border(ctx) {
    if ((this.pos_y + this.size_y) > ctx.canvas.height) {
      this.pos_y = ctx.canvas.height - this.size_y;
    }
    if (this.pos_y < 0) {
      this.pos_y = 0;
    }
    if ((this.pos_x + this.size_x) > ctx.canvas.width) {
      this.pos_x = ctx.canvas.width - this.size_x;
    }
    if (this.pos_x < 0) {
      this.pos_x = 0;
    }
  }
  mouse(ctx, x, y) {
    this.vel_x = 0;
    if (this.vel_y < 0) {
      this.vel_y = 0;
    }
    var force_x = (this.pos_x - x);
    var force_y = (this.pos_y - y) * 3.5;
    this.move(ctx, force_x, force_y);
  }
  move(ctx, force_x, force_y) {
    var acceleration = {x : force_x/this.mass, y : force_y/this.mass};
    this.vel_x += acceleration.x;
    this.vel_y += acceleration.y;
    this.pos_x -= this.vel_x;
    this.pos_y -= this.vel_y;
    this.border(ctx);
  }
  get_dest() {
    return {x : this.pos_x, y: this.pos_y};
  }
}

export function startGame(ctx, canvas) { 
  const cube = new particle((ctx.canvas.width / 2) - (20 / 2), 40 - (20 / 2), 0, 0, 20, 20);

  function getMouse(event) {
    const rect = canvas.getBoundingClientRect();
    mouseX = event.clientX - rect.left;
    mouseY = event.clientY - rect.top;
  }

  function handleClick(event) {
    isClicked = true;
  }

  function gameLoop() {
    setTimeout(1000);

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    if (isClicked) {
      blockX = mouseX - rectX;
      blockY = mouseY - rectY;

      cube.mouse(ctx, mouseX, mouseY);

      isClicked = false;
    }

    ctx.fillStyle = 'red';
    //ctx.fillRect(blockX, blockY, rectXSize, rectYSize);

    if ((blockY) < (ctx.canvas.height - rectYSize)) {
      blockY+=5;
    }

    //---------------------------------------------------------
    //Cube simulation trial.
    //cube.simulate();
    cube.move(ctx, 0, -9.81);
    var pos = cube.get_dest()
    ctx.fillRect(pos.x, pos.y, cube.size_x, cube.size_y);

    requestAnimationFrame(gameLoop); 
  }
  
  canvas.addEventListener('click', handleClick);
  canvas.addEventListener('click', getMouse);
  gameLoop();
}

export function resize(canvas) {
  if (blockY >= (canvas.height - rectYSize)) {
    blockY = canvas.height - rectYSize;
  }
  if (blockX >= (canvas.width - rectXSize)) {
    blockX = canvas.width - rectXSize;
  }
}
