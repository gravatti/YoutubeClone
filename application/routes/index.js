var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CSC 317 App', js:["index.js"]});
});

// router.use(function(req,res, next) {
//  console.log("I am a middleware from index.js");
//  next();
// })

router.get('/login', function(req, res) {
  res.render('login', {title: 'Login', js: ["validation.js"]});
})

router.get('/registration', function(req, res) {
  res.render('registration', {title: 'Registration', js: ["validation.js"]});
})

router.get('/postvideo', function(req, res) {
  res.render('postvideo', {title: 'Post Video'});
})

router.get('/viewpost', function(req, res) {  // /:id(\\d+)
  res.render('viewpost', {title: 'View Post'});
})

module.exports = router;
