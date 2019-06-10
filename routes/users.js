var express = require("express");
var router = express.Router();
var passport = require("passport");

var sightingController = require("../controllers/sightingController");
var jwtController = require("../controllers/jwtController");
var userController = require("../controllers/userController");

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

/* GET all Sightings for admin */
router.get("/admin-dashboard", function(req, res, next) {
  sightingController
    .getAllSightings()
    .then(sightings => {
      res.render("dash", {
        title: "Welcome Mothman Admin",
        sightings: sightings
      });
    })
    .catch(error => {
      res.json(error);
    });
});

/* GET all Sightings for front end */
router.get("/get-sightings", function(req, res, next) {
  sightingController
    .getAllSightings()
    .then(sightings => {
      res.send(sightings);
    })
    .catch(error => {
      res.json(error);
    });
});

/* GET a Sighting by ID for review */
router.get("/admin-dashboard/:id", function(req, res, next) {
  sightingController
    .reviewSighting(req)
    .then(sighting => {
      res.render("review", {
        title: "Welcome Mothman Admin",
        sighting: sighting
      });
    })
    .catch(error => {
      res.json(error);
    });
});

// POST in
router.post("/signin", function(req, res, next) {
  jwtController
    .login(req.body)
    .then(user => {
      res.json(user);
    })
    .catch(error => {
      res.json(error);
    });
});

/* POST a new user. */
router.post("/signup", function(req, res, next) {
  userController
    .signUp(req.body)
    .then(user => {
      res.json(user);
    })
    .catch(error => {
      res.json(error);
    });
});

/* POST a Sighting */
router.post("/new-sighting", function(req, res, next) {
  sightingController
    .newSighting(req.body)
    .then(sighting => {
      res.json(sighting);
    })
    .catch(error => {
      res.json(error);
    });
});

/* GET a Sighting Approval */
router.get("/admin-dashboard/approve-sighting/:id", function(req, res, next) {
  sightingController
    .approveSighting(req)
    .then(sighting => {
      res.redirect("../../admin-dashboard");
    })
    .catch(error => {
      res.json(error);
    });
});

/* GET a Sighting Rejection */
router.get("/admin-dashboard/reject-sighting/:id", function(req, res, next) {
  sightingController
    .rejectSighting(req)
    .then(sighting => {
      res.redirect("../../admin-dashboard");
    })
    .catch(error => {
      res.json(error);
    });
});

module.exports = router;
