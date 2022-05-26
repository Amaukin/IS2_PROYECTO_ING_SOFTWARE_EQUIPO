var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/directivasDockerfile', function(req, res, next) {
  res.render('directivasDockerfile', { title: 'Directivas Dockerfile' });
});

module.exports = router;
