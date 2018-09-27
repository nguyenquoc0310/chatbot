var express = require('express');
var router = express.Router();

var chatExecute = require('../public/javascripts/chat-execute');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Content. */
router.get('/analyze/:message', function(req, res, next) {
  var message = req.params.message;

  chatExecute.execute(message).then((result)=>{
    return res.json(result);
  });
});

module.exports = router;
