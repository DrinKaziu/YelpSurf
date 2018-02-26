var mongoose = require("mongoose");
var Surfspot = require("./models/surfspot");
var Comment = require("./models/comment");

var data = [
    {
        name: "Nosara - Costa Rica", 
        image: "http://www.surfline.com/travel/surfmaps/central_america/costa_rica/nosara.jpg",
        description: "Beatiful remote little town. Fun, consistant waves. Loooove the howler monkeys It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
    },
    {
        name: "Jaco Beach", 
        image: "https://farm5.staticflickr.com/4145/5227958294_d3649b1e68_b.jpg",
        description: "Fun town with lots to do.. great night life. Waves are consistant and fun!! It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
    },
    {
        name: "Playa Hermosa", 
        image: "https://i.ytimg.com/vi/bT5y0knqEjg/maxresdefault.jpg",
        description: "A short 10 minute ride south of Jaco will have you riding big waves in no time. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
    }
];

function seedDB() {
    Surfspot.remove(function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Removed Surfspots"); 
        }
        data.forEach(function(seed) {
            Surfspot.create(seed, function(err, surfspot) {
                if(err) {
                    console.log(err);
                } else {
                    console.log("added new surfspot");
                    Comment.create({
                        text: "This place is awesome!! I wish it had internet.",
                        author: "Homer"
                    }, function(err, comment) {
                        if(err) {
                            console.log(err);
                        } else {
                            surfspot.comments.push(comment._id);
                            surfspot.save();
                            console.log("Created New Comment!!");
                        }
                    });
                }
            });
        });
    });
}

module.exports = seedDB;

