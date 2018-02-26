var express = require("express");
var router = express.Router();
var Surfspot = require("../models/surfspot");
var middleware = require("../middleware");


// Index Route
router.get("/surfspots", function(req, res) {
    Surfspot.find({}, function(err, allSurfspots) {
        if(err) {
            console.log(err);
        } else {
            res.render("surfspots/index", {surfspots: allSurfspots});
        }
    });
});

// Create Route
router.post("/surfspots", middleware.isLoggedIn, function(req, res) {
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newSurfSpot = {name: name, price: price, image: image, description: desc, author: author};
    Surfspot.create(newSurfSpot, function(err, newlyCreatedSpot) {
        if(err) {
            console.log("Something Went Wrong");
            console.log(err);
        } else {
            res.redirect("/surfspots");
        }
    });
});

// New Route
router.get("/surfspots/new", middleware.isLoggedIn, function(req, res) {
    res.render("surfspots/new");
});


// Show Route
router.get("/surfspots/:id", function(req, res) {
    Surfspot.findById(req.params.id).populate("comments").exec(function(err, foundSurfspot) {
        if(err) {
            console.log(err);
        } else {
            console.log(foundSurfspot);
            res.render("surfspots/show", {surfspot: foundSurfspot}); 
        }
    });
});

// Edit Route
router.get("/surfspots/:id/edit", middleware.checkSurfspotOwnership, function(req, res) {
    Surfspot.findById(req.params.id, function(err, foundSurfspot) {
        res.render("surfspots/edit", {surfspot: foundSurfspot}); 
    });  
});

// Update Route
router.put("/surfspots/:id", middleware.checkSurfspotOwnership, function(req, res) {
   Surfspot.findByIdAndUpdate(req.params.id, req.body.surfspot, function(err, updatedSurfspot) {
       if(err) {
           res.redirect("/surfspots");
       } else {
           res.redirect("/surfspots/" + req.params.id);
       }
   }); 
});

// Destroy Route
router.delete("/surfspots/:id", middleware.checkSurfspotOwnership, function(req, res) {
    Surfspot.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            res.redirect("/surfspots");
        } else {
            res.redirect("/surfspots");
        }
    });
});

module.exports = router;