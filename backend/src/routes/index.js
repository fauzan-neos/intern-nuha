var express = require('express');
var router = express.Router();
const { pool } = require("../config/db");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("DB Error:", err);
  } else {
    console.log("DB Connected:", res.rows);
  }
});

module.exports = router;
