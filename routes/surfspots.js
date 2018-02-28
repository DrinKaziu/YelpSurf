var express = require("express");
var router = express.Router();
var Surfspot = require("../models/surfspot");
var middleware = require("../middleware");
var NodeGeocoder = require('node-geocoder');
var options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: process.env.GOOGLE_MAPS_API_KEY
};
var geocoder = NodeGeocoder(options);


//INDEX - Show All Surf Spots
router.get("/surfspots", function(req, res){
    // Get all surfspots from DB
    Surfspot.find({}, function(err, allSurfspots){
       if(err){
           console.log(err);
       } else {
          res.render("surfspots/index",{surfspots: allSurfspots, page: 'surfspots'});
       }
    });
});

// Create Route
router.post("/surfspots", middleware.isLoggedIn, function(req, res) {
    var name = req.body.name;
    var cost = req.body.cost;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
        geocoder.geocode(req.body.location, function (err, data) {
            if(err || data.status === "ZERO_RESULTS" || !data.length) {
                   req.flash("error", "Invalid address - try typing a new location");
                   return res.redirect("back");
               }
            var lat = data[0].latitude;
            var lng = data[0].longitude;
            var location = data[0].formattedAddress;
            var newSurfSpot = {name: name, cost: cost, image: image, description: desc, author: author, location: location, lat: lat, lng: lng};
        Surfspot.create(newSurfSpot, function(err, newlyCreatedSpot) {
            if(err) {
                console.log("Something Went Wrong");
                console.log(err);
            } else {
                res.redirect("/surfspots");
            }
        });
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
        geocoder.geocode(req.body.location, function (err, data) {
            if(err || data.status === "ZERO_RESULTS" || !data.length) {
                   req.flash("error", "Invalid address - try typing a new location");
                   return res.redirect("back");
               }
            var lat = data[0].latitude;
            var lng = data[0].longitude;
            var location = data[0].formattedAddress;
            var newData = {name: req.body.name, image: req.body.image, description: req.body.description, cost: req.body.cost, location: location, lat: lat, lng: lng};
        Surfspot.findByIdAndUpdate(req.params.id, req.body.surfspot, function(err, updatedSurfspot) {
           if(err) {
               res.redirect("/surfspots");
           } else {
               res.redirect("/surfspots/" + req.params.id);
           }
       });
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