var express = require("express");
var router = express.Router();
var passport = require("passport");

var sightingController = require("../controllers/sightingController");
var userController = require("../controllers/userController");

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

// GET in via passport with username and password
// router.post('/login', passport.authenticate('local-login', {
//   successRedirect: '/',
//   failureRedirect: '/users/signin',
//   failureFlash: true
// }))

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

/* GET sightings for admin dash for front end */
router.get(
  "/get-dash-sightings",
  passport.authenticate("jwt", { session: false }),
  function(req, res, next) {
    sightingController
      .getAllSightings()
      .then(sightings => {
        res.send(sightings);
      })
      .catch(error => {
        res.json(error);
      });
  }
);

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

// POST in and get a token
router.post("/signin", function(req, res, next) {
  jwtController
    .login(req.body)
    .then(token => {
      res.json(token);
    })
    .catch(error => {
      res.json(error);
    });
});

/* POST a new user. */
router.post("/signup", function(req, res, next) {
  console.log('it is hit the signup url backend : ', req.body);
  
  userController.signUp(req.body)
  .then( token => {
    res.json(token)
  })
  .catch( error => {
    res.status(400).json(error);
  })
});

router.post("/login", function(req, res, next) {
  userController.login(req.body)
  .then( user => {
    res.json(user)
  })
  .catch( error => {
    console.log('error: ', error);
    
    res.status(400).json(error);
    //when we use axios, we have to add status like above as axios set status code 200 by default
  })
});

router.post('/signupandloginfb', function(req, res) {
  console.log("Hit the route /signupandloginfb at users.js");
  
 userController.signupAndLogInFB(req.body)
               .then( user => {
                 console.log(user)
                 res.json(user);
               })
               .catch( error => {
                 console.log(error)
                 //res.json(error);
                 res.status(error.status).json(error.message);
               })
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

/* POST a Sighting Approval */
router.post(
  "/admin-dashboard/approve-sighting",
  passport.authenticate("jwt", { session: false }),
  function(req, res, next) {
    sightingController
      .approveSighting(req)
      .then(sighting => {
        res.json(sighting);
      })
      .catch(error => {
        res.json(error);
      });
  }
);

/* POST a Sighting Rejection */
router.post(
  "/admin-dashboard/reject-sighting",
  passport.authenticate("jwt", { session: false }),
  function(req, res, next) {
    sightingController
      .rejectSighting(req)
      .then(sighting => {
        res.json(sighting);
      })
      .catch(error => {
        res.json(error);
      });
  }
);

module.exports = router;
