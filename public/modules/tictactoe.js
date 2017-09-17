const WIN_SOLUTIONS = [ 
  [1,2,3], 
  [4,5,6], 
  [7,8,9],
  [1,4,7], 
  [2,5,8], 
  [3,6,9],
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
    this.possibleIndexes = [];
    this.countPossible();
  }

  setHuman(char) {
    this.human = char;
  }

  setComputer(char) {
    this.computer = char;
  }

  countPossible() {
    this.possibleIndexes = [];
    $('.field').each((index, elem) => {
      if($(elem).html() == '') {
        let id = parseInt($(elem).attr('id'));
        this.possibleIndexes.push(id);
      }
    });
  }

  userChose(id) {
    this.humanMove.push(parseInt(id));
    this.busyIndexes.push(parseInt(id));
    $(`#${id}`).html(this.human);
    this.countPossible();
    this.detectWin(this.humanMove, "human");
    this.computerChoose();
  }

  computerChoose() {
    let possibleMove = this.possibleIndexes;
    console.log(possibleMove);
    let win;

    for(let i=0; i<possibleMove.length;i++) {
      console.log("Sprawdzam dla ruchu: ", possibleMove[i]);
      // sprawdzam gdyby ten ruch był na człowieku
      this.humanMove.push(possibleMove[i])
      win = this.detectWin(this.humanMove, "human");
      if(win) {
        console.log("win dla człowieka");
        // usuam tel elemnt z tablicy ruchow czlowieka
        this.humanMove.pop();
        this.computerMoves.push(possibleMove[i]);
        this.busyIndexes.push(possibleMove[i]);
        $(`#${possibleMove[i]}`).html(this.computer);
        console.log("human arr ", this.humanMove, "\n computer ", this.computerMoves);
        return;
      }
      else {
        this.humanMove.pop();
      }

      this.computerMoves.push(possibleMove[i]);
      win = this.detectWin(this.computerMoves, "computer");
      this.computerMoves.pop();
      if(win) {
        console.log("win dla compa");
        this.computerMoves.push(possibleMove[i]);
        this.busyIndexes.push(possibleMove[i]);
        $(`#${possibleMove[i]}`).html(this.computer);
        console.log("human arr ", this.humanMove, "\n computer ", this.computerMoves);
        return;
      }
    }
    let temp = this.busyIndexes;
    for(let j=0; j<AI_BEST_MOVE.length; j++) {
      if(!temp.includes(AI_BEST_MOVE[j])) {
        this.computerMoves.push(AI_BEST_MOVE[j]);
        this.busyIndexes.push(AI_BEST_MOVE[j]);
        $(`#${AI_BEST_MOVE[j]}`).html(this.computer);
        console.log("biore z najlepszych ruchow");
        console.log("human arr ", this.humanMove, "\n computer ", this.computerMoves);
        return;
      }
    }
    
    this.countPossible();
  }

  detectWin(moveArr, player) {
    let victory = false;
    let count = 0;
    if(moveArr.length >= 3) {
      console.log(player, "   ", moveArr);
      for(let i=0; i<WIN_SOLUTIONS.length;i++) {
        let win = WIN_SOLUTIONS[i];
        for(let j=0;j<moveArr.length;j++) {
          if(win.includes(moveArr[j])) {
            count += 1;
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
      // alert(`Winner ${player}`);
    }

    // if(this.busyIndexes == 9 && !victory) {
    //   alert("DRAW!");
    // }

    return victory;
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