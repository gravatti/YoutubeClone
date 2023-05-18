var express = require('express');
var router = express.Router();
var db = require('../conf/database');

router.get('/', async function(req, res, next){
  try {
    let [rows, fields] = await db.query(`select * from users;`);
    res.status(200).json({rows, fields})
  } catch (error) {
    next(error)
  }
});

/* GET users listing. */
module.exports = router;
