var express = require('express');
var router = express.Router();
var db = require('../conf/database');
var bcrypt = require('bcrypt')
var { isLoggedIn, isMyProfile } = require("../middleware/auth");
const { isUsernameUnique, usernameCheck, passwordCheck, emailCheck, tosCheck, ageCheck, isEmailUnique } = require('../middleware/validation');
const { getPostsForUserBy } = require('../middleware/posts');

//localhost:3000/users/registration
router.post(
  '/registration', 
  usernameCheck,
  passwordCheck,
  emailCheck,
  //tosCheck,
  //ageCheck, 
  isUsernameUnique,
  isEmailUnique,
  async function(req, res, next){
  var {email, username, password} = req.body;
  try {

    var hashedPassword = await bcrypt.hash(password, 3);

    //insert
    var [resultObject, fields] = await db.execute(`INSERT INTO users
    (email, username, password)
    value
    (?,?,?);`,[email, username, hashedPassword]);
    //respond
    if (resultObject && resultObject.affectedRows) {
      return res.redirect('/login');
    } else {
      return res.redirect("/registration");
    }

  } catch (error) {
    next(error);
  }
})


router.post('/login', async function(req, res, next) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.redirect("/login");
  } else {
    try {
      // check username exists and password matches
      var [rows, fields] = await db.execute(
        `SELECT id, username, password, email FROM users WHERE username = ?;`,
        [username]
      );
      // Send to profile if user exists, reattempt login otherwise 
      var user = rows[0];
      if (!user) {
        req.flash("error", `Log In Failed: User does not exist.`)
        req.session.save(function(err){
          return res.redirect('/login');
        })
      } else {
        
        var passwordsMatch = await bcrypt.compare(password, user.password);
        if (passwordsMatch) {
          req.session.user = {
            userId: user.id,
            email: user.email,
            username: user.username
          };
          req.flash("success",`You have successfully logged in`)
          req.session.save(function(err){
            return res.redirect('/');
          })
        } else {
          req.flash("error", `Log In Failed: Invalid Username or Password`)
          req.session.save(function(err){
            return res.redirect('/login');
          })
        }
      }
    } catch (error) {
      // Handle the error appropriately, for example:
      console.error(error);
      return res.status(500).send("Internal Server Error");
    }
}});

router.use(function(req,res,next) {
  if (req.session.user) {
    next();
  }else{
    return res.redirect('/login')
  }
})

router.get('/profile/:id(\\d+)',isLoggedIn ,isMyProfile ,getPostsForUserBy ,function(req, res) {
  console.log(req.params)
  res.render('profile', {title: 'Profile'});
})

router.post("/logout", function(req, res, next) {
  req.session.destroy(function(err) {
    if (err) {
      next(error)
    } else {
      return res.redirect('/')
    }
  })
});



/* GET users listing. */
module.exports = router;
