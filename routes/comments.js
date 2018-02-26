var express = require("express");
var router = express.Router();
var Surfspot = require("../models/surfspot");
var Comment = require("../models/comment");
var middleware = require("../middleware");


// Comments New
router.get("/surfspots/:id/comments/new", middleware.isLoggedIn, function(req, res) {
    Surfspot.findById(req.params.id, function(err, surfspot) {
        if(err) {
            console.log(err);
        } else {
            res.render("comments/new", {surfspot: surfspot});
        }
    });
});


// Comments Create
router.post("/surfspots/:id/comments", middleware.isLoggedIn, function(req, res) {
    Surfspot.findById(req.params.id, function(err, surfspot) {
        if(err) {
            console.log(err);
            res.redirect("/surfspots");
        } else {
            Comment.create(req.body.comment, function(err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    surfspot.comments.push(comment);
                    surfspot.save();
                    req.flash("error", "Comment added!!");
                    res.redirect("/surfspots/" + surfspot._id);                }
            });
        }
    });
});

// Comment Edit Route
router.get("/surfspots/:id/comments/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
       if (err) {
           res.redirect("back");
       } else {
           res.render("comments/edit", {surfspot_id: req.params.id, comment: foundComment});
       }
    });
});

// Comment Update Route
router.put("/surfspots/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
       if(err) {
           res.redirect("back");
       } else {
           res.redirect("/surfspots/" + req.params.id);
       }
    });
});

//Comment Destroy Route
router.delete("/surfspots/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res) {
   Comment.findByIdAndRemove(req.params.comment_id, function(err) {
       if(err) {
           res.redirect("back");
       } else {
           req.flash("success", "Comment Deleted!");
           res.redirect("/surfspots/" + req.params.id);
       }
   });
});

module.exports = router;
