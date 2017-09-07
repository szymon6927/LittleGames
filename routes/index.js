var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Witaj',
    name: 'Mxjhn',
    text: 'Pierwsz testowa strona w typowej technologii fullstack, napisana w Express.js autor:Szymon Miks'
   });
});

module.exports = router;
