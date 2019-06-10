var express = require('express');
var router = express.Router();
var passport = require("passport");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Mapping Mothman Admin' });
});

/* JWT tests */
router.get("/jwt", passport.authenticate("jwt", { session: false }), function(
  req,
  res,
  next
) {
  res.send("thanks for hitting the api");
});

router.get('/token', function(req, res, next) {
  res.json(req.headers);
});

module.exports = router;
