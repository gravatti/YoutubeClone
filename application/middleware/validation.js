var validator = require('validator');
var db = require("../conf/database");
module.exports = {
    usernameCheck: function(req,res,next){
        var {username} = req.body;
        username = username.trim();
        if (!validator.isLength(username, {min:3})) {
            req.flash("error", "Username must be 3 or more characters.");
        }

        if (!/[a-zA-Z]/.test(username.charAt(0))) {
            req.flash("error", "Username must begin with a character.");
        }

        if (req.session.flash.error) {
            res.redirect('/registration');
        } else {
            next();
        }
    },
    passwordCheck: function(req,res,next){
        var {password} = req.body;
        password = password.trim();
        if (!validator.isStrongPassword(password)) {
            req.flash("error", "Password is insufficient.");
        }

        if (req.session.flash.error) {
            res.redirect('/registration');
        } else {
            next();
        }
    },
    emailCheck: function(req,res,next){
        var {email} = req.body;
        email = email.trim();
        if (!validator.isEmail(email)) {
            req.flash("error", "Please enter a valid email.");
        }

        if (req.session.flash.error) {
            res.redirect('/registration');
        } else {
            next();
        }
    },
    //tosCheck: function(req,res,next){},
    //ageCheck: function(req,res,next){},
    isUsernameUnique: async function(req,res,next){
        var {username} = req.body;
        try {
            var [rows, fields] = await db.execute(`select id from users where username=?;`,[username])
            if (rows && rows.length > 0) {
                req.flash("error", `${username} is already taken.`);
                return req.session.save(function (err){
                    return res.redirect('/registration');
                });
            }else{
                next();
            }
        } catch (error) {
            next(error);
        }
    },
    isEmailUnique: async function(req,res,next){
        var {email} = req.body;
        try {
            //check email unique
            var [rows, fields] = await db.execute(`select id from users where email=?;`,[email])
            if (rows && rows.length > 0) {
                req.flash("error", `${email} is already taken.`);
                return req.session.save(function (err){
                    return res.redirect('/registration');
                });
            }else{
                next();
            }
        } catch (error) {
            next(error);
        }
    },
}