var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");


// Root Route 
router.get("/", function(req, res) {
   res.render("landing"); 
});

// Show Register Form
router.get("/register", function(req, res){
   res.render("register", {page: 'register'}); 
});


// Sign Up Logic
router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
   User.register(newUser, req.body.password, function(err, user) {
      if(err){
            console.log(err);
            return res.render("register", {error: err.message});
        }    
      passport.authenticate("local")(req, res, function(){
         req.flash("success", "Welcome to YelpSurf " + user.username); 
         res.redirect("/surfspots"); 
      });
   });
});

// Show Login Form
router.get("/login", function(req, res){
   res.render("login", {page: 'login'}); 
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
