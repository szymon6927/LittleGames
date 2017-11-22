var express = require('express');
var router = express.Router();

/* GET home page. */
GAMES = {
  snake: {
    title: 'Snake',
    description: 'Zagraj w najpopularnijeszą grę wszechczasów, znanego i słynnego węża. Zdobądź jak najwięcej puntków i zostań mistrzem',
    image: '/img/snakes-and-ladders.svg',
    url: '/snake'
  },
  tictactoe: {
    title: 'Kółko i krzyżyk',
    description: 'Zagraj w kółko i krzyżyk. Sprawdź czy uda Ci się pokonać najlepszego gracza jakim jest komputer',
    image: '/img/tictactoe.svg',
    url: '/tictactoe'
  }
}

router.get('/', function(req, res, next) {
  res.render('index', { 
    welcomeMessage: "Witaj na stronie projektu LittleGames",
    chooseInfo: "Wybierz grę w którą chcesz zagrać",
    games: GAMES
   });
});

module.exports = router;
