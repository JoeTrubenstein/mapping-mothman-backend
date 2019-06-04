var express = require("express");
var router = express.Router();
var passport = require('passport')

var sightingController = require("../controllers/sightingController");

var userController = require("../controllers/userController");

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

// GET in via passport with username and password
router.post('/signin', passport.authenticate('local-login', {
  successRedirect: '/',
  failureRedirect: '/users/signin',
  failureFlash: true
}))

/* POST a new user. */
router.post("/signup", function(req, res, next) {
  userController.signUp(req.body)
  .then( user => {
    res.json(user)
  })
  .catch( error => {
    res.json(error)
  })
});

/* POST a Sighting */
router.post(
  "/new-sighting", function(req, res, next) {
    sightingController.newSighting(req.body)
    .then( sighting => {
        res.json(sighting)
    })
    .catch(error => {
      res.json(error)
    })
   } );


module.exports = router;
