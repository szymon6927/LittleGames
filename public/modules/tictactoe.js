const X = "X";
const O = "O";

class TicTacToe {
  constructor() {
    console.log("tic tac toe");
    this.addChar();
  }
  addChar() {
    $('.field').click(function() {
      console.log("click", X);
      $(this).html(X);
    });
  }
}

tictactoe = new TicTacToe;