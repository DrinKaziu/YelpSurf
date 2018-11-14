var     express = require("express"),
        app = express(),
        bodyParser = require("body-parser"),
        mongoose = require("mongoose"),
        flash = require("connect-flash"),
        passport = require("passport"),
        LocalStrategy = require("passport-local"),
        methodOverride = require("method-override"),
        Surfspot = require("./models/surfspot"),
        Comment = require("./models/comment"),
        User = require("./models/user"),
        seedDB = require("./seeds");

// Requiring Routes
var     surfspotRoutes = require("./routes/surfspots"),
        commentsRoutes = require("./routes/comments"),
        indexRoutes     = require("./routes/index");

var url = process.env.DATABASEURL || "mongodb://localhost/yelp_surf";
mongoose.connect(url);

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB(); // Seed the database

app.locals.moment = require('moment');

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Nacho is the cutest dog",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(indexRoutes);
app.use(commentsRoutes);
app.use(surfspotRoutes);

app.listen(3000, function() {
   console.log("YelpSurf server is listening!!");
});
