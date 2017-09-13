var express = require('express');
var router = express.Router();

var BitMarket = require('../modules/script.js');

let bitmarket = new BitMarket()
// bitmarket.cronRun();


router.get('/', function(req, res, next) {
  bitmarket.askAPI()
    .then(info => {
      res.render('bitmarket/page', {
        title: 'Bitmarket',
        text: 'Moje opracowanie api z bitmarket',
        info: info
      });
    })
});

module.exports = router;