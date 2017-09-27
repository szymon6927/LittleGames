var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/snake', { useMongoClient: true });
var Schema = mongoose.Schema;

var schema = new Schema({
  nickname: {type: String, required: true},
  score: {type: Number, required: true}
},{ collection : 'snake_result' });

var snakeResult = mongoose.model('snake-result', schema);

router.get('/', function(req, res, next) {
  snakeResult.find().sort({ 'score': 'desc'}).limit(5)
    .then(function(result) {
      console.log(result);
      res.render('snake/snake', {
        title: 'Snake',
        text: 'Prosta gra Snake',
        result: result
      });
    });
});

router.post('/save-result', function(req, res) {
  let info = {
    nickname: req.body.nickname,
    score: req.body.score
  }
  let result = new snakeResult(info);
  result.save();

  console.log("server", info);
})

module.exports = router;