var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('tictactoe/page', {
    title: 'Tic Tac Toe',
    text: 'Prost gra kółko i krzyżyk'
  });
});


module.exports = router;