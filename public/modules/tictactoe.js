const WIN_SOLUTIONS = [ 
  [1,2,3], 
  [4,5,6], 
  [7,8,9],
  [1,4,7], 
  [2,5,8], 
  [3,5,6],
  [1,5,9], 
  [3,5,7]
]

var AI_BEST_MOVE = [5, 1, 3, 7, 9, 2, 4, 6, 8]

class TicTacToe {
  constructor() {
    this.human = '';
    this.computer = '';
    this.humanMove = [];
    this.computerMoves = [];
    this.busyIndexes = [];
  }

  setHuman(char) {
    this.human = char;
  }

  setComputer(char) {
    this.computer = char;
  }

  userChose(id) {
    this.humanMove.push(parseInt(id));
    this.busyIndexes.push(parseInt(id));
    $(`#${id}`).html(this.human);
    this.detectWin(this.humanMove, "human");
    this.computerChoose();
  }

  computerChoose() {
    let temp = this.busyIndexes;

    for(let i=0; i<AI_BEST_MOVE.length; i++) {
      if(!temp.includes(AI_BEST_MOVE[i])) {
        this.computerMoves.push(AI_BEST_MOVE[i]);
        this.busyIndexes.push(AI_BEST_MOVE[i]);
        $(`#${AI_BEST_MOVE[i]}`).html(this.computer);
        break;
      }
    }

    this.detectWin(this.computerMoves, "computer");
  }

  detectWin(moveArr, player) {
    let victory = false;
    let temp = moveArr;
    let count = 0;
    if(temp.length >= 3) {
      console.log(player, "   ", moveArr);
      for(let i=0; i<WIN_SOLUTIONS.length;i++) {
        let win = WIN_SOLUTIONS[i];
        for(let j=0;j<temp.length;j++) {
          if(win.includes(temp[j])) {
            console.log(temp[j], win[j])
            count += 1;
            console.log(count);
          }
        }
        if(count == 3) {
          victory = true;
          console.log("win", win);
          break;
        }
        count = 0;
      }
    }

    if(victory) {
      console.log(`Winner ${player}`);
      alert(`Winner ${player}`);
    }

    if(this.busyIndexes == 9 && !victory) {
      alert("DRAW!");
    }
  }

  clear() {
    console.log("clean click");
    this.humanMove = [];
    this.computerMoves = [];
    this.busyIndexes = [];
    $('.field').each((index, elem) => {
      $(elem).html('');
    });
  }
}

$(document).ready(function() {
  $('.modal').modal();
  var tictactoe = new TicTacToe();
  var userSelect;
  var AI_char;

  $('.modal-close').click(function() {
    if($('#char_x').is(':checked')) {
      userSelect = $('#char_x').val();
      AI_char = $('#char_o').val();
    }
    if($('#char_o').is(':checked')) {
      userSelect = $('#char_o').val();
      AI_char = $('#char_x').val();
    }
    tictactoe.setHuman(userSelect);
    tictactoe.setComputer(AI_char);
    tictactoe.clear();
  })

  $('.field').click((event) => {
    let elem_id = $(event.currentTarget).attr('id');
    tictactoe.userChose(elem_id);
  });

  $('.clear').click((event) => {
    tictactoe.clear();
  });
})