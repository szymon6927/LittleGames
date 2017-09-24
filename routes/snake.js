var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('snake/snake', {
    title: 'Snake',
    text: 'Prosta gra Snake'
  });
});

module.exports = router;