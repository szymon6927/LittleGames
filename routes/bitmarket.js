var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('bitmarket/page', {
    title: 'Bitmarket',
    text: 'Moje opracowanie api z bitmarket',
    info: 'info'
  });
});

module.exports = router;