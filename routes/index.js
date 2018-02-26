var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");


// Root Route 
router.get("/", function(req, res) {
   res.render("landing"); 
});

// Register Form
router.get("/register", function(req, res) {
   res.render("register"); 
});

// Sign Up Logic
router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
   User.register(newUser, req.body.password, function(err, user) {
      if(err) {
          req.flash("error", err.message);
          return res.redirect("/register");
      } 
      passport.authenticate("local")(req, res, function(){
         req.flash("success", "Welcome to YelpSurf " + user.username); 
         res.redirect("/surfspots"); 
      });
   });
});

// Log In From
router.get("/login", function(req, res) {
   res.render("login"); 
});


// Log In Logic
router.post("/login", passport.authenticate("local", 
    {
     successRedirect: "/surfspots",
     failureRedirect: "/login"   
    }), function(req, res) {
   res.send("logging you in.."); 
});

// Log Out Route
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged you out!!")
    res.redirect("/surfspots");
});


module.exports = router;
