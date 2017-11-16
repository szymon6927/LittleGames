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
    this.level = '';
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

  setLevel(str) {
    this.level = str;
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
    $(`#${id}`).html(this.human)
    setTimeout(() => {
      this.countPossible();
      // sprawdz ostatecznie wynik wygranej zamin komputer da swój ruch
      this.finalWinner(this.humanMove, "Human");
      this.computerChoose();
    },300);

  }

  computerAdd(elem) {
    this.computerMoves.push(elem);
    this.busyIndexes.push(elem);
    $(`#${elem}`).html(`<em>${this.computer}</em>`)
    console.log("computer po rysowaniu");
    setTimeout(() => {
      this.finalWinner(this.computerMoves, "Computer");
    },300)
  }

  computerChoose() {
    let possibleMove = this.possibleIndexes;
    let win;
    let winVictory;

    for(let i=0; i<possibleMove.length;i++) {
      // sprawdzam gdyby ten ruch był na człowieku
      this.humanMove.push(possibleMove[i])
      win = this.detectWin(this.humanMove, "human")
      winVictory = win.victory;
      if(winVictory) {
        // usuam tel elemnt z tablicy ruchow czlowieka
        this.humanMove.pop();
        this.computerAdd(possibleMove[i]);
        //sprawdz ostateczny wynik wygranje po ruchu komputera
        
        return;
      }
      else {
        this.humanMove.pop();
      }

      this.computerMoves.push(possibleMove[i]);
      win = this.detectWin(this.computerMoves, "computer");
      winVictory = win.victory;
      this.computerMoves.pop();
      if(winVictory) {
        this.computerAdd(possibleMove[i]);
        return;
      }
    }
    let temp = this.busyIndexes;
    console.log("ruch", this.level);
    if(this.level == "low" && temp.length == 1) {
      let item = AI_BEST_MOVE[Math.floor(Math.random()*AI_BEST_MOVE.length)];
      console.log(item)
      this.computerAdd(item);
      return;
    }
    for(let j=0; j<AI_BEST_MOVE.length; j++) {
      if(!temp.includes(AI_BEST_MOVE[j])) {
        this.computerAdd(AI_BEST_MOVE[j])
        return;
      }
    }
  }

  detectWin(moveArr, player) {
    let victory = false;
    let count = 0;
    if(moveArr.length >= 3) {
      for(let i=0; i<WIN_SOLUTIONS.length;i++) {
        let win = WIN_SOLUTIONS[i];
        for(let j=0;j<moveArr.length;j++)  {
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
    }

    return {
      victory: victory,
      player: player
    };
  }

  finalWinner(arr, player) {
    let win = this.detectWin(arr, player);
    let winVictory = win.victory;
    let winPlayer = win.player;
    console.log(`final winner, victory ${winVictory}, player ${winPlayer}`);
    // warunek jeżeli remis
    if(this.possibleIndexes.length == 0 && winVictory == false) {
      // alert("Draw");
      $('#verdict').modal('open');
      $('#verdict .modal-content').html(`
      <div class="final-text">
        <span class="winner-icon"><i class="material-icons">done</i></span>
        <div class="final-text">Gratulacje gra dobiegła końca</div>
        <div class=final-player">Ogłaszam: <strong>remis!</strong></div>
      </div>
    `);
      this.clear();
    }
    if(winVictory) {
      // alert(`Zwyciężca to: ${winPlayer}`);
      $('#verdict').modal('open');
      $('#verdict .modal-content').html(`
        <div class="final-text">
          <span class="winner-icon"><i class="material-icons">done</i></span>
          <div class="final-text">Gratulacje gra dobiegła końca</div>
          <div class=final-player">Zwyciężca to: <strong>${winPlayer}</strong></div>
        </div>
      `);
      this.clear();
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
    this.countPossible();
  }
}

$(document).ready(function() {
  $('.modal').modal();
  var tictactoe = new TicTacToe();
  var userSelect;
  var AI_char;
  var level;

  $('.modal-close').click(function() {
    if($('#char_x').is(':checked')) {
      userSelect = $('#char_x').val();
      AI_char = $('#char_o').val();
    }
    if($('#char_o').is(':checked')) {
      userSelect = $('#char_o').val();
      AI_char = $('#char_x').val();
    }
    if($('#level_master').is(':checked')) {
      level = $('#level_master').val();
    }
    if($('#level_beginner').is(':checked')) {
      level = $('#level_beginner').val();
    }
    tictactoe.setHuman(userSelect);
    tictactoe.setComputer(AI_char);
    console.log("level", level);
    tictactoe.setLevel(level);
    tictactoe.clear();
  })

  $('.field').click((event) => {
    let elem_id = $(event.currentTarget).attr('id');
    let busyElem = tictactoe.busyIndexes;
    console.log("Zajete indkex click", busyElem);
    console.log("kilkniete id", elem_id);
    if(busyElem.includes(parseInt(elem_id))) {
      alert("W tym miejscu jest juz znak");
    }
    else {
      tictactoe.userChose(elem_id);
    }
  });

  $('.clear').click((event) => {
    tictactoe.clear();
  });
})