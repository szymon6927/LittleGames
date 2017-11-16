var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    welcomeMessage: "Witaj na stronie projektu LittleGames",
    chooseInfo: "Wybierz grę w którą chcesz zagrać"
   });
});

module.exports = router;
