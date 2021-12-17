var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('user router get')
  res.send({'message':'node get success'});
});

/* Post users listing. */
router.post('/', function(req, res, next) {
  console.log('user router post')
  res.send({'message':'node post success'});
});

module.exports = router;