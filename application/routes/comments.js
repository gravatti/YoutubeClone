var express = require('express');
const { isLoggedIn } = require('../middleware/auth');
var router = express.Router();
var db = require('../conf/database')

router.post('/create', isLoggedIn, async function(req, res, next){
    console.log(req.body);
    var {userId, username} = req.session.user;
    var {postId, comment} = req.body;

    try {
        var [insertResult, _ ] = db.execute(
            `INSERT INTO comments (text,fk_postId,fk_authorId) VALUE (?,?,?)`,
            [comment,postId,userId]
        );
        console.log(insertResult);

        if (insertResult && insertResult.affectedRows == 1) {
            return res.status(201).json({
                commentId: insertResult.insertId,
                username: username,
                commentText: comment,
            });
        } else {
            res.json({
                message:"error"
            })

        }
    } catch (error) {
        next(error);
    }

    
});

module.exports = router;