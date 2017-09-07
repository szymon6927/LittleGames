var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  res.render('index', { 
    title: 'Witaj',
    name: 'Mxjhn',
    text: 'Jestes na stronie users, testujemy i uczemy sie routerus w express.js'
  });
});

module.exports = router;
