const CELLS_WIDTH = 20;
const CANVAS = $('#snake')[0];
const CANVAS_WIDTH = $('#snake').width();
const CANVAS_HEIGHT = $('#snake').height();
const CTX = CANVAS.getContext("2d");
var GAME_LOOP = null;

class SnakeGame {
  constructor() {
    console.log("Snake game");
    this.snakeArray = [];
    this.food = {
      x: 0,
      y: 0
    };
    this.direction = "right" // defult direction
    this.score = 0;
    this.player = "";
    this.init();
    this.keyboardControl();
  }

  setPlayerName(nicname) {
    this.player = nicname;
  }

  drawBoard() {
    CTX.fillStyle= "black";
    CTX.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }

  createSnake() {
    let startLength = 3;
    for(let i=0; i<startLength;i++) {
      this.snakeArray.push({x: i, y: 0});
    }
  }

  createFood() {
    let width = CANVAS_WIDTH;
    let height = CANVAS_HEIGHT;
    let cellsW = CELLS_WIDTH;

    let randomX = Math.round(Math.random()*(width-cellsW)/cellsW);
    let randomY = Math.round(Math.random()*(height-cellsW)/cellsW);

    console.log(randomX, randomY);

    let head = this.snakeArray[this.snakeArray.length - 1];
    let tail = this.snakeArray[0];

    // for(let j in this.snakeArray) {
      if(randomX != head.x && randomY != tail.y) {
        this.food.x = randomX;
        this.food.y = randomY;
      }
      else {
        this.createFood();
      }
    // }
  } 

  drawCells(x, y, color) {
    CTX.fillStyle = color;
		CTX.fillRect(x*CELLS_WIDTH, y*CELLS_WIDTH, CELLS_WIDTH, CELLS_WIDTH);
		CTX.strokeRect(x*CELLS_WIDTH, y*CELLS_WIDTH, CELLS_WIDTH, CELLS_WIDTH);
  }

  init() {
    this.drawBoard();
    this.snakeArray = [];
    
    this.createSnake();
    this.createFood();

    this.drawCells(this.food.x, this.food.y, "#3498DB");
    
    for(let i=0; i<this.snakeArray.length;i++) {
      this.drawCells(this.snakeArray[i].x, this.snakeArray[i].y, "#E74C3C");
    }
  }

  keyboardControl() {
    $(document).keydown((e) => {
      let key = e.which;
      if(key == "37" && this.direction != "right") {
        this.direction = "left"; 
      }
      else if(key == "38" && this.direction != "down") this.direction = "up";
      else if(key == "39" && this.direction != "left") this.direction = "right";
      else if(key == "40" && this.direction != "up") this.direction = "down";
    })
  }

  checkCollision(x,y,arr) {

    for(let j in arr) {
      if(arr[j].x == x && arr[j].y == y) {
        clearInterval(GAME_LOOP);
        return true;
      }
    }
    return false;
  }

  game() {
    this.drawBoard();

    let snakeLast = this.snakeArray[this.snakeArray.length-1];
    let snakeHead_x = snakeLast.x;
    let snakeHead_y = snakeLast.y;
    
    if(this.direction == "right") snakeHead_x++;
		else if(this.direction == "left") snakeHead_x--;
		else if(this.direction == "up") snakeHead_y--;
    else if(this.direction == "down") snakeHead_y++;
    
    if(this.checkCollision(snakeHead_x, snakeHead_y, this.snakeArray)) {
      alert("Looser");
      this.init();
      $('#start_snake').attr("disabled", false);
      $('#start_snake').html("Rozpocznij");
      return;
    };

    if(snakeHead_x == -1) {
      snakeHead_x = CANVAS_WIDTH/CELLS_WIDTH - 1;
    }
    if(snakeHead_y == -1) {
      snakeHead_y = CANVAS_HEIGHT/CELLS_WIDTH - 1;
    }
    if(snakeHead_x == CANVAS_WIDTH/CELLS_WIDTH) {
      snakeHead_x = 0;
    }
    if(snakeHead_y == CANVAS_HEIGHT/CELLS_WIDTH) {
      snakeHead_y = 0;
    }

    let tail;
    if(snakeHead_x == this.food.x && snakeHead_y == this.food.y) {
      tail = {x: snakeHead_x, y: snakeHead_y};
      this.score++;
      this.createFood();
    }
    else {
      tail = this.snakeArray[0];
      tail.x = snakeHead_x; 
      tail.y = snakeHead_y;
      this.snakeArray.shift();
    }
    
    this.snakeArray.push(tail);
    
    for(let i=0; i<this.snakeArray.length;i++) {
      this.drawCells(this.snakeArray[i].x, this.snakeArray[i].y, "#E74C3C"); // rysowanie snake'a
    }

    this.drawCells(this.food.x, this.food.y, "#3498DB"); // rysowanie jedzenia

    let scoreText = `Punkty: ${this.score}`;
    let playerText = `Gracz: ${this.player}`;
    CTX.font="14px monospace";
    CTX.fillStyle="#CACACA";
    CTX.fillText(scoreText, 5, CANVAS_HEIGHT-10);
    CTX.fillStyle="#14CC14";
    CTX.fillText(playerText, CANVAS_WIDTH-150, CANVAS_HEIGHT-10);
  }

  gameLoop() {
    GAME_LOOP = setInterval( () => {
      this.game()
    },100)
  }
}

$(document).ready(function() {
  let snakeGame = new SnakeGame();
  $('#start_snake').click(function() {
    let nickname = $('#nickname').val();
    if(nickname) {
      $('#start_snake').html("WZNÓW")
      $(this).attr("disabled", true);
      snakeGame.setPlayerName(nickname)
      snakeGame.gameLoop();
    }
    else {
      alert("Podaj nazwę gracza");
    }
  })
  $('#stop_snake').click(function() {
    clearInterval(GAME_LOOP);
    $('#start_snake').attr("disabled", false);
  });
});