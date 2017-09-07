var express = require('express');
var router = express.Router();

var BitMarket = require('../modules/script.js');

let bitmarket = new BitMarket()
let info = bitmarket.cronRun();
// console.log(info);

router.get('/', function(req, res, next) {
  res.render('bitmarket/page', {
    title: 'Bitmarket',
    text: 'Moje opracowanie api z bitmarket',
    info: info
  });
});

module.exports = router;